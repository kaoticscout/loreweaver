import { Village } from '../../../../types/location'

export const daggerford: Village = {
  id: 'daggerford',
  name: 'Daggerford',
  description: 'A small but important village located at the crossing of the Delimbiyr River. The village serves as a key trading post and river crossing point.',
  type: 'Village',
  coordinates: {
    x: 2903.5074330607654,
    y: 1316.5903992303986
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  population: 1000,
  primaryRaces: ['Humans', 'Dwarves', 'Halflings'],
  notableFeatures: [
    'The River Crossing',
    'The Market Square',
    'The Docks',
    'The Old Fort',
    'The Trade Road'
  ],
  services: [
    'River Crossing',
    'Basic Supplies',
    'Inn and Tavern',
    'Blacksmith',
    'Trading Post'
  ],
  localGovernment: 'The Duke of Daggerford'
} 