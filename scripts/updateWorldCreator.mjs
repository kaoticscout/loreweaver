import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateWorldCreator() {
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: 'aaronrklein@gmail.com' }
    });

    if (!user) {
      console.error('User not found');
      return;
    }

    console.log('Found user:', user);

    // Update all worlds
    const result = await prisma.world.updateMany({
      data: {
        creatorId: user.id,
        creator: {
          id: user.id,
          name: user.displayName || user.username,
          avatar: user.avatar || '/images/avatars/default.jpg'
        }
      }
    });

    console.log('Successfully updated worlds:', result);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateWorldCreator(); 