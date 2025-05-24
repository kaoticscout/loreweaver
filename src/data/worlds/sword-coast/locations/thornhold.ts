import { Stronghold } from '../../../../types/location'

export const thornhold: Stronghold = {
  id: 'thornhold',
  name: 'Thornhold',
  description: 'Thornhold, also known as Stoneshaft Hold among its dwarven residents, was a fortress located off the southern edge of the Mere of Dead Men.',
  type: 'Stronghold',
  coordinates: {
    x: 2690.8061691848948,
    y: 1230.171437778967
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  owner: 'The Stoneshaft Clan',
  garrison: 500,
  defenses: [
    'Stone Walls',
    'Dwarven Traps',
    'Guard Towers',
    'Underground Tunnels',
    'Magical Wards'
  ],
  notableFeatures: [
    'The Great Hall',
    'The Forge',
    'The Armory',
    'The Treasury',
    'The Living Quarters'
  ],
  access: 'By invitation or official business only'
} 