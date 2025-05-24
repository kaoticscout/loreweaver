import { City } from '../../../../../types/city'
import { generateDungeonEncounters, addRandomUniqueEncounters } from '../../../../../utils/dungeon-generator'
import { levelEncounters } from '../../dungeon-encounters/level-encounters'
import { DungeonEncounter } from '../../../../../types/dungeon-encounter'
import { getRandomEncounters } from '../../../../../utils/encounter-generator'

export const helmsHold: City = {
  id: '2',
  name: "Helm's Hold",
  description: 'A fortified town built around the Great Temple of Helm, where the divine and the mundane coexist in perfect harmony. The town is surrounded by high stone walls, their surfaces covered in intricate carvings depicting scenes of protection and vigilance. The Great Temple stands at the center of the town, its white marble walls gleaming in the sunlight, while the High Watcher\'s Tower rises beside it, a constant reminder of Helm\'s watchful presence. The streets are clean and well-maintained, lined with buildings that combine practical design with religious symbolism. The air is filled with the sound of temple bells and the gentle murmur of prayers, while the scent of incense and healing herbs wafts through the town.',
  coordinates: [1, 1],
  images: ['/art/environments/sword-coast/1920x1080-terrain-wa.png', '/art/environments/sword-coast/1920x1080-terrain-wa.png', '/art/environments/sword-coast/1920x1080-terrain-wa.png'],
  banner: '/art/banners/crystal-caverns.jpg',
  basicInformation: {
    population: '5,000',
    primaryRaces: ['Humans', 'Half-Elves'],
    wealthClass: 'Middle',
    politicalStructure: 'Theocratic Council',
    deities: [
      {
        name: 'Helm',
        domain: 'Protection',
        alignment: 'Lawful Neutral',
        image: '/art/deities/Helm.png',
        domains: ['Protection', 'Vigilance', 'Law'],
        symbol: 'Open gauntlet',
        pantheon: 'Faerûnian',
        titles: ['The Watcher', 'The Vigilant One'],
        worshippers: ['Guards', 'Paladins', 'Judges', 'Protectors'],
        lore: `Helm is the god of guardians, protectors, and those who watch over others. Known for his unwavering vigilance and dedication, Helm is revered by those who value duty and self-sacrifice. His temples are often fortified structures, and his priests are known for their discipline and readiness to defend the innocent. The open gauntlet symbolizes his ever-watchful presence.`
      },
      {
        name: 'Ilmater',
        domain: 'Endurance',
        alignment: 'Lawful Good',
        image: '/art/deities/Ilmater.png',
        domains: ['Endurance', 'Martyrdom', 'Compassion'],
        symbol: 'Pair of white hands bound at the wrist with a red cord',
        pantheon: 'Faerûnian',
        titles: ['The Crying God', 'The Broken God'],
        worshippers: ['Healers', 'Martyrs', 'The Oppressed'],
        lore: `Ilmater is the god of endurance, suffering, and perseverance. He is revered by those who endure hardship for the sake of others, and his followers are known for their compassion and willingness to take on the suffering of others. Temples to Ilmater are places of healing and refuge, and his priests are often found aiding the sick and the poor. The symbol of Ilmater is a reminder of the strength found in compassion and sacrifice.`
      }
    ]
  },
  history: {
    founding: 'Founded as a temple to Helm, the settlement grew into a fortified town.',
    majorEvents: [
      'The construction of the Great Temple',
      'The establishment of the High Watcher\'s order',
      'The town became a center for religious learning',
      'The town\'s defenses were tested during the Spellplague'
    ],
    currentEra: 'The town remains a bastion of Helm\'s faith and a center for religious learning.'
  },
  notableFeatures: [
    'The Great Temple: Center of Helm\'s worship',
    'The High Watcher\'s Tower: Home of the town\'s religious leaders',
    'The Temple Crypts: Ancient burial chambers',
    'The Training Grounds: Where Helm\'s faithful learn to protect others'
  ],
  keyFigures: [
    {
      id: 'highwatcher',
      name: 'High Watcher Ilmeth',
      title: 'Current Leader',
      era: 'Current',
      significance: 'Renowned healer and spiritual leader of Helm\'s Hold. Known for her work in developing new healing techniques and her diplomatic skills.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Ilmeth&backgroundColor=c0aede&hair=shortHair&hairColor=000000&skinColor=f8d25c`,
      avatarStyle: 'avataaars'
    },
    {
      id: 'brother',
      name: 'Brother Anthus',
      title: 'Founder',
      era: 'Ancient',
      significance: 'Established the first temple of Helm in the region. His vision of combining healing with spiritual guidance continues to influence the Hold\'s practices.',
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Anthus&backgroundColor=c0aede&hair=shortHair&hairColor=000000&skinColor=f8d25c`,
      avatarStyle: 'avataaars'
    }
  ],
  economy: {
    primaryIndustry: 'Healing and Religious Services',
    gdp: '800,000 gold pieces annually',
    currency: "Helm's Blessing (backed by temple reserves)",
    tradeGoods: [
      {
        name: 'Healing Services',
        type: 'export',
        value: 'Very High',
        tariff: 'None (considered essential service)',
        description: 'Advanced healing and restoration services'
      },
      {
        name: 'Holy Symbols',
        type: 'export',
        value: 'Medium',
        tariff: '5% for non-faithful',
        description: 'Consecrated items and religious artifacts'
      }
    ],
    tradePartners: [
      {
        name: 'Neverwinter',
        relationship: 'Close Cooperation',
        primaryGoods: ['Medical Supplies', 'Religious Artifacts'],
        tradeAgreement: 'Special status for healing services'
      }
    ],
    transportationRoutes: [
      {
        name: 'Temple Road',
        type: 'land',
        description: 'Main access road to Neverwinter',
        security: 'Patrolled by temple guards',
        frequency: 'Daily'
      }
    ],
    economicPolicies: [
      'Healing services available to all regardless of wealth',
      'Temple-supported local agriculture',
      'Pilgrim accommodation subsidies',
      'Religious artifact trade regulations'
    ],
    marketRegulations: [
      'Healing service quality standards',
      'Herb cultivation guidelines',
      'Pilgrim service pricing controls',
      'Religious artifact authentication'
    ]
  },
  seasons: [
    {
      name: 'Spring',
      description: 'The healing springs are at their most potent, and the temple gardens begin to bloom with medicinal herbs.',
      activities: ['Healing festivals', 'Herb gathering', 'Pilgrimage'],
      hazards: ['Flooding', 'Mudslides'],
      magicalEffects: ['Enhanced healing magic', 'Herb potency increase']
    },
    {
      name: 'Summer',
      description: 'The hot springs provide relief from the summer heat, and the temple gardens are in full bloom.',
      activities: ['Garden festivals', 'Temple open house', 'Healing workshops'],
      hazards: ['Heat waves', 'Drought'],
      magicalEffects: ['Solar healing', 'Water magic enhancement']
    }
  ],
  magicalItems: [
    {
      name: 'Helm\'s Shield',
      type: 'Artifact',
      description: 'A legendary shield blessed by Helm himself',
      rarity: 'Legendary',
      location: 'Great Temple',
      history: 'Created by Helm to protect his most faithful followers',
      effects: ['Divine protection', 'Shield of faith', 'Protection from evil']
    },
    {
      name: 'High Watcher\'s Mace',
      type: 'Weapon',
      description: 'A powerful mace wielded by the High Watcher',
      rarity: 'Rare',
      location: 'High Watcher\'s Tower',
      history: 'Passed down through generations of High Watchers',
      effects: ['Smite evil', 'Divine strike', 'Protection aura']
    }
  ],
  dungeons: [
    {
      id: 'temple-crypts',
      name: 'Temple Crypts',
      description: 'Ancient crypts beneath a ruined temple, filled with undead guardians and forgotten treasures.',
      challengeRating: 5,
      location: {
        region: 'Helms Hold',
        environment: 'Underground'
      },
      encounters: ['cultist-initiation', 'goblin-ambush', 'kobold-den'],
      treasure: {
        gold: 5000,
        gems: [
          { type: 'Ruby', value: 1000 },
          { type: 'Diamond', value: 2000 }
        ],
        art: [
          { type: 'Golden Idol', value: 1500 }
        ],
        magicItems: [
          { name: 'Staff of Healing', rarity: 'Rare' }
        ]
      }
    }
  ],
  pointsOfInterest: [
    {
      id: '1',
      name: 'The Great Temple of Helm',
      description: 'The central place of worship and healing',
      type: 'Religious',
      significance: 'Center of healing and protection',
      notableFeatures: ['Healing springs', 'Sacred relics', 'Training grounds'],
      associatedFigures: ['High Watcher', 'Temple Guards', 'Healing Priests']
    }
  ],
  restAreas: [
    {
      id: '1',
      name: 'The Healing House',
      description: 'A place of rest and recovery for visitors',
      type: 'Inn',
      quality: 'High',
      price: 'Moderate',
      amenities: ['Healing services', 'Private rooms', 'Herbal remedies', 'Security']
    }
  ],
  shops: [
    {
      id: '1',
      name: 'The Herb Garden',
      type: 'Apothecary',
      description: 'A shop specializing in medicinal herbs and healing supplies',
      owner: 'Sister Althaea',
      inventory: [
        {
          id: '1',
          name: 'Healing Potion',
          description: 'Restores 2d4+2 hit points',
          cost: '50 gp',
          rarity: 'Common',
          type: 'Potion',
          quantity: 10
        },
        {
          id: '38',
          name: 'Greater Healing Potion',
          description: 'Restores 4d4+4 hit points',
          cost: '100 gp',
          rarity: 'Uncommon',
          type: 'Potion',
          quantity: 5
        },
        {
          id: '39',
          name: 'Holy Water',
          description: 'Blessed water that harms undead and fiends',
          cost: '25 gp',
          rarity: 'Common',
          type: 'Holy Item',
          quantity: 8
        },
        {
          id: '40',
          name: 'Antitoxin',
          description: 'Provides advantage on saving throws against poison',
          cost: '50 gp',
          rarity: 'Common',
          type: 'Medicine',
          quantity: 6
        },
        {
          id: '41',
          name: 'Healer\'s Kit',
          description: 'Complete set of medical supplies',
          cost: '5 gp',
          rarity: 'Common',
          type: 'Tool',
          quantity: 4
        },
        {
          id: '42',
          name: 'Potion of Lesser Restoration',
          description: 'Ends one disease or condition',
          cost: '150 gp',
          rarity: 'Uncommon',
          type: 'Potion',
          quantity: 3
        },
        {
          id: '43',
          name: 'Herbal Medicine Kit',
          description: 'Collection of medicinal herbs and tools',
          cost: '75 gp',
          rarity: 'Uncommon',
          type: 'Tool',
          quantity: 2
        },
        {
          id: '44',
          name: 'Potion of Cure Disease',
          description: 'Cures any disease',
          cost: '200 gp',
          rarity: 'Uncommon',
          type: 'Potion',
          quantity: 2
        },
        {
          id: '45',
          name: 'Blessed Bandages',
          description: 'Magically enhanced healing bandages',
          cost: '30 gp',
          rarity: 'Common',
          type: 'Medicine',
          quantity: 10
        },
        {
          id: '46',
          name: 'Potion of Remove Curse',
          description: 'Removes one curse',
          cost: '300 gp',
          rarity: 'Rare',
          type: 'Potion',
          quantity: 1
        }
      ],
      specialties: ['Medicinal Herbs', 'Healing Potions', 'Holy Water'],
      services: ['Herb Gathering', 'Potion Brewing', 'Healing Consultation']
    }
  ]
} 