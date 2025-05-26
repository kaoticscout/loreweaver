/*
  Warnings:

  - Made the column `boss` on table `Dungeon` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Dungeon" DROP CONSTRAINT "Dungeon_locationId_fkey";

-- AlterTable
ALTER TABLE "Dungeon" ALTER COLUMN "boss" SET NOT NULL,
ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Dungeon" ADD CONSTRAINT "Dungeon_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
