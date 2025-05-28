import { PrismaClient, Prisma } from '@prisma/client';
import type { Location } from '../types/location';
import type { World } from '../types/world';
import type { Region } from '../types/region';
import type { Dungeon } from '../types/dungeon';
import type { DungeonEncounter } from '../types/dungeonEncounter';
import type { Item } from '../types/item';
import type { Quest, QuestType, QuestStatus } from '../types/quest';
import type { NPC, NPCStatus, RelationshipStatus } from '../types/npc';

const prisma = new PrismaClient();

// Type conversion helpers
const toDBLocation = (location: Location): Prisma.LocationCreateInput => {
  const dbLocation: Prisma.LocationCreateInput = {
    id: location.id,
    name: location.name,
    description: location.description,
    type: location.type,
    coordinates: location.coordinates ? {
      x: Number(location.coordinates.x),
      y: Number(location.coordinates.y)
    } : undefined,
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

const fromDBLocation = (dbLocation: any): Location => {
  let coordinates: { x: number; y: number } | undefined = undefined;
  
  if (dbLocation.coordinates) {
    // Handle string format (from older data)
    if (typeof dbLocation.coordinates === 'string') {
      try {
        const parsed = JSON.parse(dbLocation.coordinates);
        if (parsed && typeof parsed === 'object' && 'x' in parsed && 'y' in parsed) {
          coordinates = {
            x: Number(parsed.x),
            y: Number(parsed.y)
          };
        }
      } catch (e) {
        console.error('Failed to parse coordinates string:', dbLocation.coordinates);
      }
    }
    // Handle object format
    else if (typeof dbLocation.coordinates === 'object' && dbLocation.coordinates !== null) {
      const coords = dbLocation.coordinates as any;
      if ('x' in coords && 'y' in coords) {
        coordinates = {
          x: Number(coords.x),
          y: Number(coords.y)
        };
      }
    }
  }

  return {
    id: dbLocation.id,
    name: dbLocation.name,
    description: dbLocation.description,
    type: dbLocation.type,
    coordinates,
    population: dbLocation.population,
    region: dbLocation.region,
    ...(dbLocation.primaryRaces && { primaryRaces: dbLocation.primaryRaces }),
    ...(dbLocation.notableFeatures && { notableFeatures: dbLocation.notableFeatures }),
    ...(dbLocation.services && { services: dbLocation.services }),
    ...(dbLocation.localGovernment && { localGovernment: dbLocation.localGovernment }),
    ...(dbLocation.significance && { significance: dbLocation.significance }),
    ...(dbLocation.history && { history: dbLocation.history }),
  };
};

const fromDBWorld = (dbWorld: any): World => {
  console.log('Raw DB world data:', dbWorld);
  const defaultRating = { rating: 0, votes: 0 };
  let parsedRating;
  
  try {
    parsedRating = typeof dbWorld.rating === 'string' ? JSON.parse(dbWorld.rating) : dbWorld.rating;
  } catch (error) {
    console.error('Error parsing rating:', error);
    parsedRating = defaultRating;
  }

  const world = {
    id: dbWorld.id,
    name: dbWorld.name,
    description: dbWorld.description,
    banner: dbWorld.banner,
    thumbnail: dbWorld.thumbnail,
    theme: dbWorld.theme,
    rating: parsedRating || defaultRating,
    tags: dbWorld.tags || [],
    createdAt: dbWorld.createdAt,
    lastUpdated: dbWorld.lastUpdated,
    creator: dbWorld.creator,
    featured: dbWorld.featured || false,
    popularity: dbWorld.popularity || 0,
    difficulty: dbWorld.difficulty,
    recommendedLevel: dbWorld.recommendedLevel,
    estimatedPlayTime: dbWorld.estimatedPlayTime,
    languages: dbWorld.languages || [],
    contentWarnings: dbWorld.contentWarnings || [],
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

const fromDBEncounter = (dbEncounter: any): DungeonEncounter => {
  const parseJsonField = (field: any) => {
    if (!field) return [];
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (e) {
        console.warn(`Failed to parse ${field} as JSON, returning empty array`);
        return [];
      }
    }
    return field;
  };

  return {
    id: dbEncounter.id,
    name: dbEncounter.name,
    description: dbEncounter.description,
    level: dbEncounter.level,
    difficulty: dbEncounter.difficulty,
    type: dbEncounter.type,
    enemies: parseJsonField(dbEncounter.enemies),
    rewards: parseJsonField(dbEncounter.rewards),
    location: parseJsonField(dbEncounter.location),
    triggers: dbEncounter.triggers?.map(parseJsonField) || [],
    notes: dbEncounter.notes || [],
    xp: dbEncounter.xp,
    treasure: dbEncounter.treasure ? parseJsonField(dbEncounter.treasure) : undefined
  };
};

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

const fromDBQuest = (dbQuest: any): Quest => ({
  id: dbQuest.id,
  title: dbQuest.title,
  description: dbQuest.description,
  level: dbQuest.level,
  type: dbQuest.type as QuestType,
  status: dbQuest.status as QuestStatus,
  rewards: dbQuest.rewards || [],
  requirements: dbQuest.requirements || [],
  location: dbQuest.location,
  npcs: dbQuest.npcs || [],
  objectives: dbQuest.objectives || [],
  createdAt: dbQuest.createdAt,
  updatedAt: dbQuest.updatedAt,
  difficulty: dbQuest.difficulty,
  timeEstimate: dbQuest.timeEstimate,
  recommendedPartySize: dbQuest.recommendedPartySize,
  minPartySize: dbQuest.minPartySize,
  maxPartySize: dbQuest.maxPartySize,
  recommendedClasses: dbQuest.recommendedClasses || [],
  recommendedLevels: dbQuest.recommendedLevels || [],
  questChain: dbQuest.questChain,
  detailedLocations: dbQuest.detailedLocations || [],
  detailedNPCs: dbQuest.detailedNPCs || [],
  lore: dbQuest.lore,
  consequences: dbQuest.consequences,
  specialConditions: dbQuest.specialConditions,
  hiddenObjectives: dbQuest.hiddenObjectives || [],
  alternativeEndings: dbQuest.alternativeEndings || [],
  reputationChanges: dbQuest.reputationChanges || [],
  skillChecks: dbQuest.skillChecks || [],
  environmentalHazards: dbQuest.environmentalHazards || [],
  questItems: dbQuest.questItems || []
});

const fromDBNPC = (dbNPC: any): NPC => {
  const parseField = (field: any) => {
    if (!field) return [];
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (e) {
        console.warn(`Failed to parse ${field} as JSON, returning empty array`);
        return [];
      }
    }
    return field;
  };

  return {
    id: dbNPC.id,
    name: dbNPC.name,
    role: dbNPC.role,
    location: dbNPC.locationName,
    description: dbNPC.description,
    level: dbNPC.level,
    faction: dbNPC.faction,
    status: dbNPC.status as NPCStatus,
    questGiver: dbNPC.questGiver,
    relationshipStatus: dbNPC.relationshipStatus as RelationshipStatus,
    notes: parseField(dbNPC.notes),
    schedule: parseField(dbNPC.schedule),
    dialogue: parseField(dbNPC.dialogue),
    inventory: parseField(dbNPC.inventory),
    skills: parseField(dbNPC.skills),
    relationships: parseField(dbNPC.relationships),
    createdAt: dbNPC.createdAt,
    updatedAt: dbNPC.updatedAt
  };
};

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
  },

  // Quest operations
  async getQuestsByWorldId(worldId: string): Promise<Quest[]> {
    const quests = await prisma.quest.findMany({
      where: { worldId }
    });
    return quests.map(fromDBQuest);
  },

  async getQuestById(id: string): Promise<Quest | null> {
    const quest = await prisma.quest.findUnique({
      where: { id }
    });
    return quest ? fromDBQuest(quest) : null;
  },

  async updateQuestStatus(id: string, status: QuestStatus): Promise<Quest> {
    const quest = await prisma.quest.update({
      where: { id },
      data: { 
        status,
        updatedAt: new Date().toISOString()
      }
    });
    return fromDBQuest(quest);
  },

  // NPC operations
  async getNPCsByWorldId(worldId: string): Promise<NPC[]> {
    try {
      console.log('\n=== Database Service: getNPCsByWorldId ===');
      console.log('Checking for world:', worldId);

      // First check if the world exists
      const world = await prisma.world.findUnique({
        where: { id: worldId }
      });

      if (!world) {
        console.log('World not found');
        return [];
      }

      console.log('Found world:', world.name);
      
      // Check for NPCs
      const npcs = await prisma.nPC.findMany({
        where: { 
          OR: [
            { worldId },
            { world: { id: worldId } }
          ]
        },
        include: {
          location: true,
          world: true
        }
      });
      
      console.log('Found NPCs:', npcs.length);
      if (npcs.length === 0) {
        console.log('No NPCs found for this world');
      } else {
        console.log('NPC IDs:', npcs.map(npc => npc.id));
      }

      return npcs.map(npc => {
        try {
          return fromDBNPC(npc);
        } catch (error) {
          console.error('Error transforming NPC:', npc.id, error);
          return null;
        }
      }).filter(Boolean) as NPC[];
    } catch (error) {
      console.error('Database error in getNPCsByWorldId:', error);
      throw error;
    }
  },

  async getNPCById(id: string): Promise<NPC | null> {
    const npc = await prisma.nPC.findUnique({
      where: { id }
    });
    return npc ? fromDBNPC(npc) : null;
  },

  async updateNPC(id: string, data: Partial<NPC>): Promise<NPC> {
    const npc = await prisma.nPC.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        locationName: data.location,
        description: data.description,
        level: data.level,
        faction: data.faction,
        status: data.status,
        questGiver: data.questGiver,
        relationshipStatus: data.relationshipStatus,
        notes: data.notes ? JSON.stringify(data.notes) : undefined,
        schedule: data.schedule ? JSON.stringify(data.schedule) : undefined,
        dialogue: data.dialogue ? JSON.stringify(data.dialogue) : undefined,
        inventory: data.inventory ? JSON.stringify(data.inventory) : undefined,
        skills: data.skills ? JSON.stringify(data.skills) : undefined,
        relationships: data.relationships ? JSON.stringify(data.relationships) : undefined,
        updatedAt: new Date().toISOString()
      }
    });
    return fromDBNPC(npc);
  }
}; 