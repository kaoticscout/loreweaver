-- AlterTable
ALTER TABLE "Encounter" ADD COLUMN     "worldId" TEXT;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE SET NULL ON UPDATE CASCADE;
