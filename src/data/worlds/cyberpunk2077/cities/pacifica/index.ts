import { City } from '../../../../../types/city'

export const pacifica: City = {
  id: 'pacifica',
  name: 'Pacifica',
  description: 'Once meant to be Night City\'s crown jewel of tourism, Pacifica now stands as a monument to broken dreams and corporate abandonment. After investors pulled out during its construction, the district became a lawless zone controlled by the Voodoo Boys and other gangs. Its half-finished luxury hotels and entertainment complexes now serve as vertical slums and gang territories.',
  coordinates: [5, 5],
  images: ['/art/environments/cyberpunk/6 - GWUvFch.png'],
  banner: '/art/banners/grand-imperial-mall.jpg',
  basicInformation: {
    population: '30,000',
    primaryRaces: ['Haitian Community', 'Gang Members', 'Displaced Citizens'],
    deities: ['Alt Cunningham', 'Digital Voodoo', 'NetWatch']
  },
  history: {
    founding: 'Originally planned as Night City\'s premier tourist destination in the 2060s',
    majorEvents: [
      'The Investment Crash of 2062',
      'Corporate Abandonment',
      'Rise of the Voodoo Boys',
      'NetWatch Conflict'
    ],
    currentEra: 'Era of Digital Warfare'
  },
  notableFeatures: [
    'Grand Imperial Mall',
    'Abandoned Luxury Hotels',
    'Placide\'s Territory',
    'Voodoo Boys\' Hideout',
    'The NetWatch Zone'
  ],
  keyFigures: [
    {
      id: 'placide',
      name: 'Placide',
      title: 'Voodoo Boys Lieutenant',
      era: 'Current',
      significance: 'Brutal enforcer of the Voodoo Boys, controls much of Pacifica\'s day-to-day operations',
      image: '/art/npcs/placide.jpg',
      avatarStyle: 'gang'
    },
    {
      id: 'brigitte',
      name: 'Brigitte',
      title: 'Voodoo Boys Leader',
      era: 'Current',
      significance: 'Mysterious netrunner leader of the Voodoo Boys, seeking secrets beyond the Blackwall',
      image: '/art/npcs/brigitte.jpg',
      avatarStyle: 'netrunner'
    }
  ],
  economy: {
    primaryIndustry: 'Black Market Tech',
    gdp: '5 million eurodollars annually (unofficial)',
    currency: 'Eurodollar (€$)',
    tradeGoods: [
      'Advanced Netrunning Equipment - Black market tech and software',
      'Salvaged Technology - Scavenged from abandoned buildings',
      'Illegal Software - Custom netrunning programs'
    ],
    tradePartners: [
      'Black Market Networks',
      'Voodoo Boys Alliance',
      'Independent Tech Traders'
    ],
    transportationRoutes: [
      'Hidden Underground Pathways',
      'Abandoned Metro Lines',
      'Rooftop Routes'
    ],
    economicPolicies: [
      'Gang-controlled trade',
      'Barter system common',
      'Protection rackets',
      'Tech smuggling networks'
    ],
    marketRegulations: [
      'Gang-enforced territories',
      'Black market dominance',
      'Tech trade restrictions',
      'Informal economy'
    ]
  },
  seasons: [
    {
      name: 'Digital Storm',
      description: 'Periods of intense netrunning activity when the Voodoo Boys probe the Blackwall',
      activities: ['Netrunning', 'Tech Scavenging', 'Gang Warfare'],
      hazards: ['Rogue AIs', 'Neural Feedback', 'Gang Violence'],
      magicalEffects: ['Enhanced Netrunning', 'AI Manifestations']
    }
  ],
  magicalItems: [
    {
      name: 'Vodou Netrunning Suite',
      type: 'Cyberware',
      description: 'Advanced netrunning equipment used by the Voodoo Boys',
      rarity: 'Legendary',
      location: 'Voodoo Boys\' Hideout',
      history: 'Developed by Brigitte for elite Voodoo Boys netrunners',
      effects: ['Enhanced Netrunning', 'Blackwall Access', 'AI Communication']
    },
    {
      name: 'Placide\'s Cyberdeck',
      type: 'Technology',
      description: 'Heavily modified cyberdeck with unique Haitian protocols',
      rarity: 'Epic',
      location: 'Placide\'s Territory',
      history: 'Custom-built for Placide by Voodoo Boys technicians',
      effects: ['Territory Control', 'Gang Network Access', 'Enhanced Security Breach']
    }
  ],
  dungeons: [
    {
      id: 'grand-imperial-mall',
      name: 'Grand Imperial Mall',
      description: 'Abandoned shopping complex turned gang fortress',
      challengeRating: 7,
      location: {
        region: 'Pacifica',
        environment: 'Urban Ruins'
      },
      encounters: ['Animals Gang Patrol', 'Scavenger Ambush', 'Rogue Security System'],
      treasure: {
        gold: 15000,
        gems: [
          { type: 'Military Tech', value: 5000 },
          { type: 'Prototype Implant', value: 8000 }
        ],
        art: [
          { type: 'Corporate Art', value: 3000 },
          { type: 'Pre-Collapse Artifacts', value: 4000 }
        ],
        magicItems: [
          { name: 'Military Grade Cyberdeck', rarity: 'Rare' },
          { name: 'Experimental Combat Implant', rarity: 'Very Rare' }
        ]
      }
    }
  ],
  pointsOfInterest: [
    {
      id: 'voodoo-chapel',
      name: 'Voodoo Chapel',
      description: 'Hidden netrunning temple of the Voodoo Boys',
      type: 'Gang Facility',
      significance: 'Center of Voodoo Boys operations',
      notableFeatures: ['Netrunning Stations', 'AI Research Lab', 'Digital Shrine'],
      associatedFigures: ['Brigitte', 'Elite Netrunners', 'AI Researchers']
    }
  ],
  restAreas: [
    {
      id: 'batty-hotel',
      name: 'Batty\'s Hotel',
      description: 'Semi-functional hotel in the heart of Pacifica',
      type: 'Hotel',
      quality: 'Low',
      price: 'Cheap',
      amenities: ['Basic Rooms', 'Gang Protection', 'Black Market Access', 'Information Trading']
    }
  ],
  shops: [
    {
      id: 'netrunner-den',
      name: 'Digital Vodou',
      type: 'Netrunning Shop',
      description: 'Hidden tech shop specializing in netrunning equipment',
      owner: 'Brigitte',
      inventory: [
        {
          id: 'vodou-deck',
          name: 'Vodou Cyberdeck',
          description: 'Custom cyberdeck with Voodoo Boys modifications',
          cost: '50,000 €$',
          rarity: 'Epic',
          type: 'Cyberware',
          quantity: 1
        },
        {
          id: 'blackwall-ice',
          name: 'Blackwall ICE Program',
          description: 'Specialized program for probing the Blackwall',
          cost: '30,000 €$',
          rarity: 'Rare',
          type: 'Software',
          quantity: 3
        }
      ]
    }
  ],
  biography: 'Pacifica stands as a stark reminder of Night City\'s broken promises. What was meant to be a paradise of entertainment and luxury has become a lawless zone where the Voodoo Boys reign supreme, conducting their mysterious netrunning operations and probing the secrets of the Blackwall.'
} 