export interface Monster {
  name: string;
  quantity: number;
  hp: number;
  ac: number;
  initiative: number;
  description: string;
  tactics: string;
  xp: number;
}

export interface Treasure {
  type: 'gold' | 'item' | 'magical-item';
  name: string;
  value: string;
  description: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary';
}

export interface EncounterArea {
  id: string;
  name: string;
  description: string;
  lighting: string;
  terrain: string[];
  features: {
    name: string;
    description: string;
    mechanics?: string;
  }[];
  doors?: {
    type: string;
    location: string;
    properties: string[];
  }[];
}

export interface DevelopmentOption {
  trigger: string;
  outcome: string;
  consequences: string[];
}

export interface Encounter {
  id: string;
  title: string;
  type: 'combat' | 'social' | 'exploration' | 'puzzle' | 'trap';
  difficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  description: string;
  setup: string;
  areas: EncounterArea[];
  monsters: Monster[];
  npcs: {
    id: string;
    name: string;
    role: string;
    motivation: string;
    personality: string;
    tactics: string;
    notes: string;
  }[];
  developments: DevelopmentOption[];
  treasure: Treasure[];
  xpTotal: number;
  adjustments: {
    easier: string[];
    harder: string[];
  };
}

export interface CampaignSession {
  id: string;
  title: string;
  level: string;
  description: string;
  overview: {
    background: string;
    hooks: string[];
    goals: string[];
  };
  objectives: {
    main: string[];
    optional: string[];
  };
  encounters: Encounter[];
  npcs: {
    id: string;
    name: string;
    role: string;
    appearance: string;
    personality: string;
    motivation: string;
    secrets: string[];
    notes: string;
  }[];
  locations: {
    id: string;
    name: string;
    description: string;
    atmosphere: string;
    keyFeatures: string[];
    secrets: string[];
    connections: {
      locationId: string;
      description: string;
    }[];
  }[];
  handouts: {
    id: string;
    type: 'image' | 'text' | 'map';
    title: string;
    description: string;
    content: string;
  }[];
  timing: {
    estimatedDuration: string;
    pacing: string[];
    timeOfDay: string;
    sessionNotes: {
      id: string;
      date: string;
      content: string;
    }[];
  };
}

export interface EditableNPC {
  id: string;
  name: string;
  role: string;
  appearance: string;
  personality: string;
  motivation: string;
  secrets: string[];
  notes: string;
}

export interface EditableLocation {
  id: string;
  name: string;
  description: string;
  atmosphere: string;
  keyFeatures: string[];
  secrets: string[];
  connections: {
    locationId: string;
    description: string;
  }[];
}

export interface EditableHandout {
  id: string;
  type: 'image' | 'text' | 'map';
  title: string;
  description: string;
  content: string;
} 