import { City } from '../../../../../types/city'
import { generateDungeonEncounters, addRandomUniqueEncounters } from '../../../../../utils/dungeon-generator'
import { levelEncounters } from '../../dungeon-encounters/level-encounters'
import { DungeonEncounter } from '../../../../../types/dungeon-encounter'
import { getRandomEncounters } from '../../../../../utils/encounter-generator'

export const illusk: City = {
  id: '4',
  name: 'Illusk',
  description: 'An ancient ruined city, now home to various factions and treasure hunters.',
  coordinates: [3, 3],
  images: ['/art/environments/sword-coast/dnd_idrfm_wall1_1920.png', '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png', '/art/environments/sword-coast/dnd_idrfm_wall1_1920.png'],
  banner: '/art/banners/elven-ruins.jpg',
  basicInformation: {
    population: '2,000',
    primaryRaces: ['Humans', 'Dwarves', 'Orcs'],
    wealthClass: 'Lower',
    politicalStructure: 'Faction Rule',
    deities: [
      {
        name: 'Gruumsh',
        domain: 'War',
        alignment: 'Chaotic Evil',
        image: '/art/deities/Gruumsh.png',
        domains: ['War', 'Destruction', 'Storms'],
        symbol: 'Unblinking eye',
        pantheon: 'Orc',
        titles: ['One-Eye', 'He Who Never Sleeps', 'The Ruiner'],
        worshippers: ['Orcs', 'Half-Orcs', 'Savage Tribes'],
        lore: `Gruumsh, the chief orc deity, is a god of destruction, conquest, and relentless strength. He is infamous for his eternal enmity with Corellon Larethian, who took his eye in battle. Gruumsh's followers are taught to never show weakness, to seize what they desire by force, and to crush their enemies without mercy. His temples are often crude, built in wild places, and his priests lead orc hordes in war and devastation. The unblinking eye of Gruumsh is a mark of fear and power among orc tribes, and his name is invoked before battle and in times of hardship.`
      },
      {
        name: 'Moradin',
        domain: 'Craft',
        alignment: 'Lawful Good',
        image: '/art/deities/Moradin.png',
        domains: ['Creation', 'Earth', 'Good', 'Law'],
        symbol: 'Hammer and anvil',
        pantheon: 'Dwarven',
        titles: ['The Soul Forger', 'Dwarffather', 'The All-Father'],
        worshippers: ['Dwarves', 'Smiths', 'Artisans'],
        lore: `Moradin is the chief deity of the dwarves, revered as the creator of the dwarven race. He is the god of creation, smithing, protection, and family. Moradin's followers are taught to value tradition, hard work, and the defense of their people. His temples are often grand forges, and his priests are both spiritual leaders and master craftsmen. The hammer and anvil symbolize his role as a creator and protector of the dwarven people.`
      }
    ]
  },
  history: {
    founding: 'Founded by the ancient Illuskan people, the city was once a center of magical learning.',
    majorEvents: [
      'The city was destroyed during a magical catastrophe',
      'The ruins became home to various magical creatures',
      'The Ancient Library was discovered',
      'The city\'s magical secrets began to attract adventurers'
    ],
    currentEra: 'The ruins are now a dangerous but rewarding site for those seeking ancient magical knowledge.'
  },
  notableFeatures: [
    'The Ancient Library: A repository of magical knowledge',
    'The Ruined Temples: Former places of worship',
    'The Magical Academy: Where ancient mages studied',
    'The Crystal Caves: Source of magical power'
  ],
  keyFigures: [
    {
      id: 'king',
      name: 'King Heafstaag',
      title: 'Ancient Ruler',
      era: 'Ancient',
      significance: 'Legendary king who ruled Illusk during its golden age. Known for his wisdom and ability to unite the various human tribes.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Heafstaag&backgroundColor=c0aede&hair=shortHair&hairColor=000000&skinColor=f8d25c`,
      avatarStyle: 'avataaars'
    },
    {
      id: 'queen',
      name: 'Queen Mithra',
      title: 'Ancient Ruler',
      era: 'Ancient',
      significance: 'Wife of Heafstaag, known for her magical prowess and role in establishing the city\'s early culture.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Mithra&backgroundColor=c0aede&hair=longHair&hairColor=000000&skinColor=f8d25c`,
      avatarStyle: 'avataaars'
    }
  ],
  economy: {
    primaryIndustry: 'Ancient Artifacts and Forbidden Knowledge',
    gdp: 'Unknown (unofficial economy)',
    currency: 'Various (barter system common)',
    tradeGoods: [
      {
        name: 'Ancient Artifacts',
        type: 'export',
        value: 'Extremely High',
        tariff: 'None (unofficial trade)',
        description: 'Recovered items from the ruins'
      },
      {
        name: 'Forbidden Knowledge',
        type: 'export',
        value: 'Priceless',
        tariff: 'None (black market)',
        description: 'Ancient magical secrets'
      }
    ],
    tradePartners: [
      {
        name: 'Red Wizards',
        relationship: 'Secret',
        primaryGoods: ['Ancient Artifacts', 'Forbidden Knowledge'],
        tradeAgreement: 'Unofficial arrangements'
      }
    ],
    transportationRoutes: [
      {
        name: 'Underground Tunnels',
        type: 'land',
        description: 'Network of ancient passages',
        security: 'Extremely dangerous',
        frequency: 'Irregular'
      }
    ],
    economicPolicies: [
      'No official economic policies',
      'Survival of the fittest',
      'Knowledge is power',
      'Everything has a price'
    ],
    marketRegulations: [
      'No official regulations',
      'Buyer beware',
      'No guarantees',
      'Death is the price of failure'
    ]
  },
  seasons: [
    {
      name: 'Eternal',
      description: 'The ruins exist in a state of perpetual gloom, unaffected by seasonal changes. The magical residue from ancient battles creates an eternal twilight.',
      activities: ['Treasure hunting', 'Faction warfare', 'Black market trading'],
      hazards: ['Magical anomalies', 'Hostile factions', 'Ancient traps'],
      magicalEffects: ['Enhanced necromancy', 'Shadow magic amplification'],
      economicImpact: '',
      tradeModifiers: { exports: {}, imports: {} },
      specialEvents: []
    }
  ],
  magicalItems: [
    {
      id: 'illuskan-crown',
      name: 'Illuskan Crown',
      type: 'Artifact',
      description: 'The crown of the ancient Illuskan kings',
      rarity: 'Legendary',
      location: 'Ancient Library',
      history: 'Created by the first Illuskan king',
      effects: ['Royal authority', 'Magical power', 'Ancient knowledge'],
      requirements: [],
      value: '',
      image: ''
    },
    {
      id: 'ancient-sage-staff',
      name: 'Staff of the Ancient Sage',
      type: 'Weapon',
      description: 'A powerful staff once wielded by the city\'s greatest mage',
      rarity: 'Rare',
      location: 'Magical Academy',
      history: 'Created by the founder of the Magical Academy',
      effects: ['Spell focus', 'Arcane power', 'Knowledge channeling'],
      requirements: [],
      value: '',
      image: ''
    }
  ],
  dungeons: [
    {
      id: 'ancient-library',
      name: 'Ancient Library',
      description: 'A vast library containing forbidden knowledge and dangerous magical artifacts.',
      challengeRating: 10,
      level: '',
      difficulty: '',
      inhabitants: [],
      treasures: [],
      hazards: [],
      history: '',
      location: {
        region: 'Illusk',
        environment: 'Indoor'
      },
      encounters: ['cultist-initiation', 'goblin-ambush', 'kobold-den'],
      treasure: {
        gold: 10000,
        gems: [
          { type: 'Ancient Scroll', value: 5000 },
          { type: 'Magical Tome', value: 7500 }
        ],
        art: [
          { type: 'Arcane Artifact', value: 5000 },
          { type: 'Forbidden Knowledge', value: 10000 }
        ],
        magicItems: [
          { name: 'Archmage\'s Staff', rarity: 'Rare' },
          { name: 'Forbidden Grimoire', rarity: 'Very Rare' }
        ]
      }
    }
  ],
  pointsOfInterest: [
    {
      id: '1',
      name: 'The Trading Post',
      description: 'A neutral ground for various factions to trade and negotiate',
      type: 'Commercial',
      significance: 'Center of unofficial trade',
      notableFeatures: ['Black market', 'Faction territories', 'Smuggler\'s den'],
      associatedFigures: ['Faction leaders', 'Smugglers', 'Treasure hunters']
    }
  ],
  restAreas: [
    {
      id: '1',
      name: 'The Ruined Inn',
      description: 'A partially restored inn in the ruins',
      type: 'Inn',
      quality: 'Low',
      price: 'Cheap',
      amenities: ['Basic shelter', 'Food', 'Information', 'No security']
    }
  ],
  shops: [
    {
      id: '1',
      name: 'The Black Market',
      type: 'General',
      description: 'An unofficial trading post for all manner of goods',
      owner: 'Unknown',
      inventory: [
        {
          id: '1',
          name: 'Ancient Artifact',
          description: 'Mysterious item of unknown origin',
          cost: 'Variable',
          rarity: 'Rare',
          type: 'Artifact',
          quantity: 1
        }
      ]
    }
  ]
} 