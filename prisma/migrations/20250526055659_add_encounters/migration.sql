-- CreateTable
CREATE TABLE "Encounter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "enemies" JSONB NOT NULL,
    "rewards" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "triggers" JSONB[],
    "notes" TEXT[],
    "xp" INTEGER NOT NULL,
    "treasure" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Encounter_pkey" PRIMARY KEY ("id")
);
