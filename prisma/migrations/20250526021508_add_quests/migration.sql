-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "rewards" JSONB NOT NULL,
    "requirements" JSONB NOT NULL,
    "locationName" TEXT NOT NULL,
    "objectives" JSONB NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "difficulty" TEXT,
    "timeEstimate" INTEGER,
    "recommendedPartySize" INTEGER,
    "minPartySize" INTEGER,
    "maxPartySize" INTEGER,
    "recommendedClasses" TEXT[],
    "questChain" JSONB,
    "detailedLocations" JSONB,
    "lore" JSONB,
    "consequences" JSONB,
    "specialConditions" JSONB,
    "hiddenObjectives" JSONB,
    "alternativeEndings" JSONB,
    "reputationChanges" JSONB,
    "skillChecks" JSONB,
    "environmentalHazards" JSONB,
    "questItems" JSONB,
    "regionId" TEXT,
    "worldId" TEXT,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestNPC" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_QuestNPC_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_QuestNPC_B_index" ON "_QuestNPC"("B");

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestNPC" ADD CONSTRAINT "_QuestNPC_A_fkey" FOREIGN KEY ("A") REFERENCES "NPC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestNPC" ADD CONSTRAINT "_QuestNPC_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
