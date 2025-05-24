import { DungeonEncounter } from '../../../../types/dungeon-encounter'

const allIlluskEncounters = [
  'archdevil-court',
  'elder-brain-lair',
  'kraken-domain',
  'solar-trial',
  'elder-brain-dragon'
]

function getRandomEncounters(encounters: string[], min: number = 1, max: number = 5): string[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min
  const shuffled = [...encounters].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const illuskEncounters: string[] = getRandomEncounters(allIlluskEncounters)
