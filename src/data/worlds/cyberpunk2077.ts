import { World } from '../../types/world'
import { neverwinterWood, luskanRegion } from '../worlds/sword-coast/regions'

export const cyberpunk2077: World = {
  id: 'cyberpunk2077',
  name: 'Night City 2077',
  description: 'A neon-lit metropolis where corporate power and street-level crime collide. In this dystopian future, technology has transformed humanity, but at what cost? Navigate the dangerous streets, hack into corporate networks, and make your mark in a world where the line between human and machine is blurred.',
  banner: '/art/banners/NightCity2077.jpg',
  thumbnail: '/art/banners/NightCity2077.jpg',
  regions: [
    neverwinterWood,
    luskanRegion
  ],
  theme: 'Sci-Fi',
  rating: {
    averageRating: 4.9,
    totalRatings: 2500,
    upvotes: 3000,
    downvotes: 500
  },
  tags: ['Cyberpunk', 'Futuristic', 'Technology', 'Corporate', 'Crime'],
  createdAt: '2023-03-15T00:00:00Z',
  lastUpdated: '2024-03-15T00:00:00Z',
  creator: {
    id: 'cdpr',
    name: 'CD Projekt Red',
    avatar: '/art/avatars/cdpr.png'
  },
  featured: false,
  popularity: 12000,
  difficulty: 'Advanced',
  recommendedLevel: '1-20',
  estimatedPlayTime: '200+ hours',
  languages: ['English', 'Polish', 'German', 'French', 'Spanish'],
  contentWarnings: ['Violence', 'Drug Use', 'Sexual Content', 'Strong Language']
} 