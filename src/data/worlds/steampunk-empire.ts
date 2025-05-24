import { World } from '../../types/world'
import { neverwinterWood, luskanRegion } from '../worlds/sword-coast/regions'

export const steampunkEmpire: World = {
  id: 'steampunk-empire',
  name: 'The Clockwork Empire',
  description: 'A world where steam power and clockwork mechanisms have revolutionized society. Navigate the floating cities, pilot airships, and uncover the secrets of the mysterious Clockwork Council. In this world of brass and steam, innovation and intrigue go hand in hand.',
  banner: '/art/banners/ClockworkEmpire.jpg',
  thumbnail: '/art/banners/ClockworkEmpire.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Steampunk',
  rating: {
    averageRating: 4.7,
    totalRatings: 1800,
    upvotes: 2200,
    downvotes: 400
  },
  tags: ['Steampunk', 'Technology', 'Adventure', 'Mystery', 'Politics'],
  createdAt: '2024-02-15T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'steampunk-studio',
    name: 'Steampunk Studio',
    avatar: '/art/avatars/steampunk-studio.png'
  },
  featured: true,
  popularity: 8500,
  difficulty: 'Intermediate',
  recommendedLevel: '1-15',
  estimatedPlayTime: '140+ hours',
  languages: ['English', 'German', 'French'],
  contentWarnings: ['Violence', 'Industrial Hazards', 'Political Intrigue']
} 