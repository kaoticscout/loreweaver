import { PrismaClient } from '@prisma/client';
import { quests } from '../src/data/worlds/sword-coast/quests/index.js';

const prisma = new PrismaClient();

const prepareQuestData = (quest) => ({
  id: quest.id,
  title: quest.title,
  description: quest.description,
  level: quest.level,
  type: quest.type,
  status: quest.status,
  rewards: quest.rewards,
  requirements: quest.requirements,
  locationName: quest.location,
  objectives: quest.objectives,
  createdAt: quest.createdAt,
  updatedAt: quest.updatedAt,
  difficulty: quest.difficulty || null,
  timeEstimate: quest.timeEstimate || null,
  recommendedPartySize: quest.recommendedPartySize || null,
  minPartySize: quest.minPartySize || null,
  maxPartySize: quest.maxPartySize || null,
  recommendedClasses: quest.recommendedClasses || [],
  questChain: quest.questChain || null,
  detailedLocations: quest.detailedLocations || null,
  lore: quest.lore || null,
  consequences: quest.consequences || null,
  specialConditions: quest.specialConditions || null,
  hiddenObjectives: quest.hiddenObjectives || null,
  alternativeEndings: quest.alternativeEndings || null,
  reputationChanges: quest.reputationChanges || null,
  skillChecks: quest.skillChecks || null,
  environmentalHazards: quest.environmentalHazards || null,
  questItems: quest.questItems || null
});

async function main() {
  console.log('Starting quest data migration...');

  try {
    // Clear existing quests
    console.log('Clearing existing quests...');
    await prisma.quest.deleteMany();
    console.log('Existing quests cleared.');

    // Migrate quests
    console.log('Migrating quests...');
    for (const quest of quests) {
      const location = await prisma.location.findUnique({
        where: { name: quest.location },
      });

      if (!location) {
        console.warn(`Location "${quest.location}" not found for quest "${quest.title}". Creating quest without location reference.`);
      }

      // Create the quest
      const createdQuest = await prisma.quest.create({
        data: prepareQuestData(quest),
      });

      // Connect NPCs to the quest
      for (const npcName of quest.npcs) {
        const npc = await prisma.nPC.findFirst({
          where: { name: npcName },
        });

        if (npc) {
          await prisma.quest.update({
            where: { id: createdQuest.id },
            data: {
              npcs: {
                connect: { id: npc.id },
              },
            },
          });
        } else {
          console.warn(`NPC "${npcName}" not found for quest "${quest.title}".`);
        }
      }

      console.log(`Migrated quest: ${quest.title}`);
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