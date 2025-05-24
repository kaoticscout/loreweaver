import { Item } from '../../../../types/item'

export const items: Item[] = [
  {
    id: 'militech-crusher',
    name: 'Militech Crusher',
    description: 'High-powered smart pistol with integrated targeting system and customizable ammunition types. Features Militech\'s latest recoil compensation technology.',
    type: 'Weapon',
    rarity: 'Epic',
    value: '35000€$',
    image: '/images/items/weapons/militech-crusher.png',
    properties: [
      'Smart Weapon',
      'One-handed',
      'Light',
      'Auto-targeting'
    ],
    effects: [
      'Smart Targeting: +2 to hit against moving targets',
      'Customizable Ammo: Compatible with standard and smart rounds',
      'Recoil Compensation: Reduced penalty for rapid fire',
      'Digital Scope: Enhanced accuracy at medium range',
      'Neural Link Compatible: Additional features with cyberware'
    ],
    requirements: [
      'Level 10',
      'Reflexes 12'
    ]
  },
  {
    id: 'tsunami-nekomata',
    name: 'Tsunami Nekomata',
    description: 'Advanced tech sniper rifle with charged shot capability and wall penetration. Features state-of-the-art optics and stabilization systems.',
    type: 'Weapon',
    rarity: 'Legendary',
    value: '65000€$',
    image: '/images/items/weapons/tsunami-nekomata.png',
    properties: [
      'Tech Weapon',
      'Two-handed',
      'Heavy',
      'Charged Shot'
    ],
    effects: [
      'Charged Shot: Penetrate cover when fully charged',
      'Advanced Optics: +3 to hit at long range',
      'Stabilization: Reduced penalty when moving',
      'Material Analysis: Highlight weak points',
      'Extended Magazine: 8 round capacity'
    ],
    requirements: [
      'Level 15',
      'Reflexes 14',
      'Body 12'
    ]
  },
  {
    id: 'arasaka-nodachi',
    name: 'Arasaka Nodachi',
    description: 'Mono-molecular blade with thermal edge enhancement and advanced balance systems. A masterpiece of Arasaka\'s weapon division.',
    type: 'Weapon',
    rarity: 'Epic',
    value: '45000€$',
    image: '/images/items/weapons/arasaka-nodachi.png',
    properties: [
      'Melee Weapon',
      'Two-handed',
      'Thermal Edge',
      'Balanced'
    ],
    effects: [
      'Mono-Edge: Ignore 3 points of armor',
      'Thermal Damage: Additional heat damage on hit',
      'Perfect Balance: +2 to parry attempts',
      'Quick Draw: Reduced action cost to equip',
      'Neural Link Compatible: Enhanced control with cyberware'
    ],
    requirements: [
      'Level 12',
      'Reflexes 14',
      'Body 12'
    ]
  },
  {
    id: 'kang-tao-dian',
    name: 'Kang Tao Dian',
    description: 'Cutting-edge smart submachine gun with multiple target tracking and burst fire optimization. Features Kang Tao\'s proprietary targeting system.',
    type: 'Weapon',
    rarity: 'Epic',
    value: '40000€$',
    image: '/images/items/weapons/kang-tao-dian.png',
    properties: [
      'Smart Weapon',
      'Two-handed',
      'Light',
      'Burst Fire'
    ],
    effects: [
      'Multi-Target: Track up to 3 targets simultaneously',
      'Smart Burst: Increased accuracy with burst fire',
      'Rapid Acquisition: Quick target switching',
      'Extended Magazine: 40 round capacity',
      'Customizable Fire Rate: Adjustable ROF'
    ],
    requirements: [
      'Level 10',
      'Reflexes 14'
    ]
  },
  {
    id: 'budget-arms-carnage',
    name: 'Budget Arms Carnage',
    description: 'Heavy automatic shotgun with devastating close-range potential. While not the most elegant weapon, its stopping power is undeniable.',
    type: 'Weapon',
    rarity: 'Rare',
    value: '25000€$',
    image: '/images/items/weapons/budget-arms-carnage.png',
    properties: [
      'Power Weapon',
      'Two-handed',
      'Heavy',
      'Spread Fire'
    ],
    effects: [
      'Wide Spread: Effective against multiple close targets',
      'Stopping Power: High stagger chance',
      'Auto-Loading: Quick reload after empty',
      'Robust Design: Reliable in adverse conditions',
      'Modifiable: Compatible with most attachments'
    ],
    requirements: [
      'Level 8',
      'Body 14'
    ]
  }
] 