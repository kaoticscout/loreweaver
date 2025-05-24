import { Landmark } from '../../../../types/location'

export const swordMountains: Landmark = {
  id: 'sword-mountains',
  name: 'The Sword Mountains',
  description: 'A majestic mountain range that serves as a natural barrier between the Sword Coast and the interior of the North. The mountains are rich in minerals and home to various creatures.',
  type: 'Landmark',
  coordinates: {
    x: 2948.5777453548553,
    y: 1128.2401441286966
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  significance: 'Natural barrier and resource-rich region',
  history: 'The mountains have been a source of wealth and danger for centuries, with many mining operations and monster lairs dotting their slopes.',
  notableFeatures: [
    'The High Peaks',
    'The Mining Tunnels',
    'The Mountain Passes',
    'The Ancient Ruins',
    'The Monster Lairs'
  ],
  visitingHours: 'Dawn to Dusk'
} 