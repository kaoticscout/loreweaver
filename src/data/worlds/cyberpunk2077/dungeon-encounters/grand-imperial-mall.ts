import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const dungeonEncounters: DungeonEncounter[] = [
  {
    id: 'animals-patrol',
    name: 'Animals Gang Patrol',
    description: 'A group of cybernetically enhanced Animals gang members patrolling their territory. Their massive forms are augmented with visible cyberware, muscles bulging unnaturally beneath their skin. They move with an aggressive confidence, always looking for a fight.',
    level: '7',
    difficulty: 'Medium',
    type: 'Combat',
    enemies: [
      {
        name: 'Animals Enforcer',
        type: 'Heavy',
        count: 1,
        cr: 5,
        abilities: [
          'Cybernetic Enhancement: +2 to Strength and Constitution',
          'Berserk Mode: Can enter a rage state for enhanced damage',
          'Heavy Weapons Expertise: Proficient with all heavy weapons',
          'Military Grade Cyberware',
          'Heavy Melee Weapons Mastery'
        ],
        traits: [
          'Enhanced Strength',
          'Cyber-Reinforced Body',
          'Combat Stim Dependency'
        ],
        alignment: 'Chaotic Neutral'
      },
      {
        name: 'Animals Grunt',
        type: 'Regular',
        count: 3,
        cr: 2,
        abilities: [
          'Basic Cyberware: Enhanced strength and reflexes',
          'Gang Tactics: Advantage when allies are nearby',
          'Street Fighter: Bonus damage with melee weapons',
          'Basic Cyberware Integration',
          'Melee Combat Training'
        ],
        traits: [
          'Enhanced Reflexes',
          'Gang Loyalty',
          'Street Tough'
        ],
        alignment: 'Chaotic Neutral'
      }
    ],
    rewards: [
      {
        type: 'Equipment',
        description: 'Combat Stims and Cyberware Components',
        value: '1000€$'
      },
      {
        type: 'Experience',
        description: '1500 XP'
      }
    ],
    location: {
      dungeon: 'Grand Imperial Mall',
      area: 'Shopping Corridors',
      environment: 'Urban Ruins'
    }
  },
  {
    id: 'security-system',
    name: 'Rogue Security System',
    description: 'A malfunctioning security system that has gone haywire, its AI corrupted by years of neglect and cyber attacks. The automated defenses treat everything as a threat, unleashing lethal force without discrimination.',
    level: '7',
    difficulty: 'Hard',
    type: 'Combat',
    enemies: [
      {
        name: 'Security Turret',
        type: 'Stationary',
        count: 2,
        cr: 4,
        abilities: [
          'Auto-Targeting: High accuracy against moving targets',
          'Armor Piercing: Ignores part of target\'s armor',
          'Rapid Fire: Multiple attacks per round',
          'Advanced Targeting Systems',
          'Heavy Caliber Integration'
        ],
        traits: [
          'Hardened Systems',
          'Motion Detection',
          'Backup Power'
        ],
        alignment: 'Unaligned'
      },
      {
        name: 'Security Drone',
        type: 'Mobile',
        count: 3,
        cr: 2,
        abilities: [
          'Flight: Can move in three dimensions',
          'Scanning Systems: Detect hidden targets',
          'Swarm Tactics: Coordinate with other drones',
          'Advanced Scanning Suite',
          'Light Weapons Systems'
        ],
        traits: [
          'Agile Flight',
          'Network Link',
          'Self-Repair'
        ],
        alignment: 'Unaligned'
      }
    ],
    rewards: [
      {
        type: 'Technology',
        description: 'Security Protocols and Weapon Components',
        value: '1500€$'
      },
      {
        type: 'Experience',
        description: '2000 XP'
      }
    ],
    location: {
      dungeon: 'Grand Imperial Mall',
      area: 'Security Control Room',
      environment: 'High-Tech Ruins'
    }
  },
  {
    id: 'gladiator-arena',
    name: 'Gladiator Arena Fight',
    description: 'The converted food court now serves as a brutal arena where the Animals hold their fighting tournaments. The champion, a mountain of chrome and synthetic muscle, awaits challengers in the ring while the crowd bays for blood.',
    level: '7',
    difficulty: 'Deadly',
    type: 'Combat',
    enemies: [
      {
        name: 'Arena Champion',
        type: 'Boss',
        count: 1,
        cr: 8,
        abilities: [
          'Legendary Cyberware: Superior strength and speed',
          'Combat Master: Multiple attacks and reactions',
          'Crowd Frenzy: Gains power from spectator energy',
          'Legendary Combat Implants',
          'Custom Weapon Mastery'
        ],
        traits: [
          'Unmatched Strength',
          'Arena Veteran',
          'Bloodlust'
        ],
        alignment: 'Chaotic Neutral'
      },
      {
        name: 'Arena Supporter',
        type: 'Regular',
        count: 2,
        cr: 3,
        abilities: [
          'Support Fire: Can assist the champion',
          'Crowd Control: Manages spectator interference',
          'Quick Recovery: Fast healing abilities',
          'Combat Stim Expertise',
          'Medium Weapons Training'
        ],
        traits: [
          'Arena Loyalty',
          'Combat Support',
          'Quick Reflexes'
        ],
        alignment: 'Chaotic Neutral'
      }
    ],
    rewards: [
      {
        type: 'Unique Item',
        description: 'Champion\'s Weapon and Unique Cyberware',
        value: '5000€$'
      },
      {
        type: 'Experience',
        description: '3000 XP'
      }
    ],
    location: {
      dungeon: 'Grand Imperial Mall',
      area: 'Gladiator Arena',
      environment: 'Combat Arena'
    }
  }
] 