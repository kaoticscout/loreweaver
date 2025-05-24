import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const dungeonEncounters: DungeonEncounter[] = [
  {
    id: 'tyger-standoff',
    name: 'Tyger Claws Standoff',
    description: 'A tense standoff between Tyger Claws and local merchants over protection money. The gang members are heavily augmented with visible cyberware, their chrome gleaming under the neon lights. The situation could turn violent at any moment.',
    level: '5',
    difficulty: 'Hard',
    type: 'Social',
    enemies: [
      {
        name: 'Tyger Claws Lieutenant',
        type: 'Leader',
        count: 1,
        cr: 6,
        abilities: [
          'Mantis Blades: Deadly melee attacks',
          'Sandevistan: Enhanced reflexes and speed',
          'Martial Arts Master: Multiple melee attacks',
          'Street Reputation: Can call for reinforcements',
          'Tactical Analysis: Can predict enemy movements'
        ],
        traits: [
          'Honor Code',
          'Gang Leadership',
          'Cybernetic Enhancement'
        ],
        alignment: 'Lawful Evil'
      },
      {
        name: 'Tyger Claws Enforcer',
        type: 'Regular',
        count: 3,
        cr: 3,
        abilities: [
          'Cyber Eyes: Enhanced targeting',
          'Reinforced Tendons: Enhanced mobility',
          'Katana Master: Expertise with bladed weapons',
          'Basic Combat Implants',
          'Gang Tactics'
        ],
        traits: [
          'Gang Loyalty',
          'Street Smart',
          'Combat Training'
        ],
        alignment: 'Neutral Evil'
      }
    ],
    rewards: [
      {
        type: 'Street Cred',
        description: 'Reputation boost in Watson District',
        value: '500 Rep'
      },
      {
        type: 'Equipment',
        description: 'Tyger Claws Katana and Cyberware Components',
        value: '2000€$'
      }
    ],
    location: {
      dungeon: 'Kabuki Market',
      area: 'Market Square',
      environment: 'Urban Market'
    }
  },
  {
    id: 'black-market-deal',
    name: 'Black Market Exchange',
    description: 'A secret transaction of illegal cyberware and tech in the back alleys of Kabuki Market. Multiple parties are interested in the goods, making the situation volatile.',
    level: '5',
    difficulty: 'Medium',
    type: 'Social',
    enemies: [
      {
        name: 'Black Market Dealer',
        type: 'Merchant',
        count: 1,
        cr: 4,
        abilities: [
          'Neural Link: Access to black market networks',
          'Quick Draw: Fast weapon deployment',
          'Market Knowledge: Expertise in illegal goods',
          'Hidden Weapons: Concealed arsenal',
          'Escape Artist: Enhanced evasion capabilities'
        ],
        traits: [
          'Street Connections',
          'Business Acumen',
          'Self Preservation'
        ],
        alignment: 'Neutral'
      },
      {
        name: 'Market Security',
        type: 'Guard',
        count: 2,
        cr: 2,
        abilities: [
          'Cyber Eyes: Threat detection',
          'Armored Skin: Enhanced defense',
          'Security Protocols: Coordinated response',
          'Basic Combat Training',
          'Area Knowledge'
        ],
        traits: [
          'Professional',
          'Alert',
          'Territorial'
        ],
        alignment: 'Lawful Neutral'
      }
    ],
    rewards: [
      {
        type: 'Technology',
        description: 'Rare Cyberware and Tech Components',
        value: '3000€$'
      },
      {
        type: 'Information',
        description: 'Black Market Contact Details',
        value: 'Valuable Intel'
      }
    ],
    location: {
      dungeon: 'Kabuki Market',
      area: 'Back Alleys',
      environment: 'Urban Shadows'
    }
  },
  {
    id: 'netrunner-hack',
    name: 'Rogue Netrunner Operation',
    description: 'A skilled netrunner is attempting to hack the market\'s security systems, potentially exposing sensitive data and security vulnerabilities.',
    level: '5',
    difficulty: 'Deadly',
    type: 'Combat',
    enemies: [
      {
        name: 'Elite Netrunner',
        type: 'Hacker',
        count: 1,
        cr: 7,
        abilities: [
          'Cyberdeck: Advanced hacking capabilities',
          'Neural Mesh: Enhanced processing speed',
          'ICE Breaker: Security system override',
          'System Control: Environmental manipulation',
          'Digital Warfare: Cyber combat specialist'
        ],
        traits: [
          'Technical Genius',
          'Digital Native',
          'Paranoid'
        ],
        alignment: 'Chaotic Neutral'
      },
      {
        name: 'Security Daemon',
        type: 'Program',
        count: 3,
        cr: 3,
        abilities: [
          'System Defense: Automated security response',
          'Data Corruption: Damage to cyber systems',
          'Network Control: Communication disruption',
          'Autonomous Operation',
          'Adaptive Programming'
        ],
        traits: [
          'Artificial Intelligence',
          'Persistent',
          'Evolving'
        ],
        alignment: 'Unaligned'
      }
    ],
    rewards: [
      {
        type: 'Data',
        description: 'Valuable Market Security Codes',
        value: '4000€$'
      },
      {
        type: 'Cyberware',
        description: 'Advanced Netrunning Module',
        value: '5000€$'
      }
    ],
    location: {
      dungeon: 'Kabuki Market',
      area: 'Security Center',
      environment: 'Cyberspace'
    }
  }
] 