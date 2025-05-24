import { World } from '../../types/world'
import { neverwinterWood, luskanRegion } from '../worlds/sword-coast/regions'

export const postApocalyptic: World = {
  id: 'post-apocalyptic',
  name: 'The Wasteland',
  description: 'A world ravaged by nuclear war, where survival is a daily struggle. Scavenge through the ruins of civilization, fight mutated creatures, and navigate the complex politics of the remaining human settlements. In this harsh environment, every decision could mean the difference between life and death.',
  banner: '/art/banners/Wasteland.jpg',
  thumbnail: '/art/banners/Wasteland.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Post-Apocalyptic',
  rating: {
    averageRating: 4.8,
    totalRatings: 2100,
    upvotes: 2600,
    downvotes: 500
  },
  tags: ['Post-Apocalyptic', 'Survival', 'Nuclear', 'Mutants', 'Scavenging'],
  createdAt: '2023-07-10T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'wasteland-studio',
    name: 'Wasteland Studio',
    avatar: '/art/avatars/wasteland-studio.png'
  },
  featured: false,
  popularity: 9500,
  difficulty: 'Advanced',
  recommendedLevel: '1-20',
  estimatedPlayTime: '180+ hours',
  languages: ['English', 'Russian', 'Chinese'],
  contentWarnings: ['Violence', 'Radiation', 'Mature Themes', 'Disturbing Content']
} 