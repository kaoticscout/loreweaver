import { Stage, Layer, Rect, Line, Text, Group } from 'react-konva';
import { useEffect, useState } from 'react';

interface Room {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  description: string;
  features: string[];
  doors: {
    north?: boolean;
    south?: boolean;
    east?: boolean;
    west?: boolean;
  };
}

interface Corridor {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  isVertical: boolean;
}

interface DungeonMapProps {
  width: number;
  height: number;
  dungeonSize: 'small' | 'medium' | 'large';
  theme: string;
}

export function DungeonMap({ width, height, dungeonSize, theme }: DungeonMapProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [corridors, setCorridors] = useState<Corridor[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const gridSize = 30; // Size of each grid cell in pixels
  const wallThickness = 4;
  const corridorWidth = gridSize;

  const createCorridor = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    id: string
  ): Corridor[] => {
    const newCorridors: Corridor[] = [];
    const midX = start.x + Math.floor((end.x - start.x) / 2);
    const midY = start.y + Math.floor((end.y - start.y) / 2);

    if (Math.abs(end.y - start.y) > gridSize) {
      // Add vertical corridor
      newCorridors.push({
        id: `${id}-v`,
        start: { x: start.x, y: Math.min(start.y, end.y) },
        end: { x: start.x, y: Math.max(start.y, end.y) },
        isVertical: true
      });
    }

    if (Math.abs(end.x - start.x) > gridSize) {
      // Add horizontal corridor at the end
      newCorridors.push({
        id: `${id}-h`,
        start: { x: Math.min(start.x, end.x), y: end.y },
        end: { x: Math.max(start.x, end.x), y: end.y },
        isVertical: false
      });
    }

    return newCorridors;
  };

  const generateRooms = () => {
    const numRooms = dungeonSize === 'small' ? 5 : dungeonSize === 'medium' ? 8 : 12;
    const newRooms: Room[] = [];
    const newCorridors: Corridor[] = [];
    
    // Calculate center position
    const centerX = Math.floor(width / (2 * gridSize)) * gridSize;
    const centerY = Math.floor(height / (2 * gridSize)) * gridSize;

    // Start with a central room
    const centralRoom = {
      id: 'room-1',
      x: centerX - (2 * gridSize),
      y: centerY - (2 * gridSize),
      width: 4 * gridSize,
      height: 4 * gridSize,
      name: 'Main Hall',
      description: generateRoomDescription(theme),
      features: generateRoomFeatures(theme),
      doors: {
        north: false,
        south: false,
        east: false,
        west: false
      }
    };
    newRooms.push(centralRoom);

    // Define possible room positions with more spacing
    const possiblePositions = [
      // North wing
      { x: centerX - (3 * gridSize), y: centerY - (10 * gridSize), wing: 'north' },
      { x: centerX + (2 * gridSize), y: centerY - (10 * gridSize), wing: 'north' },
      // South wing
      { x: centerX - (3 * gridSize), y: centerY + (6 * gridSize), wing: 'south' },
      { x: centerX + (2 * gridSize), y: centerY + (6 * gridSize), wing: 'south' },
      // East wing
      { x: centerX + (8 * gridSize), y: centerY - (2 * gridSize), wing: 'east' },
      { x: centerX + (8 * gridSize), y: centerY + (2 * gridSize), wing: 'east' },
      // West wing
      { x: centerX - (10 * gridSize), y: centerY - (2 * gridSize), wing: 'west' },
      { x: centerX - (10 * gridSize), y: centerY + (2 * gridSize), wing: 'west' },
    ];

    // Shuffle positions
    const shuffledPositions = [...possiblePositions].sort(() => Math.random() - 0.5);

    // Create rooms at these positions
    for (let i = 0; i < Math.min(numRooms - 1, shuffledPositions.length); i++) {
      const pos = shuffledPositions[i];
      const roomWidth = 3 * gridSize;
      const roomHeight = 3 * gridSize;

      // Check if position is within bounds
      if (pos.x >= gridSize && pos.y >= gridSize && 
          pos.x + roomWidth <= width - gridSize && 
          pos.y + roomHeight <= height - gridSize) {
        
        const newRoom = {
          id: `room-${i + 2}`,
          x: pos.x,
          y: pos.y,
          width: roomWidth,
          height: roomHeight,
          name: `Chamber ${i + 2}`,
          description: generateRoomDescription(theme),
          features: generateRoomFeatures(theme),
          doors: {
            north: false,
            south: false,
            east: false,
            west: false
          }
        };

        // Calculate connection points
        const roomCenter = {
          x: newRoom.x + newRoom.width / 2,
          y: newRoom.y + newRoom.height / 2
        };

        const centralCenter = {
          x: centralRoom.x + centralRoom.width / 2,
          y: centralRoom.y + centralRoom.height / 2
        };

        // Create corridors based on wing position
        if (pos.wing === 'north') {
          newRoom.doors.south = true;
          centralRoom.doors.north = true;
          
          const corridorStart = {
            x: roomCenter.x,
            y: newRoom.y + newRoom.height
          };
          
          const corridorEnd = {
            x: centralCenter.x,
            y: centralRoom.y
          };

          newCorridors.push(...createCorridor(corridorStart, corridorEnd, `corridor-${i}`));
        } else if (pos.wing === 'south') {
          newRoom.doors.north = true;
          centralRoom.doors.south = true;
          
          const corridorStart = {
            x: roomCenter.x,
            y: newRoom.y
          };
          
          const corridorEnd = {
            x: centralCenter.x,
            y: centralRoom.y + centralRoom.height
          };

          newCorridors.push(...createCorridor(corridorStart, corridorEnd, `corridor-${i}`));
        } else if (pos.wing === 'east') {
          newRoom.doors.west = true;
          centralRoom.doors.east = true;
          
          const corridorStart = {
            x: newRoom.x,
            y: roomCenter.y
          };
          
          const corridorEnd = {
            x: centralRoom.x + centralRoom.width,
            y: centralCenter.y
          };

          newCorridors.push(...createCorridor(corridorStart, corridorEnd, `corridor-${i}`));
        } else if (pos.wing === 'west') {
          newRoom.doors.east = true;
          centralRoom.doors.west = true;
          
          const corridorStart = {
            x: newRoom.x + newRoom.width,
            y: roomCenter.y
          };
          
          const corridorEnd = {
            x: centralRoom.x,
            y: centralCenter.y
          };

          newCorridors.push(...createCorridor(corridorStart, corridorEnd, `corridor-${i}`));
        }

        newRooms.push(newRoom);
      }
    }

    setCorridors(newCorridors);
    return newRooms;
  };

  const generateRoomFeatures = (theme: string) => {
    const features = {
      'ruins': [
        'Broken statues lie scattered about',
        'Ancient inscriptions cover the walls',
        'A partially collapsed pillar blocks the corner',
        'Debris and rubble cover the floor'
      ],
      'temple': [
        'An altar stands against the far wall',
        'Religious symbols are carved into the floor',
        'Ceremonial braziers line the walls',
        'A large statue dominates the room'
      ],
      'dungeon': [
        'Rusty chains hang from the ceiling',
        'A suspicious stain darkens the floor',
        'Iron bars separate part of the room',
        'Strange scratches mark the walls'
      ],
      'cave': [
        'Stalactites hang from the ceiling',
        'A small underground stream flows through',
        'Phosphorescent fungi grow in patches',
        'Natural rock formations create odd shadows'
      ]
    };

    const themeFeatures = features[theme as keyof typeof features] || features['dungeon'];
    return [themeFeatures[Math.floor(Math.random() * themeFeatures.length)]];
  };

  const generateRoomDescription = (theme: string) => {
    const descriptions = {
      'ruins': [
        'This chamber shows signs of ancient grandeur',
        'Time has taken its toll on this once-magnificent room',
        'Remnants of forgotten architecture remain',
        'The room bears silent witness to past glory'
      ],
      'temple': [
        'A sacred atmosphere permeates this chamber',
        'This room was clearly used for religious ceremonies',
        'Divine energy still lingers here',
        'The room radiates ancient holiness'
      ],
      'dungeon': [
        'A foreboding chamber with ominous features',
        'This room was designed to hold prisoners',
        'The atmosphere here is thick with dread',
        'Signs of suffering mark this chamber'
      ],
      'cave': [
        'Natural cave formations dominate this space',
        'Water has carved this chamber over millennia',
        'The cave shows signs of recent habitation',
        'Echoes of dripping water fill this cavern'
      ]
    };

    const themeDescriptions = descriptions[theme as keyof typeof descriptions] || descriptions['dungeon'];
    return themeDescriptions[Math.floor(Math.random() * themeDescriptions.length)];
  };

  const drawGrid = () => {
    const lines = [];
    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      lines.push(
        <Line
          key={`v${x}`}
          points={[x, 0, x, height]}
          stroke="#2d374850"
          strokeWidth={1}
        />
      );
    }
    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      lines.push(
        <Line
          key={`h${y}`}
          points={[0, y, width, y]}
          stroke="#2d374850"
          strokeWidth={1}
        />
      );
    }
    return lines;
  };

  const drawCorridors = () => {
    return corridors.map(corridor => {
      if (corridor.isVertical) {
        const x = corridor.start.x - corridorWidth/2;
        const y = Math.min(corridor.start.y, corridor.end.y);
        const height = Math.abs(corridor.end.y - corridor.start.y);
        return (
          <Rect
            key={corridor.id}
            x={x}
            y={y}
            width={corridorWidth}
            height={height}
            fill="#1a202c"
            stroke="#4a5568"
            strokeWidth={wallThickness}
          />
        );
      } else {
        const x = Math.min(corridor.start.x, corridor.end.x);
        const y = corridor.start.y - corridorWidth/2;
        const width = Math.abs(corridor.end.x - corridor.start.x);
        return (
          <Rect
            key={corridor.id}
            x={x}
            y={y}
            width={width}
            height={corridorWidth}
            fill="#1a202c"
            stroke="#4a5568"
            strokeWidth={wallThickness}
          />
        );
      }
    });
  };

  const drawRoom = (room: Room) => {
    const isSelected = selectedRoom?.id === room.id;
    return (
      <Group 
        key={room.id}
        onMouseEnter={() => setSelectedRoom(room)}
        onMouseLeave={() => setSelectedRoom(null)}
      >
        {/* Room walls */}
        <Rect
          x={room.x}
          y={room.y}
          width={room.width}
          height={room.height}
          fill="#1a202c"
          stroke={isSelected ? "#9f7aea" : "#4a5568"}
          strokeWidth={wallThickness}
        />

        {/* Doors */}
        {room.doors.north && (
          <Rect
            x={room.x + room.width/2 - gridSize/4}
            y={room.y}
            width={gridSize/2}
            height={wallThickness}
            fill={isSelected ? "#9f7aea" : "#4a5568"}
          />
        )}
        {room.doors.south && (
          <Rect
            x={room.x + room.width/2 - gridSize/4}
            y={room.y + room.height - wallThickness}
            width={gridSize/2}
            height={wallThickness}
            fill={isSelected ? "#9f7aea" : "#4a5568"}
          />
        )}
        {room.doors.east && (
          <Rect
            x={room.x + room.width - wallThickness}
            y={room.y + room.height/2 - gridSize/4}
            width={wallThickness}
            height={gridSize/2}
            fill={isSelected ? "#9f7aea" : "#4a5568"}
          />
        )}
        {room.doors.west && (
          <Rect
            x={room.x}
            y={room.y + room.height/2 - gridSize/4}
            width={wallThickness}
            height={gridSize/2}
            fill={isSelected ? "#9f7aea" : "#4a5568"}
          />
        )}

        {/* Room number */}
        <Text
          x={room.x + 10}
          y={room.y + 10}
          text={room.name}
          fill="#e2e8f0"
          fontSize={14}
        />
      </Group>
    );
  };

  useEffect(() => {
    const newRooms = generateRooms();
    const roomNames = {
      'ruins': [
        'Grand Hall', 'Throne Room', 'Library', 'Armory', 
        'Guard Post', 'Treasury', 'Barracks', 'Kitchen',
        'Dining Hall', 'Courtyard', 'Gallery', 'Study'
      ],
      'temple': [
        'Sanctuary', 'Altar Room', 'Meditation Chamber', 'Offering Hall',
        'Prayer Room', 'Ritual Chamber', 'Sacred Vault', 'Cleansing Room',
        'Oracle Chamber', 'Relic Room', 'Priests Quarter', 'Holy Archive'
      ],
      'dungeon': [
        'Torture Chamber', 'Cell Block', 'Guard Room', 'Interrogation Room',
        'Prison Hall', 'Execution Chamber', 'Storage Room', 'Warden Office',
        'Holding Cell', 'Dark Pit', 'Chain Room', 'Death Row'
      ],
      'cave': [
        'Crystal Cave', 'Stalactite Chamber', 'Underground Lake', 'Echo Chamber',
        'Fungal Grotto', 'Rock Fall', 'Mineral Deposit', 'Water Cave',
        'Bat Colony', 'Deep Chasm', 'Glowworm Cave', 'Ancient Formation'
      ]
    };

    const themeNames = roomNames[theme as keyof typeof roomNames] || roomNames['dungeon'];
    const shuffledNames = [...themeNames].sort(() => Math.random() - 0.5);

    const namedRooms = newRooms.map((room, index) => ({
      ...room,
      name: shuffledNames[index] || `Chamber ${index + 1}`
    }));

    setRooms(namedRooms);
  }, [width, height, dungeonSize, theme]);

  return (
    <Stage width={width} height={height}>
      <Layer>
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#0a0a0a"
        />

        {/* Grid */}
        {drawGrid()}

        {/* Corridors */}
        {drawCorridors()}

        {/* Rooms */}
        {rooms.map(room => drawRoom(room))}

        {/* Room info panel */}
        {selectedRoom && (
          <Group>
            <Rect
              x={10}
              y={height - 100}
              width={width - 20}
              height={90}
              fill="rgba(26, 32, 44, 0.95)"
              stroke="#4a5568"
              strokeWidth={1}
              cornerRadius={5}
            />
            <Text
              x={20}
              y={height - 90}
              text={`${selectedRoom.name}: ${selectedRoom.description}`}
              fill="#e2e8f0"
              fontSize={14}
              width={width - 40}
            />
            <Text
              x={20}
              y={height - 65}
              text={selectedRoom.features.join(', ')}
              fill="#a0aec0"
              fontSize={12}
              width={width - 40}
            />
          </Group>
        )}
      </Layer>
    </Stage>
  );
} 