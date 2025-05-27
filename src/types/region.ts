import { Location } from './location'
import { City } from './city'

export interface RegionSeasonalEffect {
  season: string
  description: string
  activities?: string[]
  hazards?: string[]
}

export interface RegionMagicalItem {
  id: string
  name: string
  type: string
  rarity: string
  description: string
  effects: string[]
  location: string
  requirements: string[]
  value: string
  image: string
}

export interface RegionHistory {
  founding: string
  majorEvents: string[]
  currentEra: string
}

export interface Region {
  id: string
  worldId: string
  name: string
  description: string
  biography: string
  color: string
  banner: string
  images?: string[]
  notableFeatures: string[]
  history: RegionHistory
  keyFigures: {
    id: string
    name: string
    title: string
    era: string
    significance: string
    image: string
    avatarStyle: string
  }[]
  economy: {
    primaryIndustry: string
    gdp: string
    currency: string
    tradeGoods: {
      name: string
      type: 'export' | 'import'
      value: string
      tariff: string
      description: string
    }[]
    tradePartners: {
      name: string
      relationship: string
      primaryGoods: string[]
      tradeAgreement: string
    }[]
    transportationRoutes: {
      name: string
      type: string
      description: string
      security: string
      frequency: string
    }[]
    economicPolicies: string[]
    marketRegulations: string[]
  }
  seasons?: RegionSeasonalEffect[]
  magicalItems?: any[]
  locations: Location[]
  climate: string
  terrain: string
  cities: City[]
  history?: string
  notableLocations?: string[]
  resources?: string[]
  threats?: string[]
  factions?: string[]
  createdAt: Date
  updatedAt: Date
} 