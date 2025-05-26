import { PrismaClient } from '@prisma/client';
import { swordCoast } from '../src/data/worlds/sword-coast.js';
import { regions } from '../src/data/worlds/sword-coast/regions/index.js';
import { locations } from '../src/data/locations.js';

const prisma = new PrismaClient();

const prepareWorldData = (world) => ({
  id: world.id,
  name: world.name,
  description: world.description,
  banner: world.banner,
  thumbnail: world.thumbnail,
  theme: world.theme,
  rating: world.rating,
  tags: world.tags,
  createdAt: world.createdAt,
  lastUpdated: world.lastUpdated,
  creator: world.creator,
  featured: world.featured,
  popularity: world.popularity,
  difficulty: world.difficulty,
  recommendedLevel: world.recommendedLevel,
  estimatedPlayTime: world.estimatedPlayTime,
  languages: world.languages,
  contentWarnings: world.contentWarnings || [],
});

const prepareRegionData = (region, worldId) => ({
  id: region.id,
  name: region.name,
  description: region.description,
  biography: region.biography,
  color: region.color,
  banner: region.banner,
  images: region.images || [],
  notableFeatures: region.notableFeatures,
  history: region.history,
  keyFigures: region.keyFigures,
  economy: region.economy,
  seasons: region.seasons,
  magicalItems: region.magicalItems,
  worldId,
});

async function main() {
  console.log('Starting world and region data migration...');

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.location.deleteMany(); // Delete locations first due to foreign key constraints
    await prisma.region.deleteMany();
    await prisma.world.deleteMany();
    console.log('Existing data cleared.');

    // Migrate locations first
    console.log('Migrating locations...');
    for (const location of locations) {
      await prisma.location.create({
        data: {
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
        },
      });
      console.log(`Migrated location: ${location.name}`);
    }

    // Migrate Sword Coast world
    console.log('Migrating Sword Coast world...');
    const world = await prisma.world.create({
      data: prepareWorldData(swordCoast),
    });
    console.log(`Migrated world: ${world.name}`);

    // Migrate regions
    console.log('Migrating regions...');
    for (const region of regions) {
      const createdRegion = await prisma.region.create({
        data: prepareRegionData(region, world.id),
      });
      console.log(`Migrated region: ${createdRegion.name}`);

      // Update locations to link to this region
      if (region.locations && region.locations.length > 0) {
        for (const locationId of region.locations) {
          await prisma.location.update({
            where: { id: locationId },
            data: { regionId: createdRegion.id },
          });
          console.log(`Updated location ${locationId} to link to region ${createdRegion.name}`);
        }
      }
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