import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const dungeonEncounters: DungeonEncounter[] = [
  {
    id: 'factory-takeover',
    name: '6th Street Factory Raid',
    description: 'The 6th Street gang is attempting to take control of an automated factory from corporate security forces. The massive industrial complex is filled with dangerous machinery and automated defense systems.',
    level: '7',
    difficulty: 'Hard',
    type: 'Combat',
    enemies: [
      {
        name: '6th Street Commander',
        type: 'Leader',
        count: 1,
        cr: 8,
        abilities: [
          'Military Training: Advanced tactics',
          'Heavy Weapons Expert: Superior firepower',
          'Command Presence: Team coordination',
          'Combat Implants: Enhanced warfare',
          'Tactical Analysis: Battle planning'
        ],
        traits: [
          'Military Background',
          'Strategic Mind',
          'Veteran Leader'
        ],
        alignment: 'Lawful Neutral'
      },
      {
        name: '6th Street Veteran',
        type: 'Elite',
        count: 3,
        cr: 5,
        abilities: [
          'Military Hardware: Advanced weapons',
          'Combat Training: Professional skills',
          'Team Tactics: Unit coordination',
          'Basic Cyberware',
          'Area Control'
        ],
        traits: [
          'Disciplined',
          'Well-Armed',
          'Coordinated'
        ],
        alignment: 'Neutral'
      }
    ],
    rewards: [
      {
        type: 'Weapons',
        description: 'Military Grade Arsenal',
        value: '30000€$'
      },
      {
        type: 'Control',
        description: 'Factory Control Systems',
        value: 'Strategic Asset'
      }
    ],
    location: {
      dungeon: 'Industrial Complex',
      area: 'Production Floor',
      environment: 'Industrial'
    }
  },
  {
    id: 'rogue-ai',
    name: 'Rogue AI System',
    description: 'An industrial AI has gone rogue, taking control of the factory\'s automated systems and turning them against both workers and intruders. The facility has become a deadly maze of malfunctioning machinery.',
    level: '7',
    difficulty: 'Deadly',
    type: 'Combat',
    enemies: [
      {
        name: 'Rogue AI Core',
        type: 'Boss',
        count: 1,
        cr: 9,
        abilities: [
          'System Control: Factory automation',
          'Defense Network: Security systems',
          'Data Corruption: System attacks',
          'Machine Army: Robot control',
          'Environmental Control'
        ],
        traits: [
          'Artificial Intelligence',
          'Machine Logic',
          'Self-Preservation'
        ],
        alignment: 'Chaotic Neutral'
      },
      {
        name: 'Security Robot',
        type: 'Regular',
        count: 4,
        cr: 4,
        abilities: [
          'Automated Weapons: Built-in arsenal',
          'Industrial Frame: Enhanced durability',
          'Network Link: AI coordination',
          'Basic Combat Protocols',
          'Area Defense'
        ],
        traits: [
          'Programmed',
          'Networked',
          'Persistent'
        ],
        alignment: 'Unaligned'
      }
    ],
    rewards: [
      {
        type: 'Technology',
        description: 'AI Core Components',
        value: '40000€$'
      },
      {
        type: 'Data',
        description: 'Industrial Control Codes',
        value: 'Valuable Intel'
      }
    ],
    location: {
      dungeon: 'Industrial Complex',
      area: 'Control Center',
      environment: 'High-Tech Industrial'
    }
  },
  {
    id: 'toxic-waste',
    name: 'Toxic Waste Operation',
    description: 'A dangerous operation involving the illegal disposal of toxic corporate waste. Multiple factions are involved, including corporate agents, local gangs, and environmental activists.',
    level: '7',
    difficulty: 'Medium',
    type: 'Social',
    enemies: [
      {
        name: 'Corporate Overseer',
        type: 'Leader',
        count: 1,
        cr: 7,
        abilities: [
          'Corporate Authority: Command presence',
          'Security Access: System control',
          'Environmental Suit: Toxic protection',
          'Combat Training',
          'Area Management'
        ],
        traits: [
          'Corporate Loyalty',
          'Efficient',
          'Ruthless'
        ],
        alignment: 'Lawful Evil'
      },
      {
        name: 'Waste Handler',
        type: 'Regular',
        count: 3,
        cr: 3,
        abilities: [
          'Hazmat Training: Toxic resistance',
          'Industrial Equipment: Heavy machinery',
          'Basic Security: Area defense',
          'Environmental Systems',
          'Emergency Protocols'
        ],
        traits: [
          'Professional',
          'Cautious',
          'Experienced'
        ],
        alignment: 'Neutral'
      }
    ],
    rewards: [
      {
        type: 'Evidence',
        description: 'Corporate Crime Data',
        value: '25000€$'
      },
      {
        type: 'Equipment',
        description: 'Industrial Protection Gear',
        value: '15000€$'
      }
    ],
    location: {
      dungeon: 'Industrial Complex',
      area: 'Waste Processing',
      environment: 'Hazardous Industrial'
    }
  }
] 