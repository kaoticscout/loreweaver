import { Ruins } from '../../../../types/location'

export const testRuins: Ruins = {
  id: 'test-ruins',
  name: 'Ruins of the Netherese',
  description: 'The ruins of an ancient Netherese outpost, partially reclaimed by the forest. The stone structures show signs of advanced magical architecture, with floating platforms and arcane sigils still faintly glowing in the moonlight.',
  type: 'Ruins',
  coordinates: {
    x: 2537.5878518203194,
    y: 761.738631228458
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  age: 'Over 2000 years old',
  originalPurpose: 'A research outpost for studying the Weave and planar magic',
  currentState: 'Partially collapsed, with several structures still intact. The central tower remains standing but is heavily damaged. The surrounding buildings are mostly rubble, with some walls and foundations still visible.',
  dangers: [
    'Unstable magical wards',
    'Wild magic zones',
    'Hostile fey creatures',
    'Ancient constructs still active',
    'Poisonous plants and fungi'
  ],
  treasures: [
    'Netherese magical artifacts',
    'Ancient spell scrolls',
    'Arcane research notes',
    'Magical components',
    'Planar crystals'
  ]
} 