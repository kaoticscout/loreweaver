import { DungeonEncounter } from '../../../../types/dungeon-encounter'
import { dungeonEncounters as neverwinterEncounters } from './neverwinter'
import { dungeonEncounters as luskanEncounters } from './luskan'

export const dungeonEncounters: DungeonEncounter[] = [
  ...neverwinterEncounters,
  ...luskanEncounters
]

export {
  neverwinterEncounters,
  luskanEncounters
} 