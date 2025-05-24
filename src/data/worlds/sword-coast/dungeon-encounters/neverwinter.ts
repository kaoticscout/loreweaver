import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const dungeonEncounters: DungeonEncounter[] = [
  {
    id: 'goblin-ambush',
    name: 'Goblin Ambush',
    description: 'A group of goblins lying in wait for unsuspecting travelers.',
    level: '1-3',
    difficulty: 'Easy',
    type: 'Combat',
    enemies: [
      {
        name: 'Goblin',
        type: 'Humanoid',
        count: 4,
        cr: 0.25,
        abilities: ['Nimble Escape', 'Scimitar', 'Shortbow'],
        alignment: 'Neutral Evil'
      }
    ],
    rewards: [
      {
        type: 'Gold',
        description: 'Stolen coins',
        value: '50gp'
      }
    ],
    location: {
      dungeon: 'Neverwinter Wood',
      area: 'Forest Path',
      environment: 'Forest'
    }
  },
  {
    id: 'cultist-initiation',
    name: 'Cultist Initiation',
    description: 'A dark ritual being performed by cultists in an abandoned temple.',
    level: '3',
    difficulty: 'Medium',
    type: 'Combat',
    enemies: [
      {
        name: 'Cult Fanatic',
        type: 'Humanoid',
        count: 1,
        cr: 2,
        abilities: ['Spellcasting', 'Dark Devotion'],
        alignment: 'Chaotic Evil'
      },
      {
        name: 'Cultist',
        type: 'Humanoid',
        count: 4,
        cr: 0.125,
        abilities: ['Dark Devotion', 'Scimitar'],
        alignment: 'Chaotic Evil'
      }
    ],
    rewards: [
      {
        type: 'Magic Item',
        description: 'Cursed Ritual Dagger',
        value: '100gp',
        rarity: 'Uncommon'
      }
    ],
    location: {
      dungeon: 'Neverwinter Ruins',
      area: 'Abandoned Temple',
      environment: 'Urban Ruins'
    }
  }
]
