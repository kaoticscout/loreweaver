export interface DungeonEncounter {
  id: string;
  name: string;
  description: string;
  type: string;
  difficulty: string;
  enemies: string[];
  rewards: string[];
  conditions?: string[];
}

export interface DungeonTreasure {
  id: string;
  name: string;
  description: string;
  type: string;
  rarity: string;
  value: string;
  location: string;
}

export interface Dungeon {
  id: string;
  name: string;
  description: string;
  level: string;
  difficulty: string;
  challengeRating: number;
  location: {
    region: string;
    environment: string;
  };
  inhabitants: string[];
  treasures: string[];
  hazards: string[];
  history: string;
  encounters: DungeonEncounter[];
  treasure: DungeonTreasure[];
} 