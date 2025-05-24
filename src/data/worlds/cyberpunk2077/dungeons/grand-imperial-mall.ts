import { Dungeon } from '../../../../types/city'

export const grandImperialMall: Dungeon = {
  id: 'grand-imperial-mall',
  name: 'Grand Imperial Mall',
  description: 'Once destined to be Night City\'s premier shopping destination, the Grand Imperial Mall now stands as a towering monument to Pacifica\'s failed dreams. Its vast halls and abandoned stores have become a fortress for the Animals gang, who use its maze-like structure and defensible positions to maintain their territory. The mall\'s multiple levels, from the flooded basement to the partially collapsed upper floors, create a dangerous urban labyrinth. The layout includes a flooded basement with hazardous electrical systems, a fortified ground floor with security checkpoints, the Animals gang\'s living quarters and training areas on the second floor, and a partially collapsed top floor with sniper positions. Special areas include a converted food court gladiator arena and a hidden black market hub in the old luxury stores section.',
  challengeRating: 7,
  level: 'Hard',
  difficulty: 'High',
  images: ['/art/environments/cyberpunk/1 - 8a4jrOU.jpg'],
  location: {
    region: 'Pacifica',
    environment: 'Urban Ruins'
  },
  inhabitants: [
    'Animals Gang Members',
    'Scavengers',
    'Rogue Security Systems',
    'Squatters',
    'Black Market Vendors'
  ],
  treasures: [
    'Military Grade Cyberware',
    'Prototype Combat Implants',
    'Abandoned Corporate Data',
    'Pre-Collapse Luxury Goods',
    'Illegal Weapon Caches'
  ],
  hazards: [
    'Structural Instability',
    'Electrified Water Pools',
    'Malfunctioning Security Turrets',
    'Gang Ambush Points',
    'Toxic Chemical Leaks'
  ],
  history: 'The Grand Imperial Mall was meant to be the crown jewel of Pacifica\'s tourism industry. Construction was nearly complete when the investment crash of 2062 hit, leaving the massive structure abandoned. The Animals gang moved in during the power vacuum, converting the mall into their primary base of operations. They\'ve since fortified the structure, turning its retail spaces into training grounds and its food courts into gladiatorial arenas.',
  encounters: [
    'Animals Gang Patrol',
    'Rogue Security System',
    'Gladiator Arena Fight'
  ],
  treasure: {
    gold: 15000,
    gems: [
      { type: 'Military Tech Cache', value: 5000 },
      { type: 'Prototype Implants', value: 8000 },
      { type: 'Corporate Data Shard', value: 3000 }
    ],
    art: [
      { type: 'Pre-Collapse Mall Art', value: 2000 },
      { type: 'Luxury Store Goods', value: 3000 }
    ],
    magicItems: [
      { name: 'Prototype Combat System', rarity: 'Very Rare' },
      { name: 'Military Grade Cyberdeck', rarity: 'Rare' },
      { name: 'Enhanced Reflex Booster', rarity: 'Rare' }
    ]
  }
} 