import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const dungeonEncounters: DungeonEncounter[] = [
  {
    id: 'blackwall-breach',
    name: 'Blackwall Breach Attempt',
    description: 'The Voodoo Boys are attempting a dangerous operation to breach the Blackwall, risking exposure to rogue AIs and NetWatch intervention. The digital battleground is as deadly as the physical one.',
    level: '9',
    difficulty: 'Deadly',
    type: 'Combat',
    enemies: [
      {
        name: 'Elite Netrunner',
        type: 'Leader',
        count: 1,
        cr: 10,
        abilities: [
          'Blackwall Access: Breach protocols',
          'Neural Bridge: Direct AI interface',
          'ICE Breaking: Security override',
          'Digital Combat: Cyber warfare',
          'AI Communication: Digital diplomacy'
        ],
        traits: [
          'Digital Master',
          'Code Mystic',
          'Fearless'
        ],
        alignment: 'Chaotic Neutral'
      },
      {
        name: 'Rogue AI Fragment',
        type: 'Elite',
        count: 2,
        cr: 8,
        abilities: [
          'Data Corruption: System damage',
          'Neural Attack: Mental assault',
          'Code Manipulation: Reality distortion',
          'Digital Form: Incorporeal presence',
          'System Infiltration'
        ],
        traits: [
          'Artificial Intelligence',
          'Unpredictable',
          'Alien Logic'
        ],
        alignment: 'Chaotic Evil'
      }
    ],
    rewards: [
      {
        type: 'Data',
        description: 'Blackwall Breach Codes',
        value: '75000€$'
      },
      {
        type: 'Technology',
        description: 'Advanced Netrunning Suite',
        value: '50000€$'
      }
    ],
    location: {
      dungeon: 'Voodoo Territory',
      area: 'Netrunning Hub',
      environment: 'Digital Space'
    }
  },
  {
    id: 'netwatch-raid',
    name: 'NetWatch Incursion',
    description: 'NetWatch agents have launched an operation against the Voodoo Boys, targeting their netrunning facilities and digital infrastructure. The battle takes place in both cyber and physical space.',
    level: '9',
    difficulty: 'Hard',
    type: 'Combat',
    enemies: [
      {
        name: 'NetWatch Agent',
        type: 'Elite',
        count: 1,
        cr: 9,
        abilities: [
          'Corporate Netrunning: Official protocols',
          'System Authority: Network control',
          'Combat Training: Physical warfare',
          'Security Override: System access',
          'Agent Protocols: Special authority'
        ],
        traits: [
          'Professional',
          'Authorized',
          'Determined'
        ],
        alignment: 'Lawful Neutral'
      },
      {
        name: 'NetWatch Support',
        type: 'Regular',
        count: 3,
        cr: 6,
        abilities: [
          'Basic Netrunning: Standard protocols',
          'Combat Systems: Weapon proficiency',
          'Team Coordination: Unit tactics',
          'Security Systems',
          'Corporate Training'
        ],
        traits: [
          'Disciplined',
          'Coordinated',
          'Loyal'
        ],
        alignment: 'Lawful Neutral'
      }
    ],
    rewards: [
      {
        type: 'Access',
        description: 'NetWatch Security Codes',
        value: '40000€$'
      },
      {
        type: 'Equipment',
        description: 'Corporate Grade Cyberdeck',
        value: '35000€$'
      }
    ],
    location: {
      dungeon: 'Voodoo Territory',
      area: 'Digital Fortress',
      environment: 'Secure Facility'
    }
  },
  {
    id: 'digital-ritual',
    name: 'Digital Voodoo Ritual',
    description: 'A mysterious ceremony combining traditional Haitian Vodou with advanced netrunning technology. The Voodoo Boys are attempting to contact entities beyond the Blackwall through spiritual means.',
    level: '9',
    difficulty: 'Medium',
    type: 'Social',
    enemies: [
      {
        name: 'Voodoo Priest',
        type: 'Leader',
        count: 1,
        cr: 8,
        abilities: [
          'Digital Rituals: Cyber-spiritual powers',
          'Neural Mysticism: Mental enhancement',
          'Spirit Bridge: Entity contact',
          'Ritual Leadership',
          'Combat Defense'
        ],
        traits: [
          'Spiritual Leader',
          'Tech Shaman',
          'Mysterious'
        ],
        alignment: 'Neutral'
      },
      {
        name: 'Ritual Guardian',
        type: 'Regular',
        count: 4,
        cr: 5,
        abilities: [
          'Cyber Combat: Enhanced fighting',
          'Ritual Protection: Defensive powers',
          'Spirit Sense: Supernatural awareness',
          'Basic Netrunning',
          'Physical Security'
        ],
        traits: [
          'Devoted',
          'Protective',
          'Spiritual'
        ],
        alignment: 'Neutral'
      }
    ],
    rewards: [
      {
        type: 'Knowledge',
        description: 'Digital Ritual Secrets',
        value: '30000€$'
      },
      {
        type: 'Artifact',
        description: 'Cyber-Spiritual Focus',
        value: '25000€$'
      }
    ],
    location: {
      dungeon: 'Voodoo Territory',
      area: 'Ritual Chamber',
      environment: 'Spiritual-Digital'
    }
  }
] 