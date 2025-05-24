import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';

interface DiceProps {
  sides: number;
  result: number | null;
  rolling: boolean;
  onRollComplete?: () => void;
}

function Dice({ sides, result, rolling, onRollComplete }: DiceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0, z: 0 });
  const speedRef = useRef(0.1);

  useEffect(() => {
    if (rolling) {
      speedRef.current = 0.3;
      setTargetRotation({
        x: rotation.x + Math.PI * 4 + Math.random() * Math.PI * 2,
        y: rotation.y + Math.PI * 4 + Math.random() * Math.PI * 2,
        z: rotation.z + Math.PI * 4 + Math.random() * Math.PI * 2
      });
    }
  }, [rolling]);

  useFrame(() => {
    if (!meshRef.current) return;

    if (rolling) {
      meshRef.current.rotation.x += speedRef.current;
      meshRef.current.rotation.y += speedRef.current;
      meshRef.current.rotation.z += speedRef.current;

      // Gradually slow down
      speedRef.current *= 0.97;

      if (speedRef.current < 0.01) {
        onRollComplete?.();
      }
    } else {
      // Smooth transition to target rotation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotation.x, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation.y, 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotation.z, 0.1);
    }

    setRotation({
      x: meshRef.current.rotation.x,
      y: meshRef.current.rotation.y,
      z: meshRef.current.rotation.z
    });
  });

  const getGeometry = () => {
    switch (sides) {
      case 4:
        return new THREE.TetrahedronGeometry();
      case 6:
        return new THREE.BoxGeometry();
      case 8:
        return new THREE.OctahedronGeometry();
      case 12:
        return new THREE.DodecahedronGeometry();
      case 20:
        return new THREE.IcosahedronGeometry();
      default:
        return new THREE.BoxGeometry();
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={getGeometry()}
        scale={1.5}
      >
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.4}
          roughness={0.2}
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          transparent
          opacity={0.95}
        />
      </mesh>
      {result !== null && !rolling && (
        <Text
          position={[0, 0, 2.25]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#4c1d95"
          font="/fonts/Inter-Bold.ttf"
        >
          {result}
        </Text>
      )}
    </group>
  );
}

interface Dice3DProps {
  sides: number;
  result: number | null;
  rolling: boolean;
  onRollComplete?: () => void;
}

export function Dice3D({ sides, result, rolling, onRollComplete }: Dice3DProps) {
  return (
    <div className="w-full h-[300px] bg-[#1B0A20] rounded-lg overflow-hidden shadow-[inset_0_0_100px_rgba(168,85,247,0.2)]">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        shadows
      >
        <ambientLight intensity={1} color="#f0abfc" />
        <pointLight position={[10, 10, 10]} intensity={2} castShadow color="#f0abfc" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.4}
          penumbra={0.5}
          intensity={2}
          castShadow
          color="#f0abfc"
        />
        <Dice
          sides={sides}
          result={result}
          rolling={rolling}
          onRollComplete={onRollComplete}
        />
      </Canvas>
    </div>
  );
} 