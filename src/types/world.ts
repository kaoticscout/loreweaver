import { Region } from './region'

export type WorldTheme = 'Fantasy' | 'Sci-Fi' | 'Steampunk' | 'Post-Apocalyptic' | 'Historical' | 'Horror' | 'Mystery'

export interface WorldRating {
  averageRating: number
  totalRatings: number
  upvotes: number
  downvotes: number
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