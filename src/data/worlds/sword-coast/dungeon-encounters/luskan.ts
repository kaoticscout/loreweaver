import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const dungeonEncounters: DungeonEncounter[] = [
  {
    id: 'mind-flayer-colony',
    name: 'Mind Flayer Colony',
    description: 'A hidden colony of mind flayers beneath the streets of Luskan.',
    level: '15-20',
    difficulty: 'Hard',
    type: 'Combat',
    enemies: [
      {
        name: 'Mind Flayer',
        type: 'Aberration',
        count: 3,
        cr: 7,
        abilities: ['Mind Blast', 'Extract Brain', 'Tentacles'],
        traits: ['Magic Resistance', 'Telepathy'],
        alignment: 'Lawful Evil',
        resistances: ['Psychic']
      }
    ],
    rewards: [
      {
        type: 'Magic Item',
        description: 'Mind Flayer Staff',
        value: '2000gp',
        rarity: 'Very Rare'
      }
    ],
    location: {
      dungeon: 'Luskan Undercity',
      area: 'Mind Flayer Colony',
      environment: 'Underground'
    }
  },
  {
    id: 'beholder-lair',
    name: 'Ancient Beholder Lair',
    description: 'The lair of an ancient beholder deep within the Luskan catacombs.',
    level: '17',
    difficulty: 'Hard',
    type: 'Combat',
    enemies: [
      {
        name: 'Ancient Beholder',
        type: 'Aberration',
        count: 1,
        cr: 13,
        abilities: ['Eye Rays', 'Antimagic Cone', 'Legendary Actions'],
        traits: ['Flight', 'All-Around Vision'],
        alignment: 'Lawful Evil',
        legendaryActions: ['Eye Ray', 'Move', 'Disintegrate Ray']
      }
    ],
    rewards: [
      {
        type: 'Magic Item',
        description: 'Eye of the Beholder',
        value: '5000gp',
        rarity: 'Legendary'
      }
    ],
    location: {
      dungeon: 'Luskan Catacombs',
      area: 'Beholder\'s Chamber',
      environment: 'Underground'
    }
  }
]
