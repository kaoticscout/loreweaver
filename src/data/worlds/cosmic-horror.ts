import { World } from '../../types/world'
import { neverwinterWood, luskanRegion } from '../worlds/sword-coast/regions'

export const cosmicHorror: World = {
  id: 'cosmic-horror',
  name: 'The Void Between Stars',
  description: 'A world where the boundaries between reality and nightmare blur. Investigate strange occurrences, uncover ancient cosmic horrors, and try to maintain your sanity as you discover the terrifying truth about the universe. Every revelation brings you closer to madness.',
  banner: '/art/banners/void.jpg',
  thumbnail: '/art/banners/void.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Horror',
  rating: {
    averageRating: 4.9,
    totalRatings: 1900,
    upvotes: 2300,
    downvotes: 400
  },
  tags: ['Horror', 'Cosmic', 'Mystery', 'Psychological', 'Investigation'],
  createdAt: '2023-11-15T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'eldritch-games',
    name: 'Eldritch Games',
    avatar: '/art/avatars/eldritch-games.png'
  },
  featured: true,
  popularity: 8800,
  difficulty: 'Advanced',
  recommendedLevel: '1-20',
  estimatedPlayTime: '150+ hours',
  languages: ['English', 'Japanese', 'German'],
  contentWarnings: ['Psychological Horror', 'Disturbing Content', 'Mature Themes', 'Violence']
} 