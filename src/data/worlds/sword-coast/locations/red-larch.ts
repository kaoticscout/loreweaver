import { Village } from '../../../../types/location'

export const redLarch: Village = {
  id: 'red-larch',
  name: 'Red Larch',
  description: 'A small village known for its quarrying and stoneworking. The village is famous for its distinctive red larch trees and skilled stonemasons.',
  type: 'Village',
  coordinates: {
    x: 3108.832284752284,
    y: 1617.6447907647905
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  population: 600,
  primaryRaces: ['Humans', 'Dwarves'],
  notableFeatures: [
    'The Quarry',
    'The Stoneworks',
    'The Village Square',
    'The Red Larch Trees',
    'The Old Mill'
  ],
  services: [
    'Stone Quarrying',
    'Stoneworking',
    'Basic Supplies',
    'Inn and Tavern',
    'Blacksmith'
  ],
  localGovernment: 'The Village Council'
} 