/*
  Warnings:

  - You are about to drop the column `is_primary` on the `room_type_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "room_type_images" DROP COLUMN "is_primary",
ADD COLUMN     "is_cover" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
