import React from 'react';
import { vi } from 'vitest';

interface World {
  name: string;
  theme: string;
}

interface WorldContextType {
  selectedWorld: World | null;
  setSelectedWorld: (world: World | null) => void;
  isWorldSelected: boolean;
}

export const useWorld = vi.fn((): WorldContextType => ({
  selectedWorld: null,
  setSelectedWorld: vi.fn(),
  isWorldSelected: false,
}));

export const WorldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
}; 