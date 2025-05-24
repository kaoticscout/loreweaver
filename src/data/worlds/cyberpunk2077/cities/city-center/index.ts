import { City } from '../../../../../types/city'

export const cityCenter: City = {
  id: 'city-center',
  name: 'City Center',
  description: 'The heart of Night City\'s corporate world, City Center is a testament to corporate excess and power. Massive skyscrapers pierce the clouds, while corporate security maintains an iron grip on the streets below. This is where the elite of Night City conduct their business and wage their corporate wars.',
  coordinates: [0, 0],
  images: ['/art/environments/cyberpunk/2 - hxox7ZS.jpg'],
  banner: '/art/environments/cyberpunk/14 - mik2s6P.jpg',
  basicInformation: {
    population: '250,000',
    primaryRaces: ['Corporate', 'Wealthy Citizens', 'Security Forces'],
    deities: ['Arasaka Corporation', 'Militech', 'Corporate Power']
  },
  history: {
    founding: 'Established during Night City\'s initial corporate boom',
    majorEvents: [
      'Construction of Arasaka Tower',
      'The Corporate Wars',
      'The Night City Holocaust',
      'Rebuilding of the Center'
    ],
    currentEra: 'Corporate Renaissance'
  },
  notableFeatures: [
    'Arasaka Tower',
    'Corporate Plaza',
    'Luxury Shopping Districts',
    'High-Security Zones',
    'Executive Residential Complexes'
  ],
  keyFigures: [
    {
      id: 'yorinobu-arasaka',
      name: 'Yorinobu Arasaka',
      title: 'Arasaka Heir',
      era: 'Current',
      significance: 'The rebellious son of Saburo Arasaka, now a key player in corporate politics',
      image: '/art/npcs/yorinobu.jpg',
      avatarStyle: 'corporate'
    },
    {
      id: 'hanako-arasaka',
      name: 'Hanako Arasaka',
      title: 'Arasaka Executive',
      era: 'Current',
      significance: 'The public face of Arasaka Corporation, known for her grace and ruthless efficiency',
      image: '/art/npcs/hanako.jpg',
      avatarStyle: 'corporate'
    }
  ],
  economy: {
    primaryIndustry: 'Corporate Services',
    gdp: '500 billion eurodollars annually',
    currency: 'Eurodollar (€$)',
    tradeGoods: [
      'Corporate Services - High-end consulting and business solutions',
      'Luxury Goods - Premium products for corporate elite',
      'Security Services - Top-tier corporate security'
    ],
    tradePartners: [
      'Arasaka Corporation',
      'Militech',
      'Global Corporate Network'
    ],
    transportationRoutes: [
      'Corporate AV Routes',
      'Executive Transit System',
      'Secure Underground Network'
    ],
    economicPolicies: [
      'Corporate sovereignty',
      'Private security enforcement',
      'Exclusive access zones'
    ],
    marketRegulations: [
      'Corporate self-regulation',
      'High-end market focus',
      'Strict access control'
    ]
  },
  seasons: [
    {
      name: 'Business Quarter 1',
      description: 'Peak corporate activity period',
      activities: ['Corporate Dealings', 'Market Trading'],
      hazards: ['Corporate Espionage', 'Security Crackdowns'],
      magicalEffects: ['Enhanced Security', 'Data Protection']
    }
  ],
  magicalItems: [
    {
      id: 'corporate-access',
      name: 'Corporate Access Token',
      type: 'Technology',
      description: 'High-level corporate access device',
      rarity: 'Legendary',
      location: 'Arasaka Tower',
      history: 'Created for executive-level access',
      effects: ['Maximum Security Access', 'Data Protection'],
      requirements: ['Corporate Clearance'],
      value: '100,000 €$',
      image: '/art/items/corporate-access.jpg'
    }
  ],
  dungeons: [
    {
      id: 'arasaka-labs',
      name: 'Arasaka Research Labs',
      images: ['/art/environments/cyberpunk/1 - 8a4jrOU.jpg'],
      description: 'High-security research facility beneath Arasaka Tower.',
      challengeRating: 5,
      location: {
        region: 'City Center',
        environment: 'Underground Facility'
      },
      encounters: ['Security Patrol', 'Netrunner Defense', 'Prototype Guardian'],
      treasure: {
        gold: 50000,
        gems: [
          { type: 'Data Shard', value: 10000 },
          { type: 'Prototype Chip', value: 15000 }
        ],
        art: [
          { type: 'Corporate Art', value: 5000 },
          { type: 'Tech Sculpture', value: 7000 }
        ],
        magicItems: [
          { name: 'Prototype Implant', rarity: 'Legendary' },
          { name: 'Security Bypass Module', rarity: 'Very Rare' }
        ]
      },
      level: 'High',
      difficulty: 'Extreme',
      inhabitants: ['Corporate Security', 'Research Staff', 'Security Drones'],
      treasures: ['Prototype Technology', 'Corporate Data', 'Advanced Cyberware'],
      hazards: ['Security Systems', 'Automated Defenses', 'Biohazards'],
      history: 'Top-secret research facility where Arasaka develops its most advanced technology'
    }
  ],
  pointsOfInterest: [
    {
      id: 'arasaka-lobby',
      name: 'Arasaka Tower Lobby',
      description: 'The imposing entrance to the most powerful corporation in Night City',
      type: 'Corporate',
      significance: 'Center of corporate power',
      notableFeatures: ['Security Checkpoints', 'Corporate Art', 'Reception Area'],
      associatedFigures: ['Security Chief', 'Corporate Executives', 'Reception Staff']
    }
  ],
  restAreas: [
    {
      id: 'executive-lounge',
      name: 'Executive Lounge',
      description: 'Ultra-luxury corporate relaxation space',
      type: 'Corporate Facility',
      quality: 'Ultra Premium',
      price: 'Corporate Members Only',
      amenities: ['Private Suites', 'Gourmet Dining', 'Security Detail', 'Business Services']
    }
  ],
  shops: [
    {
      id: 'corporate-boutique',
      name: 'Elite Augmentations',
      type: 'Cyberware Shop',
      description: 'High-end cyberware and corporate modifications',
      owner: 'Dr. Sarah Chen',
      inventory: [
        {
          id: 'neural-link',
          name: 'Executive Neural Link',
          description: 'Top-of-the-line corporate neural interface',
          cost: '100,000 €$',
          rarity: 'Legendary',
          type: 'Cyberware',
          quantity: 1
        },
        {
          id: 'optical-suite',
          name: 'Corporate Optical Suite',
          description: 'Advanced optical enhancements with corporate security features',
          cost: '75,000 €$',
          rarity: 'Epic',
          type: 'Cyberware',
          quantity: 2
        }
      ]
    }
  ],
  biography: 'City Center represents the pinnacle of corporate power in Night City, where megacorporations wage their silent wars and the wealthy live in artificial paradise high above the streets.'
} 