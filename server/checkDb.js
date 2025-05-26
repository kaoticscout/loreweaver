import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Checking database connection...');
    await prisma.$connect();
    console.log('Connected to database successfully');

    console.log('\nChecking for encounters...');
    const encounter = await prisma.encounter.findFirst({
      where: {
        worldId: 'sword-coast'
      }
    });
    console.log('Sample encounter:', JSON.stringify(encounter, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 