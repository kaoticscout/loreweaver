import { World } from '../../types/world'
import { neverwinterWood, luskanRegion } from '../worlds/sword-coast/regions'

export const spaceColony: World = {
  id: 'space-colony',
  name: 'New Eden Colony',
  description: 'A thriving space colony on a distant planet, where humanity struggles to build a new home among the stars. Manage resources, explore alien ruins, and navigate the complex politics of colony life. The future of humanity depends on your decisions.',
  banner: '/art/banners/newEden.jpg',
  thumbnail: '/art/banners/newEden.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Sci-Fi',
  rating: {
    averageRating: 4.8,
    totalRatings: 2000,
    upvotes: 2400,
    downvotes: 400
  },
  tags: ['Sci-Fi', 'Space', 'Colony', 'Exploration', 'Survival'],
  createdAt: '2024-02-01T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'space-games',
    name: 'Space Games Studio',
    avatar: '/art/avatars/space-games.png'
  },
  featured: true,
  popularity: 9000,
  difficulty: 'Advanced',
  recommendedLevel: '1-20',
  estimatedPlayTime: '160+ hours',
  languages: ['English', 'Russian', 'Chinese', 'Japanese'],
  contentWarnings: ['Violence', 'Space Hazards', 'Mature Themes']
} 