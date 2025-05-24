import { Village } from '../../../../types/location'

export const longsaddle: Village = {
  id: 'longsaddle',
  name: 'Longsaddle',
  description: 'A small village known for its magical heritage and the famous Harpell family of wizards. The village is home to the Longsaddle Academy of Magic.',
  type: 'Village',
  coordinates: {
    x: 2777.94195978492,
    y: 306.69168358598824
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  population: 1200,
  primaryRaces: ['Humans', 'Gnomes', 'Elves'],
  notableFeatures: [
    'The Longsaddle Academy',
    'The Harpell Estate',
    'The Village Square',
    'The Magic Shops',
    'The Wizard\'s Tower'
  ],
  services: [
    'Magic Training',
    'Basic Supplies',
    'Inn and Tavern',
    'Magic Item Trading',
    'Research Facilities'
  ],
  localGovernment: 'The Harpell Family Council'
} 