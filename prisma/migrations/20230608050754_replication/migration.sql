/*
  Warnings:

  - Added the required column `quantity` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FollowerOfTrip" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "FollowerOfTrip" ADD CONSTRAINT "FollowerOfTrip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
