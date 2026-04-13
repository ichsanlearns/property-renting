/*
  Warnings:

  - Added the required column `average_room_per_night_snapshot` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_nights` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_name_snapshot` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservation_code` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_name_snapshot` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "average_room_per_night_snapshot" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "number_of_nights" INTEGER NOT NULL,
ADD COLUMN     "property_name_snapshot" TEXT NOT NULL,
ADD COLUMN     "reservation_code" TEXT NOT NULL,
ADD COLUMN     "room_name_snapshot" TEXT NOT NULL,
ALTER COLUMN "guest_count" DROP NOT NULL,
ALTER COLUMN "using_points" DROP NOT NULL,
ALTER COLUMN "using_points" SET DEFAULT 0;
