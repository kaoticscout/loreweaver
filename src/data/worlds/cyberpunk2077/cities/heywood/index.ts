import { City } from '../../../../../types/city'

export const heywood: City = {
  id: 'heywood',
  name: 'Heywood District',
  description: 'A sprawling residential area with strong Latino influences, Heywood is home to both working-class families and dangerous gangs. The Valentinos rule these streets, where Catholic imagery mixes with street culture and old traditions blend with modern violence.',
  coordinates: [0, 1],
  images: ['/art/environments/cyberpunk/21 - brZKW0c.jpg'],
  banner: '/art/environments/cyberpunk/1 - 8a4jrOU.jpg',
  basicInformation: {
    population: '350,000',
    primaryRaces: ['Latino Community', 'Working Class', 'Gang Members'],
    deities: ['Santa Muerte', 'Catholic Faith', 'Street Culture']
  },
  history: {
    founding: 'Established as a working-class neighborhood',
    majorEvents: [
      'Rise of the Valentinos',
      'Glen Development Project',
      'Church Renovation Movement',
      'Street Wars of 2071'
    ],
    currentEra: 'Valentinos Dominance'
  },
  notableFeatures: [
    'Vista del Rey',
    'Glen District',
    'Wellsprings',
    'Ancient Catholic Churches',
    'Street Markets'
  ],
  keyFigures: [
    {
      id: 'padre',
      name: 'Sebastian "Padre" Ibarra',
      title: 'Heywood Fixer',
      era: 'Current',
      significance: 'Respected fixer and spiritual leader in Heywood',
      image: '/art/npcs/padre.jpg',
      avatarStyle: 'fixer'
    },
    {
      id: 'gustavo-orta',
      name: 'Gustavo Orta',
      title: 'Valentinos Leader',
      era: 'Current',
      significance: 'Leader of the Valentinos gang, maintains order in Heywood',
      image: '/art/npcs/gustavo.jpg',
      avatarStyle: 'gang'
    }
  ],
  economy: {
    primaryIndustry: 'Local Services and Entertainment',
    gdp: '150 million eurodollars annually',
    currency: 'Eurodollar (€$)',
    tradeGoods: [
      'Local Cuisine - Traditional food and drinks',
      'Street Art - Urban artwork and murals',
      'Protection Services - Gang-provided security'
    ],
    tradePartners: [
      'Valentinos',
      'Local Businesses',
      'Church Organizations'
    ],
    transportationRoutes: [
      'Metro System',
      'Street Grid',
      'Alley Networks'
    ],
    economicPolicies: [
      'Community-based trade',
      'Gang protection',
      'Local business support'
    ],
    marketRegulations: [
      'Valentinos oversight',
      'Community standards',
      'Traditional practices'
    ]
  },
  seasons: [
    {
      name: 'Day of the Dead',
      description: 'Traditional celebration period',
      activities: ['Street Festivals', 'Religious Ceremonies'],
      hazards: ['Gang Activity', 'Street Racing'],
      magicalEffects: ['Cultural Pride', 'Community Unity']
    }
  ],
  magicalItems: [
    {
      id: 'santa-muerte-charm',
      name: 'Santa Muerte\'s Blessing',
      type: 'Religious Artifact',
      description: 'Sacred charm blessed by street culture and faith',
      rarity: 'Rare',
      location: 'Local Churches',
      history: 'Traditional artifact mixing Catholic and street culture',
      effects: ['Protection', 'Street Respect'],
      requirements: ['Local Recognition'],
      value: '25,000 €$',
      image: '/art/items/santa-muerte-charm.jpg'
    }
  ],
  dungeons: [
    {
      id: 'abandoned-church',
      name: 'Abandoned Cathedral',
      description: 'Ancient church now serving as a Valentinos stronghold',
      challengeRating: 3,
      location: {
        region: 'Heywood',
        environment: 'Urban Religious'
      },
      encounters: ['Valentinos Patrol', 'Street Race', 'Gang Meeting'],
      treasure: {
        gold: 15000,
        gems: [
          { type: 'Religious Artifact', value: 3000 },
          { type: 'Street Art', value: 2000 }
        ],
        art: [
          { type: 'Church Relic', value: 5000 },
          { type: 'Gang Trophy', value: 2000 }
        ],
        magicItems: [
          { name: 'Blessed Rosary', rarity: 'Uncommon' },
          { name: 'Street Saint Icon', rarity: 'Rare' }
        ]
      },
      level: 'Medium',
      difficulty: 'Moderate',
      inhabitants: ['Valentinos', 'Street Priests', 'Local Gangers'],
      treasures: ['Religious Items', 'Gang Weapons', 'Street Art'],
      hazards: ['Gang Conflicts', 'Structural Decay', 'Territory Disputes'],
      history: 'Once a sacred cathedral, now represents the fusion of faith and street culture'
    }
  ],
  pointsOfInterest: [
    {
      id: 'vista-plaza',
      name: 'Vista del Rey Plaza',
      description: 'Central gathering place for the community',
      type: 'Cultural',
      significance: 'Heart of community life',
      notableFeatures: ['Street Market', 'Church Square', 'Gang Territory'],
      associatedFigures: ['Street Vendors', 'Local Priests', 'Gang Members']
    }
  ],
  restAreas: [
    {
      id: 'mama-welles',
      name: 'El Coyote Cojo',
      description: 'Traditional bar and local hangout',
      type: 'Bar',
      quality: 'Moderate',
      price: 'Affordable',
      amenities: ['Local Food', 'Drinks', 'Live Music', 'Safe Haven']
    }
  ],
  shops: [
    {
      id: 'valentinos-garage',
      name: 'Valentinos Custom Rides',
      type: 'Vehicle Shop',
      description: 'Gang-operated custom vehicle workshop',
      owner: 'Ramon "The Machine" Vargas',
      inventory: [
        {
          id: 'custom-bike',
          name: 'Valentinos Custom Motorcycle',
          description: 'Gang-styled custom bike',
          cost: '35,000 €$',
          rarity: 'Rare',
          type: 'Vehicle',
          quantity: 2
        },
        {
          id: 'street-mods',
          name: 'Street Racing Mods',
          description: 'High-performance vehicle modifications',
          cost: '12,000 €$',
          rarity: 'Uncommon',
          type: 'Vehicle Mod',
          quantity: 5
        }
      ]
    }
  ],
  biography: 'Heywood represents the heart and soul of Night City\'s Latino community, where faith, family, and gang culture create a unique blend of tradition and street life. The Valentinos maintain order while preserving the district\'s cultural identity.'
} 