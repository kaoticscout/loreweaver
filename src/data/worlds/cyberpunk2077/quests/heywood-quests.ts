import { Quest, QuestType, QuestStatus, RewardType, RequirementType, ObjectiveType } from '../../../../types/quest'

export const quests: Quest[] = [
  {
    id: 'valentinos-honor',
    title: 'Valentinos Honor',
    description: 'A respected Valentinos elder has been murdered, and the gang suspects Sixth Street involvement. Investigate the death and prevent an all-out gang war in Heywood.',
    level: 12,
    type: QuestType.FACTION,
    status: QuestStatus.AVAILABLE,
    rewards: [
      {
        type: RewardType.GOLD,
        amount: 25000
      },
      {
        type: RewardType.REPUTATION,
        amount: 1000,
        reputation: {
          faction: 'Valentinos',
          amount: 1000
        }
      },
      {
        type: RewardType.ITEM,
        amount: 1,
        item: 'arasaka-nodachi'
      }
    ],
    requirements: [
      {
        type: RequirementType.LEVEL,
        value: 12
      },
      {
        type: RequirementType.SKILL,
        value: 'Investigation',
        skill: 'Investigation',
        level: 4
      }
    ],
    location: 'Heywood - Vista del Rey',
    npcs: ['Valentinos Lieutenant', 'Sixth Street Captain', 'Street Informant'],
    objectives: [
      {
        id: 'investigate-scene',
        description: 'Investigate the murder scene',
        type: ObjectiveType.EXPLORE,
        target: 'Crime Scene',
        amount: 1,
        completed: false
      },
      {
        id: 'gather-evidence',
        description: 'Collect evidence from the scene',
        type: ObjectiveType.COLLECT,
        target: 'Evidence',
        amount: 3,
        completed: false
      },
      {
        id: 'interrogate-witnesses',
        description: 'Question local witnesses',
        type: ObjectiveType.TALK,
        target: 'Witnesses',
        amount: 4,
        completed: false
      },
      {
        id: 'confront-killer',
        description: 'Confront the true killer',
        type: ObjectiveType.KILL,
        target: 'Murderer',
        amount: 1,
        completed: false
      }
    ],
    createdAt: '2077-05-25T15:00:00Z',
    updatedAt: '2077-05-25T15:00:00Z',
    difficulty: 'HARD',
    timeEstimate: 90,
    recommendedPartySize: 3,
    minPartySize: 2,
    maxPartySize: 4,
    recommendedClasses: ['Solo', 'Netrunner', 'Fixer'],
    detailedLocations: [
      {
        name: 'Murder Scene',
        description: 'A once-peaceful Valentinos safehouse now marked by violence',
        hazards: ['Gang surveillance', 'Evidence tampering'],
        secrets: ['Hidden security footage', 'Secret documents']
      },
      {
        name: 'Local Neighborhood',
        description: 'Tense streets where Valentinos and Sixth Street territories meet',
        hazards: ['Gang patrols', 'Civilian unrest'],
        secrets: ['Witness hideouts', 'Underground passages']
      }
    ],
    specialConditions: {
      timeOfDay: ['Night'],
      weather: ['Clear', 'Foggy']
    }
  },
  {
    id: 'stadium-showdown',
    title: 'Stadium Showdown',
    description: 'A high-stakes illegal combat tournament is being held in the abandoned stadium. Compete to win glory, credits, and valuable corporate technology.',
    level: 15,
    type: QuestType.SIDE,
    status: QuestStatus.AVAILABLE,
    rewards: [
      {
        type: RewardType.GOLD,
        amount: 35000
      },
      {
        type: RewardType.ITEM,
        amount: 1,
        item: 'militech-combat-booster'
      },
      {
        type: RewardType.REPUTATION,
        amount: 500,
        reputation: {
          faction: 'Street Fighters',
          amount: 500
        }
      }
    ],
    requirements: [
      {
        type: RequirementType.LEVEL,
        value: 15
      },
      {
        type: RequirementType.SKILL,
        value: 'Combat',
        skill: 'Combat',
        level: 5
      }
    ],
    location: 'Heywood - Stadium District',
    npcs: ['Tournament Organizer', 'Corporate Scout', 'Champion Fighter'],
    objectives: [
      {
        id: 'qualify-tournament',
        description: 'Qualify for the tournament',
        type: ObjectiveType.KILL,
        target: 'Qualification Matches',
        amount: 2,
        completed: false
      },
      {
        id: 'win-prelims',
        description: 'Win preliminary matches',
        type: ObjectiveType.KILL,
        target: 'Preliminary Opponents',
        amount: 3,
        completed: false
      },
      {
        id: 'defeat-champion',
        description: 'Defeat the reigning champion',
        type: ObjectiveType.KILL,
        target: 'Champion',
        amount: 1,
        completed: false
      }
    ],
    createdAt: '2077-05-28T20:00:00Z',
    updatedAt: '2077-05-28T20:00:00Z',
    difficulty: 'HARD',
    timeEstimate: 120,
    recommendedPartySize: 1,
    minPartySize: 1,
    maxPartySize: 1,
    recommendedClasses: ['Solo'],
    detailedLocations: [
      {
        name: 'Tournament Arena',
        description: 'Converted stadium field with makeshift fighting rings',
        hazards: ['Environmental hazards', 'Crowd interference'],
        secrets: ['Hidden weapons', 'Medical stations']
      },
      {
        name: 'Preparation Area',
        description: 'Underground facility where fighters prepare for matches',
        hazards: ['Rival fighters', 'Illegal cybernetics'],
        secrets: ['Black market vendors', 'Training facilities']
      }
    ],
    specialConditions: {
      timeOfDay: ['Night'],
      weather: ['Any']
    }
  }
] 