import { DungeonEncounter } from './dungeon-encounter'

export interface Deity {
  name: string
  domain: string
  alignment: string
  image: string
  domains: string[]
  symbol: string
  pantheon: string
  titles: string[]
  worshippers: string[]
  lore: string
}

export interface HistoricalFigure {
  id: string
  name: string
  title: string
  era: string
  significance: string
  image: string
  avatarStyle: string
}

export interface TradeGood {
  name: string
  type: 'export' | 'import'
  value: string
  tariff: string
  description: string
}

export interface TradePartner {
  name: string
  relationship: string
  primaryGoods: string[]
  tradeAgreement: string
}

export interface TransportationRoute {
  name: string
  type: string
  description: string
  security: string
  frequency: string
}

export interface Economy {
  primaryIndustry: string
  gdp: string
  currency: string
  tradeGoods: TradeGood[]
  tradePartners: TradePartner[]
  transportationRoutes: TransportationRoute[]
  economicPolicies: string[]
  marketRegulations: string[]
}

export interface SeasonalEffect {
  name: string
  description: string
  activities: string[]
  hazards: string[]
  magicalEffects: string[]
  economicImpact: string
  tradeModifiers: {
    exports: Record<string, number>
    imports: Record<string, number>
  }
  specialEvents: string[]
}

export interface MagicalItem {
  name: string
  type: string
  description: string
  rarity: string
  location: string
  history: string
  effects: string[]
  id: string
  requirements: string[]
  value: string
  image: string
}

export interface Treasure {
  gold?: number
  gems?: { type: string; value: number }[]
  art?: { type: string; value: number }[]
  magicItems?: { name: string; rarity: string }[]
}

export interface Dungeon {
  id: string
  name: string
  description: string
  challengeRating: number
  location: {
    region: string
    environment: string
  }
  encounters: string[]
  treasure: Treasure
  level: string
  difficulty: string
  inhabitants: string[]
  treasures: string[]
  hazards: string[]
  history: string
  images?: string[]
}

export interface PointOfInterest {
  id: string
  name: string
  description: string
  type: string
  significance: string
  notableFeatures: string[]
  associatedFigures: string[]
}

export interface RestArea {
  id: string
  name: string
  description: string
  type: string
  quality: string
  price: string
  amenities: string[]
}

export interface InventoryItem {
  id: string
  name: string
  description: string
  cost: string
  rarity: string
  type: string
  quantity: number
}

export interface Shop {
  id: string
  name: string
  type: string
  description: string
  owner: string
  inventory: InventoryItem[]
}

export interface BasicInformation {
  population: string
  primaryRaces: string[]
  wealthClass: string
  politicalStructure: string
  deities: Deity[]
}

export interface History {
  founding: string
  majorEvents: string[]
  currentEra: string
}

export interface City {
  id: string
  name: string
  description: string
  coordinates: [number, number]
  image: string
  banner: string
  images?: string[]
  basicInformation?: {
    population?: string
    primaryRaces?: string[]
    deities?: string[]
  }
  history: History
  notableFeatures: string[]
  keyFigures?: any[]
  economy?: {
    primaryIndustry?: string
    gdp?: string
    currency?: string
    tradeGoods?: string[]
    tradePartners?: string[]
    transportationRoutes?: string[]
    economicPolicies?: string[]
    marketRegulations?: string[]
  }
  seasons?: any[]
  magicalItems?: any[]
  dungeons?: any[]
  pointsOfInterest?: any[]
  restAreas?: any[]
  shops?: any[]
  spotlightImages?: string[]
  biography?: string
  cities?: any[]
} 