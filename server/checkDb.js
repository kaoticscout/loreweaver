const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Checking database connection...');
    await prisma.$connect();
    console.log('Connected to database successfully');

    console.log('\nChecking for NPCs...');
    const npcs = await prisma.nPC.findMany({
      include: {
        location: true,
        world: true
      }
    });
    console.log('Found NPCs:', npcs.length);
    console.log('NPC details:', JSON.stringify(npcs, null, 2));

    console.log('\nChecking for Locations...');
    const locations = await prisma.location.findMany();
    console.log('Found Locations:', locations.length);
    console.log('Location names:', locations.map(l => l.name));

    console.log('\nChecking for Worlds...');
    const worlds = await prisma.world.findMany();
    console.log('Found Worlds:', worlds.length);
    console.log('World IDs:', worlds.map(w => w.id));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 