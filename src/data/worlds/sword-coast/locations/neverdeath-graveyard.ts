import { Landmark } from '../../../../types/location'

export const neverdeathGraveyard: Landmark = {
  id: 'neverdeath-graveyard',
  name: 'Neverdeath Graveyard',
  description: 'A vast and ancient graveyard that serves as the final resting place for many of the city\'s citizens. The graveyard is known for its beautiful monuments and peaceful atmosphere.',
  type: 'Landmark',
  coordinates: {
    x: 2528.0,
    y: 770.0
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  significance: 'Historic burial ground and memorial site',
  history: 'The graveyard has been in use for centuries, and contains the remains of many notable figures from the city\'s history.',
  notableFeatures: [
    'The Ancient Tombs',
    'The Mausoleum',
    'The Memorial Gardens',
    'The Crypts',
    'The Spirit Shrines'
  ],
  visitingHours: 'Dawn to Dusk'
} 