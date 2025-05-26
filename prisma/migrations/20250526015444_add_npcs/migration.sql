/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "NPC" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER,
    "faction" TEXT,
    "status" TEXT NOT NULL,
    "questGiver" BOOLEAN NOT NULL,
    "relationshipStatus" TEXT NOT NULL,
    "notes" JSONB,
    "schedule" JSONB,
    "dialogue" JSONB,
    "inventory" JSONB,
    "skills" JSONB,
    "relationships" JSONB,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "regionId" TEXT,
    "worldId" TEXT,

    CONSTRAINT "NPC_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- AddForeignKey
ALTER TABLE "NPC" ADD CONSTRAINT "NPC_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NPC" ADD CONSTRAINT "NPC_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NPC" ADD CONSTRAINT "NPC_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE SET NULL ON UPDATE CASCADE;
