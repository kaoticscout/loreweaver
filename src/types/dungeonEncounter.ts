export interface Enemy {
  name: string;
  type: string;
  count: number;
  cr?: number;
}

export interface Reward {
  type: string;
  value: number;
  description: string;
}

export interface DungeonEncounter {
  id: string;
  name: string;
  description: string;
  type: string;
  difficulty: string;
  enemies: Enemy[];
  rewards: Reward[];
  conditions?: string[];
  level: string;
  location?: {
    region: string;
    environment: string;
  };
  triggers?: string[];
  notes?: string[];
  xp?: number;
  treasure?: {
    gold?: number;
    items?: string[];
  };
} 