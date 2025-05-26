/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `World` table. All the data in the column will be lost.
  - Added the required column `banner` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedPlayTime` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featured` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdated` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendedLevel` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `World` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `World` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `World` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "regionId" TEXT,
ALTER COLUMN "coordinates" DROP NOT NULL;

-- AlterTable
ALTER TABLE "World" DROP COLUMN "updatedAt",
ADD COLUMN     "banner" TEXT NOT NULL,
ADD COLUMN     "contentWarnings" TEXT[],
ADD COLUMN     "creator" JSONB NOT NULL,
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "estimatedPlayTime" TEXT NOT NULL,
ADD COLUMN     "featured" BOOLEAN NOT NULL,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "lastUpdated" TEXT NOT NULL,
ADD COLUMN     "popularity" INTEGER NOT NULL,
ADD COLUMN     "rating" JSONB NOT NULL,
ADD COLUMN     "recommendedLevel" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "theme" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "images" TEXT[],
    "notableFeatures" TEXT[],
    "history" JSONB NOT NULL,
    "keyFigures" JSONB[],
    "economy" JSONB NOT NULL,
    "seasons" JSONB[],
    "magicalItems" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "worldId" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
