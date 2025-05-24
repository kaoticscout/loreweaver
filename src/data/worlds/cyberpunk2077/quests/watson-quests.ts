import { Quest, QuestType, QuestStatus, RewardType, RequirementType, ObjectiveType } from '../../../../types/quest'

export const quests: Quest[] = [
  {
    id: 'corpo-data-heist',
    title: 'Corporate Data Heist',
    description: 'A mysterious fixer has contracted you to infiltrate a Militech research facility in Watson and extract valuable R&D data. The facility is heavily guarded by both human security and automated systems.',
    level: 8,
    type: QuestType.SIDE,
    status: QuestStatus.AVAILABLE,
    rewards: [
      {
        type: RewardType.GOLD,
        amount: 15000,
      },
      {
        type: RewardType.ITEM,
        amount: 1,
        item: 'militech-crusher'
      },
      {
        type: RewardType.REPUTATION,
        amount: 500,
        reputation: {
          faction: 'Fixers',
          amount: 500
        }
      }
    ],
    requirements: [
      {
        type: RequirementType.LEVEL,
        value: 8
      },
      {
        type: RequirementType.SKILL,
        value: 'Stealth',
        skill: 'Stealth',
        level: 3
      }
    ],
    location: 'Watson District - Northside Industrial Zone',
    npcs: ['Fixer Jane', 'Security Chief Williams', 'Rogue AI'],
    objectives: [
      {
        id: 'infiltrate-facility',
        description: 'Infiltrate the Militech research facility',
        type: ObjectiveType.EXPLORE,
        target: 'Facility Entrance',
        amount: 1,
        completed: false
      },
      {
        id: 'bypass-security',
        description: 'Bypass or neutralize security systems',
        type: ObjectiveType.KILL,
        target: 'Security System',
        amount: 3,
        completed: false
      },
      {
        id: 'extract-data',
        description: 'Download the research data',
        type: ObjectiveType.COLLECT,
        target: 'Research Terminal',
        amount: 1,
        completed: false
      },
      {
        id: 'escape-facility',
        description: 'Escape the facility without being detected',
        type: ObjectiveType.EXPLORE,
        target: 'Extraction Point',
        amount: 1,
        completed: false
      }
    ],
    createdAt: '2077-05-15T10:00:00Z',
    updatedAt: '2077-05-15T10:00:00Z',
    difficulty: 'HARD',
    timeEstimate: 60,
    recommendedPartySize: 2,
    minPartySize: 1,
    maxPartySize: 3,
    recommendedClasses: ['Netrunner', 'Solo'],
    questChain: {
      next: 'corpo-revenge'
    },
    detailedLocations: [
      {
        name: 'Facility Entrance',
        description: 'Heavily guarded main entrance with automated turrets and security cameras',
        hazards: ['Automated turrets', 'Security cameras', 'Guard patrols']
      },
      {
        name: 'Security Hub',
        description: 'Central security control room monitoring all facility systems',
        hazards: ['Security personnel', 'Automated defenses'],
        secrets: ['Backdoor access codes', 'Guard rotation schedules']
      },
      {
        name: 'Research Lab',
        description: 'High-security laboratory containing valuable research data',
        hazards: ['Automated lockdown systems', 'Biometric scanners'],
        secrets: ['Experimental technology', 'Classified research data']
      }
    ],
    specialConditions: {
      timeOfDay: ['Night'],
      weather: ['Clear', 'Rainy']
    }
  },
  {
    id: 'gang-war-mediation',
    title: 'Gang War Mediation',
    description: 'The Tyger Claws and Maelstrom are on the brink of a full-scale war in Watson. A local fixer needs someone to negotiate a temporary truce before the violence spills into civilian areas.',
    level: 10,
    type: QuestType.FACTION,
    status: QuestStatus.AVAILABLE,
    rewards: [
      {
        type: RewardType.GOLD,
        amount: 20000
      },
      {
        type: RewardType.REPUTATION,
        amount: 750,
        reputation: {
          faction: 'Tyger Claws',
          amount: 750
        }
      }
    ],
    requirements: [
      {
        type: RequirementType.LEVEL,
        value: 10
      },
      {
        type: RequirementType.SKILL,
        value: 'Persuasion',
        skill: 'Persuasion',
        level: 4
      }
    ],
    location: 'Watson District - Kabuki Market',
    npcs: ['Tyger Claws Leader', 'Maelstrom Boss', 'Local Fixer'],
    objectives: [
      {
        id: 'meet-tyger-claws',
        description: 'Meet with Tyger Claws leadership',
        type: ObjectiveType.TALK,
        target: 'Tyger Claws Leader',
        amount: 1,
        completed: false
      },
      {
        id: 'meet-maelstrom',
        description: 'Meet with Maelstrom leadership',
        type: ObjectiveType.TALK,
        target: 'Maelstrom Boss',
        amount: 1,
        completed: false
      },
      {
        id: 'negotiate-terms',
        description: 'Negotiate terms of the truce',
        type: ObjectiveType.TALK,
        target: 'Both Leaders',
        amount: 1,
        completed: false
      },
      {
        id: 'prevent-violence',
        description: 'Prevent any violence during negotiations',
        type: ObjectiveType.KILL,
        target: 'Meeting Area',
        amount: 1,
        completed: false
      }
    ],
    createdAt: '2077-05-20T14:00:00Z',
    updatedAt: '2077-05-20T14:00:00Z',
    difficulty: 'MEDIUM',
    timeEstimate: 45,
    recommendedPartySize: 2,
    minPartySize: 1,
    maxPartySize: 3,
    recommendedClasses: ['Fixer', 'Solo'],
    detailedLocations: [
      {
        name: 'Tyger Claws Territory',
        description: 'Neon-lit streets controlled by the Tyger Claws gang',
        hazards: ['Gang patrols', 'Surveillance cameras'],
        secrets: ['Hidden weapon caches', 'Secret meeting spots']
      },
      {
        name: 'Neutral Ground',
        description: 'Abandoned warehouse chosen for negotiations',
        hazards: ['Structural instability', 'Rival gang scouts'],
        secrets: ['Emergency escape routes', 'Hidden observation points']
      }
    ],
    specialConditions: {
      timeOfDay: ['Night'],
      weather: ['Any']
    }
  }
] 