import { City } from '../../../../../types/city'
import { generateDungeonEncounters, addRandomUniqueEncounters } from '../../../../../utils/dungeon-generator'
import { levelEncounters } from '../../dungeon-encounters/level-encounters'
import { DungeonEncounter } from '../../../../../types/dungeon-encounter'
import { getRandomEncounters } from '../../../../../utils/encounter-generator'

export const neverwinter: City = {
  id: 'neverwinter',
  name: 'Neverwinter City',
  description: 'The Jewel of the North, a city where innovation and tradition blend seamlessly against the backdrop of Mount Hotenow\'s thermal springs. Neverwinter is a marvel of urban planning and magical engineering, its streets lined with beautiful gardens that bloom year-round thanks to the city\'s unique microclimate. The Neverwinter River flows through the heart of the city, its waters warmed by the thermal springs, creating a constant mist that gives the city an ethereal quality. The architecture is a stunning mix of elven grace and human practicality, with buildings that seem to grow organically from the landscape while incorporating the latest in magical and mechanical innovations.',
  coordinates: [0, 0],
  images: ['/art/environments/sword-coast/dnd_idrfm_wall1_1920.png', '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png', '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png'],
  banner: '/art/banners/ancient-library.jpg',
  basicInformation: {
    population: '23,000',
    primaryRaces: ['Humans', 'Elves', 'Dwarves'],
    wealthClass: 'Upper Middle',
    politicalStructure: 'Lord Protector',
    deities: [
      {
        name: 'Gruumsh',
        domain: 'Destruction',
        alignment: 'Chaotic Evil',
        image: '/art/deities/Gruumsh.png',
        domains: ['Destruction', 'War', 'Storms'],
        symbol: 'Unblinking eye',
        pantheon: 'Orc',
        titles: ['One-Eye', 'He Who Never Sleeps', 'The Ruiner'],
        worshippers: ['Orcs', 'Half-Orcs', 'Savage Tribes'],
        lore: `Gruumsh, the chief orc deity, is a god of destruction, conquest, and relentless strength. He is infamous for his eternal enmity with Corellon Larethian, who took his eye in battle. Gruumsh's followers are taught to never show weakness, to seize what they desire by force, and to crush their enemies without mercy. His temples are often crude, built in wild places, and his priests lead orc hordes in war and devastation. The unblinking eye of Gruumsh is a mark of fear and power among orc tribes, and his name is invoked before battle and in times of hardship.`,
      },
      {
        name: 'Tyr',
        domain: 'Justice',
        alignment: 'Lawful Good',
        image: '/art/deities/Tyr.png',
        domains: ['Justice', 'Law'],
        symbol: 'Balanced scales',
        pantheon: 'Faerûnian',
        titles: ['The Even-Handed', 'Grimjaws'],
        worshippers: ['Judges', 'Magistrates', 'Paladins'],
        lore: `Tyr is the god of justice, law, and righteous retribution. Depicted as a stern, one-handed man, Tyr lost his right hand to the primordial beast Kezef while binding it in service of the greater good. He is revered by judges, magistrates, and paladins who seek to uphold fairness and order. Tyr's temples are places of law and arbitration, and his followers are known for their unwavering sense of duty and willingness to sacrifice for justice. His symbol, the balanced scales, represents impartiality and the rule of law.`,
      },
      {
        name: 'Tymora',
        domain: 'Luck',
        alignment: 'Chaotic Good',
        image: '/art/deities/Tymora.png',
        domains: ['Luck', 'Fortune'],
        symbol: 'Silver coin',
        pantheon: 'Faerûnian',
        titles: ['Lady Luck', 'The Smiling Lady'],
        worshippers: ['Adventurers', 'Gamblers', 'Travelers'],
        lore: `Tymora, known as Lady Luck, is the goddess of good fortune, chance, and daring. Her followers believe that fortune favors the bold, and her temples are lively places where games of chance and contests of skill are common. Tymora is often depicted as a laughing woman tossing a coin, and her symbol, the silver coin, is carried by those who seek her favor. Adventurers, gamblers, and travelers pray to Tymora for luck in their endeavors, and her priests encourage risk-taking and optimism.`,
      }
    ]
  },
  history: {
    founding: 'Founded in 87 DR by Halueth Never, an elven explorer, the city began as a small trading post that grew into a major port city.',
    majorEvents: [
      'The Spellplague of 1385 DR devastated the city, causing Mount Hotenow to erupt',
      'The city was rebuilt under Lord Neverember\'s leadership',
      'Joined the Lords\' Alliance in 1479 DR',
      'Survived the Second Sundering and emerged stronger than ever'
    ],
    currentEra: 'The city is currently experiencing a renaissance under Lord Neverember\'s rule, with new innovations in magic and technology.'
  },
  notableFeatures: [
    'The Wall: A massive defensive structure that protects the city',
    'The River District: A bustling area of commerce and culture',
    'The Chasm: A deep rift created by the Spellplague',
    'The Protector\'s Enclave: The heart of the city\'s government'
  ],
  keyFigures: [
    {
      id: 'drizzt',
      name: 'Drizzt Do\'Urden',
      title: 'Hero of the North',
      era: 'Current',
      significance: 'Famous drow ranger who has made Neverwinter his home. Known for his exceptional combat skills and his role in defending the city against various threats. His friendship with the city\'s leaders has helped bridge relations between Neverwinter and other settlements.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Drizzt&backgroundColor=b6e3f4&hair=shortHair&hairColor=000000&skinColor=2c1810`,
      avatarStyle: 'avataaars'
    },
    {
      id: 'dagult',
      name: 'Dagult Neverember',
      title: 'Lord Protector',
      era: 'Current',
      significance: 'Former Open Lord of Waterdeep who took control of Neverwinter and began its reconstruction. Known for his political acumen and ability to balance the interests of various factions.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Dagult&backgroundColor=c0aede&hair=shortHair&hairColor=000000&skinColor=f8d25c`,
      avatarStyle: 'avataaars'
    }
  ],
  economy: {
    primaryIndustry: 'Craftsmanship and Magical Innovation',
    gdp: '2.3 million gold pieces annually',
    currency: 'Neverwinter Crown (pegged to Waterdeep Dragon)',
    tradeGoods: [
      {
        name: 'Clockwork Devices',
        type: 'export',
        value: 'High',
        tariff: '15% for non-Alliance members',
        description: 'Precision mechanical devices, from timepieces to automated tools'
      },
      {
        name: 'Magical Items',
        type: 'export',
        value: 'Very High',
        tariff: '20% for non-Alliance members',
        description: 'Enchanted weapons, armor, and utility items'
      }
    ],
    tradePartners: [
      {
        name: 'Waterdeep',
        relationship: 'Strong Alliance',
        primaryGoods: ['Raw Materials', 'Magical Components', 'Luxury Goods'],
        tradeAgreement: 'Free trade agreement with reduced tariffs'
      }
    ],
    transportationRoutes: [
      {
        name: 'High Road',
        type: 'land',
        description: 'Main trade route to Waterdeep',
        security: 'Well-patrolled by Neverwinter Guard',
        frequency: 'Daily caravans'
      }
    ],
    economicPolicies: [
      'Guild-regulated craftsmanship standards',
      'Magical innovation tax incentives',
      'Protected status for traditional crafts',
      'Free trade within the Lords\' Alliance'
    ],
    marketRegulations: [
      'Required guild membership for craftsmen',
      'Quality control inspections',
      'Price controls on essential goods',
      'Magical item registration'
    ]
  },
  seasons: [
    {
      name: 'Spring',
      description: 'Mild temperatures with occasional rain showers',
      activities: ['Gardening', 'Fishing', 'Festivals'],
      hazards: ['Flooding', 'Mudslides'],
      magicalEffects: ['Enhanced plant growth', 'Water magic amplification']
    },
    {
      name: 'Summer',
      description: 'Warm and sunny with cool ocean breezes',
      activities: ['Beach activities', 'Outdoor markets', 'Night festivals'],
      hazards: ['Heat waves', 'Drought'],
      magicalEffects: ['Fire magic enhancement', 'Solar energy collection']
    },
    {
      name: 'Autumn',
      description: 'Cool and crisp with colorful foliage',
      activities: ['Harvest festivals', 'Hunting', 'Craft fairs'],
      hazards: ['Early frosts', 'Strong winds'],
      magicalEffects: ['Nature magic enhancement', 'Harvest blessings']
    },
    {
      name: 'Winter',
      description: 'Cold with occasional snow, kept mild by thermal springs',
      activities: ['Ice skating', 'Winter markets', 'Indoor festivals'],
      hazards: ['Ice storms', 'Avalanches'],
      magicalEffects: ['Ice magic enhancement', 'Thermal spring blessings']
    }
  ],
  magicalItems: [
    {
      name: 'Neverwinter\'s Heart',
      type: 'Artifact',
      description: 'A powerful magical gem that helps maintain the city\'s warmth',
      rarity: 'Legendary',
      location: 'Protector\'s Enclave',
      history: 'Created during the city\'s reconstruction to maintain warmth',
      effects: ['City-wide warmth', 'Weather control', 'Protection']
    },
    {
      name: 'Gauntlets of the Master Craftsman',
      type: 'Wondrous Item',
      description: 'Enhances the wearer\'s crafting abilities',
      rarity: 'Rare',
      location: 'House of Knowledge',
      history: 'Created by master craftsmen of Neverwinter',
      effects: ['Enhanced crafting', 'Precision work', 'Artistic inspiration']
    }
  ],
  dungeons: [
    {
      id: 'abandoned-mine',
      name: 'Abandoned Mine',
      description: 'An old mine that has been taken over by dangerous creatures.',
      challengeRating: 3,
      location: {
        region: 'Neverwinter',
        environment: 'Underground'
      },
      encounters: ['cultist-initiation', 'goblin-ambush', 'kobold-den'],
      treasure: {
        gold: 3000,
        gems: [
          { type: 'Raw Gem', value: 1500 },
          { type: 'Uncut Diamond', value: 2000 }
        ],
        art: [
          { type: 'Mining Equipment', value: 1000 },
          { type: 'Ancient Tool', value: 1500 }
        ],
        magicItems: [
          { name: 'Miner\'s Pick', rarity: 'Uncommon' },
          { name: 'Gem of Finding', rarity: 'Rare' }
        ]
      }
    }
  ],
  pointsOfInterest: [
    {
      id: '1',
      name: 'The House of Knowledge',
      description: 'A grand library and center of learning',
      type: 'Cultural',
      significance: 'Center of magical and scholarly research',
      notableFeatures: ['Ancient tomes', 'Magical laboratories', 'Training grounds'],
      associatedFigures: ['Master Sage', 'Archmage', 'Student Council']
    }
  ],
  restAreas: [
    {
      id: '1',
      name: 'The Moonstone Mask',
      description: 'Luxurious inn and entertainment venue',
      type: 'Inn',
      quality: 'High',
      price: 'Expensive',
      amenities: ['Private rooms', 'Fine dining', 'Entertainment', 'Security']
    }
  ],
  shops: [
    {
      id: '1',
      name: 'The Behir\'s Hoard',
      type: 'Magic Shop',
      description: 'A well-stocked magic shop run by a retired adventurer',
      owner: 'Eldara Moonwhisper',
      inventory: [
        {
          id: '1',
          name: 'Potion of Healing',
          description: 'Restores 2d4+2 hit points',
          cost: '50 gp',
          rarity: 'Common',
          type: 'Potion',
          quantity: 10
        },
        {
          id: '2',
          name: 'Scroll of Fireball',
          description: 'Casts a 3rd-level fireball spell',
          cost: '150 gp',
          rarity: 'Uncommon',
          type: 'Scroll',
          quantity: 3
        },
        {
          id: '5',
          name: 'Potion of Greater Healing',
          description: 'Restores 4d4+4 hit points',
          cost: '100 gp',
          rarity: 'Uncommon',
          type: 'Potion',
          quantity: 5
        },
        {
          id: '6',
          name: 'Scroll of Invisibility',
          description: 'Casts a 2nd-level invisibility spell',
          cost: '120 gp',
          rarity: 'Uncommon',
          type: 'Scroll',
          quantity: 2
        },
        {
          id: '7',
          name: 'Arcane Dust',
          description: 'Essential component for many spells',
          cost: '25 gp',
          rarity: 'Common',
          type: 'Component',
          quantity: 20
        },
        {
          id: '8',
          name: 'Potion of Flying',
          description: 'Grants the ability to fly for 1 hour',
          cost: '300 gp',
          rarity: 'Rare',
          type: 'Potion',
          quantity: 1
        },
        {
          id: '9',
          name: 'Scroll of Teleportation',
          description: 'Casts a 5th-level teleportation spell',
          cost: '500 gp',
          rarity: 'Rare',
          type: 'Scroll',
          quantity: 1
        },
        {
          id: '10',
          name: 'Potion of Mind Reading',
          description: 'Allows reading surface thoughts for 1 hour',
          cost: '200 gp',
          rarity: 'Uncommon',
          type: 'Potion',
          quantity: 2
        },
        {
          id: '11',
          name: 'Spell Component Pouch',
          description: 'Contains common spell components',
          cost: '25 gp',
          rarity: 'Common',
          type: 'Equipment',
          quantity: 3
        },
        {
          id: '12',
          name: 'Potion of Water Breathing',
          description: 'Allows breathing underwater for 1 hour',
          cost: '150 gp',
          rarity: 'Uncommon',
          type: 'Potion',
          quantity: 3
        }
      ],
      specialties: ['Potions', 'Scrolls', 'Magical Components'],
      services: ['Potion Brewing', 'Scroll Scribing', 'Magical Item Identification']
    },
    {
      id: '2',
      name: 'The Dwarven Forge',
      type: 'Blacksmith',
      description: 'Traditional dwarven smithy producing high-quality weapons and armor',
      owner: 'Thorin Ironbeard',
      inventory: [
        {
          id: '3',
          name: 'Steel Longsword',
          description: 'Well-crafted steel longsword',
          cost: '15 gp',
          rarity: 'Common',
          type: 'Weapon',
          quantity: 5
        },
        {
          id: '4',
          name: 'Chain Mail',
          description: 'Dwarven-crafted chain mail armor',
          cost: '75 gp',
          rarity: 'Common',
          type: 'Armor',
          quantity: 3
        },
        {
          id: '13',
          name: 'Dwarven Battle Axe',
          description: 'Heavy, well-balanced battle axe',
          cost: '30 gp',
          rarity: 'Common',
          type: 'Weapon',
          quantity: 4
        },
        {
          id: '14',
          name: 'Plate Mail',
          description: 'Full plate armor with dwarven runes',
          cost: '1500 gp',
          rarity: 'Uncommon',
          type: 'Armor',
          quantity: 1
        },
        {
          id: '15',
          name: 'Steel Shield',
          description: 'Reinforced steel shield with dwarven design',
          cost: '20 gp',
          rarity: 'Common',
          type: 'Armor',
          quantity: 6
        },
        {
          id: '16',
          name: 'Warhammer',
          description: 'Heavy warhammer with rune-carved head',
          cost: '25 gp',
          rarity: 'Common',
          type: 'Weapon',
          quantity: 3
        },
        {
          id: '17',
          name: 'Splint Mail',
          description: 'Medium armor with reinforced plates',
          cost: '200 gp',
          rarity: 'Common',
          type: 'Armor',
          quantity: 2
        },
        {
          id: '18',
          name: 'Dwarven Throwing Axe',
          description: 'Balanced throwing axe with rune-carved handle',
          cost: '15 gp',
          rarity: 'Common',
          type: 'Weapon',
          quantity: 8
        },
        {
          id: '19',
          name: 'Steel Gauntlets',
          description: 'Reinforced steel gauntlets with articulated fingers',
          cost: '10 gp',
          rarity: 'Common',
          type: 'Armor',
          quantity: 5
        },
        {
          id: '20',
          name: 'Dwarven Greataxe',
          description: 'Massive two-handed axe with intricate engravings',
          cost: '40 gp',
          rarity: 'Uncommon',
          type: 'Weapon',
          quantity: 2
        }
      ],
      specialties: ['Weapons', 'Armor', 'Metalworking'],
      services: ['Weapon Repair', 'Armor Fitting', 'Custom Orders']
    }
  ]
} 