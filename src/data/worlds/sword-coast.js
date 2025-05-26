import { neverwinterWood, luskanRegion } from './sword-coast/regions/index.js'

export const swordCoast = {
  id: 'sword-coast',
  name: 'Sword Coast',
  description: 'The Sword Coast is a vast region of Faerûn, stretching along the western coast of the continent. It is known for its diverse landscapes, from the rugged Neverwinter Wood to the bustling port city of Luskan. The region is rich in history, magic, and adventure, with countless stories waiting to be discovered.',
  banner: '/art/banners/dragon-lair.jpg',
  thumbnail: '/art/banners/dragon-lair.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Fantasy',
  rating: {
    averageRating: 4.8,
    totalRatings: 1250,
    upvotes: 1500,
    downvotes: 250
  },
  tags: ['D&D', 'Forgotten Realms', 'Coastal', 'Medieval', 'Magic'],
  createdAt: '2023-01-01T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'wotc',
    name: 'Wizards of the Coast',
    avatar: '/art/avatars/wotc.png'
  },
  featured: true,
  popularity: 9500,
  difficulty: 'Intermediate',
  recommendedLevel: '1-15',
  estimatedPlayTime: '100+ hours',
  languages: ['English'],
  contentWarnings: ['Violence', 'Magic', 'Fantasy Creatures']
}; 