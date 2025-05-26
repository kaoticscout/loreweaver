import { PrismaClient } from '@prisma/client';
import { npcs } from '../src/data/worlds/sword-coast/npcs/index.js';

const prisma = new PrismaClient();

const prepareNPCData = (npc) => ({
  id: npc.id,
  name: npc.name,
  role: npc.role,
  locationName: npc.location.split(', ')[0], // Take the first part before the comma
  description: npc.description,
  level: npc.level || null,
  faction: npc.faction || null,
  status: npc.status,
  questGiver: npc.questGiver,
  relationshipStatus: npc.relationshipStatus,
  notes: npc.notes || null,
  schedule: npc.schedule || null,
  dialogue: npc.dialogue || null,
  inventory: npc.inventory || null,
  skills: npc.skills || null,
  relationships: npc.relationships || null,
  createdAt: npc.createdAt,
  updatedAt: npc.updatedAt,
});

async function main() {
  console.log('Starting NPC data migration...');

  try {
    // Clear existing NPCs
    console.log('Clearing existing NPCs...');
    await prisma.nPC.deleteMany();
    console.log('Existing NPCs cleared.');

    // Create JavaScript version of NPCs data
    const jsNPCs = npcs.map(npc => ({
      ...npc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    // Migrate NPCs
    console.log('Migrating NPCs...');
    for (const npc of jsNPCs) {
      const locationName = npc.location.split(', ')[0];
      const location = await prisma.location.findUnique({
        where: { name: locationName },
      });

      if (!location) {
        console.warn(`Location "${locationName}" not found for NPC "${npc.name}". Creating NPC without location reference.`);
      }

      await prisma.nPC.create({
        data: prepareNPCData(npc),
      });
      console.log(`Migrated NPC: ${npc.name}`);
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