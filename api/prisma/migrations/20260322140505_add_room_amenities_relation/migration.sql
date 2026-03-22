/*
  Warnings:

  - Added the required column `type` to the `amenities` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AmenityType" AS ENUM ('PROPERTY', 'ROOM');

-- AlterTable
ALTER TABLE "amenities" ADD COLUMN     "type" "AmenityType" NOT NULL;

-- CreateTable
CREATE TABLE "room_type_amenities" (
    "id" TEXT NOT NULL,
    "room_type_id" TEXT NOT NULL,
    "amenity_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "room_type_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "room_type_amenities_room_type_id_amenity_id_key" ON "room_type_amenities"("room_type_id", "amenity_id");

-- AddForeignKey
ALTER TABLE "room_type_amenities" ADD CONSTRAINT "room_type_amenities_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_type_amenities" ADD CONSTRAINT "room_type_amenities_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "amenities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
