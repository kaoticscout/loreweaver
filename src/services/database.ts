import { PrismaClient, Prisma } from '@prisma/client';
import type { Location } from '../types/location';
import type { World } from '../types/world';
import type { Region } from '../types/region';
import type { Dungeon } from '../types/dungeon';
import type { DungeonEncounter } from '../types/dungeonEncounter';
import type { Item } from '../types/item';

const prisma = new PrismaClient();

// Type conversion helpers
const toDBLocation = (location: Location): Prisma.LocationCreateInput => {
  const dbLocation: Prisma.LocationCreateInput = {
    id: location.id,
    name: location.name,
    description: location.description,
    type: location.type,
    coordinates: location.coordinates as unknown as Prisma.InputJsonValue,
    population: location.population ?? null,
  };

  // Optional arrays that might exist on some location types
  if ('primaryRaces' in location) {
    dbLocation.primaryRaces = (location as any).primaryRaces;
  }
  if ('notableFeatures' in location) {
    dbLocation.notableFeatures = (location as any).notableFeatures;
  }
  if ('services' in location) {
    dbLocation.services = (location as any).services;
  }
  if ('localGovernment' in location) {
    dbLocation.localGovernment = (location as any).localGovernment;
  }
  if ('significance' in location) {
    dbLocation.significance = (location as any).significance;
  }
  if ('history' in location) {
    dbLocation.history = (location as any).history;
  }

  return dbLocation;
};

const fromDBLocation = (dbLocation: any): Location => ({
  id: dbLocation.id,
  name: dbLocation.name,
  description: dbLocation.description,
  type: dbLocation.type,
  coordinates: dbLocation.coordinates as { x: number; y: number } | undefined,
  population: dbLocation.population,
  region: dbLocation.region,
  ...(dbLocation.primaryRaces && { primaryRaces: dbLocation.primaryRaces }),
  ...(dbLocation.notableFeatures && { notableFeatures: dbLocation.notableFeatures }),
  ...(dbLocation.services && { services: dbLocation.services }),
  ...(dbLocation.localGovernment && { localGovernment: dbLocation.localGovernment }),
  ...(dbLocation.significance && { significance: dbLocation.significance }),
  ...(dbLocation.history && { history: dbLocation.history }),
});

const fromDBWorld = (dbWorld: any): World => {
  console.log('Raw DB world data:', dbWorld);
  const world = {
    id: dbWorld.id,
    name: dbWorld.name,
    description: dbWorld.description,
    banner: dbWorld.banner,
    thumbnail: dbWorld.thumbnail,
    theme: dbWorld.theme,
    rating: typeof dbWorld.rating === 'string' ? JSON.parse(dbWorld.rating) : dbWorld.rating,
    tags: dbWorld.tags,
    createdAt: dbWorld.createdAt,
    lastUpdated: dbWorld.lastUpdated,
    creator: dbWorld.creator,
    featured: dbWorld.featured,
    popularity: dbWorld.popularity,
    difficulty: dbWorld.difficulty,
    recommendedLevel: dbWorld.recommendedLevel,
    estimatedPlayTime: dbWorld.estimatedPlayTime,
    languages: dbWorld.languages,
    contentWarnings: dbWorld.contentWarnings,
    regions: dbWorld.regions || []
  };
  console.log('Transformed world data:', world);
  return world;
};

const fromDBRegion = (dbRegion: any): Region => ({
  id: dbRegion.id,
  name: dbRegion.name,
  description: dbRegion.description,
  biography: dbRegion.biography,
  color: dbRegion.color,
  banner: dbRegion.banner,
  images: dbRegion.images || [],
  notableFeatures: dbRegion.notableFeatures,
  history: dbRegion.history,
  keyFigures: dbRegion.keyFigures,
  economy: dbRegion.economy,
  seasons: dbRegion.seasons || [],
  magicalItems: dbRegion.magicalItems || [],
  worldId: dbRegion.worldId,
  cities: dbRegion.cities || [],
  locations: dbRegion.locations || []
});

const fromDBDungeon = (dbDungeon: any): Dungeon => ({
  id: dbDungeon.id,
  name: dbDungeon.name,
  description: dbDungeon.description,
  level: dbDungeon.minLevel.toString(),
  difficulty: dbDungeon.difficulty,
  challengeRating: dbDungeon.difficulty,
  location: {
    region: dbDungeon.region?.name || '',
    environment: dbDungeon.environment
  },
  inhabitants: dbDungeon.creatures || [],
  treasures: dbDungeon.treasures || [],
  hazards: dbDungeon.hazards || [],
  history: dbDungeon.description,
  encounters: [],
  treasure: []
});

const fromDBEncounter = (dbEncounter: any): DungeonEncounter => ({
  id: dbEncounter.id,
  name: dbEncounter.name,
  description: dbEncounter.description,
  type: dbEncounter.type,
  difficulty: dbEncounter.difficulty,
  enemies: dbEncounter.enemies || [],
  rewards: dbEncounter.rewards || [],
  conditions: dbEncounter.conditions,
  level: dbEncounter.level,
  location: dbEncounter.location,
  triggers: dbEncounter.triggers,
  notes: dbEncounter.notes,
  xp: dbEncounter.xp,
  treasure: dbEncounter.treasure
});

const fromDBItem = (dbItem: any): Item => ({
  id: dbItem.id,
  name: dbItem.name,
  image: dbItem.image,
  description: dbItem.description,
  category: dbItem.category,
  rarity: dbItem.rarity,
  cost: dbItem.cost,
  classification: dbItem.classification,
  armor: dbItem.armor,
  weapon: dbItem.weapon,
  gear: dbItem.gear,
  tools: dbItem.tools,
  worldId: dbItem.worldId
});

export const DatabaseService = {
  // World operations
  async getAllWorlds(): Promise<World[]> {
    const worlds = await prisma.world.findMany();
    return worlds.map(fromDBWorld);
  },

  async getWorldById(id: string): Promise<World | null> {
    const world = await prisma.world.findUnique({
      where: { id },
    });
    return world ? fromDBWorld(world) : null;
  },

  async getWorldsByTheme(theme: string): Promise<World[]> {
    const worlds = await prisma.world.findMany({
      where: { theme },
    });
    return worlds.map(fromDBWorld);
  },

  async getFeaturedWorlds(): Promise<World[]> {
    const worlds = await prisma.world.findMany({
      where: { featured: true },
    });
    return worlds.map(fromDBWorld);
  },

  // Location operations
  async getAllLocations(): Promise<Location[]> {
    const locations = await prisma.location.findMany();
    return locations.map(fromDBLocation);
  },

  async getLocationById(id: string): Promise<Location | null> {
    const location = await prisma.location.findUnique({
      where: { id },
    });
    return location ? fromDBLocation(location) : null;
  },

  async createLocation(location: Location): Promise<Location> {
    const created = await prisma.location.create({
      data: toDBLocation(location),
    });
    return fromDBLocation(created);
  },

  async updateLocation(id: string, location: Partial<Location>): Promise<Location> {
    const updated = await prisma.location.update({
      where: { id },
      data: toDBLocation(location as Location),
    });
    return fromDBLocation(updated);
  },

  async deleteLocation(id: string): Promise<void> {
    await prisma.location.delete({
      where: { id },
    });
  },

  // Region operations
  async getRegionsByWorldId(worldId: string): Promise<Region[]> {
    const regions = await prisma.region.findMany({
      where: { worldId },
    });
    return regions.map(fromDBRegion);
  },

  // Dungeon operations
  async getDungeonsByWorldId(worldId: string): Promise<Dungeon[]> {
    const dungeons = await prisma.dungeon.findMany({
      where: {
        worldId
      },
      include: {
        region: true
      }
    });
    return dungeons.map(fromDBDungeon);
  },

  async getDungeonById(id: string): Promise<Dungeon | null> {
    const dungeon = await prisma.dungeon.findUnique({
      where: { id },
      include: {
        region: true
      }
    });
    return dungeon ? fromDBDungeon(dungeon) : null;
  },

  async getEncountersByWorldId(worldId: string): Promise<DungeonEncounter[]> {
    const encounters = await prisma.encounter.findMany({
      where: {
        worldId
      }
    });
    return encounters.map(fromDBEncounter);
  },

  async getEncountersByLevel(worldId: string, level: number): Promise<DungeonEncounter[]> {
    const encounters = await prisma.encounter.findMany({
      where: {
        worldId,
        level: level.toString()
      }
    });
    return encounters.map(fromDBEncounter);
  },

  // Item operations
  async getItemsByWorldId(worldId: string): Promise<Item[]> {
    const items = await prisma.item.findMany({
      where: { worldId }
    });
    return items.map(fromDBItem);
  },

  async getItemById(id: string): Promise<Item | null> {
    const item = await prisma.item.findUnique({
      where: { id }
    });
    return item ? fromDBItem(item) : null;
  },

  async getItemsByCategory(worldId: string, category: string): Promise<Item[]> {
    const items = await prisma.item.findMany({
      where: { 
        worldId,
        category
      }
    });
    return items.map(fromDBItem);
  },

  async getItemsByRarity(worldId: string, rarity: string): Promise<Item[]> {
    const items = await prisma.item.findMany({
      where: {
        worldId,
        rarity
      }
    });
    return items.map(fromDBItem);
  }
}; 