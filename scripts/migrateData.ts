import { PrismaClient, Prisma } from '@prisma/client';
import { locations } from '../src/data/locations.js';

const prisma = new PrismaClient();

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

async function main() {
  console.log('Starting data migration...');

  // Migrate locations
  console.log('Migrating locations...');
  for (const location of locations) {
    await prisma.location.create({
      data: prepareLocationData(location),
    });
    console.log(`Migrated location: ${location.name}`);
  }

  console.log('Data migration completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 