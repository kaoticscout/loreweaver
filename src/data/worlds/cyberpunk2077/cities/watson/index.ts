import { City } from '../../../../../types/city'

export const watson: City = {
  id: 'watson',
  name: 'Watson District',
  description: 'A dense urban jungle of narrow streets and towering apartments, Watson is where ambition meets desperation. Once an industrial powerhouse, now it\'s a maze of markets, clubs, and danger where gangs like Maelstrom and Tyger Claws fight for control.',
  coordinates: [1, 0],
  images: ['/art/environments/cyberpunk/1 - 8a4jrOU.jpg'],
  banner: '/art/environments/cyberpunk/39 - XXI3y4g.jpg',
  basicInformation: {
    population: '400,000',
    primaryRaces: ['Street Mercs', 'Corporate Workers', 'Gang Members'],
    deities: ['Maelstrom Tech Worship', 'Tyger Claws Tradition', 'Street Culture']
  },
  history: {
    founding: 'Originally an industrial district',
    majorEvents: [
      'Industrial Collapse',
      'Gang Wars of 2068',
      'Maelstrom Takeover of All Foods',
      'Tyger Claws Territory Expansion'
    ],
    currentEra: 'Gang Control Era'
  },
  notableFeatures: [
    'Kabuki Market',
    'All Foods Plant',
    'Little China',
    'Northside Industrial District',
    'Arasaka Waterfront'
  ],
  keyFigures: [
    {
      id: 'royce',
      name: 'Royce',
      title: 'Maelstrom Gang Leader',
      era: 'Current',
      significance: 'Leader of the heavily cybernetically modified Maelstrom gang',
      image: '/art/npcs/royce.jpg',
      avatarStyle: 'gang'
    },
    {
      id: 'wakako',
      name: 'Wakako Okada',
      title: 'Fixer',
      era: 'Current',
      significance: 'Powerful fixer who controls much of Watson\'s underground economy',
      image: '/art/npcs/wakako.jpg',
      avatarStyle: 'fixer'
    }
  ],
  economy: {
    primaryIndustry: 'Black Market and Entertainment',
    gdp: '200 million eurodollars annually',
    currency: 'Eurodollar (€$)',
    tradeGoods: [
      'Illegal Cyberware - Black market modifications',
      'Street Weapons - Various grades of firearms',
      'Entertainment Services - Clubs and bars'
    ],
    tradePartners: [
      'Tyger Claws',
      'Maelstrom',
      'Local Fixers'
    ],
    transportationRoutes: [
      'Underground Metro',
      'Street Level Transit',
      'Back Alley Networks'
    ],
    economicPolicies: [
      'Gang-regulated trade',
      'Black market dominance',
      'Protection rackets'
    ],
    marketRegulations: [
      'Gang territory rules',
      'Fixer-mediated deals',
      'Street justice'
    ]
  },
  seasons: [
    {
      name: 'Night Market Festival',
      description: 'Period of increased trade and celebration in Kabuki',
      activities: ['Street Festivals', 'Underground Deals'],
      hazards: ['Gang Violence', 'Police Raids'],
      magicalEffects: ['Enhanced Street Tech', 'Gang Territory Shifts']
    }
  ],
  magicalItems: [
    {
      id: 'maelstrom-tech',
      name: 'Maelstrom Combat Implant',
      type: 'Cyberware',
      description: 'Experimental combat enhancement from Maelstrom labs',
      rarity: 'Very Rare',
      location: 'All Foods Facility',
      history: 'Developed in Maelstrom\'s illegal tech labs',
      effects: ['Enhanced Combat', 'Berserker Mode'],
      requirements: ['High Cybernetic Tolerance'],
      value: '50,000 €$',
      image: '/art/items/maelstrom-implant.jpg'
    }
  ],
  dungeons: [
    {
      id: 'all-foods',
      name: 'All Foods Processing Plant',
      description: 'Abandoned food processing facility turned Maelstrom stronghold',
      challengeRating: 4,
      location: {
        region: 'Watson',
        environment: 'Industrial Facility'
      },
      encounters: ['Maelstrom Patrol', 'Cyberpsycho Attack', 'Security System'],
      treasure: {
        gold: 25000,
        gems: [
          { type: 'Military Tech', value: 5000 },
          { type: 'Experimental Implant', value: 8000 }
        ],
        art: [
          { type: 'Industrial Equipment', value: 3000 },
          { type: 'Gang Trophies', value: 4000 }
        ],
        magicItems: [
          { name: 'Militech Prototype', rarity: 'Rare' },
          { name: 'Maelstrom Tech', rarity: 'Uncommon' }
        ]
      },
      level: 'Medium',
      difficulty: 'Hard',
      inhabitants: ['Maelstrom Gang', 'Security Bots', 'Scavengers'],
      treasures: ['Military Hardware', 'Cyberware', 'Street Drugs'],
      hazards: ['Security Systems', 'Toxic Waste', 'Gang Members'],
      history: 'Former food processing plant taken over by the Maelstrom gang'
    }
  ],
  pointsOfInterest: [
    {
      id: 'kabuki-market',
      name: 'Kabuki Market',
      description: 'Bustling street market and heart of Watson\'s economy',
      type: 'Commercial',
      significance: 'Cultural and economic center',
      notableFeatures: ['Food Stalls', 'Tech Shops', 'Black Market'],
      associatedFigures: ['Street Vendors', 'Fixers', 'Gang Members']
    }
  ],
  restAreas: [
    {
      id: 'lizzys-bar',
      name: 'Lizzie\'s Bar',
      description: 'Popular nightclub and neutral ground',
      type: 'Entertainment Venue',
      quality: 'Medium High',
      price: 'Moderate',
      amenities: ['Bar Service', 'Dance Floor', 'Private Rooms', 'Braindance']
    }
  ],
  shops: [
    {
      id: 'kabuki-tech',
      name: 'Kabuki Tech Traders',
      type: 'Electronics Shop',
      description: 'Street tech and modifications',
      owner: 'Jin "The Tinker" Lee',
      inventory: [
        {
          id: 'street-deck',
          name: 'Street Cyberdeck',
          description: 'Modified hacking device',
          cost: '15,000 €$',
          rarity: 'Uncommon',
          type: 'Tech',
          quantity: 3
        },
        {
          id: 'combat-soft',
          name: 'Combat Software',
          description: 'Street-grade combat enhancement program',
          cost: '8,000 €$',
          rarity: 'Common',
          type: 'Software',
          quantity: 5
        }
      ]
    }
  ],
  biography: 'Watson embodies the street life of Night City, where ancient traditions clash with cutting-edge technology, and survival often means navigating between powerful gangs and corporate interests.'
} 