-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "worldId" TEXT;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE SET NULL ON UPDATE CASCADE;
