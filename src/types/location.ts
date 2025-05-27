export type LocationType = 
  | 'City'
  | 'Large City'
  | 'Village'
  | 'Landmark'
  | 'Ruins'
  | 'Stronghold'
  | 'Fort'
  | 'Point of Interest'
  | 'Shop'
  | 'Other';

export interface BaseLocation {
  id: string;
  name: string;
  description: string;
  type: LocationType;
  coordinates?: [number, number];
  images?: string[];
  region?: string;
}

export interface Village extends BaseLocation {
  type: 'Village';
  population: number;
  primaryRaces: string[];
  notableFeatures: string[];
  services: string[];
  localGovernment: string;
}

export interface Landmark extends BaseLocation {
  type: 'Landmark';
  significance: string;
  history: string;
  notableFeatures: string[];
  visitingHours?: string;
}

export interface Ruins extends BaseLocation {
  type: 'Ruins';
  age: string;
  originalPurpose: string;
  currentState: string;
  dangers: string[];
  treasures?: string[];
}

export interface Stronghold extends BaseLocation {
  type: 'Stronghold';
  owner: string;
  garrison: number;
  defenses: string[];
  notableFeatures: string[];
  access: string;
}

export interface Fort extends BaseLocation {
  type: 'Fort';
  garrison: number;
  commander: string;
  defenses: string[];
  purpose: string;
  access: string;
}

export interface PointOfInterest extends BaseLocation {
  type: 'Point of Interest';
  significance: string;
  features: string[];
  visitingHours?: string;
  restrictions?: string[];
  coordinates?: [number, number];
}

export interface Shop extends BaseLocation {
  type: 'Shop';
  owner: string;
  specialties: string[];
  inventory: string[];
  services: string[];
  hours: string;
  additionalInfo?: {
    history?: string;
    notableFeatures?: string[];
    specialEvents?: string[];
    restrictions?: string[];
    prices?: {
      common: string;
      rare: string;
      legendary: string;
    };
    payment?: {
      accepted: string[];
      preferred: string;
    };
  };
}

export interface OtherLocation extends BaseLocation {
  type: 'Other';
  customFields: Record<string, string>;
}

export interface City extends BaseLocation {
  type: 'City' | 'Large City';
  population: number;
  primaryRaces: string[];
  notableFeatures: string[];
  services: string[];
  localGovernment: string;
  image?: string;
  banner?: string;
  images?: string[];
  coordinates?: [number, number];
  basicInformation: {
    population: string;
    primaryRaces: string[];
    deities: {
      name: string;
      titles?: string[];
      alignment: string;
      pantheon: string;
      symbol: string;
      domains?: string[];
      worshippers?: string[];
      lore?: string;
      image?: string;
    }[];
  };
  economy?: {
    primaryIndustry?: string;
    gdp?: string;
    currency?: string;
    tradeGoods: {
      name: string;
      type: 'export' | 'import';
      value: string;
      tariff: string;
      description: string;
    }[];
    tradePartners: {
      name: string;
      relationship: string;
      primaryGoods: string[];
      tradeAgreement: string;
    }[];
    transportationRoutes: {
      name: string;
      type: string;
      description: string;
      security: string;
      frequency: string;
    }[];
    economicPolicies: string[];
    marketRegulations: string[];
  };
  keyFigures: any[];
  seasons: {
    name?: string;
    season?: string;
    description: string;
    activities?: string[];
    hazards?: string[];
    magicalEffects?: string[];
    economicImpact?: string;
    tradeModifiers?: {
      exports: Record<string, number>;
      imports: Record<string, number>;
    };
    specialEvents?: string[];
  }[];
  magicalItems: {
    name: string;
    type: string;
    description: string;
    rarity: string;
    location?: string;
    history?: string;
    effects?: string[];
    id: string;
    requirements?: string[];
    value?: string;
    image?: string;
    attunement?: boolean;
    charges?: number;
    source?: string;
    weight?: string;
    duration?: string;
    range?: string;
    activation?: string;
    cooldown?: string;
    uses?: string;
    properties?: string[];
  }[];
  dungeons: {
    id: string;
    name: string;
    description: string;
    type: string;
    difficulty: string;
    size: string;
    environment: string;
    rewards: string[];
    hazards: string[];
    encounters: {
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
    }[];
    images?: string[];
  }[];
  pointsOfInterest: {
    id: string;
    name: string;
    description: string;
    significance: string;
    type: string;
    notableFeatures?: string[];
  }[];
  restAreas: {
    id: string;
    name: string;
    description: string;
    type: string;
    quality: string;
    price: string;
    amenities?: string[];
  }[];
  shops: {
    id: string;
    name: string;
    owner: string;
    type: string;
    description: string;
    inventory: {
      id: string;
      name: string;
      description: string;
      type: string;
      rarity: string;
      cost: string;
      quantity: number;
    }[];
  }[];
  biography: string;
}

export interface LargeCity extends BaseLocation {
  type: 'Large City';
  population: number;
  primaryRaces: string[];
  notableFeatures: string[];
  services: string[];
  localGovernment: string;
}

export interface Road {
  id: string;
  name: string;
  description?: string;
  type: 'Major' | 'Minor' | 'Path';
  points: Array<{ x: number; y: number }>;
  connectedLocations: string[];
  waypoints: Array<{
    id: string;
    x: number;
    y: number;
  }>;
}

export interface Location {
  id: string;
  worldId: string;
  name: string;
  description: string;
  type: LocationType;
  coordinates?: {
    x: number;
    y: number;
  };
  region?: string;
  roads?: string[]; // Array of road IDs connected to this location
  images?: string[];
  
  // Fields from Village/City/LargeCity
  population?: number;
  primaryRaces?: string[];
  notableFeatures?: string[];
  services?: string[];
  localGovernment?: string;

  // Fields from Landmark
  significance?: string;
  history?: string;
  visitingHours?: string;

  // Fields from Ruins
  age?: string;
  originalPurpose?: string;
  currentState?: string;
  dangers?: string[];
  treasures?: string[];

  // Fields from Stronghold
  owner?: string;
  garrison?: number;
  defenses?: string[];
  access?: string;

  // Fields from Fort
  commander?: string;
  purpose?: string;

  // Fields from PointOfInterest
  features?: string[];
  restrictions?: string[];

  // Fields from Shop
  specialties?: string[];
  inventory?: string[];
  hours?: string;
  additionalInfo?: {
    history?: string;
    notableFeatures?: string[];
    specialEvents?: string[];
    restrictions?: string[];
    prices?: {
      common: string;
      rare: string;
      legendary: string;
    };
    payment?: {
      accepted: string[];
      preferred: string;
    };
  };

  // Fields from OtherLocation
  customFields?: Record<string, string>;

  // Fields from Region
  seasons?: Array<{
    season: string;
    description: string;
    economicImpact: string;
    specialEvents: string[];
  }>;

  magicalItems?: Array<{
    id: string;
    name: string;
    type: string;
    rarity: string;
    description: string;
    effects: string[];
    location: string;
    requirements: string[];
    value: string;
    image: string;
  }>;

  // Fields for dungeons
  dungeons?: Array<{
    id: string;
    name: string;
    description: string;
    type: string;
    level: string;
    size: string;
    environment: string;
    encounters: string[];
    treasures: string[];
    traps: string[];
    secrets: string[];
  }>;
}

export interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  hoveredLocation: string | null;
  isEditMode: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: string;
  quantity: number;
  rarity: string;
  cost: number;
}

export interface Deity {
  name: string;
  domain: string;
  description: string;
}

export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  type: 'Point of Interest';
  coordinates?: [number, number];
} 