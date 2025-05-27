import { Region } from './region'

export type WorldTheme = 'Fantasy' | 'Sci-Fi' | 'Steampunk' | 'Post-Apocalyptic' | 'Historical' | 'Horror' | 'Mystery'

export interface WorldRating {
  rating: number
  votes: number
}

export interface SeasonalEffect {
  name: string;
  description: string;
  activities: string[];
  hazards: string[];
}

export interface RegionSeasonalEffect {
  season: string;
  description: string;
  activities?: string[];
  hazards?: string[];
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
  history?: string;
  notableLocations?: string[];
  threats?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface World {
  id: string
  name: string
  description: string
  banner: string
  thumbnail: string
  regions: Region[]
  theme: WorldTheme
  rating: WorldRating
  tags: string[]
  createdAt: string
  lastUpdated: string
  creator: {
    id: string
    name: string
    avatar: string
  }
  featured: boolean
  popularity: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  recommendedLevel: string
  estimatedPlayTime: string
  languages: string[]
  contentWarnings?: string[]
} 