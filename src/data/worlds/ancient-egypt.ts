import { World } from '../../types/world'
import { neverwinterWood, luskanRegion } from '../worlds/sword-coast/regions'

export const ancientEgypt: World = {
  id: 'ancient-egypt',
  name: 'Land of the Pharaohs',
  description: 'Journey to the banks of the Nile, where the ancient Egyptian civilization thrives. Explore magnificent pyramids, decipher hieroglyphs, and navigate the complex politics of the pharaoh\'s court. Uncover the mysteries of the gods and the secrets of the afterlife in this rich historical setting.',
  banner: '/art/banners/Pharaohs.jpg',
  thumbnail: '/art/banners/Pharaohs.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Historical',
  rating: {
    averageRating: 4.6,
    totalRatings: 1600,
    upvotes: 1900,
    downvotes: 300
  },
  tags: ['Historical', 'Ancient', 'Egypt', 'Mystery', 'Adventure'],
  createdAt: '2023-09-05T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'ancient-worlds',
    name: 'Ancient Worlds Studio',
    avatar: '/art/avatars/ancient-worlds.png'
  },
  featured: false,
  popularity: 7800,
  difficulty: 'Intermediate',
  recommendedLevel: '1-15',
  estimatedPlayTime: '100+ hours',
  languages: ['English', 'Arabic', 'French'],
  contentWarnings: ['Historical Violence', 'Religious Themes']
} 