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
  coordinates?: {
    x: number;
    y: number;
  };
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
  type: 'City';
  population: number;
  primaryRaces: string[];
  notableFeatures: string[];
  services: string[];
  localGovernment: string;
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
}

export interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  hoveredLocation: string | null;
  isEditMode: boolean;
} 