-- AlterTable
ALTER TABLE "Dungeon" ADD COLUMN     "worldId" TEXT;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "worldId" TEXT;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dungeon" ADD CONSTRAINT "Dungeon_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE SET NULL ON UPDATE CASCADE;
