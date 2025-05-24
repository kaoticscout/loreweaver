import { City } from '../../../../../types/city'

export const westbrook: City = {
  id: 'westbrook',
  name: 'Westbrook District',
  description: 'The playground of Night City\'s nouveau riche, Westbrook is a district of luxury and excess. Japanese influences dominate the architecture and culture, while the Tyger Claws maintain their iron grip on the entertainment industry. From high-end clubs to exclusive restaurants, everything here comes with a premium price tag.',
  coordinates: [1, 1],
  images: ['/art/environments/cyberpunk/14 - mik2s6P.jpg'],
  banner: '/art/environments/cyberpunk/31 - 7X6yBMs.jpg',
  basicInformation: {
    population: '200,000',
    primaryRaces: ['Corporate Elite', 'Entertainment Workers', 'Tyger Claws'],
    deities: ['Success Worship', 'Neo-Shintoism', 'Digital Enlightenment']
  },
  history: {
    founding: 'Developed as Night City\'s premium entertainment district',
    majorEvents: [
      'Arasaka Investment Wave',
      'Tyger Claws Territory Claim',
      'Luxury Development Boom',
      'Charter Hill Expansion'
    ],
    currentEra: 'Golden Age of Excess'
  },
  notableFeatures: [
    'Charter Hill',
    'Japan Town',
    'North Oak',
    'Luxury Apartments',
    'Premium Clubs'
  ],
  keyFigures: [
    {
      id: 'toshiro',
      name: 'Toshiro Nagawa',
      title: 'Tyger Claws Lieutenant',
      era: 'Current',
      significance: 'Controls Westbrook\'s entertainment industry',
      image: '/art/npcs/toshiro.jpg',
      avatarStyle: 'gang'
    },
    {
      id: 'rogue',
      name: 'Rogue Amendiares',
      title: 'Queen of Fixers',
      era: 'Current',
      significance: 'Legendary fixer operating from Westbrook',
      image: '/art/npcs/rogue.jpg',
      avatarStyle: 'fixer'
    }
  ],
  economy: {
    primaryIndustry: 'Luxury Entertainment',
    gdp: '400 million eurodollars annually',
    currency: 'Eurodollar (€$)',
    tradeGoods: [
      'Premium Entertainment - High-end clubs and venues',
      'Luxury Services - Personal enhancement and leisure',
      'Fine Dining - Exclusive restaurants and bars'
    ],
    tradePartners: [
      'Arasaka Corporation',
      'Tyger Claws',
      'Luxury Brands'
    ],
    transportationRoutes: [
      'Private AV Lanes',
      'Luxury Transit',
      'Executive Transport'
    ],
    economicPolicies: [
      'Premium pricing',
      'Exclusive access',
      'High-end focus'
    ],
    marketRegulations: [
      'Tyger Claws oversight',
      'Luxury standards',
      'Entertainment licensing'
    ]
  },
  seasons: [
    {
      name: 'Cherry Blossom Festival',
      description: 'Annual celebration in Japan Town',
      activities: ['Cultural Shows', 'Luxury Events'],
      hazards: ['Gang Activity', 'Corporate Espionage'],
      magicalEffects: ['Cultural Enhancement', 'Social Status']
    }
  ],
  magicalItems: [
    {
      id: 'tyger-blade',
      name: 'Tyger Claws Ceremonial Blade',
      type: 'Weapon',
      description: 'Traditional katana with modern enhancements',
      rarity: 'Very Rare',
      location: 'Japan Town',
      history: 'Symbol of Tyger Claws authority',
      effects: ['Enhanced Combat', 'Gang Respect'],
      requirements: ['Tyger Claws Connection'],
      value: '75,000 €$',
      image: '/art/items/tyger-blade.jpg'
    }
  ],
  dungeons: [
    {
      id: 'luxury-hotel',
      name: 'Abandoned Luxury Hotel',
      description: 'Once-prestigious hotel now controlled by Tyger Claws',
      challengeRating: 4,
      location: {
        region: 'Westbrook',
        environment: 'Urban Luxury'
      },
      encounters: ['Tyger Claws Elite', 'Corporate Security', 'Rich Clients'],
      treasure: {
        gold: 35000,
        gems: [
          { type: 'Luxury Jewelry', value: 8000 },
          { type: 'Corporate Data', value: 10000 }
        ],
        art: [
          { type: 'Modern Art', value: 12000 },
          { type: 'Designer Furniture', value: 7000 }
        ],
        magicItems: [
          { name: 'Executive Access Card', rarity: 'Rare' },
          { name: 'Luxury Tech', rarity: 'Very Rare' }
        ]
      },
      level: 'High',
      difficulty: 'Hard',
      inhabitants: ['Tyger Claws', 'Rich Residents', 'Service Staff'],
      treasures: ['Luxury Goods', 'Corporate Secrets', 'Art Collections'],
      hazards: ['Security Systems', 'Gang Patrols', 'Social Elite'],
      history: 'Former five-star hotel turned gang stronghold and luxury black market'
    }
  ],
  pointsOfInterest: [
    {
      id: 'clouds',
      name: 'Clouds',
      description: 'Exclusive dollhouse offering unique experiences',
      type: 'Entertainment',
      significance: 'Premium adult entertainment venue',
      notableFeatures: ['VIP Rooms', 'High-Tech Facilities', 'Exclusive Clientele'],
      associatedFigures: ['Tyger Claws Management', 'Elite Clients', 'Dolls']
    }
  ],
  restAreas: [
    {
      id: 'emperor-hotel',
      name: 'Emperor Hotel',
      description: 'Ultra-luxury hotel catering to elite clients',
      type: 'Luxury Hotel',
      quality: 'Ultra Premium',
      price: 'Extremely Expensive',
      amenities: ['Penthouse Suites', 'Gourmet Dining', 'Private Security', 'Exclusive Services']
    }
  ],
  shops: [
    {
      id: 'cyber-clinic',
      name: 'Golden Lotus Clinic',
      type: 'Premium Cyberware',
      description: 'High-end cyberware installation and cosmetic enhancement',
      owner: 'Dr. Himiko Sato',
      inventory: [
        {
          id: 'premium-eyes',
          name: 'Kiroshi Optics Elite',
          description: 'Top-of-the-line ocular implants',
          cost: '85,000 €$',
          rarity: 'Legendary',
          type: 'Cyberware',
          quantity: 2
        },
        {
          id: 'fashion-skin',
          name: 'Designer Synthetic Skin',
          description: 'Premium cosmetic enhancement',
          cost: '45,000 €$',
          rarity: 'Very Rare',
          type: 'Cosmetic',
          quantity: 4
        }
      ]
    }
  ],
  biography: 'Westbrook represents Night City\'s appetite for luxury and excess, where Japanese culture meets corporate wealth. Under the watchful eye of the Tyger Claws, it\'s a playground for the rich and ambitious, where everything has a price and style is everything.'
} 