import { City } from '../../../../types/location'

export const mirabar: City = {
  id: 'mirabar',
  name: 'Mirabar',
  description: 'A mining city known for its skilled metalworkers and gem cutters. The city is built into the side of the mountain and is famous for its dwarven craftsmanship.',
  type: 'City',
  coordinates: {
    x: 2777.94195978492,
    y: 306.69168358598824
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  population: 15000,
  primaryRaces: ['Dwarves', 'Humans', 'Gnomes'],
  notableFeatures: [
    'The Mirabarran Mines',
    'The Forge District',
    'The Gem Quarter',
    'The Dwarven Halls',
    'The Surface City'
  ],
  services: [
    'Mining Operations',
    'Metalworking',
    'Gem Cutting',
    'Trade Caravans',
    'Mercenary Companies',
    'Inns and Taverns'
  ],
  localGovernment: 'The Council of Sparkling Stones'
} 