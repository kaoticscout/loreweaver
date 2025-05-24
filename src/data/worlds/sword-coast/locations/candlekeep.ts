import { Landmark } from '../../../../types/location'

export const candlekeep: Landmark = {
  id: 'candlekeep',
  name: 'Candlekeep',
  description: 'A fortress library containing the largest collection of books and scrolls in Faerûn. The keep is protected by powerful magic and dedicated scholars.',
  type: 'Landmark',
  coordinates: {
    x: 3274.3059082459076,
    y: 2986.6913859313854
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  significance: 'The greatest repository of knowledge in Faerûn',
  history: 'Founded in the Year of the Watching Cold (241 DR) by the great sage Alaundo, Candlekeep has stood as a bastion of knowledge for centuries.',
  notableFeatures: [
    'The Great Library',
    'The Avowed\'s Quarters',
    'The Outer Ward',
    'The Inner Ward',
    'The Hearth',
    'The Scriptorium'
  ],
  visitingHours: 'Dawn to Dusk, by appointment only'
} 