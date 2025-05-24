export const dungeonBanners = {
  ancientLibrary: '/src/data/art/banners/ancient-library.jpg',
  crystalCaverns: '/src/data/art/banners/crystal-caverns.jpg',
  abandonedMine: '/src/data/art/banners/abandoned-mine.jpg',
  dragonLair: '/src/data/art/banners/dragon-lair.jpg',
  elvenRuins: '/src/data/art/banners/elven-ruins.jpg',
  dwarvenForge: '/src/data/art/banners/dwarven-forge.jpg',
  necromancerTower: '/src/data/art/banners/necromancer-tower.jpg',
  sunkenTemple: '/src/data/art/banners/sunken-temple.jpg',
  forestSanctuary: '/src/data/art/banners/forest-sanctuary.jpg',
  mountainPass: '/src/data/art/banners/mountain-pass.jpg',
  desertOasis: '/src/data/art/banners/desert-oasis.jpg',
  frozenKeep: '/src/data/art/banners/frozen-keep.jpg',
  swampLair: '/src/data/art/banners/swamp-lair.jpg',
  coastalRuins: '/src/data/art/banners/coastal-ruins.jpg',
  volcanicCaverns: '/src/data/art/banners/volcanic-caverns.jpg'
} as const;

export type DungeonBannerType = keyof typeof dungeonBanners; 