import { PrismaClient } from '@prisma/client';
import { locations } from '../src/data/locations.js';
import { regions } from '../src/data/worlds/sword-coast/regions/index.js';
import { quests } from '../src/data/worlds/sword-coast/quests/index.js';
import { npcs } from '../src/data/worlds/sword-coast/npcs/index.js';

const prisma = new PrismaClient();

// Define the dungeon data directly since it's not in a separate file
const dungeons = [
  {
    id: 'abandoned-mine',
    name: 'Abandoned Mine',
    description: 'An old mine that has been taken over by dangerous creatures.',
    challengeRating: 3,
    location: {
      region: 'Neverwinter',
      environment: 'Underground'
    },
    encounters: ['cultist-initiation', 'goblin-ambush', 'kobold-den'],
    treasure: {
      gold: 3000,
      gems: [
        { type: 'Raw Gem', value: 1500 },
        { type: 'Uncut Diamond', value: 2000 }
      ],
      art: [
        { type: 'Mining Equipment', value: 1000 },
        { type: 'Ancient Tool', value: 1500 }
      ],
      magicItems: [
        { name: 'Miner\'s Pick', rarity: 'Uncommon' },
        { name: 'Gem of Finding', rarity: 'Rare' }
      ]
    },
    locationId: 'neverwinter'
  },
  {
    id: 'hosttower-ruins',
    name: 'Hosttower Ruins',
    description: 'The remains of the Arcane Brotherhood\'s headquarters, now home to dangerous magical creatures.',
    challengeRating: 8,
    location: {
      region: 'Luskan',
      environment: 'Indoor'
    },
    encounters: ['cultist-initiation', 'goblin-ambush', 'kobold-den'],
    treasure: {
      gold: 8000,
      gems: [
        { type: 'Arcane Crystal', value: 4000 },
        { type: 'Spell Gem', value: 5000 }
      ],
      art: [
        { type: 'Magical Tapestry', value: 3000 },
        { type: 'Arcane Artifact', value: 4000 }
      ],
      magicItems: [
        { name: 'Archmage\'s Staff', rarity: 'Rare' },
        { name: 'Spellbook', rarity: 'Very Rare' }
      ]
    },
    locationId: 'luskan'
  },
  {
    id: 'pirate-coves',
    name: 'Pirate Coves',
    description: 'A network of hidden coves used by pirates to store their loot and plan their raids.',
    challengeRating: 6,
    location: {
      region: 'Luskan',
      environment: 'Coastal'
    },
    encounters: ['cultist-initiation', 'goblin-ambush', 'kobold-den'],
    treasure: {
      gold: 6000,
      gems: [
        { type: 'Pearl', value: 2000 },
        { type: 'Coral', value: 1500 }
      ],
      art: [
        { type: 'Ship Model', value: 1000 },
        { type: 'Navigation Tools', value: 1500 }
      ],
      magicItems: [
        { name: 'Ring of Swimming', rarity: 'Uncommon' },
        { name: 'Trident of Fish Command', rarity: 'Rare' }
      ]
    },
    locationId: 'luskan'
  }
];

const prepareLocationData = (location) => ({
  id: location.id,
  name: location.name,
  description: location.description,
  type: location.type,
  coordinates: location.coordinates,
  population: location.population || null,
  primaryRaces: location.primaryRaces || [],
  notableFeatures: location.notableFeatures || [],
  services: location.services || [],
  localGovernment: location.localGovernment || null,
  significance: location.significance || null,
  history: location.history || null,
});

const prepareQuestData = (quest) => ({
  id: quest.id,
  title: quest.title,
  description: quest.description,
  level: quest.level,
  type: quest.type,
  status: quest.status,
  rewards: quest.rewards,
  requirements: quest.requirements,
  locationName: quest.location,
  objectives: quest.objectives,
  difficulty: quest.difficulty,
  timeEstimate: quest.timeEstimate,
  recommendedPartySize: quest.recommendedPartySize,
  minPartySize: quest.minPartySize,
  maxPartySize: quest.maxPartySize,
  recommendedClasses: quest.recommendedClasses,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

const prepareNPCData = (npc) => ({
  id: npc.id,
  name: npc.name,
  description: npc.description,
  role: npc.role,
  level: npc.level,
  locationName: npc.location,
  faction: npc.faction,
  status: npc.status,
  questGiver: npc.questGiver,
  relationshipStatus: npc.relationshipStatus,
  notes: npc.notes || [],
  schedule: npc.schedule || [],
  dialogue: npc.dialogue || [],
  skills: npc.skills || [],
  relationships: npc.relationships || [],
  inventory: npc.inventory || [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

const prepareDungeonData = (dungeon) => ({
  id: dungeon.id,
  name: dungeon.name,
  description: dungeon.description,
  type: dungeon.location.environment,
  difficulty: dungeon.challengeRating,
  minLevel: Math.max(1, dungeon.challengeRating - 2),
  maxLevel: dungeon.challengeRating + 2,
  size: 'Medium',
  environment: dungeon.location.environment,
  hazards: [],
  creatures: dungeon.encounters || [],
  treasures: dungeon.treasure ? [dungeon.treasure] : [],
  traps: [],
  puzzles: [],
  boss: null,
  locationId: dungeon.locationId
});

// Map locations to their regions based on the region data
const locationRegionMap = {};
regions.forEach(region => {
  region.locations.forEach(locationId => {
    locationRegionMap[locationId] = region.id;
  });
});

async function main() {
  console.log('Starting data migration...');

  try {
    // Clear existing data in the correct order (handling dependencies)
    console.log('Clearing existing data...');
    await prisma.quest.deleteMany();
    await prisma.nPC.deleteMany();
    await prisma.dungeon.deleteMany();
    await prisma.location.deleteMany();
    await prisma.region.deleteMany();
    console.log('Existing data cleared.');

    // First, create all regions
    console.log('Migrating regions...');
    for (const region of regions) {
      await prisma.region.create({
        data: {
          id: region.id,
          name: region.name,
          description: region.description,
          biography: region.biography,
          color: region.color,
          banner: region.banner,
          images: [],
          notableFeatures: region.notableFeatures,
          history: region.history,
          keyFigures: region.keyFigures,
          economy: region.economy,
          seasons: region.seasons || [],
          magicalItems: region.magicalItems || [],
          worldId: 'sword-coast'
        }
      });
      console.log(`Migrated region: ${region.name}`);
    }

    // Then migrate locations with their region assignments
    console.log('Migrating locations...');
    for (const location of locations) {
      const regionId = locationRegionMap[location.id];
      await prisma.location.create({
        data: {
          ...prepareLocationData(location),
          regionId: regionId || null
        }
      });
      console.log(`Migrated location: ${location.name}${regionId ? ` (Region: ${regionId})` : ''}`);
    }

    // Migrate NPCs
    console.log('Migrating NPCs...');
    for (const npc of npcs) {
      await prisma.nPC.create({
        data: prepareNPCData(npc)
      });
      console.log(`Migrated NPC: ${npc.name}`);
    }

    // Get all locations with their regions for dungeons
    const dbLocations = await prisma.location.findMany({
      select: {
        id: true,
        regionId: true
      }
    });
    const locationRegionMapFromDb = dbLocations.reduce((acc, loc) => {
      acc[loc.id] = loc.regionId;
      return acc;
    }, {});

    // Migrate dungeons
    console.log('Migrating dungeons...');
    for (const dungeon of dungeons) {
      const dungeonData = prepareDungeonData(dungeon);
      dungeonData.regionId = locationRegionMapFromDb[dungeonData.locationId];
      
      await prisma.dungeon.create({
        data: dungeonData
      });
      console.log(`Migrated dungeon: ${dungeon.name}`);
    }

    // Migrate quests
    console.log('Migrating quests...');
    for (const quest of quests) {
      await prisma.quest.create({
        data: prepareQuestData(quest)
      });
      console.log(`Migrated quest: ${quest.title}`);
    }

    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 