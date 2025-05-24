import { useMemo } from 'react';

const COLOR_THEMES = [
  {
    name: 'Gold',
    borderPrimary: 'border-amber-400/80',
    borderSecondary: 'border-amber-300/50',
    bgEdge: 'bg-amber-400/60',
    accent: 'bg-amber-400/50',
    borderImage: 'border-amber-400/50',
  }
];

export function useBorderColor() {
  return useMemo(() => {
    const idx = Math.floor(Math.random() * COLOR_THEMES.length);
    return COLOR_THEMES[idx];
  }, []);
} 