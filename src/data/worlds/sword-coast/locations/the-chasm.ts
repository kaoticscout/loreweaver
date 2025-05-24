import { Landmark } from '../../../../types/location'

export const theChasm: Landmark = {
  id: 'the-chasm',
  name: 'The Chasm',
  description: 'A massive rift in the earth that has become a natural landmark. The chasm is known for its mysterious depths and the strange magical phenomena that occur within it.',
  type: 'Landmark',
  coordinates: {
    x: 2545.2,
    y: 755.1
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  significance: 'Natural wonder and magical anomaly',
  history: 'The chasm was formed by a powerful magical event centuries ago, and has since become a site of both wonder and danger.',
  notableFeatures: [
    'The Rift',
    'The Magical Anomalies',
    'The Hidden Passages',
    'The Ancient Ruins',
    'The Monster Lairs'
  ],
  visitingHours: 'Dawn to Dusk'
} 