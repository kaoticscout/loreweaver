import { Item } from '../../../../types/item'

export const items: Item[] = [
  {
    id: 'trauma-team-maxdoc',
    name: 'Trauma Team MaxDoc',
    description: 'Premium-grade healing autoinjector developed by Trauma Team. Features advanced nanites and synthetic healing agents for rapid recovery.',
    type: 'Consumable',
    rarity: 'Epic',
    value: '1500€$',
    image: '/images/items/consumables/trauma-maxdoc.png',
    properties: [
      'Single Use',
      'Quick Action',
      'Medical',
      'Nanite Enhanced'
    ],
    effects: [
      'Rapid Healing: Restore 75% health instantly',
      'Regeneration: Heal 5% health per turn for 5 turns',
      'Pain Suppression: Reduce incoming damage by 20% for 3 turns',
      'Toxin Removal: Cure poison effects',
      'Stabilization: Prevent bleeding effects'
    ],
    requirements: [
      'Level 5'
    ]
  },
  {
    id: 'militech-combat-booster',
    name: 'Militech Combat Booster',
    description: 'Military-grade performance enhancer that temporarily boosts combat capabilities. Standard issue for Militech special forces.',
    type: 'Consumable',
    rarity: 'Rare',
    value: '1000€$',
    image: '/images/items/consumables/militech-booster.png',
    properties: [
      'Single Use',
      'Quick Action',
      'Combat Enhancement',
      'Synthetic Stimulant'
    ],
    effects: [
      'Combat Focus: +2 to all combat rolls',
      'Enhanced Reflexes: +3 to initiative',
      'Pain Resistance: Reduce incoming damage by 15%',
      'Heightened Senses: +2 to perception checks',
      'Duration: 5 combat rounds'
    ],
    requirements: [
      'Level 8',
      'Body 10'
    ]
  },
  {
    id: 'rogue-netrunner-ram',
    name: 'Rogue Netrunner RAM',
    description: 'Black market memory booster that temporarily enhances neural processing and hacking capabilities. Popular among independent netrunners.',
    type: 'Consumable',
    rarity: 'Epic',
    value: '2000€$',
    image: '/images/items/consumables/netrunner-ram.png',
    properties: [
      'Single Use',
      'Quick Action',
      'Neural Booster',
      'RAM Enhancement'
    ],
    effects: [
      'RAM Boost: +5 maximum RAM',
      'Neural Processing: +2 to hacking attempts',
      'Data Compression: Reduce RAM cost of hacks by 1',
      'Neural Recovery: Regenerate 1 RAM per turn',
      'Duration: 10 turns'
    ],
    requirements: [
      'Level 10',
      'Intelligence 12'
    ]
  },
  {
    id: 'arasaka-focus-enhancer',
    name: 'Arasaka Focus Enhancer',
    description: 'Corporate-grade cognitive enhancer that improves mental acuity and decision making. Standard equipment for Arasaka executives.',
    type: 'Consumable',
    rarity: 'Rare',
    value: '1200€$',
    image: '/images/items/consumables/arasaka-focus.png',
    properties: [
      'Single Use',
      'Quick Action',
      'Mental Enhancement',
      'Cognitive Booster'
    ],
    effects: [
      'Mental Clarity: +2 to all mental checks',
      'Quick Thinking: +1 action per turn',
      'Enhanced Memory: Perfect recall during duration',
      'Decision Enhancement: Advantage on strategy rolls',
      'Duration: 1 hour'
    ],
    requirements: [
      'Level 6',
      'Intelligence 10'
    ]
  },
  {
    id: 'street-doc-patch',
    name: 'Street Doc Patch',
    description: 'Affordable healing patch that provides basic medical treatment. Common among street gangs and local clinics.',
    type: 'Consumable',
    rarity: 'Common',
    value: '300€$',
    image: '/images/items/consumables/street-patch.png',
    properties: [
      'Single Use',
      'Quick Action',
      'Medical',
      'Basic Treatment'
    ],
    effects: [
      'Basic Healing: Restore 40% health',
      'Pain Relief: Reduce incoming damage by 10% for 2 turns',
      'Stabilization: Stop bleeding effects',
      'Affordable Treatment: No side effects',
      'Quick Application: Use as free action once per turn'
    ],
    requirements: [
      'None'
    ]
  }
] 