import { City } from '../../../../../types/city'

export const coastview: City = {
  id: 'coastview',
  name: 'Coastview',
  description: 'A failed luxury resort district in Pacifica, Coastview stands as a testament to corporate abandonment. Now controlled by the Voodoo Boys, its half-finished hotels and entertainment complexes serve as vertical slums and netrunner havens.',
  coordinates: [-1, 0],
  images: ['/art/environments/cyberpunk/28 - W5HjpWP.jpg'],
  banner: '/art/environments/cyberpunk/23 - 2NPLWsO.jpg',
  basicInformation: {
    population: '75,000',
    primaryRaces: ['Haitian Community', 'Netrunners', 'Displaced Residents'],
    deities: ['Voodoo Loa', 'Digital Spirits', 'Data Streams']
  },
  history: {
    founding: 'Originally planned as a luxury beachfront resort',
    majorEvents: [
      'Corporate Investment Withdrawal',
      'Haitian Immigration Wave',
      'Voodoo Boys Takeover',
      'NetWatch Conflict'
    ],
    currentEra: 'Post-Abandonment'
  },
  notableFeatures: [
    'Abandoned Hotels',
    'Grand Imperial Mall',
    'Netrunner Dens',
    'Refugee Camps',
    'Beachfront Ruins'
  ],
  keyFigures: [
    {
      id: 'brigitte',
      name: 'Brigitte',
      title: 'Voodoo Boys Leader',
      era: 'Current',
      significance: 'Leader of the Voodoo Boys and master netrunner',
      image: '/art/npcs/brigitte.jpg',
      avatarStyle: 'netrunner'
    },
    {
      id: 'maman-brigitte',
      name: 'Maman Brigitte',
      title: 'Spiritual Leader',
      era: 'Current',
      significance: 'Religious and community leader for the Haitian population',
      image: '/art/npcs/maman-brigitte.jpg',
      avatarStyle: 'spiritual'
    }
  ],
  economy: {
    primaryIndustry: 'Data Trade and Survival Economy',
    gdp: '25 million eurodollars annually',
    currency: 'Eurodollar (€$)',
    tradeGoods: [
      'Data Secrets - High-value information',
      'Netrunner Services - Hacking and data manipulation',
      'Survival Supplies - Basic necessities'
    ],
    tradePartners: [
      'Voodoo Boys',
      'Black Market',
      'Data Traders'
    ],
    transportationRoutes: [
      'Abandoned Metro',
      'Informal Paths',
      'Digital Networks'
    ],
    economicPolicies: [
      'Information trade',
      'Community survival',
      'Digital economy'
    ],
    marketRegulations: [
      'Voodoo Boys control',
      'Informal trading',
      'Data protection'
    ]
  },
  seasons: [
    {
      name: 'Digital Storm',
      description: 'Period of intense netrunning activity',
      activities: ['Data Raids', 'Digital Rituals'],
      hazards: ['NetWatch Raids', 'Rogue AIs'],
      magicalEffects: ['Enhanced Connectivity', 'Digital Manifestations']
    }
  ],
  magicalItems: [
    {
      id: 'voodoo-deck',
      name: 'Voodoo Boys Cyberdeck',
      type: 'Netrunning Equipment',
      description: 'Advanced cyberdeck with unique Voodoo Boys modifications',
      rarity: 'Very Rare',
      location: 'Netrunner Den',
      history: 'Created by Voodoo Boys master netrunners',
      effects: ['Enhanced Hacking', 'Ritual Connection'],
      requirements: ['Voodoo Boys Trust'],
      value: '65,000 €$',
      image: '/art/items/voodoo-deck.jpg'
    }
  ],
  dungeons: [
    {
      id: 'hotel-ruins',
      name: 'Abandoned Resort Complex',
      description: 'Half-finished luxury hotel now home to netrunners and refugees',
      challengeRating: 3,
      images: ['/art/environments/cyberpunk/1 - 8a4jrOU.jpg'],
      location: {
        region: 'Coastview',
        environment: 'Urban Ruins'
      },
      encounters: ['Voodoo Patrol', 'Rogue AI', 'Scavengers'],
      treasure: {
        gold: 15000,
        gems: [
          { type: 'Data Crystal', value: 5000 },
          { type: 'Tech Components', value: 3000 }
        ],
        art: [
          { type: 'Resort Art', value: 4000 },
          { type: 'Digital Storage', value: 6000 }
        ],
        magicItems: [
          { name: 'Netrunner Module', rarity: 'Rare' },
          { name: 'Voodoo Talisman', rarity: 'Uncommon' }
        ]
      },
      level: 'Medium',
      difficulty: 'Moderate',
      inhabitants: ['Voodoo Boys', 'Refugees', 'Rogue AIs'],
      treasures: ['Data Caches', 'Tech Salvage', 'Digital Artifacts'],
      hazards: ['Structural Collapse', 'Rogue Programs', 'Gang Territory'],
      history: 'Former luxury resort transformed into a digital fortress'
    }
  ],
  pointsOfInterest: [
    {
      id: 'netrunner-temple',
      name: 'Digital Voodoo Temple',
      description: 'Sacred space where digital and spiritual worlds merge',
      type: 'Spiritual/Digital',
      significance: 'Center of Voodoo Boys operations',
      notableFeatures: ['Server Farm', 'Ritual Space', 'Hacking Stations'],
      associatedFigures: ['Netrunner Priests', 'Digital Shamans', 'Code Warriors']
    }
  ],
  restAreas: [
    {
      id: 'haitian-cafe',
      name: 'Café Créole',
      description: 'Community gathering spot serving Haitian cuisine',
      type: 'Restaurant/Safe Haven',
      quality: 'Modest',
      price: 'Low',
      amenities: ['Traditional Food', 'Community Space', 'Information Exchange', 'Safe Rest']
    }
  ],
  shops: [
    {
      id: 'tech-bazaar',
      name: 'Digital Crossroads',
      type: 'Tech Shop',
      description: 'Underground market for netrunning equipment',
      owner: 'Marie-Claire',
      inventory: [
        {
          id: 'basic-deck',
          name: 'Street Cyberdeck',
          description: 'Entry-level netrunning equipment',
          cost: '20,000 €$',
          rarity: 'Common',
          type: 'Hardware',
          quantity: 3
        },
        {
          id: 'ice-breaker',
          name: 'ICE Breaker Software',
          description: 'Security penetration program',
          cost: '15,000 €$',
          rarity: 'Uncommon',
          type: 'Software',
          quantity: 4
        }
      ]
    }
  ],
  biography: 'Coastview represents both the failure of corporate ambition and the resilience of displaced communities. Under the Voodoo Boys\' protection, it has transformed from a failed resort into a unique fusion of Haitian culture and cutting-edge netrunning technology.'
} 