import { NPC, NPCStatus, RelationshipStatus } from '../../../../types/npc';

export const npcs: NPC[] = [
    {
        id: '1',
        name: 'Merchant Guild Master',
        role: 'Quest Giver',
        location: 'Baldur\'s Gate Market, Baldur\'s Gate',
        description: 'A shrewd businessman who oversees the Merchant Guild\'s operations in Baldur\'s Gate. Known for his sharp wit and even sharper business acumen, he maintains a vast network of trade routes and merchant contacts throughout the Sword Coast.',
        level: 8,
        faction: 'Merchant Guild',
        status: NPCStatus.ALIVE,
        questGiver: true,
        relationshipStatus: RelationshipStatus.FRIENDLY,
        notes: [
            {
                id: '1',
                text: 'Has a secret stash of rare magical items.',
                timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
            },
            {
                id: '2',
                text: 'Mentioned a potential trade deal with Waterdeep merchants.',
                timestamp: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
            }
        ],
        schedule: [
            { time: 'Morning', location: 'Guild Hall', activity: 'Managing guild affairs and reviewing trade reports' },
            { time: 'Afternoon', location: 'Market', activity: 'Overseeing trade and meeting with merchants' },
            { time: 'Evening', location: 'Private Office', activity: 'Planning trade routes and negotiating deals' }
        ],
        dialogue: [{
            id: '1',
            text: 'The bandits have been causing trouble on our trade routes. We need someone to investigate.',
            options: [
                {
                    text: 'I\'ll help investigate the missing caravan.',
                    nextDialogueId: '2'
                },
                {
                    text: 'What\'s in it for me?',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'Persuasion', level: 5, description: 'Expert negotiator with a silver tongue' },
            { name: 'Business', level: 5, description: 'Master trader with decades of experience' },
            { name: 'Diplomacy', level: 4, description: 'Skilled in resolving merchant disputes' },
            { name: 'Appraisal', level: 4, description: 'Can accurately value any trade good' }
        ],
        relationships: [
            {
                npcId: '2',
                type: 'BUSINESS',
                description: 'Trading partner and occasional rival',
                reputation: 75
            },
            {
                npcId: '3',
                type: 'NEUTRAL',
                description: 'Regular customer for magical goods',
                reputation: 85
            }
        ],
        inventory: [
            {
                name: 'Guild Seal',
                description: 'Official seal of the Merchant Guild, used to authenticate trade documents',
                quantity: 1,
                forSale: false,
                rarity: 'RARE'
            },
            {
                name: 'Trade Ledger',
                description: 'Detailed record of all guild transactions',
                quantity: 1,
                forSale: false,
                rarity: 'UNCOMMON'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Lord Blackwood',
        role: 'Quest Giver',
        location: 'Blackwood Keep, Blackwood Forest',
        description: 'A noble lord concerned about the dragon threatening his lands. A former military commander who earned his title through valor in battle, he now struggles to protect his people from the growing dragon threat.',
        level: 12,
        faction: 'Noble House Blackwood',
        status: NPCStatus.ALIVE,
        questGiver: true,
        relationshipStatus: RelationshipStatus.UNMET,
        notes: [
            {
                id: '1',
                text: 'Has a daughter who is secretly training as a wizard.',
                timestamp: new Date(Date.now() - 172800000).toISOString() // 2 days ago
            },
            {
                id: '2',
                text: 'Keep an eye on the eastern tower at night.',
                timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
            }
        ],
        schedule: [
            { time: 'Morning', location: 'War Room', activity: 'Military planning and strategy meetings' },
            { time: 'Afternoon', location: 'Training Grounds', activity: 'Overseeing guard training' },
            { time: 'Evening', location: 'Great Hall', activity: 'Hosting guests and holding court' }
        ],
        dialogue: [{
            id: '1',
            text: 'The dragon has been terrorizing my lands. I need brave adventurers to deal with this threat.',
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
            { name: 'Leadership', level: 5, description: 'Experienced commander with tactical expertise' },
            { name: 'Diplomacy', level: 4, description: 'Skilled negotiator and mediator' },
            { name: 'Strategy', level: 5, description: 'Master tactician and military planner' },
            { name: 'Swordsmanship', level: 4, description: 'Expert in various combat techniques' }
        ],
        relationships: [
            {
                npcId: '1',
                type: 'BUSINESS',
                description: 'Trading partner and occasional rival',
                reputation: 75
            },
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
                description: 'Family heirloom and symbol of authority',
                quantity: 1,
                forSale: false,
                rarity: 'RARE'
            },
            {
                name: 'Tactical Map',
                description: 'Detailed map of the region with strategic points marked',
                quantity: 1,
                forSale: false,
                rarity: 'UNCOMMON'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Archmage Vorthos',
        role: 'Quest Giver',
        location: 'Arcane Brotherhood Tower, Neverwinter',
        description: 'A powerful wizard and leader of the Arcane Brotherhood. Centuries old and immensely knowledgeable, he seeks to preserve and expand magical knowledge while maintaining the delicate balance of power in the region.',
        level: 15,
        faction: 'Arcane Brotherhood',
        status: NPCStatus.ALIVE,
        questGiver: true,
        relationshipStatus: RelationshipStatus.ALLY,
        notes: [
            {
                id: '1',
                text: 'Interested in ancient Netherese artifacts.',
                timestamp: new Date(Date.now() - 259200000).toISOString() // 3 days ago
            },
            {
                id: '2',
                text: 'Has a hidden library accessible only to trusted allies.',
                timestamp: new Date(Date.now() - 129600000).toISOString() // 1.5 days ago
            }
        ],
        schedule: [
            { time: 'Morning', location: 'Library', activity: 'Research and study of ancient texts' },
            { time: 'Afternoon', location: 'Laboratory', activity: 'Magical experimentation and spell crafting' },
            { time: 'Evening', location: 'Council Chamber', activity: 'Meeting with other archmages' }
        ],
        dialogue: [{
            id: '1',
            text: 'The lost library contains knowledge that could change the world. Will you help recover it?',
            options: [
                {
                    text: 'I\'ll help recover the ancient tomes.',
                    nextDialogueId: '2'
                },
                {
                    text: 'What knowledge are you seeking?',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'Arcana', level: 5, description: 'Master of magical theory and practice' },
            { name: 'History', level: 5, description: 'Ancient knowledge expert and lore keeper' },
            { name: 'Alchemy', level: 4, description: 'Expert in magical potions and elixirs' },
            { name: 'Enchantment', level: 5, description: 'Master of magical item creation' }
        ],
        inventory: [
            {
                name: 'Arcane Tome',
                description: 'Rare magical text containing forgotten spells',
                quantity: 1,
                forSale: false,
                rarity: 'RARE'
            },
            {
                name: 'Crystal Orb',
                description: 'Magical focus used for divination and scrying',
                quantity: 1,
                forSale: false,
                rarity: 'VERY_RARE'
            },
            {
                name: 'Staff of the Archmage',
                description: 'Ancient staff passed down through generations of archmages',
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
        location: 'Wyrms Peak',
        description: 'A wise and respected elder who has witnessed the dragon\'s attacks firsthand. Their knowledge of local history and dragon lore is invaluable.',
        level: 5,
        faction: 'Village Council',
        status: NPCStatus.ALIVE,
        questGiver: true,
        relationshipStatus: RelationshipStatus.FRIENDLY,
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
            { time: 'Morning', location: 'Village Hall', activity: 'Meeting with villagers' },
            { time: 'Afternoon', location: 'Lookout Point', activity: 'Watching for dragon activity' },
            { time: 'Evening', location: 'Home', activity: 'Recording observations' }
        ],
        dialogue: [{
            id: '1',
            text: 'The dragon has been growing bolder with each passing day. We need help before it\'s too late.',
            options: [
                {
                    text: 'Tell me about the dragon\'s patterns.',
                    nextDialogueId: '2'
                },
                {
                    text: 'How many attacks have there been?',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'History', level: 4, description: 'Expert in local history and legends' },
            { name: 'Nature', level: 3, description: 'Knowledge of dragon behavior' },
            { name: 'Survival', level: 3, description: 'Experienced in mountain living' }
        ],
        relationships: [
            {
                npcId: '2',
                type: 'FRIEND',
                description: 'Reports dragon activity to Lord Blackwood',
                reputation: 85
            }
        ],
        inventory: [
            {
                name: 'Dragon Lore Book',
                description: 'Ancient tome containing dragon knowledge',
                quantity: 1,
                forSale: false,
                rarity: 'UNCOMMON'
            },
            {
                name: 'Village Records',
                description: 'Detailed records of dragon sightings',
                quantity: 1,
                forSale: false,
                rarity: 'COMMON'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
]; 