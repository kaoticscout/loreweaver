import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the dungeon data directly
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

// Prepare dungeon data for database
const prepareDungeonData = (dungeon) => ({
  id: dungeon.id,
  name: dungeon.name,
  description: dungeon.description,
  type: dungeon.location.environment,
  difficulty: dungeon.challengeRating,
  minLevel: Math.max(1, dungeon.challengeRating - 2),
  maxLevel: dungeon.challengeRating + 2,
  size: 'Medium', // Default size, can be adjusted based on description
  environment: dungeon.location.environment,
  hazards: [],
  creatures: dungeon.encounters || [],
  treasures: dungeon.treasure ? [dungeon.treasure] : [],
  traps: [],
  puzzles: [],
  boss: null,
  locationId: dungeon.locationId,
  regionId: null // Will be set based on location's region
});

async function main() {
  console.log('Starting dungeon migration...');

  try {
    // Clear existing dungeons
    await prisma.dungeon.deleteMany();
    console.log('Cleared existing dungeons.');

    // Get all locations with their regions
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        regionId: true
      }
    });
    const locationRegionMap = locations.reduce((acc, loc) => {
      acc[loc.id] = loc.regionId;
      return acc;
    }, {});

    // Migrate dungeons
    for (const dungeon of dungeons) {
      const dungeonData = prepareDungeonData(dungeon);
      dungeonData.regionId = locationRegionMap[dungeonData.locationId];
      
      await prisma.dungeon.create({
        data: dungeonData
      });
      console.log(`Migrated dungeon: ${dungeon.name}`);
    }

    console.log('Dungeon migration completed successfully!');
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