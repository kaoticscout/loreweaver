import { Item } from '../../../../types/item'

export const items: Item[] = [
  {
    id: 'sandevistan-mk3',
    name: 'Sandevistan Mk.3',
    description: 'Military-grade reflex booster that slows perceived time, allowing for superhuman reaction speeds. This advanced model features extended duration and reduced cooldown.',
    type: 'Cyberware',
    rarity: 'Legendary',
    value: '75000€$',
    image: '/images/items/cyberware/sandevistan-mk3.png',
    properties: [
      'Operating System Slot',
      'Neural Link Required'
    ],
    effects: [
      'Time Dilation: Slows perceived time by 75%',
      'Enhanced Reflexes: +5 to all reaction-based checks',
      'Combat Advantage: +3 to hit in combat while active',
      'Extended Duration: 8 seconds of active time',
      'Reduced Strain: 15 second cooldown'
    ],
    requirements: [
      'Level 15',
      'Reflexes 16'
    ]
  },
  {
    id: 'mantis-blades-premium',
    name: 'Mantis Blades Premium',
    description: 'High-end concealed arm blades with mono-molecular edges and thermal coating. Features advanced targeting systems and enhanced durability.',
    type: 'Cyberware',
    rarity: 'Epic',
    value: '45000€$',
    image: '/images/items/cyberware/mantis-blades-premium.png',
    properties: [
      'Arms Slot',
      'Concealed Weapon'
    ],
    effects: [
      'Concealed Weapons: Hidden until deployed',
      'Thermal Damage: Additional heat damage on hit',
      'Targeting Assist: +2 to hit in melee combat',
      'Wall Climbing: Can climb suitable surfaces',
      'Mono-Edge: Ignores 2 points of armor'
    ],
    requirements: [
      'Level 12',
      'Reflexes 14',
      'Body 12'
    ]
  },
  {
    id: 'kiroshi-optics-elite',
    name: 'Kiroshi Optics Elite',
    description: 'Top-of-the-line optical implants featuring multiple vision modes, targeting assistance, and information overlay systems.',
    type: 'Cyberware',
    rarity: 'Epic',
    value: '35000€$',
    image: '/images/items/cyberware/kiroshi-optics-elite.png',
    properties: [
      'Eyes Slot',
      'Neural Link Compatible'
    ],
    effects: [
      'Night Vision: See in darkness',
      'Thermal Vision: Detect heat signatures',
      'Zoom: Up to 5x magnification',
      'Target Analysis: Automatic threat assessment',
      'Information Overlay: Real-time data display'
    ],
    requirements: [
      'Level 10',
      'Intelligence 12'
    ]
  },
  {
    id: 'subdermal-armor',
    name: 'Subdermal Armor',
    description: 'Military-grade subdermal plating that provides significant protection without visible external signs. Uses advanced materials for maximum protection with minimal bulk.',
    type: 'Cyberware',
    rarity: 'Rare',
    value: '30000€$',
    image: '/images/items/cyberware/subdermal-armor.png',
    properties: [
      'Skin Slot',
      'Concealed Enhancement'
    ],
    effects: [
      'Armor Boost: +3 to armor rating',
      'Impact Protection: Reduce physical damage by 2',
      'Concealed Defense: No visible signs of armor',
      'Temperature Regulation: Resistance to environmental effects',
      'Durability: Self-repairing capabilities'
    ],
    requirements: [
      'Level 8',
      'Body 14'
    ]
  },
  {
    id: 'neural-processor',
    name: 'Neural Processor',
    description: 'Advanced neural co-processor that enhances cognitive functions and provides direct neural interface capabilities for hacking and information processing.',
    type: 'Cyberware',
    rarity: 'Epic',
    value: '40000€$',
    image: '/images/items/cyberware/neural-processor.png',
    properties: [
      'Neural Slot',
      'Advanced Processing Unit'
    ],
    effects: [
      'Quick Hacking: +3 to hacking attempts',
      'Information Processing: Enhanced data analysis',
      'Neural Interface: Direct system connections',
      'Memory Enhancement: Improved recall',
      'Multi-tasking: Handle multiple processes'
    ],
    requirements: [
      'Level 10',
      'Intelligence 14',
      'Cool 12'
    ]
  }
] 