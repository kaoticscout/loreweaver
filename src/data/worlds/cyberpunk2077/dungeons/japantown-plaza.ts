import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const dungeonEncounters: DungeonEncounter[] = [
  {
    id: 'tyger-ceremony',
    name: 'Tyger Claws Ceremony',
    description: 'An elaborate ceremony in a traditional Japanese garden, where the Tyger Claws are inducting new members and showcasing their latest cyber-enhanced martial arts. The air is thick with incense and the sound of traditional music mixed with the hum of cyberware.',
    level: '8',
    difficulty: 'Hard',
    type: 'Social',
    enemies: [
      {
        name: 'Tyger Claws Master',
        type: 'Leader',
        count: 1,
        cr: 9,
        abilities: [
          'Cyber-Enhanced Martial Arts: Deadly melee combat',
          'Sandevistan: Time dilation system',
          'Honor Guard: Command over subordinates',
          'Traditional Weapons Master',
          'Advanced Combat Implants'
        ],
        traits: [
          'Traditional Honor',
          'Gang Leadership',
          'Combat Master'
        ],
        alignment: 'Lawful Neutral'
      },
      {
        name: 'Tyger Claws Elite',
        type: 'Elite',
        count: 2,
        cr: 6,
        abilities: [
          'Mantis Blades: Cyber weapon mastery',
          'Enhanced Reflexes: Superior agility',
          'Martial Arts: Advanced combat skills',
          'Cyber Eyes: Combat scanning',
          'Gang Tactics'
        ],
        traits: [
          'Gang Pride',
          'Disciplined',
          'Loyal'
        ],
        alignment: 'Neutral'
      }
    ],
    rewards: [
      {
        type: 'Weapon',
        description: 'Traditional Cyber-Katana',
        value: '25000€$'
      },
      {
        type: 'Honor',
        description: 'Tyger Claws Respect',
        value: 'Gang Recognition'
      }
    ],
    location: {
      dungeon: 'Japantown Plaza',
      area: 'Traditional Garden',
      environment: 'Cultural Site'
    }
  },
  {
    id: 'corpo-infiltration',
    name: 'Corporate Infiltration',
    description: 'Arasaka agents are attempting to infiltrate Tyger Claws territory through a high-end nightclub. The operation involves both cyber and physical warfare, with multiple parties vying for control.',
    level: '8',
    difficulty: 'Deadly',
    type: 'Combat',
    enemies: [
      {
        name: 'Arasaka Special Agent',
        type: 'Elite',
        count: 1,
        cr: 10,
        abilities: [
          'Stealth System: Advanced cloaking',
          'Military Cyberware: Enhanced combat',
          'Neural Hack: System intrusion',
          'Tactical Analysis: Combat prediction',
          'Elite Training: Superior skills'
        ],
        traits: [
          'Corporate Loyalty',
          'Professional',
          'Ruthless'
        ],
        alignment: 'Lawful Evil'
      },
      {
        name: 'Corporate Soldier',
        type: 'Regular',
        count: 3,
        cr: 5,
        abilities: [
          'Military Hardware: Advanced weapons',
          'Combat Implants: Enhanced abilities',
          'Team Tactics: Coordinated attacks',
          'Security Systems: Tech warfare',
          'Corporate Training'
        ],
        traits: [
          'Disciplined',
          'Well-Equipped',
          'Tactical'
        ],
        alignment: 'Lawful Evil'
      }
    ],
    rewards: [
      {
        type: 'Technology',
        description: 'Arasaka Prototype Tech',
        value: '50000€$'
      },
      {
        type: 'Intel',
        description: 'Corporate Operation Data',
        value: 'Critical Information'
      }
    ],
    location: {
      dungeon: 'Japantown Plaza',
      area: 'Luxury Nightclub',
      environment: 'High-End Venue'
    }
  },
  {
    id: 'cyber-blackmarket',
    name: 'Premium Cyber Market',
    description: 'A hidden marketplace for exclusive cyberware and tech, operated by the Tyger Claws. High-end clients from across Night City come here for the latest and most advanced modifications.',
    level: '8',
    difficulty: 'Medium',
    type: 'Social',
    enemies: [
      {
        name: 'Master Ripperdoc',
        type: 'Merchant',
        count: 1,
        cr: 7,
        abilities: [
          'Medical Expertise: Advanced surgery',
          'Cyber Knowledge: Tech mastery',
          'Black Market Connections',
          'Security Systems: Market protection',
          'Combat Medicine'
        ],
        traits: [
          'Professional',
          'Connected',
          'Skilled'
        ],
        alignment: 'Neutral'
      },
      {
        name: 'Market Security',
        type: 'Guard',
        count: 4,
        cr: 4,
        abilities: [
          'Cyber Enhancement: Combat boost',
          'Area Control: Space management',
          'Threat Assessment: Target analysis',
          'Crowd Control',
          'Combat Training'
        ],
        traits: [
          'Alert',
          'Professional',
          'Protective'
        ],
        alignment: 'Neutral'
      }
    ],
    rewards: [
      {
        type: 'Cyberware',
        description: 'Exclusive Cyber Modifications',
        value: '35000€$'
      },
      {
        type: 'Contact',
        description: 'High-End Ripperdoc Connection',
        value: 'Valuable Contact'
      }
    ],
    location: {
      dungeon: 'Japantown Plaza',
      area: 'Hidden Market',
      environment: 'Secret Venue'
    }
  }
] 