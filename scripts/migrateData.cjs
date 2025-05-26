const { PrismaClient } = require('@prisma/client');
const { locations } = require('../src/data/locations');

const prisma = new PrismaClient();

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

async function main() {
  console.log('Starting data migration...');

  try {
    // Migrate locations
    console.log('Migrating locations...');
    for (const location of locations) {
      await prisma.location.create({
        data: prepareLocationData(location),
      });
      console.log(`Migrated location: ${location.name}`);
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