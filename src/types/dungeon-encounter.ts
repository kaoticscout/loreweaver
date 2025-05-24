export interface DungeonEncounter {
  id: string
  name: string
  description: string
  level: number | string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Deadly'
  type: 'Combat' | 'Trap' | 'Puzzle' | 'Social'
  enemies: {
    name: string
    type: string
    count: number
    cr?: number
    size?: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan'
    armorClass?: number
    armorType?: string
    hitPoints?: number
    hitDice?: string
    speed?: {
      walk?: number
      fly?: number
      swim?: number
      climb?: number
      burrow?: number
    }
    abilityScores?: {
      strength: number
      dexterity: number
      constitution: number
      intelligence: number
      wisdom: number
      charisma: number
    }
    abilities: string[]
    traits?: string[]
    alignment?: string
    resistances?: string[]
    immunities?: string[]
    vulnerabilities?: string[]
    conditionImmunities?: string[]
    legendaryActions?: {
      name: string
      description: string
      cost?: number
    }[]
  }[]
  rewards: {
    type: string
    description: string
    value?: string
    rarity?: string
  }[]
  location: {
    dungeon: string
    area: string
    environment?: string
    coordinates?: [number, number]
  }
  triggers?: {
    type: string
    description: string
    dc?: number
  }[]
  notes?: string[]
  xp?: number
  treasure?: {
    gold: number
    gems?: { type: string; value: number }[]
    art?: { type: string; value: number }[]
    magicItems?: { name: string; rarity: string }[]
    equipment?: string[]
    spellComponents?: string[]
  }
} 