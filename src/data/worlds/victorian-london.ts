import { World } from '../../types/world'
import { neverwinterWood, luskanRegion } from '../worlds/sword-coast/regions'

export const victorianLondon: World = {
  id: 'victorian-london',
  name: 'Victorian London',
  description: 'Step into the foggy streets of 19th century London, where gas lamps cast long shadows and mysteries lurk around every corner. Navigate the complex social hierarchy, solve crimes with the latest forensic techniques, and uncover the secrets of a city caught between tradition and progress.',
  banner: '/art/banners/victorianLondon.jpg',
  thumbnail: '/art/banners/victorianLondon.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Historical',
  rating: {
    averageRating: 4.7,
    totalRatings: 1800,
    upvotes: 2200,
    downvotes: 400
  },
  tags: ['Historical', 'Mystery', 'Victorian', 'Industrial', 'Crime'],
  createdAt: '2023-05-20T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'historical-games',
    name: 'Historical Games Studio',
    avatar: '/art/avatars/historical-games.png'
  },
  featured: false,
  popularity: 8500,
  difficulty: 'Intermediate',
  recommendedLevel: '1-15',
  estimatedPlayTime: '120+ hours',
  languages: ['English', 'French', 'German'],
  contentWarnings: ['Violence', 'Classism', 'Historical Themes']
} 