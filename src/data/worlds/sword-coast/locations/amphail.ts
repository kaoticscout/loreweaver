import { Village } from '../../../../types/location'

export const amphail: Village = {
  id: 'amphail',
  name: 'Amphail',
  description: 'A small village known for its horse breeding and training. The village is famous for its skilled horse trainers and the quality of its steeds.',
  type: 'Village',
  coordinates: {
    x: 2895.4980631713966,
    y: 621.5354974013584
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  population: 800,
  primaryRaces: ['Humans', 'Halflings'],
  notableFeatures: [
    'The Horse Market',
    'The Training Grounds',
    'The Village Square',
    'The Stables',
    'The Blacksmith'
  ],
  services: [
    'Horse Trading',
    'Horse Training',
    'Basic Supplies',
    'Inn and Tavern',
    'Blacksmith Services'
  ],
  localGovernment: 'The Village Council'
} 