import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { World } from '../types/world';

interface WorldProgress {
  worldId: string;
  chapter: number;
  lastPlayed: string;
}

interface WorldProgressContextType {
  worldProgress: Record<string, WorldProgress>;
  setWorldProgress: (worldId: string, progress: WorldProgress) => void;
  hasCreatedWorld: (worldId: string) => boolean;
  getCurrentChapter: (worldId: string) => number;
}

const WorldProgressContext = createContext<WorldProgressContextType | undefined>(undefined);

export function WorldProgressProvider({ children }: { children: ReactNode }) {
  const [worldProgress, setWorldProgress] = useState<Record<string, WorldProgress>>(() => {
    const stored = localStorage.getItem('worldProgress');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('worldProgress', JSON.stringify(worldProgress));
  }, [worldProgress]);

  const setProgress = (worldId: string, progress: WorldProgress) => {
    setWorldProgress(prev => ({
      ...prev,
      [worldId]: progress
    }));
  };

  const hasCreatedWorld = (worldId: string): boolean => {
    return worldId in worldProgress;
  };

  const getCurrentChapter = (worldId: string): number => {
    return worldProgress[worldId]?.chapter || 0;
  };

  const value = {
    worldProgress,
    setWorldProgress: setProgress,
    hasCreatedWorld,
    getCurrentChapter
  };

  return (
    <WorldProgressContext.Provider value={value}>
      {children}
    </WorldProgressContext.Provider>
  );
}

export function useWorldProgress() {
  const context = useContext(WorldProgressContext);
  if (context === undefined) {
    throw new Error('useWorldProgress must be used within a WorldProgressProvider');
  }
  return context;
} 