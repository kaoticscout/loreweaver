import { City } from '../../../../types/location'

export const goldenFields: City = {
  id: 'golden-fields',
  name: 'The Golden Fields',
  description: 'Goldenfields, nicknamed the Granary of the North, was a walled abbey to Chauntea of spectacular scope and size. It was the most prolific provider of crops, grains and fruits to the people of the North.',
  type: 'City',
  coordinates: {
    x: 3010.726541321614,
    y: 1328.3081859394963
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  population: 5000,
  primaryRaces: ['Humans', 'Halflings', 'Dwarves'],
  notableFeatures: [
    'The Great Granary',
    'The Temple of Chauntea',
    'The Farmlands',
    'The Market Square',
    'The Living Quarters'
  ],
  services: [
    'Agricultural Supplies',
    'Food Storage',
    'Religious Services',
    'Inn and Tavern',
    'Basic Supplies'
  ],
  localGovernment: 'The High Harvestmaster'
} 