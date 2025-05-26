import { useEffect, useState } from 'react';
import { useWorld } from '../contexts/WorldContext';
import { DungeonEncounter } from '../types/dungeonEncounter';
import { DatabaseService } from '../services/database';

export function useDungeonGenerator() {
  const { selectedWorld } = useWorld();
  const [levelEncounters, setLevelEncounters] = useState<Record<number, DungeonEncounter[]> | null>(null);

  useEffect(() => {
    if (selectedWorld) {
      // Load encounters from database
      DatabaseService.getEncountersByWorldId(selectedWorld.id)
        .then(encounters => {
          // Group encounters by level
          const grouped = encounters.reduce((acc, encounter) => {
            const level = parseInt(encounter.level, 10);
            if (!acc[level]) {
              acc[level] = [];
            }
            acc[level].push(encounter);
            return acc;
          }, {} as Record<number, DungeonEncounter[]>);
          setLevelEncounters(grouped);
        })
        .catch(error => {
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
  level: number,
  count: number,
  availableEncounters: DungeonEncounter[]
): DungeonEncounter[] {
  // Filter encounters by level
  const pool = availableEncounters.filter(e => parseInt(e.level, 10) === level);
  // Filter out already-included encounters by id
  const existingIds = new Set(existing.map(e => e.id));
  const available = pool.filter(e => !existingIds.has(e.id));
  // Shuffle and pick up to `count` unique encounters
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return [...existing, ...shuffled.slice(0, count)];
} 