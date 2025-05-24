import { City } from '../../../../../types/city'

export const westwind: City = {
  id: 'westwind',
  name: 'Westwind Estate',
  description: 'A failed luxury residential development in Pacifica, now a maze of half-finished high-rises and abandoned construction sites. Once meant to be an exclusive beachfront community, it now serves as a fortress for various gangs and displaced residents.',
  coordinates: [-1, 1],
  image: '/art/cities/westwind.jpg',
  banner: '/art/banners/westwind-ruins.jpg',
  basicInformation: {
    population: '45,000',
    primaryRaces: ['Displaced Residents', 'Gang Members', 'Scavengers'],
    deities: ['Survival', 'Street Justice', 'Urban Spirits']
  },
  history: {
    founding: 'Planned as a luxury estate development in 2065',
    majorEvents: [
      'Construction Abandonment',
      'Gang Territory Wars',
      'Refugee Influx',
      'Infrastructure Collapse'
    ],
    currentEra: 'Post-Abandonment'
  },
  notableFeatures: [
    'Unfinished Luxury Towers',
    'Makeshift Markets',
    'Refugee Camps',
    'Gang Fortifications',
    'Abandoned Construction Sites'
  ],
  keyFigures: [
    {
      id: 'spider-murphy',
      name: 'Spider Murphy',
      title: 'Territory Boss',
      era: 'Current',
      significance: 'Controls the largest habitable section of Westwind',
      image: '/art/npcs/spider-murphy.jpg',
      avatarStyle: 'gang'
    },
    {
      id: 'mama-wells',
      name: 'Maria Wells',
      title: 'Community Leader',
      era: 'Current',
      significance: 'Organizes survival efforts for displaced residents',
      image: '/art/npcs/mama-wells.jpg',
      avatarStyle: 'civilian'
    }
  ],
  economy: {
    primaryIndustry: 'Survival Economy and Salvage',
    gdp: '15 million eurodollars annually',
    currency: 'Eurodollar (€$)',
    tradeGoods: [
      'Salvaged Materials - Construction resources and parts',
      'Basic Necessities - Food and water supplies',
      'Protection Services - Security and shelter'
    ],
    tradePartners: [
      'Local Gangs',
      'Scavenger Groups',
      'Black Market Traders'
    ],
    transportationRoutes: [
      'Makeshift Paths',
      'Abandoned Roads',
      'Underground Tunnels'
    ],
    economicPolicies: [
      'Survival bartering',
      'Resource sharing',
      'Protection payments'
    ],
    marketRegulations: [
      'Gang-enforced trading',
      'Community guidelines',
      'Resource rationing'
    ]
  },
  seasons: [
    {
      name: 'Storm Season',
      description: 'Period of intense coastal storms',
      activities: ['Resource Gathering', 'Shelter Maintenance'],
      hazards: ['Structural Collapse', 'Gang Raids'],
      magicalEffects: ['Survival Spirit', 'Community Bonds']
    }
  ],
  magicalItems: [
    {
      id: 'survival-kit',
      name: 'Westwind Survivor\'s Kit',
      type: 'Equipment',
      description: 'Essential survival gear for Westwind\'s harsh conditions',
      rarity: 'Uncommon',
      location: 'Community Centers',
      history: 'Assembled by survivors of the development\'s collapse',
      effects: ['Enhanced Survival', 'Community Support'],
      requirements: ['Local Trust'],
      value: '15,000 €$',
      image: '/art/items/survival-kit.jpg'
    }
  ],
  dungeons: [
    {
      id: 'luxury-ruins',
      name: 'Abandoned Luxury Complex',
      description: 'Half-finished luxury apartment complex turned vertical battlefield',
      challengeRating: 3,
      location: {
        region: 'Pacifica',
        environment: 'Urban Ruins'
      },
      encounters: ['Gang Patrols', 'Scavenger Groups', 'Desperate Survivors'],
      treasure: {
        gold: 10000,
        gems: [
          { type: 'Construction Materials', value: 2000 },
          { type: 'Salvaged Tech', value: 3000 }
        ],
        art: [
          { type: 'Luxury Fixtures', value: 4000 },
          { type: 'Building Plans', value: 1000 }
        ],
        magicItems: [
          { name: 'Survival Gear', rarity: 'Common' },
          { name: 'Emergency Supplies', rarity: 'Uncommon' }
        ]
      },
      level: 'Medium',
      difficulty: 'Moderate',
      inhabitants: ['Survivors', 'Gang Members', 'Scavengers'],
      treasures: ['Construction Materials', 'Survival Supplies', 'Abandoned Tech'],
      hazards: ['Structural Instability', 'Gang Territory', 'Trapped Areas'],
      history: 'Once meant to be luxury apartments, now a vertical shantytown'
    }
  ],
  pointsOfInterest: [
    {
      id: 'community-hub',
      name: 'The Haven',
      description: 'Central gathering place for survivors',
      type: 'Social',
      significance: 'Heart of survivor community',
      notableFeatures: ['Medical Station', 'Trading Post', 'Community Kitchen'],
      associatedFigures: ['Community Leaders', 'Local Doctors', 'Trade Organizers']
    }
  ],
  restAreas: [
    {
      id: 'shelter-bar',
      name: 'The Last Resort',
      description: 'Makeshift bar and gathering place',
      type: 'Bar',
      quality: 'Poor',
      price: 'Low',
      amenities: ['Basic Drinks', 'Shelter', 'Information Exchange', 'Community Support']
    }
  ],
  shops: [
    {
      id: 'salvage-market',
      name: 'Westwind Trading Post',
      type: 'General Store',
      description: 'Community marketplace for essential supplies',
      owner: 'Marcus "Scraps" Johnson',
      inventory: [
        {
          id: 'survival-gear',
          name: 'Basic Survival Kit',
          description: 'Essential survival equipment',
          cost: '5,000 €$',
          rarity: 'Common',
          type: 'Equipment',
          quantity: 10
        },
        {
          id: 'water-filter',
          name: 'Water Purification System',
          description: 'Portable water cleaning device',
          cost: '8,000 €$',
          rarity: 'Uncommon',
          type: 'Survival',
          quantity: 5
        }
      ]
    }
  ],
  biography: 'Westwind Estate stands as a monument to Pacifica\'s failed ambitions, where luxury dreams have given way to survival reality. Its half-finished towers now house a resilient community of survivors, who have turned this abandoned development into a functioning, if dangerous, neighborhood.'
} 