import { LargeCity } from '../../../../types/location'

export const waterdeep: LargeCity = {
  id: 'waterdeep',
  name: 'Waterdeep',
  description: 'The City of Splendors, a bustling metropolis and one of the greatest cities in Faerûn. Located on the Sword Coast, it is the most influential city in the North.',
  type: 'Large City',
  coordinates: {
    x: 2897.5732477017764,
    y: 1475.4918944870906
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  population: 1320000,
  primaryRaces: ['Humans', 'Dwarves', 'Elves', 'Halflings', 'Gnomes'],
  notableFeatures: [
    'The Yawning Portal Inn',
    'Castle Waterdeep',
    'The City of the Dead',
    'The Market',
    'The Dock Ward',
    'The Sea Ward',
    'The Castle Ward',
    'The Trades Ward',
    'The North Ward',
    'The Southern Ward'
  ],
  services: [
    'Merchant Guilds',
    'Magic Shops',
    'Temples',
    'Inns and Taverns',
    'Blacksmiths',
    'Alchemists',
    'Banks',
    'Theaters',
    'Schools of Magic',
    'Mercenary Companies'
  ],
  localGovernment: 'The Lords of Waterdeep (Masked Lords) and the Open Lord'
} 