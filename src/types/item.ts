export interface Item {
  id: string
  name: string
  image: string
  description: string
  category: string
  rarity: string
  cost: number
  classification?: string
  armor?: {
    ac: string
  }
  weapon?: {
    damage: string
    damage_type: string
    properties: string[]
  }
  gear?: {
    capacity?: string
    usage?: string
    [key: string]: any
  }
  tools?: {
    type: string
    proficiency: string
    usage: string
  }
  worldId: string
} 