import { World } from '../../types/world'
import { neverwinterWood, luskanRegion } from '../worlds/sword-coast/regions'

export const eberron: World = {
  id: 'eberron',
  name: 'Eberron',
  description: 'A world of magic and technology, where the Last War has ended but its scars remain. A world of intrigue and adventure, where ancient mysteries and modern innovations collide.',
  banner: '/art/banners/elven-ruins.jpg',
  thumbnail: '/art/banners/elven-ruins.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Fantasy',
  rating: {
    averageRating: 4.7,
    totalRatings: 980,
    upvotes: 1200,
    downvotes: 220
  },
  tags: ['D&D', 'Eberron', 'Steampunk', 'Magic', 'War'],
  createdAt: '2023-06-01T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'wotc',
    name: 'Wizards of the Coast',
    avatar: '/art/avatars/wotc.png'
  },
  featured: true,
  popularity: 8500,
  difficulty: 'Advanced',
  recommendedLevel: '1-20',
  estimatedPlayTime: '150+ hours',
  languages: ['English'],
  contentWarnings: ['Violence', 'Magic', 'War Themes']
} 