import { LargeCity } from '../../../../types/location'

export const baldursGate: LargeCity = {
  id: 'baldurs-gate',
  name: 'Baldur\'s Gate',
  description: 'Baldur\'s Gate, the Halfway to Everywhere, the City of Blood, also simply called the Gate, was one of the largest metropolises and city-states on the Sword Coast.',
  type: 'Large City',
  coordinates: {
    x: 3378.7565279194578,
    y: 2668.9526777877954
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  population: 125000,
  primaryRaces: ['Humans', 'Dwarves', 'Elves', 'Halflings', 'Gnomes', 'Tieflings'],
  notableFeatures: [
    'The Upper City',
    'The Lower City',
    'The Outer City',
    'The Docks',
    'The Market',
    'The Flaming Fist Headquarters'
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
  localGovernment: 'The Council of Four'
} 