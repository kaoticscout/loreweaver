import { City } from '../../../../../types/city'

export const santoDomingo: City = {
  id: 'santo-domingo',
  name: 'Santo Domingo District',
  description: 'The industrial heart of Night City, Santo Domingo is a maze of factories, power plants, and working-class housing. The 6th Street gang maintains order in this district where the air is thick with industrial smoke and the ground vibrates with the constant hum of machinery.',
  coordinates: [0, -1],
  images: ['/art/environments/cyberpunk/35 - OBZCOb7.jpg'],
  banner: '/art/environments/cyberpunk/14 - mik2s6P.jpg',
  basicInformation: {
    population: '300,000',
    primaryRaces: ['Industrial Workers', 'Tech Specialists', 'Gang Members'],
    deities: ['Machine God', 'Industrial Progress', 'Worker\'s Spirit']
  },
  history: {
    founding: 'Established as Night City\'s industrial zone',
    majorEvents: [
      'Industrial Revolution 2.0',
      '6th Street Formation',
      'Power Plant Crisis',
      'Worker\'s Uprising'
    ],
    currentEra: 'Industrial Renaissance'
  },
  notableFeatures: [
    'Arroyo',
    'Rancho Coronado',
    'Power Plants',
    'Industrial Complexes',
    'Worker Housing'
  ],
  keyFigures: [
    {
      id: 'henry',
      name: 'Henry Martinez',
      title: '6th Street Commander',
      era: 'Current',
      significance: 'Leader of 6th Street gang, maintains order in Santo Domingo',
      image: '/art/npcs/henry.jpg',
      avatarStyle: 'gang'
    },
    {
      id: 'santiago',
      name: 'Santiago Aldecaldo',
      title: 'Aldecaldo Nomad',
      era: 'Current',
      significance: 'Key contact between nomads and local industry',
      image: '/art/npcs/santiago.jpg',
      avatarStyle: 'nomad'
    }
  ],
  economy: {
    primaryIndustry: 'Heavy Industry and Power Generation',
    gdp: '250 million eurodollars annually',
    currency: 'Eurodollar (€$)',
    tradeGoods: [
      'Industrial Equipment - Heavy machinery and tools',
      'Power Supply - Electricity and energy',
      'Technical Services - Maintenance and repair'
    ],
    tradePartners: [
      '6th Street Gang',
      'Industrial Corps',
      'Worker Unions'
    ],
    transportationRoutes: [
      'Industrial Railways',
      'Cargo Routes',
      'Worker Transit'
    ],
    economicPolicies: [
      'Industrial focus',
      'Worker protection',
      'Infrastructure maintenance'
    ],
    marketRegulations: [
      '6th Street oversight',
      'Union guidelines',
      'Safety standards'
    ]
  },
  seasons: [
    {
      name: 'Maintenance Period',
      description: 'Annual industrial maintenance cycle',
      activities: ['Factory Repairs', 'System Updates'],
      hazards: ['Industrial Accidents', 'Gang Conflicts'],
      magicalEffects: ['Machine Spirits', 'Technical Inspiration']
    }
  ],
  magicalItems: [
    {
      id: 'industrial-arm',
      name: 'Industrial Gorilla Arms',
      type: 'Cyberware',
      description: 'Heavy-duty cybernetic arms for industrial work',
      rarity: 'Rare',
      location: 'Factory District',
      history: 'Developed for heavy industrial work',
      effects: ['Enhanced Strength', 'Industrial Interface'],
      requirements: ['Industrial Certification'],
      value: '35,000 €$',
      image: '/art/items/industrial-arms.jpg'
    }
  ],
  dungeons: [
    {
      id: 'abandoned-factory',
      name: 'Abandoned Manufacturing Plant',
      description: 'Massive factory complex turned gang stronghold',
      challengeRating: 4,
      location: {
        region: 'Santo Domingo',
        environment: 'Industrial'
      },
      encounters: ['6th Street Patrol', 'Rogue Machines', 'Scavengers'],
      treasure: {
        gold: 20000,
        gems: [
          { type: 'Industrial Tech', value: 6000 },
          { type: 'Rare Materials', value: 4000 }
        ],
        art: [
          { type: 'Industrial Equipment', value: 8000 },
          { type: 'Technical Schematics', value: 5000 }
        ],
        magicItems: [
          { name: 'Factory Control Module', rarity: 'Rare' },
          { name: 'Industrial Cyberware', rarity: 'Uncommon' }
        ]
      },
      level: 'Medium',
      difficulty: 'Hard',
      inhabitants: ['6th Street Gang', 'Rogue Workers', 'Scavengers'],
      treasures: ['Industrial Tech', 'Raw Materials', 'Machine Parts'],
      hazards: ['Active Machinery', 'Toxic Waste', 'Security Systems'],
      history: 'Former manufacturing facility now controlled by various factions'
    }
  ],
  pointsOfInterest: [
    {
      id: 'power-plant',
      name: 'Central Power Plant',
      description: 'Massive power generation facility',
      type: 'Industrial',
      significance: 'Critical infrastructure',
      notableFeatures: ['Reactor Core', 'Control Room', 'Cooling Towers'],
      associatedFigures: ['Plant Workers', 'Security Teams', 'Engineers']
    }
  ],
  restAreas: [
    {
      id: 'workers-rest',
      name: 'The Machine Shop',
      description: 'Popular bar for industrial workers',
      type: 'Bar',
      quality: 'Moderate',
      price: 'Affordable',
      amenities: ['Local Food', 'Strong Drinks', 'Worker\'s Corner', 'Tech Trading']
    }
  ],
  shops: [
    {
      id: 'industrial-supply',
      name: 'Heavy Duty Tech',
      type: 'Industrial Equipment',
      description: 'Industrial grade cyberware and equipment',
      owner: 'Marcus "The Mechanic" Johnson',
      inventory: [
        {
          id: 'work-frame',
          name: 'Industrial Exoskeleton',
          description: 'Heavy-duty work assist frame',
          cost: '25,000 €$',
          rarity: 'Uncommon',
          type: 'Equipment',
          quantity: 3
        },
        {
          id: 'tech-tools',
          name: 'Smart Tool Kit',
          description: 'Advanced industrial maintenance tools',
          cost: '12,000 €$',
          rarity: 'Common',
          type: 'Tools',
          quantity: 5
        }
      ]
    }
  ],
  biography: 'Santo Domingo is the beating industrial heart of Night City, where the dreams of progress are built on the backs of hard-working laborers. Under the watchful eye of the 6th Street gang, it maintains a delicate balance between industrial efficiency and worker protection.'
} 