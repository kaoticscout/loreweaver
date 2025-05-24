import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { World } from '../types/world';
import { useNavigate } from 'react-router-dom';

interface WorldContextType {
  selectedWorld: World | null;
  setSelectedWorld: (world: World | null) => void;
  isWorldSelected: boolean;
}

const WorldContext = createContext<WorldContextType | undefined>(undefined);

export function WorldProvider({ children }: { children: ReactNode }) {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(() => {
    const stored = localStorage.getItem('selectedWorld');
    return stored ? JSON.parse(stored) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedWorld) {
      localStorage.setItem('selectedWorld', JSON.stringify(selectedWorld));
    } else {
      localStorage.removeItem('selectedWorld');
    }
  }, [selectedWorld]);

  const value = {
    selectedWorld,
    setSelectedWorld,
    isWorldSelected: selectedWorld !== null
  };

  return (
    <WorldContext.Provider value={value}>
      {children}
    </WorldContext.Provider>
  );
}

export function useWorld() {
  const context = useContext(WorldContext);
  if (context === undefined) {
    throw new Error('useWorld must be used within a WorldProvider');
  }
  return context;
} 