import { Region } from '../../../../types/region'
import { luskan } from '../cities/luskan'
import { illusk } from '../cities/illusk'

export const luskanRegion: Region = {
  id: '2',
  name: 'Luskan',
  description: 'The City of Sails, a rough port city ruled by the Arcane Brotherhood.',
  biography: `Once a proud member of the Lords' Alliance, Luskan has fallen under the control of the Arcane Brotherhood. 
  The city is known for its rough-and-tumble atmosphere, where might makes right and magic rules supreme. 
  The Hosttower of the Arcane, a massive magical structure, dominates the city's skyline. 
  Despite its dangerous reputation, Luskan remains a crucial trading port in the North.`,
  color: 'from-black-900 to-gray-900',
  banner: '/art/banners/crystal-caverns.jpg',
  notableFeatures: [
    'Hosttower of the Arcane',
    'The Five Ships',
    'The Cutlass',
    'Shipwrights\' House',
    'The Arcane Brotherhood Headquarters',
    'The Black Sail Market'
  ],
  history: {
    founding: 'Founded in 1297 DR by pirates and traders, the region quickly became a major port in the North. The early history is marked by constant power struggles between various pirate factions.',
    majorEvents: [
      'The construction of the Hosttower of the Arcane in 1307 DR',
      'The fall of the High Captains and rise of the Arcane Brotherhood',
      'The region\'s expulsion from the Lords\' Alliance',
      'The recent conflict with the Drow of Menzoberranzan',
      'The destruction of the Hosttower during the Spellplague',
      'The reconstruction of the Hosttower under the Arcane Brotherhood'
    ],
    currentEra: 'Currently under the control of the Arcane Brotherhood, the region remains a dangerous but profitable port. The area has become a center for magical research, though often of a darker nature.'
  },
  keyFigures: [
    {
      id: 'region-arklem',
      name: 'Archmage Arklem Greeth',
      title: 'Arcane Brotherhood Leader',
      era: 'Current',
      significance: 'Powerful lich who leads the Arcane Brotherhood. His rule has brought both stability and fear to the region.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Arklem&backgroundColor=c0aede&hair=shortHair&hairColor=000000&skinColor=f8d25c`,
      avatarStyle: 'avataaars'
    },
    {
      id: 'region-jarlaxle',
      name: 'Jarlaxle Baenre',
      title: 'Mercenary Leader',
      era: 'Current',
      significance: 'Drow mercenary leader who maintains a significant presence in the region. Known for his flamboyant style and complex political maneuvers.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Jarlaxle&backgroundColor=c0aede&hair=shortHair&hairColor=000000&skinColor=2c1810`,
      avatarStyle: 'avataaars'
    }
  ],
  economy: {
    primaryIndustry: 'Maritime Trade and Arcane Research',
    gdp: '3 million gold pieces annually',
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
      },
      {
        name: 'Exotic Goods',
        type: 'export',
        value: 'Very High',
        tariff: '20%',
        description: 'Rare items from distant lands'
      }
    ],
    tradePartners: [
      {
        name: 'Hosttower of the Arcane',
        relationship: 'Controlled',
        primaryGoods: ['Arcane Knowledge', 'Magical Items'],
        tradeAgreement: 'Exclusive rights to certain magical exports'
      },
      {
        name: 'Pirate Fleets',
        relationship: 'Unofficial',
        primaryGoods: ['Exotic Goods', 'Information'],
        tradeAgreement: 'No official agreement, but regular business'
      }
    ],
    transportationRoutes: [
      {
        name: 'Sea of Swords',
        type: 'sea',
        description: 'Main maritime trade route',
        security: 'Pirate-infested, but profitable',
        frequency: 'Weekly convoys'
      },
      {
        name: 'Hosttower Teleportation',
        type: 'magical',
        description: 'Restricted to Brotherhood members',
        security: 'Heavily guarded',
        frequency: 'As needed'
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
      season: 'Summer',
      description: 'The only season in Luskan, characterized by cold winds and frequent storms. The sea is most navigable during this time.',
      economicImpact: 'Peak trading season when the sea is most navigable. The Arcane Brotherhood\'s magical protections are strongest.',
      tradeModifiers: {
        exports: {
          'Arcane Knowledge': 1.3,
          'Shipbuilding': 1.4,
          'Exotic Goods': 1.5
        },
        imports: {
          'Arcane Components': 1.2
        }
      },
      specialEvents: [
        'Summer Storm Festival',
        'Pirate\'s Gathering',
        'Arcane Brotherhood Exhibition'
      ]
    }
  ],
  magicalItems: [
    {
      id: 'region-hosttower-staff',
      name: 'Staff of the Arcane Brotherhood',
      type: 'Artifact',
      rarity: 'Legendary',
      description: 'A powerful staff once wielded by the Archmage of the Hosttower.',
      effects: [
        'Can cast any wizard spell of 5th level or lower',
        'Stores up to 50 spell levels',
        'Grants advantage on Arcana checks'
      ],
      location: 'Hosttower of the Arcane',
      requirements: [
        'Must be a wizard',
        'Requires attunement'
      ],
      value: '50,000 gold pieces',
      image: '🔮'
    },
    {
      id: 'region-pirate-compass',
      name: 'Captain\'s Compass',
      type: 'Utility',
      rarity: 'Rare',
      description: 'A magical compass that always points to the nearest treasure.',
      effects: [
        'Detects nearest valuable item within 1 mile',
        'Provides advantage on Navigation checks',
        'Can cast Locate Object once per day'
      ],
      location: 'The Cutlass Tavern',
      requirements: [],
      value: '3,000 gold pieces',
      image: '🧭'
    }
  ],
  cities: [luskan, illusk]
} 