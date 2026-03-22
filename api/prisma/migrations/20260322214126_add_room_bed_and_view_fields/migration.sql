/*
  Warnings:

  - Added the required column `bathroom_type` to the `room_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bed_count` to the `room_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bed_type` to the `room_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `view_type` to the `room_types` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BathroomType" AS ENUM ('PRIVATE', 'SHARED');

-- CreateEnum
CREATE TYPE "BedType" AS ENUM ('KING_SIZE', 'QUEEN_SIZE', 'DOUBLE_TWIN', 'SINGLE');

-- CreateEnum
CREATE TYPE "ViewType" AS ENUM ('OCEAN_FRONT', 'GARDEN_VIEW', 'CITY_SKYLINE', 'POOL_SIDE', 'NONE');

-- AlterTable
ALTER TABLE "room_types" ADD COLUMN     "bathroom_type" "BathroomType" NOT NULL,
ADD COLUMN     "bed_count" INTEGER NOT NULL,
ADD COLUMN     "bed_type" "BedType" NOT NULL,
ADD COLUMN     "view_type" "ViewType" NOT NULL;
