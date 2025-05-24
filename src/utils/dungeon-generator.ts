import { useEffect, useState } from 'react';
import { useWorld } from '../contexts/WorldContext';
import { DungeonEncounter } from '../types/dungeon-encounter';

export function useDungeonGenerator() {
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

  const generateDungeon = (level: number, size: 'small' | 'medium' | 'large') => {
    if (!levelEncounters) return null;

    const encounters = levelEncounters[level] || [];
    if (encounters.length === 0) return null;

    const roomCounts = {
      small: { min: 3, max: 5 },
      medium: { min: 6, max: 8 },
      large: { min: 9, max: 12 }
    };

    const { min, max } = roomCounts[size];
    const roomCount = Math.floor(Math.random() * (max - min + 1)) + min;

    const rooms = [];
    const usedEncounters = new Set<number>();

    for (let i = 0; i < roomCount; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * encounters.length);
      } while (usedEncounters.has(randomIndex));

      usedEncounters.add(randomIndex);
      rooms.push(encounters[randomIndex]);
    }

    return {
      level,
      size,
      roomCount,
      rooms
    };
  };

  return { generateDungeon, hasEncounters: !!levelEncounters };
}

export function addRandomUniqueEncounters(
  existing: DungeonEncounter[],
  challengeRating: number,
  count: number
): DungeonEncounter[] {
  const pool = levelEncounters[challengeRating] || [];
  // Filter out already-included encounters by id
  const existingIds = new Set(existing.map(e => e.id));
  const available = pool.filter(e => !existingIds.has(e.id));
  // Shuffle and pick up to `count` unique encounters
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return [...existing, ...shuffled.slice(0, count)];
} 