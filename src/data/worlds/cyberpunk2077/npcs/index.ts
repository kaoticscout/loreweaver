import { NPC, NPCStatus, RelationshipStatus } from '../../../../types/npc';

export const npcs: NPC[] = [
    {
        id: '1',
        name: 'Raven',
        role: 'Fixer',
        location: 'The Afterlife, Night City',
        description: 'A well-connected fixer known for her ability to find the impossible. With a network spanning all of Night City\'s underground, Raven specializes in high-stakes jobs and rare tech acquisitions.',
        level: 15,
        faction: 'Independent Fixers',
        status: NPCStatus.ALIVE,
        questGiver: true,
        relationshipStatus: RelationshipStatus.UNMET,
        notes: [
            {
                id: '1',
                text: 'Has connections to Militech\'s black market division.',
                timestamp: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: '2',
                text: 'Looking for specialized netrunner tech.',
                timestamp: new Date(Date.now() - 43200000).toISOString()
            }
        ],
        schedule: [
            { time: 'Morning', location: 'Private Office', activity: 'Reviewing job contracts and client meetings' },
            { time: 'Afternoon', location: 'The Afterlife', activity: 'Meeting with contractors and fixers' },
            { time: 'Night', location: 'VIP Lounge', activity: 'Networking with high-profile clients' }
        ],
        dialogue: [{
            id: '1',
            text: 'Got a high-stakes job that needs a professional touch. Interested in making some serious eddies?',
            options: [
                {
                    text: 'Tell me more about the job.',
                    nextDialogueId: '2'
                },
                {
                    text: 'What\'s the pay?',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'Negotiation', level: 5, description: 'Expert at deal-making and contract negotiation' },
            { name: 'Street Knowledge', level: 5, description: 'Extensive knowledge of Night City\'s underground' },
            { name: 'Tech Assessment', level: 4, description: 'Can accurately value cybernetic enhancements' },
            { name: 'Network Management', level: 5, description: 'Maintains vast network of contacts and informants' }
        ],
        inventory: [
            {
                name: 'Encrypted DataShard',
                description: 'High-security data storage device with client information',
                quantity: 1,
                forSale: false,
                rarity: 'RARE'
            },
            {
                name: 'Neural Link Scanner',
                description: 'Advanced device for checking cyberware compatibility',
                quantity: 1,
                forSale: false,
                rarity: 'VERY_RARE'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Dr. Chrome',
        role: 'Ripperdoc',
        location: 'Chrome Clinic, Watson District',
        description: 'A skilled ripperdoc with a reputation for cutting-edge cyberware installations. Known for their experimental tech and discretion, they cater to those seeking the latest in cybernetic enhancements.',
        level: 12,
        faction: 'Independent Medical Providers',
        status: NPCStatus.ALIVE,
        questGiver: true,
        relationshipStatus: RelationshipStatus.UNMET,
        notes: [
            {
                id: '1',
                text: 'Has access to prototype Arasaka cyberware.',
                timestamp: new Date(Date.now() - 172800000).toISOString()
            },
            {
                id: '2',
                text: 'Looking for test subjects for new neural implants.',
                timestamp: new Date(Date.now() - 86400000).toISOString()
            }
        ],
        schedule: [
            { time: 'Morning', location: 'Clinic', activity: 'Routine cyberware maintenance and checkups' },
            { time: 'Afternoon', location: 'Surgery Room', activity: 'Performing cyberware installations' },
            { time: 'Night', location: 'Lab', activity: 'Researching new cyberware modifications' }
        ],
        dialogue: [{
            id: '1',
            text: 'Got some fresh tech that needs testing. Interested in being on the cutting edge? Literally.',
            options: [
                {
                    text: 'What kind of tech are we talking about?',
                    nextDialogueId: '2'
                },
                {
                    text: 'How safe is this procedure?',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'Cybersurgery', level: 5, description: 'Expert at cyberware installation and modification' },
            { name: 'Medical Science', level: 4, description: 'Extensive knowledge of human anatomy and cybernetics' },
            { name: 'Tech Innovation', level: 5, description: 'Skilled at developing new cyberware modifications' },
            { name: 'Neural Integration', level: 4, description: 'Specialist in neural interface technology' }
        ],
        inventory: [
            {
                name: 'Prototype Neural Implant',
                description: 'Experimental cyberware with enhanced processing capabilities',
                quantity: 1,
                forSale: true,
                rarity: 'LEGENDARY'
            },
            {
                name: 'Military-Grade Cyberdeck',
                description: 'High-end hacking device with custom modifications',
                quantity: 1,
                forSale: true,
                rarity: 'VERY_RARE'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Ghost',
        role: 'Netrunner',
        location: 'Cyberden, Kabuki Market',
        description: 'A legendary netrunner who\'s said to have breached some of the most secure systems in Night City. Their true identity remains unknown, and they operate through a network of proxies and encrypted channels.',
        level: 18,
        faction: 'Voodoo Boys',
        status: NPCStatus.ALIVE,
        questGiver: true,
        relationshipStatus: RelationshipStatus.UNMET,
        notes: [
            {
                id: '1',
                text: 'Claims to have data on AI beyond the Blackwall.',
                timestamp: new Date(Date.now() - 259200000).toISOString()
            },
            {
                id: '2',
                text: 'Seeking information about recent corporate AI developments.',
                timestamp: new Date(Date.now() - 129600000).toISOString()
            }
        ],
        schedule: [
            { time: 'Morning', location: 'Hidden Server Room', activity: 'System maintenance and security updates' },
            { time: 'Afternoon', location: 'Net Access Point', activity: 'Deep dive operations in cyberspace' },
            { time: 'Night', location: 'Secret Location', activity: 'Meeting with other netrunners' }
        ],
        dialogue: [{
            id: '1',
            text: 'The corps are hiding something big in their networks. Help me get it, and I\'ll share the spoils.',
            options: [
                {
                    text: 'What exactly are we looking for?',
                    nextDialogueId: '2'
                },
                {
                    text: 'How dangerous is this run?',
                    nextDialogueId: '3'
                }
            ]
        }],
        skills: [
            { name: 'Netrunning', level: 5, description: 'Master of cyberspace navigation and system infiltration' },
            { name: 'ICE Breaking', level: 5, description: 'Expert at bypassing corporate security systems' },
            { name: 'Data Mining', level: 4, description: 'Skilled at extracting and analyzing secure data' },
            { name: 'AI Systems', level: 5, description: 'Deep understanding of artificial intelligence architecture' }
        ],
        inventory: [
            {
                name: 'Black ICE Breaker',
                description: 'Custom-made program for bypassing the most dangerous security systems',
                quantity: 1,
                forSale: false,
                rarity: 'LEGENDARY'
            },
            {
                name: 'Quantum Processor',
                description: 'Next-gen computing core for advanced netrunning operations',
                quantity: 1,
                forSale: false,
                rarity: 'VERY_RARE'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
]; 