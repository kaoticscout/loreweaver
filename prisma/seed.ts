import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create or update a test world
  const testWorld = await prisma.world.upsert({
    where: {
      id: 'test-world'
    },
    update: {
      rating: {
        rating: 4.5,
        votes: 10
      }
    },
    create: {
      id: 'test-world',
      name: 'Test World',
      description: 'A test world for development',
      banner: '/images/worlds/test-world-banner.jpg',
      thumbnail: '/images/worlds/test-world-thumb.jpg',
      theme: 'Fantasy',
      rating: {
        rating: 4.5,
        votes: 10
      },
      tags: ['test', 'development'],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      creator: {
        id: 'test-creator',
        name: 'Test Creator',
        avatar: '/images/avatars/default.jpg'
      },
      featured: false,
      popularity: 0,
      difficulty: 'Beginner',
      recommendedLevel: '1-5',
      estimatedPlayTime: '2-4 hours',
      languages: ['English'],
      contentWarnings: [],
    }
  });

  console.log('Upserted test world:', testWorld);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 