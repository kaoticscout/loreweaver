import { Shop } from '../../../../types/location'

export const emeraldEnclaveShop: Shop = {
  id: 'emerald-enclave-shop',
  name: "Emerald Enclave's Herbal Emporium",
  description: 'A mystical shop nestled deep within the Neverwinter Woods, run by a circle of druids from the Emerald Enclave. The shop appears to be a living tree, its branches forming natural shelves and its trunk housing the main store. The air is thick with the scent of rare herbs and magical plants.',
  type: 'Shop',
  coordinates: {
    x: 2537.5878518203194,
    y: 761.738631228458
  },
  images: [
    '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png',
    '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/sword-coast/1920x1080-terrain-wa.png'
  ],
  owner: 'Druid Elder Thistlewhisper',
  specialties: [
    'Rare Herbs and Plants',
    'Magical Components',
    'Natural Remedies',
    'Druidic Artifacts'
  ],
  inventory: [
    'Moonleaf (rare herb that glows in moonlight)',
    'Dragon\'s Breath Pepper (extremely spicy magical pepper)',
    'Starflower Seeds (grows only under starlight)',
    'Ancient Oak Saplings',
    'Feywild Mushrooms',
    'Healing Potions',
    'Nature\'s Bounty Elixirs',
    'Druidic Focus Items'
  ],
  services: [
    'Herbal Consultations',
    'Magical Plant Cultivation',
    'Druidic Training',
    'Nature Magic Lessons',
    'Plant Identification',
    'Custom Potion Brewing'
  ],
  hours: 'Open from dawn to dusk, closed during new moons',
  additionalInfo: {
    history: 'Founded over 200 years ago by the first druids of the Emerald Enclave who settled in Neverwinter Woods. The shop has been passed down through generations of druids, each adding their own knowledge and magical discoveries.',
    notableFeatures: [
      'Living Tree Architecture',
      'Magical Greenhouse',
      'Feywild Portal (occasionally opens)',
      'Ancient Druidic Circle',
      'Herb Garden with Rare Plants'
    ],
    specialEvents: [
      'Monthly Moonlight Gatherings',
      'Seasonal Plant Sales',
      'Druidic Festivals',
      'Magical Plant Auctions'
    ],
    restrictions: [
      'No metal tools allowed in the shop',
      'Must be respectful of all plants',
      'No harmful magic',
      'No hunting or harming forest creatures'
    ],
    prices: {
      common: 'Reasonable',
      rare: 'Expensive',
      legendary: 'Very Expensive'
    },
    payment: {
      accepted: ['Gold', 'Trade', 'Services', 'Magical Items'],
      preferred: 'Trade of rare plants or magical knowledge'
    }
  }
} 