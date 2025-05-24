import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const dungeonEncounters: DungeonEncounter[] = [
  {
    id: 'street-race',
    name: 'Valentinos Street Race',
    description: 'A high-stakes street race through the narrow alleys of Heywood. Valentinos gang members show off their custom vehicles while conducting secret business deals. The air is thick with the smell of burning rubber and high-octane fuel.',
    level: '6',
    difficulty: 'Hard',
    type: 'Combat',
    enemies: [
      {
        name: 'Valentinos Racer',
        type: 'Elite',
        count: 1,
        cr: 7,
        abilities: [
          'Vehicle Master: Expert driving skills',
          'Kerenzikov: Enhanced reflexes',
          'Custom Vehicle: Heavily modified car',
          'Street Knowledge: Intimate knowledge of routes',
          'Combat Driver: Can fight while driving'
        ],
        traits: [
          'Street Honor',
          'Racing Champion',
          'Gang Pride'
        ],
        alignment: 'Lawful Neutral'
      },
      {
        name: 'Valentinos Support',
        type: 'Regular',
        count: 4,
        cr: 3,
        abilities: [
          'Vehicle Weapons: Mounted gun expertise',
          'Road Control: Traffic manipulation',
          'Gang Communication: Coordinated movements',
          'Basic Combat Training',
          'Vehicle Maintenance'
        ],
        traits: [
          'Gang Loyalty',
          'Street Smart',
          'Team Player'
        ],
        alignment: 'Neutral'
      }
    ],
    rewards: [
      {
        type: 'Vehicle',
        description: 'Custom Valentinos Racing Vehicle',
        value: '35000€$'
      },
      {
        type: 'Street Cred',
        description: 'Racing Circuit Recognition',
        value: '1000 Rep'
      }
    ],
    location: {
      dungeon: 'Valentinos Territory',
      area: 'Street Circuit',
      environment: 'Urban Streets'
    }
  },
  {
    id: 'church-ritual',
    name: 'Santa Muerte Ritual',
    description: 'A sacred ritual being performed in an old cathedral, mixing traditional Catholic imagery with street gang culture. The Valentinos are conducting an initiation ceremony for new members.',
    level: '6',
    difficulty: 'Medium',
    type: 'Social',
    enemies: [
      {
        name: 'Valentinos Priest',
        type: 'Leader',
        count: 1,
        cr: 6,
        abilities: [
          'Religious Authority: Command over gang members',
          'Street Blessing: Boost ally capabilities',
          'Gang Leadership: Tactical command',
          'Sacred Knowledge: Religious expertise',
          'Combat Training: Self-defense master'
        ],
        traits: [
          'Religious Devotion',
          'Gang Authority',
          'Spiritual Guide'
        ],
        alignment: 'Lawful Neutral'
      },
      {
        name: 'Valentinos Initiate',
        type: 'Regular',
        count: 3,
        cr: 2,
        abilities: [
          'Basic Combat: Street fighting skills',
          'Gang Loyalty: Enhanced morale',
          'Religious Fervor: Resistance to fear',
          'Street Knowledge',
          'Basic Weapons Training'
        ],
        traits: [
          'Eager to Prove',
          'Religious Faith',
          'Gang Aspirant'
        ],
        alignment: 'Neutral'
      }
    ],
    rewards: [
      {
        type: 'Artifact',
        description: 'Santa Muerte Blessed Icon',
        value: '2500€$'
      },
      {
        type: 'Alliance',
        description: 'Valentinos Gang Respect',
        value: 'Gang Alliance'
      }
    ],
    location: {
      dungeon: 'Valentinos Territory',
      area: 'Old Cathedral',
      environment: 'Religious Site'
    }
  },
  {
    id: 'weapons-deal',
    name: 'Underground Arms Deal',
    description: 'A major weapons transaction between the Valentinos and an unknown corporate entity. The deal is taking place in a secret underground garage filled with custom vehicles and hidden weapon caches.',
    level: '6',
    difficulty: 'Deadly',
    type: 'Combat',
    enemies: [
      {
        name: 'Corporate Agent',
        type: 'Elite',
        count: 1,
        cr: 8,
        abilities: [
          'Military Grade Cyberware: Enhanced combat',
          'Corporate Training: Advanced tactics',
          'Stealth Systems: Active camouflage',
          'Neural Link: Direct weapon interface',
          'Combat Analysis: Tactical advantage'
        ],
        traits: [
          'Professional',
          'Cold Efficiency',
          'Corporate Loyalty'
        ],
        alignment: 'Lawful Evil'
      },
      {
        name: 'Valentinos Guard',
        type: 'Regular',
        count: 4,
        cr: 4,
        abilities: [
          'Heavy Weapons: Expertise with firearms',
          'Cyber Eyes: Enhanced targeting',
          'Armored Implants: Increased defense',
          'Gang Tactics',
          'Area Security'
        ],
        traits: [
          'Gang Honor',
          'Protective',
          'Combat Ready'
        ],
        alignment: 'Neutral'
      }
    ],
    rewards: [
      {
        type: 'Weapons',
        description: 'Military Grade Weapons Cache',
        value: '45000€$'
      },
      {
        type: 'Information',
        description: 'Corporate Arms Deal Data',
        value: 'High Value Intel'
      }
    ],
    location: {
      dungeon: 'Valentinos Territory',
      area: 'Underground Garage',
      environment: 'Secret Facility'
    }
  }
] 