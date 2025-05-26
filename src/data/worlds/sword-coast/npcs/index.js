export const npcs = [
    {
        id: '1',
        name: 'Merchant Guild Master',
        role: 'Quest Giver',
        location: 'Waterdeep',
        description: 'A shrewd businessman who oversees the Merchant Guild\'s operations in Waterdeep.',
        level: 8,
        faction: 'Merchant Guild',
        status: 'alive',
        questGiver: true,
        relationshipStatus: 'friendly',
        notes: [
            {
                id: '1',
                text: 'Has a secret stash of rare magical items.',
                timestamp: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: '2',
                text: 'Mentioned a potential trade deal with Waterdeep merchants.',
                timestamp: new Date(Date.now() - 43200000).toISOString()
            }
        ],
        schedule: [
            { time: 'Morning', location: 'Guild Hall', activity: 'Managing guild affairs' },
            { time: 'Afternoon', location: 'Market', activity: 'Overseeing trade' },
            { time: 'Evening', location: 'Private Office', activity: 'Planning trade routes' }
        ],
        dialogue: [{
            id: '1',
            text: 'Looking for rare goods? I might have what you need.',
            options: [
                {
                    text: 'Show me what you have.',
                    nextDialogueId: '2'
                },
                {
                    text: 'Tell me about your trade routes.',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'Persuasion', level: 5, description: 'Expert negotiator' },
            { name: 'Business', level: 5, description: 'Master trader' },
            { name: 'Diplomacy', level: 4, description: 'Skilled mediator' }
        ],
        relationships: [
            {
                npcId: '2',
                type: 'BUSINESS',
                description: 'Trading partner',
                reputation: 75
            }
        ],
        inventory: [
            {
                name: 'Guild Seal',
                description: 'Official seal of the Merchant Guild',
                quantity: 1,
                forSale: false,
                rarity: 'RARE'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Lord Blackwood',
        role: 'Quest Giver',
        location: 'Neverwinter',
        description: 'A noble lord concerned about the dragon threatening his lands.',
        level: 12,
        faction: 'Noble House Blackwood',
        status: 'alive',
        questGiver: true,
        relationshipStatus: 'unmet',
        notes: [
            {
                id: '1',
                text: 'Has a daughter who is secretly training as a wizard.',
                timestamp: new Date(Date.now() - 172800000).toISOString()
            }
        ],
        schedule: [
            { time: 'Morning', location: 'War Room', activity: 'Military planning' },
            { time: 'Afternoon', location: 'Training Grounds', activity: 'Guard training' },
            { time: 'Evening', location: 'Great Hall', activity: 'Holding court' }
        ],
        dialogue: [{
            id: '1',
            text: 'The dragon has been terrorizing my lands. I need brave adventurers.',
            options: [
                {
                    text: 'We\'ll help defeat the dragon.',
                    nextDialogueId: '2'
                },
                {
                    text: 'Tell me more about the dragon.',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'Leadership', level: 5, description: 'Experienced commander' },
            { name: 'Strategy', level: 5, description: 'Master tactician' },
            { name: 'Swordsmanship', level: 4, description: 'Expert fighter' }
        ],
        relationships: [
            {
                npcId: '3',
                type: 'FRIEND',
                description: 'Alliance for magical defense',
                reputation: 90
            }
        ],
        inventory: [
            {
                name: 'Blackwood Signet Ring',
                description: 'Family heirloom',
                quantity: 1,
                forSale: false,
                rarity: 'RARE'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Archmage Vorthos',
        role: 'Quest Giver',
        location: 'Luskan',
        description: 'A powerful wizard and leader of the Arcane Brotherhood.',
        level: 15,
        faction: 'Arcane Brotherhood',
        status: 'alive',
        questGiver: true,
        relationshipStatus: 'ally',
        notes: [
            {
                id: '1',
                text: 'Interested in ancient Netherese artifacts.',
                timestamp: new Date(Date.now() - 259200000).toISOString()
            }
        ],
        schedule: [
            { time: 'Morning', location: 'Library', activity: 'Research' },
            { time: 'Afternoon', location: 'Laboratory', activity: 'Experiments' },
            { time: 'Evening', location: 'Council Chamber', activity: 'Meetings' }
        ],
        dialogue: [{
            id: '1',
            text: 'The lost library contains knowledge that could change the world.',
            options: [
                {
                    text: 'I\'ll help recover the tomes.',
                    nextDialogueId: '2'
                },
                {
                    text: 'What knowledge are you seeking?',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'Arcana', level: 5, description: 'Master of magic' },
            { name: 'History', level: 5, description: 'Lore expert' },
            { name: 'Alchemy', level: 4, description: 'Potion master' }
        ],
        inventory: [
            {
                name: 'Staff of the Archmage',
                description: 'Ancient magical staff',
                quantity: 1,
                forSale: false,
                rarity: 'LEGENDARY'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '4',
        name: 'Village Elder',
        role: 'Quest Giver',
        location: 'Sword Mountains',
        description: 'A wise and respected elder who has witnessed the dragon\'s attacks firsthand.',
        level: 5,
        faction: 'Village Council',
        status: 'alive',
        questGiver: true,
        relationshipStatus: 'friendly',
        notes: [
            {
                id: '1',
                text: 'Has ancient knowledge about dragon behavior.',
                timestamp: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: '2',
                text: 'Keeps a detailed record of dragon sightings.',
                timestamp: new Date(Date.now() - 43200000).toISOString()
            }
        ],
        schedule: [
            { time: 'Morning', location: 'Village Square', activity: 'Holding council' },
            { time: 'Afternoon', location: 'Fields', activity: 'Inspecting crops' },
            { time: 'Evening', location: 'Elder\'s Hut', activity: 'Storytelling' }
        ],
        dialogue: [{
            id: '1',
            text: 'The dragon\'s attacks have become more frequent. We need help.',
            options: [
                {
                    text: 'Tell me about the dragon.',
                    nextDialogueId: '2'
                },
                {
                    text: 'How can we help?',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'Nature', level: 4, description: 'Knowledgeable about local flora and fauna' },
            { name: 'Medicine', level: 3, description: 'Skilled with herbal remedies' },
            { name: 'History', level: 4, description: 'Keeper of village lore' }
        ],
        relationships: [
            {
                npcId: '2',
                type: 'FRIEND',
                description: 'Reports dragon activity',
                reputation: 85
            }
        ],
        inventory: [
            {
                name: 'Dragon Lore Book',
                description: 'Ancient tome of dragon knowledge',
                quantity: 1,
                forSale: false,
                rarity: 'UNCOMMON'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
]; 