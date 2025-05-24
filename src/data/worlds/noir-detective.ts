import { World } from '../../types/world'
import { neverwinterWood, luskanRegion } from '../worlds/sword-coast/regions'

export const noirDetective: World = {
  id: 'noir-detective',
  name: 'Rain City',
  description: 'A gritty metropolis where crime and corruption run rampant. As a private detective, navigate the seedy underbelly of the city, solve complex cases, and try to stay alive while uncovering the truth. Every shadow hides a secret, and every ally might be an enemy.',
  banner: '/art/banners/RainCity.jpg',
  thumbnail: '/art/banners/RainCity.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Mystery',
  rating: {
    averageRating: 4.7,
    totalRatings: 1700,
    upvotes: 2000,
    downvotes: 300
  },
  tags: ['Noir', 'Detective', 'Crime', 'Mystery', 'Drama'],
  createdAt: '2024-01-10T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'noir-studio',
    name: 'Noir Studio',
    avatar: '/art/avatars/noir-studio.png'
  },
  featured: true,
  popularity: 8200,
  difficulty: 'Intermediate',
  recommendedLevel: '1-15',
  estimatedPlayTime: '130+ hours',
  languages: ['English', 'French', 'Italian'],
  contentWarnings: ['Violence', 'Crime', 'Mature Themes', 'Strong Language']
} 