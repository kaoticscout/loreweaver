import { City } from './city'
import { Location } from './location'

export interface RegionSeasonalEffect {
  season: string
  description: string
  economicImpact: string
  tradeModifiers: {
    exports: Record<string, number>
    imports: Record<string, number>
  }
  specialEvents: string[]
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

export interface Region {
  id: string
  name: string
  description: string
  biography: string
  color: string
  banner: string
  images?: string[]
  notableFeatures: string[]
  history: {
    founding: string
    majorEvents: string[]
    currentEra: string
  }
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
  seasons: RegionSeasonalEffect[]
  magicalItems: RegionMagicalItem[]
  cities: City[]
  locations: Location[]
} 