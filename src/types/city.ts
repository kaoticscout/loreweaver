export interface SeasonalEffect {
  name: string;
  description: string;
  activities: string[];
  hazards: string[];
}

export interface TransportationRoute {
  type: string;
  destination: string;
  distance: string;
  travelTime: string;
  cost: string;
  description: string;
}

export interface MagicalItem {
  id: string;
  name: string;
  description: string;
  type: string;
  rarity: string;
  value?: string;
  properties: string[];
}

export interface Dungeon {
  id: string;
  name: string;
  description: string;
  level: string;
  difficulty: string;
  inhabitants: string[];
  treasures: string[];
  hazards: string[];
  history: string;
}

export interface PointOfInterest {
  id: string;
  name: string;
  type: string;
  description: string;
  significance: string;
  notableFeatures: string[];
  associatedFigures: string[];
}

export interface RestArea {
  id: string;
  name: string;
  type: string;
  description: string;
  quality: string;
  price: string;
  amenities: string[];
}

export interface Shop {
  id: string;
  name: string;
  type: string;
  description: string;
  owner: string;
  inventory: InventoryItem[];
  priceModifier: number;
  specialties: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: string;
  rarity: string;
  quantity: number;
  basePrice: number;
  properties: string[];
}

export interface City {
  id: string;
  name: string;
  description: string;
  population: string;
  government: string;
  economy: string;
  culture: string;
  seasons?: SeasonalEffect[];
  magicalItems?: MagicalItem[];
  dungeons?: Dungeon[];
  pointsOfInterest?: PointOfInterest[];
  restAreas?: RestArea[];
  shops?: Shop[];
  transportationRoutes?: TransportationRoute[];
  history?: string;
  notableLocations?: string[];
  threats?: string[];
  createdAt: Date;
  updatedAt: Date;
} 