import { PrismaClient, Prisma } from '@prisma/client';
import { locations } from '../src/data/locations.js';
import { regions } from '../src/data/worlds/sword-coast/regions/index.js';
import { quests } from '../src/data/worlds/sword-coast/quests/index.js';
import { npcs } from '../src/data/worlds/sword-coast/npcs/index.js';
import { dungeonEncounters } from '../src/data/worlds/sword-coast/dungeon-encounters/index.js';
import type { DungeonEncounter } from '../src/types/dungeon-encounter';

const prisma = new PrismaClient();

// Map encounters by their IDs for easy lookup
const encountersMap = dungeonEncounters.reduce<Record<string, DungeonEncounter>>((acc, encounter) => {
  acc[encounter.id] = encounter;
  return acc;
}, {});

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

const prepareLocationData = (location: any): Prisma.LocationCreateInput => ({
  id: location.id,
  name: location.name,
  description: location.description,
  type: location.type,
  coordinates: location.coordinates as Prisma.InputJsonValue,
  population: location.population || null,
  primaryRaces: location.primaryRaces || [],
  notableFeatures: location.notableFeatures || [],
  services: location.services || [],
  localGovernment: location.localGovernment || null,
  significance: location.significance || null,
  history: location.history || null,
});

const prepareQuestData = (quest: any): Prisma.QuestCreateInput => {
  // Map the locations to the correct ones
  const locationMap: Record<string, string> = {
    "Waterdeep": "waterdeep",
    "Neverwinter": "neverwinter",
    "Luskan": "luskan",
    "Sword Mountains": "sword-mountains",
    "Baldur's Gate": "baldurs-gate",
    "Baldur's Gate Market, Baldur's Gate": "baldurs-gate",
    "Blackwood Keep, Blackwood Forest": "neverwinter",
    "Arcane Brotherhood Tower, Neverwinter": "luskan",
    "Wyrms Peak": "sword-mountains"
  };

  const locationId = locationMap[quest.location];
  if (!locationId) {
    throw new Error(`Location "${quest.location}" not found in location map`);
  }
  console.log(`Mapping quest location "${quest.location}" to "${locationId}"`);

  // Verify that all NPCs exist before trying to connect them
  const npcIds = quest.npcs || [];
  console.log(`Connecting quest to NPCs:`, npcIds);

  return {
    id: quest.id,
    title: quest.title,
    description: quest.description,
    level: quest.level,
    type: quest.type,
    status: quest.status,
    rewards: quest.rewards as Prisma.InputJsonValue || [],
    requirements: quest.requirements as Prisma.InputJsonValue || [],
    location: { connect: { id: locationId } },
    npcs: npcIds.length > 0 ? { connect: npcIds.map((id: string) => ({ id })) } : undefined,
    objectives: quest.objectives as Prisma.InputJsonValue || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    difficulty: quest.difficulty,
    timeEstimate: quest.timeEstimate,
    recommendedPartySize: quest.recommendedPartySize,
    minPartySize: quest.minPartySize,
    maxPartySize: quest.maxPartySize,
    recommendedClasses: quest.recommendedClasses
  };
};

const prepareNPCData = (npc: any): Prisma.NPCCreateInput => {
  // Map the locations to the correct ones
  const locationMap: Record<string, string> = {
    "Waterdeep": "waterdeep",
    "Neverwinter": "neverwinter",
    "Luskan": "luskan",
    "Sword Mountains": "sword-mountains",
    "Baldur's Gate": "baldurs-gate",
    "Baldur's Gate Market, Baldur's Gate": "baldurs-gate",
    "Blackwood Keep, Blackwood Forest": "neverwinter",
    "Arcane Brotherhood Tower, Neverwinter": "luskan",
    "Wyrms Peak": "sword-mountains"
  };

  const locationId = locationMap[npc.location];
  if (!locationId) {
    throw new Error(`Location "${npc.location}" not found in location map`);
  }
  console.log(`Mapping location "${npc.location}" to "${locationId}"`);

  return {
    id: npc.id,
    name: npc.name,
    description: npc.description,
    role: npc.role,
    level: npc.level,
    location: { connect: { id: locationId } },
    faction: npc.faction,
    status: npc.status,
    questGiver: npc.questGiver,
    relationshipStatus: npc.relationshipStatus,
    notes: npc.notes as Prisma.InputJsonValue || [],
    schedule: npc.schedule as Prisma.InputJsonValue || [],
    dialogue: npc.dialogue as Prisma.InputJsonValue || [],
    skills: npc.skills as Prisma.InputJsonValue || [],
    relationships: npc.relationships as Prisma.InputJsonValue || [],
    inventory: npc.inventory as Prisma.InputJsonValue || [],
    createdAt: npc.createdAt,
    updatedAt: npc.updatedAt
  };
};

const prepareDungeonData = (dungeon: any): Prisma.DungeonCreateInput => {
  // Get full encounter data for each encounter ID
  const encounterDetails = dungeon.encounters.map((encounterId: string) => {
    const encounter = encountersMap[encounterId];
    if (!encounter) {
      console.warn(`Warning: Encounter ${encounterId} not found in encounters data`);
      return null;
    }
    return encounter;
  }).filter(Boolean);

  // Extract creature names from encounters
  const creatures = encounterDetails.flatMap((encounter: DungeonEncounter) => 
    encounter.enemies.map((enemy: { name: string; type: string; count: number; cr?: number }) => 
      `${enemy.name} (CR ${enemy.cr || 0})`
    )
  );

  return {
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
    creatures: creatures,
    treasures: dungeon.treasure ? [dungeon.treasure as Prisma.InputJsonValue] : [],
    traps: [],
    puzzles: [],
    boss: {} as Prisma.InputJsonValue,
    location: { connect: { id: dungeon.locationId } }
  };
};

// Map locations to their regions based on the region data
const locationRegionMap: Record<string, string> = {};
regions.forEach(region => {
  (region.locations as unknown as string[]).forEach(locationId => {
    locationRegionMap[locationId] = region.id;
  });
});

const main = async () => {
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
          history: region.history as unknown as Prisma.InputJsonValue,
          keyFigures: region.keyFigures as unknown as Prisma.InputJsonValue[],
          economy: region.economy as unknown as Prisma.InputJsonValue,
          seasons: (region.seasons || []) as unknown as Prisma.InputJsonValue[],
          magicalItems: (region.magicalItems || []) as unknown as Prisma.InputJsonValue[],
          worldId: 'sword-coast'
        }
      });
      console.log(`Migrated region: ${region.name}`);
    }

    // Add Baldur's Gate to locations before migration
    const additionalLocations = [
      {
        id: "baldurs-gate",
        name: "Baldur's Gate",
        description: "A prosperous city on the Sword Coast, known for its strong mercantile influence and strategic location.",
        type: "City",
        coordinates: { x: 250, y: 500 },
        population: 120000,
        primaryRaces: ["Humans", "Dwarves", "Halflings"],
        notableFeatures: ["The Wide", "Baldur's Gate Port", "The Iron Throne"],
        services: ["Trading", "Shipping", "Banking", "Entertainment"],
        localGovernment: "The Council of Four"
      }
    ];

    // Then migrate locations with their region assignments
    console.log('Migrating locations...');
    const allLocations = [...locations, ...additionalLocations];
    for (const location of allLocations) {
      const regionId = locationRegionMap[location.id];
      const locationData = {
        ...prepareLocationData(location),
        region: regionId ? { connect: { id: regionId } } : undefined
      };
      console.log(`Creating location with data:`, JSON.stringify(locationData, null, 2));
      await prisma.location.create({
        data: locationData
      });
      console.log(`Migrated location: ${location.name}${regionId ? ` (Region: ${regionId})` : ''}`);
    }

    // Migrate NPCs
    console.log('Migrating NPCs...');
    // First verify locations exist
    const existingLocations = await prisma.location.findMany({
      select: { id: true, name: true }
    });
    console.log('Existing locations:', existingLocations);

    console.log('NPCs to migrate:', npcs);

    for (const npc of npcs) {
      console.log(`Creating NPC ${npc.name} with location ${npc.location}`);
      const npcData = prepareNPCData(npc);
      console.log('NPC data:', JSON.stringify(npcData, null, 2));
      try {
        await prisma.nPC.create({
          data: npcData
        });
        console.log(`Migrated NPC: ${npc.name}`);
      } catch (error) {
        console.error('Error creating NPC:', error);
        console.error('NPC data that caused error:', npcData);
        throw error;
      }
    }

    // Get all locations with their regions for dungeons
    const dbLocations = await prisma.location.findMany({
      select: {
        id: true,
        regionId: true
      }
    });
    const locationRegionMapFromDb = dbLocations.reduce<Record<string, string | null>>((acc, loc) => {
      acc[loc.id] = loc.regionId;
      return acc;
    }, {});

    // Migrate dungeons
    console.log('Migrating dungeons...');
    for (const dungeon of dungeons) {
      const dungeonData = prepareDungeonData(dungeon);
      const regionId = locationRegionMapFromDb[dungeon.locationId];
      
      await prisma.dungeon.create({
        data: {
          ...dungeonData,
          region: regionId ? { connect: { id: regionId } } : undefined
        }
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