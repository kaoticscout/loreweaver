import { Location } from '../../../../types/location'

export const afterlifebar: Location = {
  id: 'afterlife-bar',
  name: 'Afterlife',
  description: 'The legendary mercenary bar of Night City, run by the equally legendary Rogue. Once a morgue, now the most important networking spot for high-end mercenaries and fixers.',
  type: 'Point of Interest',
  images: ['/art/environments/cyberpunk/15 - ECLJake.jpg'],
  region: 'Watson',
  notableFeatures: [
    'Former morgue converted into a bar',
    'VIP area for elite mercenaries',
    'Wall of fallen legends',
    'High-end clientele',
    'Secure meeting rooms'
  ],
  notableNPCs: [
    {
      name: 'Rogue Amendiares',
      title: 'Owner of Afterlife, Queen of Fixers',
      description: 'Legendary solo turned fixer who runs Night City\'s premier mercenary bar',
      image: '/art/environments/cyberpunk/1 - 8a4jrOU.jpg'
    },
    {
      name: 'Claire Russell',
      title: 'Bartender',
      description: 'Skilled bartender and underground racing enthusiast',
      image: '/art/npcs/claire.jpg'
    }
  ],
  services: [
    'Premium drinks and synthetic alcohol',
    'Fixer services and contract negotiation',
    'Information trading and street intel'
  ],
  dangers: [
    'Gang surveillance',
    'Corporate spies',
    'Potential violence from drunk mercenaries',
    'Information leaks'
  ],
  opportunities: [
    'High-paying contracts',
    'Valuable connections',
    'Access to black market goods',
    'Street reputation building'
  ],
  image: '/art/environments/cyberpunk/1 - 8a4jrOU.jpg',
  mapPosition: {
    x: 1250,
    y: 750
  },
  security: {
    level: 'High',
    description: 'Multiple armed bouncers, advanced surveillance, and Rogue\'s personal security',
    features: [
      'Armed security personnel',
      'Advanced scanning systems',
      'Biometric access controls',
      'Emergency security protocols'
    ]
  }
} 