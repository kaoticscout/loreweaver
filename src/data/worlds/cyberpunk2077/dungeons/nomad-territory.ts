import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const dungeonEncounters: DungeonEncounter[] = [
  {
    id: 'aldecaldo-camp',
    name: 'Aldecaldo Nomad Camp',
    description: 'A temporary settlement of the Aldecaldo nomad clan, with high-tech vehicles and makeshift structures dotting the desert landscape. The camp is a hub of activity, with mechanics working on vehicles and scouts monitoring the perimeter.',
    level: '7',
    difficulty: 'Medium',
    type: 'Social',
    enemies: [
      {
        name: 'Aldecaldo Leader',
        type: 'Leader',
        count: 1,
        cr: 8,
        abilities: [
          'Desert Survival: Environmental mastery',
          'Vehicle Expert: Advanced driving',
          'Clan Leadership: Team coordination',
          'Combat Training: Desert warfare',
          'Tech Knowledge: Vehicle systems'
        ],
        traits: [
          'Nomad Born',
          'Family First',
          'Desert Wise'
        ],
        alignment: 'Neutral Good'
      },
      {
        name: 'Nomad Scout',
        type: 'Regular',
        count: 3,
        cr: 5,
        abilities: [
          'Desert Navigation: Terrain mastery',
          'Vehicle Combat: Mobile warfare',
          'Surveillance: Area monitoring',
          'Survival Skills',
          'Basic Combat'
        ],
        traits: [
          'Alert',
          'Mobile',
          'Independent'
        ],
        alignment: 'Neutral Good'
      }
    ],
    rewards: [
      {
        type: 'Vehicle',
        description: 'Modified Nomad Vehicle',
        value: '45000€$'
      },
      {
        type: 'Technology',
        description: 'Desert Survival Gear',
        value: '20000€$'
      }
    ],
    location: {
      dungeon: 'Nomad Territory',
      area: 'Desert Camp',
      environment: 'Badlands'
    }
  },
  {
    id: 'wraith-ambush',
    name: 'Wraith Raider Ambush',
    description: 'A dangerous encounter with the notorious Wraith raiders, who have set up an ambush point using the natural rock formations and abandoned vehicles as cover.',
    level: '8',
    difficulty: 'Hard',
    type: 'Combat',
    enemies: [
      {
        name: 'Wraith Commander',
        type: 'Leader',
        count: 1,
        cr: 9,
        abilities: [
          'Guerrilla Tactics: Ambush specialist',
          'Desert Raider: Environmental combat',
          'Vehicle Warfare: Chase combat',
          'Ruthless Command',
          'Survival Expert'
        ],
        traits: [
          'Ruthless',
          'Tactical',
          'Survivor'
        ],
        alignment: 'Chaotic Evil'
      },
      {
        name: 'Wraith Raider',
        type: 'Regular',
        count: 4,
        cr: 6,
        abilities: [
          'Raider Combat: Aggressive tactics',
          'Vehicle Expert: Chase specialist',
          'Ambush Skills: Surprise attacks',
          'Desert Survival',
          'Scavenging'
        ],
        traits: [
          'Aggressive',
          'Opportunistic',
          'Desperate'
        ],
        alignment: 'Chaotic Evil'
      }
    ],
    rewards: [
      {
        type: 'Equipment',
        description: 'Wraith Combat Gear',
        value: '35000€$'
      },
      {
        type: 'Resources',
        description: 'Scavenged Technology',
        value: '25000€$'
      }
    ],
    location: {
      dungeon: 'Nomad Territory',
      area: 'Ambush Point',
      environment: 'Rocky Desert'
    }
  },
  {
    id: 'abandoned-facility',
    name: 'Abandoned Corporate Facility',
    description: 'A mysterious abandoned corporate research facility in the middle of the Badlands, now partially buried by sand. The facility holds valuable technology but is protected by still-active security systems.',
    level: '8',
    difficulty: 'Hard',
    type: 'Combat',
    enemies: [
      {
        name: 'Security System',
        type: 'Elite',
        count: 1,
        cr: 8,
        abilities: [
          'Automated Defense: Security protocols',
          'Facility Control: Environmental manipulation',
          'Drone Command: Robot control',
          'Area Denial',
          'System Integration'
        ],
        traits: [
          'Automated',
          'Persistent',
          'Integrated'
        ],
        alignment: 'Lawful Neutral'
      },
      {
        name: 'Security Drone',
        type: 'Regular',
        count: 5,
        cr: 5,
        abilities: [
          'Patrol Protocol: Area control',
          'Combat Systems: Weapon platforms',
          'Sensor Array: Detection systems',
          'Automated Response',
          'Defensive Measures'
        ],
        traits: [
          'Programmed',
          'Relentless',
          'Connected'
        ],
        alignment: 'Lawful Neutral'
      }
    ],
    rewards: [
      {
        type: 'Technology',
        description: 'Corporate Prototype',
        value: '60000€$'
      },
      {
        type: 'Data',
        description: 'Research Files',
        value: '40000€$'
      }
    ],
    location: {
      dungeon: 'Nomad Territory',
      area: 'Research Facility',
      environment: 'Desert Facility'
    }
  }
] 