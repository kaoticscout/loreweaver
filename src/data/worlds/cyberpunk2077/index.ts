import { World } from '../../../types/world'
import { nightCity, pacifica } from './regions'

export const cyberpunk2077: World = {
  id: 'cyberpunk2077',
  name: 'Night City',
  description: 'Night City is a megalopolis obsessed with power, glamour, and body modification. Located on the west coast of the Free State of Northern California, it\'s a autonomous city-state where corporations rule and style is everything. The city is a melting pot of cultures, gangs, and corporate interests, where the line between survival and luxury is razor thin.',
  banner: '/art/banners/night-city-skyline.jpg',
  thumbnail: '/art/banners/night-city-skyline.jpg',
  regions: [
    nightCity,
    pacifica
  ],
  theme: 'Cyberpunk',
  rating: {
    averageRating: 4.9,
    totalRatings: 2500,
    upvotes: 2200,
    downvotes: 300
  },
  tags: ['Cyberpunk', 'Dystopian', 'Urban', 'High-Tech', 'Corporate'],
  createdAt: '2024-01-01T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'cdpr',
    name: 'CD Projekt Red',
    avatar: '/art/avatars/cdpr.png'
  },
  featured: true,
  popularity: 12000,
  difficulty: 'Advanced',
  recommendedLevel: '1-20',
  estimatedPlayTime: '150+ hours',
  languages: ['English', 'Japanese', 'Spanish'],
  contentWarnings: ['Violence', 'Strong Language', 'Adult Themes', 'Body Horror']
} 