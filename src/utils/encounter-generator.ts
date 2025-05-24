import { useEffect, useState } from 'react';
import { useWorld } from '../contexts/WorldContext';
import { DungeonEncounter } from '../types/dungeon-encounter'

export function useEncounterGenerator() {
  const { selectedWorld } = useWorld();
  const [levelEncounters, setLevelEncounters] = useState<Record<number, DungeonEncounter[]> | null>(null);

  useEffect(() => {
    if (selectedWorld) {
      // Dynamically import encounters based on selected world
      import(`../data/worlds/${selectedWorld.id}/dungeon-encounters/level-encounters`).then(module => {
        setLevelEncounters(module.levelEncounters);
      }).catch(error => {
        console.error(`Failed to load encounters for world ${selectedWorld.id}:`, error);
        setLevelEncounters(null);
      });
    } else {
      setLevelEncounters(null);
    }
  }, [selectedWorld]);

  const generateEncounter = (level: number) => {
    if (!levelEncounters) return null;

    const encounters = levelEncounters[level] || [];
    if (encounters.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * encounters.length);
    return encounters[randomIndex];
  };

  const getRandomEncounters = (challengeRating: number, count: number): DungeonEncounter[] => {
    if (!levelEncounters) return [];
    
    const encounters = levelEncounters[challengeRating] || [];
    if (encounters.length === 0) return [];

    const result: DungeonEncounter[] = [];
    const usedIndices = new Set<number>();

    while (result.length < count && usedIndices.size < encounters.length) {
      const randomIndex = Math.floor(Math.random() * encounters.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        result.push(encounters[randomIndex]);
      }
    }

    return result;
  };

  return { generateEncounter, getRandomEncounters, hasEncounters: !!levelEncounters };
} 