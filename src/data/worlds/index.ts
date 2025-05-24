import { World } from '../../types/world'
import { swordCoast } from './sword-coast'
import { eberron } from './ebberon'
import { cyberpunk2077 } from './cyberpunk2077'
import { victorianLondon } from './victorian-london'
import { postApocalyptic } from './post-apocalyptic'
import { ancientEgypt } from './ancient-egypt'
import { cosmicHorror } from './cosmic-horror'
import { noirDetective } from './noir-detective'
import { spaceColony } from './space-colony'
import { steampunkEmpire } from './steampunk-empire'

// Export all worlds
export const worlds: World[] = [
  swordCoast,
  eberron,
  cyberpunk2077,
  victorianLondon,
  postApocalyptic,
  ancientEgypt,
  cosmicHorror,
  noirDetective,
  spaceColony,
  steampunkEmpire,
  // Add other worlds here as they are migrated to the new structure
]

// Export individual worlds
export {
  swordCoast,
  eberron,
  cyberpunk2077,
  victorianLondon,
  postApocalyptic,
  ancientEgypt,
  cosmicHorror,
  noirDetective,
  spaceColony,
  steampunkEmpire
} 