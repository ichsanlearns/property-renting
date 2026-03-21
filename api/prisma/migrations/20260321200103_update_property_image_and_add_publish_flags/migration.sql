/*
  Warnings:

  - You are about to alter the column `average_rating` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(1,1)`.
  - You are about to drop the column `is_primary` on the `property_images` table. All the data in the column will be lost.
  - Changed the type of `latitude` on the `properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longitude` on the `properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "is_published" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "is_verified" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "latitude",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "average_rating" SET DATA TYPE DECIMAL(1,1);

-- AlterTable
ALTER TABLE "property_images" DROP COLUMN "is_primary",
ADD COLUMN     "is_cover" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "room_types" ADD COLUMN     "is_published" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "is_verified" "VerificationStatus" NOT NULL DEFAULT 'PENDING';
