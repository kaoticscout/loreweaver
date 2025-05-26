import { PrismaClient, Prisma } from '@prisma/client';
import { locations } from '../src/data/locations.js';
import { regions } from '../src/data/worlds/sword-coast/regions/index.js';
import { quests } from '../src/data/worlds/sword-coast/quests/index.js';
import { npcs } from '../src/data/worlds/sword-coast/npcs/index.js';
import { dungeonEncounters } from '../src/data/worlds/sword-coast/dungeon-encounters/index.js';
import { worlds } from '../src/data/worlds/index.js';
import type { DungeonEncounter } from '../src/types/dungeon-encounter';

// Import Cyberpunk 2077 data
import { npcs as cyberpunkNpcs } from '../src/data/worlds/cyberpunk2077/npcs/index.ts';
import { quests as cyberpunkQuests } from '../src/data/worlds/cyberpunk2077/quests/index.ts';
import { regions as cyberpunkRegions } from '../src/data/worlds/cyberpunk2077/regions/index.ts';
import { items as cyberpunkItems } from '../src/data/worlds/cyberpunk2077/items/items.json';
import { items as cyberpunkWeapons } from '../src/data/worlds/cyberpunk2077/items/weapons.ts';
import { items as cyberpunkCyberware } from '../src/data/worlds/cyberpunk2077/items/cyberware.ts';
import { items as cyberpunkConsumables } from '../src/data/worlds/cyberpunk2077/items/consumables.ts';
import { items as swordCoastItems } from '../src/data/worlds/sword-coast/items/items.json';
import { dungeonEncounters as kabukiEncounters } from '../src/data/worlds/cyberpunk2077/dungeons/kabuki-market.js';
import { dungeonEncounters as japantownEncounters } from '../src/data/worlds/cyberpunk2077/dungeons/japantown-plaza.js';
import { dungeonEncounters as industrialEncounters } from '../src/data/worlds/cyberpunk2077/dungeons/industrial-complex.js';
import { dungeonEncounters as voodooEncounters } from '../src/data/worlds/cyberpunk2077/dungeons/voodoo-territory.js';
import { dungeonEncounters as grandImperialEncounters } from '../src/data/worlds/cyberpunk2077/dungeon-encounters/grand-imperial-mall.js';
import { dungeonEncounters as valentinosEncounters } from '../src/data/worlds/cyberpunk2077/dungeons/valentinos-territory.js';

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
  world: { connect: { id: 'sword-coast' } }
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
    location: { connect: { id: dungeon.locationId } },
    world: { connect: { id: 'sword-coast' } }
  };
};

// Map locations to their regions based on the region data
const locationRegionMap: Record<string, string> = {};
regions.forEach(region => {
  (region.locations as unknown as string[]).forEach(locationId => {
    locationRegionMap[locationId] = region.id;
  });
});

const prepareEncounterData = (encounter: DungeonEncounter) => {
  return {
    id: encounter.id,
    name: encounter.name,
    description: encounter.description,
    level: typeof encounter.level === 'string' ? encounter.level : encounter.level.toString(),
    difficulty: encounter.difficulty,
    type: encounter.type,
    enemies: encounter.enemies as Prisma.InputJsonValue,
    rewards: encounter.rewards as Prisma.InputJsonValue,
    location: encounter.location as Prisma.InputJsonValue,
    triggers: encounter.triggers as Prisma.InputJsonValue || [],
    notes: encounter.notes || [],
    xp: encounter.xp || 0,
    treasure: encounter.treasure as Prisma.InputJsonValue || null
  };
};

const prepareWorldData = (world: any): Prisma.WorldCreateInput => {
  return {
    id: world.id,
    name: world.name,
    description: world.description,
    banner: world.banner,
    thumbnail: world.thumbnail,
    theme: world.theme,
    rating: world.rating as Prisma.InputJsonValue,
    tags: world.tags,
    createdAt: world.createdAt,
    lastUpdated: world.lastUpdated,
    creator: world.creator as Prisma.InputJsonValue,
    featured: world.featured,
    popularity: world.popularity,
    difficulty: world.difficulty,
    recommendedLevel: world.recommendedLevel,
    estimatedPlayTime: world.estimatedPlayTime,
    languages: world.languages,
    contentWarnings: world.contentWarnings,
    regions: {
      create: []  // We'll create regions separately
    }
  };
};

const main = async () => {
  console.log('Starting data migration...');

  try {
    // Clear existing data in the correct order (handling dependencies)
    console.log('Clearing existing data...');
    await prisma.quest.deleteMany();
    await prisma.nPC.deleteMany();
    await prisma.dungeon.deleteMany();
    await prisma.$queryRaw`TRUNCATE TABLE "Encounter" CASCADE`;
    await prisma.location.deleteMany();
    await prisma.region.deleteMany();
    await prisma.world.deleteMany();
    await prisma.item.deleteMany();
    console.log('Existing data cleared.');

    // First, migrate all worlds
    console.log('Migrating worlds...');
    for (const world of worlds) {
      await prisma.world.create({
        data: prepareWorldData(world)
      });
      console.log(`Migrated world: ${world.name}`);
    }

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
        region: regionId ? { connect: { id: regionId } } : undefined // Region already has the world connection
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
          region: regionId ? { connect: { id: regionId } } : undefined // Region already has the world connection
        }
      });
      console.log(`Migrated dungeon: ${dungeon.name}`);
    }

    // Migrate encounters
    console.log('Migrating encounters...');

    // Migrate Sword Coast encounters
    for (const encounter of dungeonEncounters) {
      await prisma.$queryRaw`
        INSERT INTO "Encounter" (
          id, name, description, level, difficulty, type,
          enemies, rewards, location, triggers, notes, xp, treasure,
          "createdAt", "updatedAt", "worldId"
        ) VALUES (
          ${encounter.id},
          ${encounter.name},
          ${encounter.description},
          ${typeof encounter.level === 'string' ? encounter.level : encounter.level.toString()},
          ${encounter.difficulty},
          ${encounter.type},
          ${JSON.stringify(encounter.enemies)}::jsonb,
          ${JSON.stringify(encounter.rewards)}::jsonb,
          ${JSON.stringify(encounter.location)}::jsonb,
          ARRAY[${JSON.stringify(encounter.triggers || [])}::jsonb],
          ${encounter.notes || []},
          ${encounter.xp || 0},
          ${encounter.treasure ? JSON.stringify(encounter.treasure) : null}::jsonb,
          CURRENT_TIMESTAMP,
          CURRENT_TIMESTAMP,
          'sword-coast'
        )
      `;
      console.log(`Migrated Sword Coast encounter: ${encounter.name}`);
    }

    // Migrate Cyberpunk encounters
    const allCyberpunkEncounters = [
      ...kabukiEncounters,
      ...japantownEncounters,
      ...industrialEncounters,
      ...voodooEncounters,
      ...grandImperialEncounters,
      ...valentinosEncounters
    ];

    console.log('Migrating Cyberpunk encounters...');
    for (const encounter of allCyberpunkEncounters) {
      await prisma.$queryRaw`
        INSERT INTO "Encounter" (
          id, name, description, level, difficulty, type,
          enemies, rewards, location, triggers, notes, xp, treasure,
          "createdAt", "updatedAt", "worldId"
        ) VALUES (
          ${'cp2077-' + encounter.id},
          ${encounter.name},
          ${encounter.description},
          ${typeof encounter.level === 'string' ? encounter.level : encounter.level.toString()},
          ${encounter.difficulty},
          ${encounter.type},
          ${JSON.stringify(encounter.enemies)}::jsonb,
          ${JSON.stringify(encounter.rewards)}::jsonb,
          ${JSON.stringify(encounter.location)}::jsonb,
          ARRAY[${JSON.stringify(encounter.triggers || [])}::jsonb],
          ${encounter.notes || []},
          ${encounter.xp || 0},
          ${encounter.treasure ? JSON.stringify(encounter.treasure) : null}::jsonb,
          CURRENT_TIMESTAMP,
          CURRENT_TIMESTAMP,
          'cyberpunk2077'
        )
      `;
      console.log(`Migrated Cyberpunk encounter: ${encounter.name}`);
    }

    // Migrate quests
    console.log('Migrating quests...');
    for (const quest of quests) {
      await prisma.quest.create({
        data: {
          ...prepareQuestData(quest),
          world: { connect: { id: 'sword-coast' } } // Quests have direct world connection
        }
      });
      console.log(`Migrated quest: ${quest.title}`);
    }

    // Migrate Cyberpunk 2077 data
    console.log('Migrating Cyberpunk 2077 data...');
    
    // Migrate regions
    console.log('Migrating Cyberpunk regions...');
    for (const region of cyberpunkRegions) {
      await prisma.region.create({
        data: {
          id: region.id,
          name: region.name,
          description: region.description,
          biography: region.biography,
          color: region.color,
          banner: region.banner,
          images: region.images || [],
          notableFeatures: region.notableFeatures,
          history: region.history as unknown as Prisma.InputJsonValue,
          keyFigures: region.keyFigures as unknown as Prisma.InputJsonValue[],
          economy: region.economy as unknown as Prisma.InputJsonValue,
          seasons: (region.seasons || []) as unknown as Prisma.InputJsonValue[],
          magicalItems: (region.magicalItems || []) as unknown as Prisma.InputJsonValue[],
          worldId: 'cyberpunk2077'
        }
      });
      console.log(`Migrated region: ${region.name}`);
    }

    // Migrate Cyberpunk locations
    console.log('Migrating Cyberpunk locations...');
    const cyberpunkLocations = [
      {
        id: 'afterlife-bar',
        name: 'Afterlife',
        description: 'The legendary mercenary bar of Night City, run by the equally legendary Rogue. Once a morgue, now the most important networking spot for high-end mercenaries and fixers.',
        type: 'Point of Interest',
        coordinates: { x: 1250, y: 750 },
        primaryRaces: ['Human', 'Cyborg'],
        notableFeatures: [
          'Former morgue converted into a bar',
          'VIP area for elite mercenaries',
          'Wall of fallen legends',
          'High-end clientele',
          'Secure meeting rooms'
        ],
        services: [
          'Premium drinks and synthetic alcohol',
          'Fixer services and contract negotiation',
          'Information trading and street intel'
        ],
        localGovernment: 'Rogue Amendiares',
        regionId: 'night-city'
      },
      {
        id: 'lizzys-bar',
        name: "Lizzie's Bar",
        description: 'A popular nightclub in Night City, owned by the Mox gang. Known for its neon aesthetics and underground braindance den.',
        type: 'Entertainment',
        coordinates: { x: 1100, y: 800 },
        primaryRaces: ['Human', 'Cyborg'],
        notableFeatures: [
          'Neon-lit exterior',
          'Underground braindance facilities',
          'Mox gang headquarters',
          'Live music venue'
        ],
        services: [
          'Drinks and entertainment',
          'Braindance experiences',
          'Information trading',
          'Protection services'
        ],
        localGovernment: 'The Mox',
        regionId: 'night-city'
      },
      {
        id: 'viktors-clinic',
        name: "Viktor's Clinic",
        description: 'A trusted ripperdoc clinic in Watson, run by Viktor Vector. Known for quality cyberware installations and fair prices.',
        type: 'Medical',
        coordinates: { x: 1000, y: 850 },
        primaryRaces: ['Human', 'Cyborg'],
        notableFeatures: [
          'Underground medical facility',
          'State-of-the-art cyberware installation equipment',
          'Boxing gym memorabilia'
        ],
        services: [
          'Cyberware installation',
          'Medical treatment',
          'Cyberware maintenance',
          'Health consultation'
        ],
        localGovernment: 'Independent',
        regionId: 'night-city'
      }
    ];

    for (const location of cyberpunkLocations) {
      await prisma.location.create({
        data: {
          id: location.id,
          name: location.name,
          description: location.description,
          type: location.type,
          coordinates: location.coordinates as Prisma.InputJsonValue,
          primaryRaces: location.primaryRaces,
          notableFeatures: location.notableFeatures,
          services: location.services,
          localGovernment: location.localGovernment,
          region: { connect: { id: location.regionId } },
          world: { connect: { id: 'cyberpunk2077' } }
        }
      });
      console.log(`Migrated location: ${location.name}`);
    }

    // Migrate Cyberpunk NPCs
    console.log('Migrating Cyberpunk NPCs...');
    const locationMap: Record<string, string> = {
      'The Afterlife, Night City': 'afterlife-bar',
      'Chrome Clinic, Watson District': 'viktors-clinic',
      'Cyberden, Kabuki Market': 'lizzys-bar' // Using Lizzy's as a temporary location since we don't have Kabuki Market yet
    };

    for (const npc of cyberpunkNpcs) {
      const locationId = locationMap[npc.location] || 'afterlife-bar'; // Default to Afterlife if location not found
      await prisma.nPC.create({
        data: {
          id: `cp2077-${npc.id}`, // Prefix Cyberpunk NPC IDs to avoid conflicts
          name: npc.name,
          description: npc.description,
          role: npc.role,
          level: npc.level,
          location: { connect: { id: locationId } },
          faction: npc.faction,
          status: npc.status,
          questGiver: npc.questGiver,
          relationshipStatus: npc.relationshipStatus,
          notes: (npc.notes || []) as unknown as Prisma.InputJsonValue,
          schedule: (npc.schedule || []) as unknown as Prisma.InputJsonValue,
          dialogue: (npc.dialogue || []) as unknown as Prisma.InputJsonValue,
          skills: (npc.skills || []) as unknown as Prisma.InputJsonValue,
          inventory: (npc.inventory || []) as unknown as Prisma.InputJsonValue,
          createdAt: npc.createdAt,
          updatedAt: npc.updatedAt,
          world: { connect: { id: 'cyberpunk2077' } }
        }
      });
      console.log(`Migrated NPC: ${npc.name}`);
    }

    // Migrate quests
    console.log('Migrating Cyberpunk quests...');
    const questLocationMap: Record<string, string> = {
      'The Afterlife': 'afterlife-bar',
      'Chrome Clinic': 'viktors-clinic',
      'Kabuki Market': 'lizzys-bar',
      'Night City': 'afterlife-bar', // Default to Afterlife for general Night City locations
      'Watson District - Northside Industrial Zone': 'afterlife-bar',
      'Watson District - Kabuki Market': 'lizzys-bar',
      'Heywood - Vista del Rey': 'afterlife-bar',
      'Heywood - Stadium District': 'afterlife-bar'
    };

    for (const quest of cyberpunkQuests) {
      const locationId = questLocationMap[quest.location] || 'afterlife-bar'; // Default to Afterlife if location not found
      
      // Check if NPCs exist before trying to connect them
      const existingNpcs = await prisma.nPC.findMany({
        where: {
          id: {
            in: quest.npcs.map(id => `cp2077-${id}`)
          }
        }
      });

      await prisma.quest.create({
        data: {
          id: `cp2077-${quest.id}`, // Prefix Cyberpunk quest IDs
          title: quest.title,
          description: quest.description,
          level: quest.level,
          type: quest.type,
          status: quest.status,
          rewards: (quest.rewards || []) as unknown as Prisma.InputJsonValue,
          requirements: (quest.requirements || []) as unknown as Prisma.InputJsonValue,
          location: { connect: { id: locationId } },
          npcs: existingNpcs.length > 0 ? { connect: existingNpcs.map(npc => ({ id: npc.id })) } : undefined,
          objectives: (quest.objectives || []) as unknown as Prisma.InputJsonValue,
          createdAt: quest.createdAt,
          updatedAt: quest.updatedAt,
          difficulty: quest.difficulty,
          timeEstimate: quest.timeEstimate,
          recommendedPartySize: quest.recommendedPartySize,
          minPartySize: quest.minPartySize,
          maxPartySize: quest.maxPartySize,
          recommendedClasses: quest.recommendedClasses,
          world: { connect: { id: 'cyberpunk2077' } }
        }
      });
      console.log(`Migrated quest: ${quest.title}`);
    }

    // Migrate items
    console.log('Migrating items...');
    const seenItemIds = new Set<string>();

    // Migrate Sword Coast items
    console.log('Migrating Sword Coast items...');
    for (const item of swordCoastItems) {
      const itemId = `sword-coast-${item.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;
      if (seenItemIds.has(itemId)) {
        console.log(`Skipping duplicate item: ${item.name}`);
        continue;
      }
      seenItemIds.add(itemId);

      // Convert item data to match schema
      const itemData = {
        id: itemId,
        name: item.name,
        description: item.description || '',
        category: item.category,
        rarity: item.rarity,
        cost: item.cost || 0,
        classification: 'FANTASY',
        armor: item.armor ? (item.armor as unknown as Prisma.InputJsonValue) : undefined,
        weapon: item.weapon ? (item.weapon as unknown as Prisma.InputJsonValue) : undefined,
        world: { connect: { id: 'sword-coast' } }
      };

      await prisma.item.create({
        data: itemData
      });
      console.log(`Migrated Sword Coast item: ${item.name}`);
    }

    // Migrate Cyberpunk items
    console.log('Migrating Cyberpunk items...');
    const allCyberpunkItems = [
      ...cyberpunkItems,
      ...cyberpunkWeapons,
      ...cyberpunkCyberware,
      ...cyberpunkConsumables
    ];

    for (const item of allCyberpunkItems) {
      const itemId = `cp2077-${item.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;
      if (seenItemIds.has(itemId)) {
        console.log(`Skipping duplicate item: ${item.name}`);
        continue;
      }
      seenItemIds.add(itemId);

      // Convert value to cost if it exists
      let cost = 0;
      if ('value' in item && typeof item.value === 'string') {
        const costMatch = item.value.match(/\d+/);
        if (costMatch) {
          cost = parseInt(costMatch[0]);
        }
      }

      // Convert item data to match schema
      const itemData = {
        id: itemId,
        name: item.name,
        description: item.description || '',
        category: (item as any).type || (item as any).category || 'MISC',
        rarity: item.rarity,
        cost,
        classification: 'CYBERPUNK',
        armor: undefined,
        weapon: undefined,
        world: { connect: { id: 'cyberpunk2077' } }
      };

      await prisma.item.create({
        data: itemData
      });
      console.log(`Migrated Cyberpunk item: ${item.name}`);
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