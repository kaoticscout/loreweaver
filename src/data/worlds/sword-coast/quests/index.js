export const quests = [
    {
        id: '1',
        title: 'The Missing Caravan',
        description: 'A merchant caravan has disappeared on the trade route. The Merchant Guild suspects bandits.',
        level: 5,
        type: 'SIDE',
        status: 'AVAILABLE',
        rewards: [
            { type: 'GOLD', amount: 500 },
            { type: 'EXPERIENCE', amount: 1000 },
            { type: 'REPUTATION', amount: 100, reputation: { faction: 'Merchant Guild', amount: 100 } }
        ],
        requirements: [
            { type: 'LEVEL', value: 5 }
        ],
        location: 'Waterdeep',
        npcs: ['1'],
        objectives: [
            {
                id: '1',
                description: 'Find the missing caravan',
                type: 'EXPLORE',
                target: 'Trade Route',
                amount: 1,
                completed: false
            },
            {
                id: '2',
                description: 'Defeat the bandits',
                type: 'KILL',
                target: 'Bandits',
                amount: 5,
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
        recommendedClasses: ['Rogue', 'Fighter', 'Ranger']
    },
    {
        id: '2',
        title: 'The Dragon\'s Hoard',
        description: 'A young dragon has been terrorizing nearby villages. The local lord offers a substantial reward for its defeat.',
        level: 8,
        type: 'MAIN',
        status: 'AVAILABLE',
        rewards: [
            { type: 'GOLD', amount: 1000 },
            { type: 'EXPERIENCE', amount: 2000 },
            { type: 'ITEM', amount: 1, item: 'Dragon Scale Armor' }
        ],
        requirements: [
            { type: 'LEVEL', value: 8 },
            { type: 'ITEM', value: 'Fire Resistance Potion' }
        ],
        location: 'Sword Mountains',
        npcs: ['2', '4'],
        objectives: [
            {
                id: '1',
                description: 'Defeat the young dragon',
                type: 'KILL',
                target: 'Young Red Dragon',
                amount: 1,
                completed: false
            },
            {
                id: '2',
                description: 'Collect dragon scales',
                type: 'COLLECT',
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
        type: 'SIDE',
        status: 'AVAILABLE',
        rewards: [
            { type: 'GOLD', amount: 300 },
            { type: 'EXPERIENCE', amount: 800 },
            { type: 'REPUTATION', amount: 50, reputation: { faction: 'Arcane Brotherhood', amount: 50 } }
        ],
        requirements: [
            { type: 'LEVEL', value: 5 }
        ],
        location: 'Luskan',
        npcs: ['3'],
        objectives: [
            {
                id: '1',
                description: 'Find the hidden entrance',
                type: 'EXPLORE',
                target: 'Neverwinter Sewers',
                amount: 1,
                completed: false
            },
            {
                id: '2',
                description: 'Recover ancient tomes',
                type: 'COLLECT',
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