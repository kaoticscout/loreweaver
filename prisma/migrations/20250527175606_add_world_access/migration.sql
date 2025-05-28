-- DropForeignKey
ALTER TABLE "WorldAccess" DROP CONSTRAINT "WorldAccess_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorldAccess" DROP CONSTRAINT "WorldAccess_worldId_fkey";

-- AddForeignKey
ALTER TABLE "WorldAccess" ADD CONSTRAINT "WorldAccess_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldAccess" ADD CONSTRAINT "WorldAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
