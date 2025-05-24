import { Quest, QuestType, QuestStatus, RewardType, RequirementType, ObjectiveType } from '../../../../types/quest';

export const quests: Quest[] = [
    {
        id: '1',
        title: 'The Missing Caravan',
        description: 'A merchant caravan has gone missing on the road to Baldur\'s Gate. Investigate and ensure the safety of the merchants.',
        level: 3,
        type: QuestType.MAIN,
        status: QuestStatus.AVAILABLE,
        rewards: [
            { type: RewardType.GOLD, amount: 100 },
            { type: RewardType.EXPERIENCE, amount: 500 }
        ],
        requirements: [
            { type: RequirementType.LEVEL, value: 3 }
        ],
        location: 'Baldur\'s Gate',
        npcs: ['Merchant Guild Master'],
        objectives: [
            {
                id: '1',
                description: 'Find the missing caravan',
                type: ObjectiveType.EXPLORE,
                target: 'Road to Baldur\'s Gate',
                amount: 1,
                completed: false
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        difficulty: 'MEDIUM',
        timeEstimate: 120,
        recommendedPartySize: 4,
        minPartySize: 2,
        maxPartySize: 6,
        recommendedClasses: ['Fighter', 'Rogue', 'Cleric']
    },
    {
        id: '2',
        title: 'The Dragon\'s Hoard',
        description: 'A young dragon has been terrorizing nearby villages. The local lord offers a substantial reward for its defeat.',
        level: 8,
        type: QuestType.MAIN,
        status: QuestStatus.AVAILABLE,
        rewards: [
            { type: RewardType.GOLD, amount: 1000 },
            { type: RewardType.EXPERIENCE, amount: 2000 },
            { type: RewardType.ITEM, amount: 1, item: 'Dragon Scale Armor' }
        ],
        requirements: [
            { type: RequirementType.LEVEL, value: 8 },
            { type: RequirementType.ITEM, value: 'Fire Resistance Potion' }
        ],
        location: 'Wyrm\'s Peak',
        npcs: ['Lord Blackwood', 'Village Elder'],
        objectives: [
            {
                id: '1',
                description: 'Defeat the young dragon',
                type: ObjectiveType.KILL,
                target: 'Young Red Dragon',
                amount: 1,
                completed: false
            },
            {
                id: '2',
                description: 'Collect dragon scales',
                type: ObjectiveType.COLLECT,
                target: 'Dragon Scales',
                amount: 10,
                completed: false
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        difficulty: 'HARD',
        timeEstimate: 240,
        recommendedPartySize: 6,
        minPartySize: 4,
        maxPartySize: 8,
        recommendedClasses: ['Paladin', 'Wizard', 'Cleric', 'Fighter']
    },
    {
        id: '3',
        title: 'The Lost Library',
        description: 'Help the Arcane Brotherhood recover ancient tomes from a forgotten library beneath the city.',
        level: 5,
        type: QuestType.SIDE,
        status: QuestStatus.AVAILABLE,
        rewards: [
            { type: RewardType.GOLD, amount: 300 },
            { type: RewardType.EXPERIENCE, amount: 800 },
            { type: RewardType.REPUTATION, amount: 50, reputation: { faction: 'Arcane Brotherhood', amount: 50 } }
        ],
        requirements: [
            { type: RequirementType.LEVEL, value: 5 }
        ],
        location: 'Neverwinter',
        npcs: ['Archmage Vorthos'],
        objectives: [
            {
                id: '1',
                description: 'Find the hidden entrance',
                type: ObjectiveType.EXPLORE,
                target: 'Neverwinter Sewers',
                amount: 1,
                completed: false
            },
            {
                id: '2',
                description: 'Recover ancient tomes',
                type: ObjectiveType.COLLECT,
                target: 'Ancient Tomes',
                amount: 5,
                completed: false
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        difficulty: 'MEDIUM',
        timeEstimate: 180,
        recommendedPartySize: 4,
        minPartySize: 2,
        maxPartySize: 6,
        recommendedClasses: ['Wizard', 'Rogue', 'Cleric']
    }
]; 