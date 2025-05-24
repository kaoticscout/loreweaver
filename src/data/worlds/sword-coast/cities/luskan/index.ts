import { City } from '../../../../../types/city'
import { generateDungeonEncounters, addRandomUniqueEncounters } from '../../../../../utils/dungeon-generator'
import { levelEncounters } from '../../dungeon-encounters/level-encounters'
import { DungeonEncounter } from '../../../../../types/dungeon-encounter'
import { getRandomEncounters } from '../../../../../utils/encounter-generator'

export const luskan: City = {
  id: 'luskan',
  name: 'Luskan City',
  description: 'The City of Sails, a rough-and-tumble port city where the cold winds of the Sea of Swords meet the harsh realities of life in the North. Luskan is dominated by the imposing Hosttower of the Arcane, a massive magical structure that looms over the city like a dark sentinel. The city\'s architecture is a mix of sturdy stone buildings and ramshackle wooden structures, all built to withstand the harsh coastal weather. The harbor is always busy with ships coming and going, while the streets are filled with sailors, merchants, and members of the Arcane Brotherhood going about their business. The air is thick with the smell of salt, fish, and magic, while the constant sound of waves crashing against the shore provides a rhythmic backdrop to the city\'s bustling activity.',
  coordinates: [2, 2],
  images: ['/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png', '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png', '/art/environments/sword-coast/Saltmarsh_1920x1080_WallpaperTemplate.png'],
  banner: '/art/banners/necromancer-tower.jpg',
  basicInformation: {
    population: '16,000',
    primaryRaces: ['Humans', 'Half-Orcs'],
    wealthClass: 'Lower Middle',
    politicalStructure: 'Arcane Brotherhood',
    deities: [
      {
        name: 'Umberlee',
        domain: 'Oceans',
        alignment: 'Chaotic Evil',
        image: '/art/deities/Umberlee.png',
        domains: ['Oceans', 'Storms', 'Destruction'],
        symbol: 'Wavestorm with a blue-green trident',
        pantheon: 'Faerûnian',
        titles: ['The Bitch Queen', 'Queen of the Depths'],
        worshippers: ['Sailors', 'Pirates', 'Coastal Dwellers'],
        lore: `Umberlee is the capricious and vengeful goddess of the sea, feared by sailors and coastal dwellers alike. She controls the harshness of the sea and is known for demanding offerings from those who travel her domain. Her temples are often found near treacherous waters, and her priests lead rituals to appease her wrath. The symbol of Umberlee is a reminder of the sea's beauty and its deadly power.`
      },
      {
        name: 'Talos',
        domain: 'Storms',
        alignment: 'Chaotic Evil',
        image: '/art/deities/Talos.png',
        domains: ['Storms', 'Destruction', 'Chaos'],
        symbol: 'Three lightning bolts radiating from a central point',
        pantheon: 'Faerûnian',
        titles: ['The Storm Lord', 'Destroyer'],
        worshippers: ['Stormcallers', 'Barbarians', 'Destructive Cults'],
        lore: `Talos is the god of storms and destruction, worshipped by those who revel in chaos and power. He is known for his unpredictable temper and his ability to unleash devastating storms upon the world. His followers seek to emulate his destructive might, and his temples are often struck by lightning or built in places of natural power. The symbol of Talos is a warning of the chaos he brings.`
      }
    ]
  },
  history: {
    founding: 'Founded as a small fishing village, Luskan grew into a major port city and pirate haven.',
    majorEvents: [
      'The Arcane Brotherhood took control of the city',
      'The Hosttower of the Arcane was destroyed',
      'The city became a center for arcane research',
      'The city\'s pirate past continues to influence its culture'
    ],
    currentEra: 'The city is currently under the control of the Arcane Brotherhood, who use it as a base for their magical research.'
  },
  notableFeatures: [
    'The Hosttower Ruins: Remains of the Arcane Brotherhood\'s former headquarters',
    'The Pirate Coves: Hidden harbors used by smugglers and pirates',
    'The Arcane Quarter: Center of magical research and trade',
    'The Docks: Bustling port area with ships from across the Sword Coast'
  ],
  keyFigures: [
    {
      id: 'highcaptain',
      name: 'High Captain Kurth',
      title: 'Former Ruler',
      era: 'Recent Past',
      significance: 'Last of the High Captains before the Arcane Brotherhood took control. Known for his attempts to maintain order in the chaotic city.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Kurth&backgroundColor=c0aede&hair=shortHair&hairColor=000000&skinColor=f8d25c`,
      avatarStyle: 'avataaars'
    },
    {
      id: 'archmage',
      name: 'Archmage Arklem Greeth',
      title: 'Arcane Brotherhood Leader',
      era: 'Current',
      significance: 'Powerful lich who leads the Arcane Brotherhood. His rule has brought both stability and fear to the city.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Arklem&backgroundColor=c0aede&hair=shortHair&hairColor=000000&skinColor=f8d25c`,
      avatarStyle: 'avataaars'
    }
  ],
  economy: {
    primaryIndustry: 'Maritime Trade and Arcane Research',
    gdp: '1.8 million gold pieces annually',
    currency: 'Luskan Mark (floating exchange rate)',
    tradeGoods: [
      {
        name: 'Arcane Knowledge',
        type: 'export',
        value: 'Extremely High',
        tariff: '25% for non-Brotherhood members',
        description: 'Magical research and arcane secrets'
      },
      {
        name: 'Shipbuilding',
        type: 'export',
        value: 'High',
        tariff: '15%',
        description: 'Custom vessels and magical ship components'
      }
    ],
    tradePartners: [
      {
        name: 'Hosttower of the Arcane',
        relationship: 'Controlled',
        primaryGoods: ['Arcane Knowledge', 'Magical Items'],
        tradeAgreement: 'Exclusive rights to certain magical exports'
      }
    ],
    transportationRoutes: [
      {
        name: 'Sea of Swords',
        type: 'sea',
        description: 'Main maritime trade route',
        security: 'Pirate-infested, but profitable',
        frequency: 'Weekly convoys'
      }
    ],
    economicPolicies: [
      'Arcane Brotherhood trade monopolies',
      'Pirate-friendly port policies',
      'No questions asked on cargo',
      'High tariffs on competing magical goods'
    ],
    marketRegulations: [
      'Arcane item registration required',
      'Ship registration fees',
      'Brotherhood licensing for magical trade',
      'Minimal oversight on general goods'
    ]
  },
  seasons: [
    {
      name: 'Summer',
      description: 'The only season in Luskan, characterized by cold winds and frequent storms. The sea is most navigable during this time.',
      activities: ['Pirate gatherings', 'Arcane research', 'Ship repairs'],
      hazards: ['Storms', 'Rough seas', 'Cold winds'],
      magicalEffects: ['Enhanced storm magic', 'Arcane amplification']
    }
  ],
  magicalItems: [
    {
      name: 'Hosttower Crystal',
      type: 'Artifact',
      description: 'A powerful magical crystal that once powered the Hosttower',
      rarity: 'Legendary',
      location: 'Arcane Quarter',
      history: 'Created by the Arcane Brotherhood to power their tower',
      effects: ['Arcane power source', 'Spell amplification', 'Magical detection']
    },
    {
      name: 'Pirate\'s Compass',
      type: 'Wondrous Item',
      description: 'A magical compass that always points to treasure',
      rarity: 'Rare',
      location: 'Pirate Coves',
      history: 'Created by a legendary pirate captain',
      effects: ['Treasure detection', 'Navigation aid', 'Weather prediction']
    }
  ],
  dungeons: [
    {
      id: 'hosttower-ruins',
      name: 'Hosttower Ruins',
      description: 'The remains of the Arcane Brotherhood\'s headquarters, now home to dangerous magical creatures.',
      challengeRating: 8,
      location: {
        region: 'Luskan',
        environment: 'Indoor'
      },
      encounters: ['cultist-initiation', 'goblin-ambush', 'kobold-den'],
      treasure: {
        gold: 8000,
        gems: [
          { type: 'Arcane Crystal', value: 4000 },
          { type: 'Spell Gem', value: 5000 }
        ],
        art: [
          { type: 'Magical Tapestry', value: 3000 },
          { type: 'Arcane Artifact', value: 4000 }
        ],
        magicItems: [
          { name: 'Archmage\'s Staff', rarity: 'Rare' },
          { name: 'Spellbook', rarity: 'Very Rare' }
        ]
      }
    },
    {
      id: 'pirate-coves',
      name: 'Pirate Coves',
      description: 'A network of hidden coves used by pirates to store their loot and plan their raids.',
      challengeRating: 6,
      location: {
        region: 'Luskan',
        environment: 'Coastal'
      },
      encounters: ['cultist-initiation', 'goblin-ambush', 'kobold-den'],
      treasure: {
        gold: 6000,
        gems: [
          { type: 'Pearl', value: 3000 },
          { type: 'Coral', value: 2500 }
        ],
        art: [
          { type: 'Ship Figurehead', value: 2000 },
          { type: 'Pirate Flag', value: 1500 }
        ],
        magicItems: [
          { name: 'Pirate\'s Cutlass', rarity: 'Uncommon' },
          { name: 'Treasure Map', rarity: 'Rare' }
        ]
      }
    }
  ],
  pointsOfInterest: [],
  restAreas: [],
  shops: [
    {
      id: '1',
      name: 'The Arcane Emporium',
      type: 'Magic Shop',
      description: 'A shop specializing in arcane components and magical items',
      owner: 'Archmage\'s Apprentice',
      inventory: [
        {
          id: '1',
          name: 'Arcane Focus',
          description: 'A crystal focus for spellcasting',
          cost: '10 gp',
          rarity: 'Common',
          type: 'Spellcasting Focus',
          quantity: 5
        },
        {
          id: '2',
          name: 'Spell Scroll',
          description: 'A scroll containing a random 1st-level spell',
          cost: '50 gp',
          rarity: 'Uncommon',
          type: 'Scroll',
          quantity: 3
        },
        {
          id: '21',
          name: 'Necromantic Tome',
          description: 'A forbidden book of dark magic',
          cost: '1000 gp',
          rarity: 'Rare',
          type: 'Book',
          quantity: 1
        },
        {
          id: '22',
          name: 'Arcane Lock Scroll',
          description: 'Scroll containing the arcane lock spell',
          cost: '200 gp',
          rarity: 'Uncommon',
          type: 'Scroll',
          quantity: 2
        },
        {
          id: '23',
          name: 'Potion of Darkvision',
          description: 'Grants darkvision for 8 hours',
          cost: '150 gp',
          rarity: 'Uncommon',
          type: 'Potion',
          quantity: 3
        },
        {
          id: '24',
          name: 'Arcane Lockpick',
          description: 'Magical tool for bypassing arcane locks',
          cost: '300 gp',
          rarity: 'Rare',
          type: 'Tool',
          quantity: 1
        },
        {
          id: '25',
          name: 'Scroll of Detect Magic',
          description: 'Scroll containing the detect magic spell',
          cost: '50 gp',
          rarity: 'Common',
          type: 'Scroll',
          quantity: 5
        },
        {
          id: '26',
          name: 'Arcane Dust',
          description: 'Essential component for many spells',
          cost: '25 gp',
          rarity: 'Common',
          type: 'Component',
          quantity: 15
        },
        {
          id: '27',
          name: 'Potion of Mind Reading',
          description: 'Allows reading surface thoughts for 1 hour',
          cost: '200 gp',
          rarity: 'Uncommon',
          type: 'Potion',
          quantity: 2
        },
        {
          id: '28',
          name: 'Arcane Lock Kit',
          description: 'Set of tools for creating arcane locks',
          cost: '500 gp',
          rarity: 'Rare',
          type: 'Tool',
          quantity: 1
        }
      ],
      specialties: ['Arcane Components', 'Spell Scrolls', 'Magical Items'],
      services: ['Spell Identification', 'Scroll Scribing', 'Arcane Consultation']
    },
    {
      id: '2',
      name: 'The Black Sail Market',
      type: 'General Store',
      description: 'A market stall selling various goods, both legal and illegal',
      owner: 'Captain Blackbeard',
      inventory: [
        {
          id: '3',
          name: 'Smuggled Goods',
          description: 'Various items of questionable origin',
          cost: 'Varies',
          rarity: 'Uncommon',
          type: 'Miscellaneous',
          quantity: 10
        },
        {
          id: '29',
          name: 'Forged Documents',
          description: 'High-quality forged identification papers',
          cost: '100 gp',
          rarity: 'Uncommon',
          type: 'Document',
          quantity: 5
        },
        {
          id: '30',
          name: 'Lockpicking Tools',
          description: 'Professional set of lockpicking tools',
          cost: '50 gp',
          rarity: 'Common',
          type: 'Tool',
          quantity: 3
        },
        {
          id: '31',
          name: 'Smuggler\'s Map',
          description: 'Detailed map of secret trade routes',
          cost: '200 gp',
          rarity: 'Uncommon',
          type: 'Map',
          quantity: 1
        },
        {
          id: '32',
          name: 'Stolen Artifact',
          description: 'Ancient artifact of unknown origin',
          cost: '500 gp',
          rarity: 'Rare',
          type: 'Artifact',
          quantity: 1
        },
        {
          id: '33',
          name: 'Disguise Kit',
          description: 'Professional disguise kit with various materials',
          cost: '75 gp',
          rarity: 'Uncommon',
          type: 'Tool',
          quantity: 2
        },
        {
          id: '34',
          name: 'Smuggler\'s Compass',
          description: 'Magical compass that points to safe harbors',
          cost: '300 gp',
          rarity: 'Rare',
          type: 'Tool',
          quantity: 1
        },
        {
          id: '35',
          name: 'Forged Seal',
          description: 'Replica of official city seal',
          cost: '150 gp',
          rarity: 'Uncommon',
          type: 'Tool',
          quantity: 1
        },
        {
          id: '36',
          name: 'Smuggler\'s Boots',
          description: 'Silent boots with hidden compartments',
          cost: '100 gp',
          rarity: 'Uncommon',
          type: 'Clothing',
          quantity: 2
        },
        {
          id: '37',
          name: 'Black Market Contacts',
          description: 'List of contacts in various cities',
          cost: '250 gp',
          rarity: 'Rare',
          type: 'Information',
          quantity: 1
        }
      ],
      specialties: ['Smuggled Goods', 'Pirate Supplies', 'Rare Items'],
      services: ['Smuggling', 'Information Gathering', 'Black Market Access']
    }
  ]
} 