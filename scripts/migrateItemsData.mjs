import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

const prepareItemData = (item) => ({
  name: item.name,
  image: item.image || null,
  description: item.description || '',
  category: item.category,
  rarity: item.rarity,
  classification: item.classification || item.category,
  armor: item.armor || null,
  weapon: item.weapon || null,
  cost: item.cost
});

async function main() {
  console.log('Starting items data migration...');

  try {
    // Read items data
    const itemsData = JSON.parse(
      fs.readFileSync('src/data/worlds/sword-coast/items/items.json', 'utf8')
    );

    // Clear existing items
    console.log('Clearing existing items...');
    await prisma.item.deleteMany();
    console.log('Existing items cleared.');

    // Migrate items
    console.log('Migrating items...');
    let migratedCount = 0;
    for (const item of itemsData.items) {
      try {
        await prisma.item.create({
          data: prepareItemData(item),
        });
        console.log(`Migrated item: ${item.name}`);
        migratedCount++;
      } catch (error) {
        console.warn(`Failed to migrate item ${item.name}:`, error.message);
      }
    }

    console.log(`Data migration completed successfully! Migrated ${migratedCount} items.`);
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