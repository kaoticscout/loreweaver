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
  creatures: string[];
  treasure?: {
    gold?: number;
    gems?: Array<{
      type: string;
      value: number;
    }>;
    art?: Array<{
      type: string;
      value: number;
    }>;
    magicItems?: Array<{
      name: string;
      rarity: string;
    }>;
  };
} 