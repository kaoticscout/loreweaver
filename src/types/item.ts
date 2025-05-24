export interface Item {
  id: string
  name: string
  description: string
  type: string
  rarity: string
  value: string
  image: string
  properties?: string[]
  requirements?: string[]
  effects?: string[]
} 