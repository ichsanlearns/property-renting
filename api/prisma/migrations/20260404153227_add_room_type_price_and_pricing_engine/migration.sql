/*
  Warnings:

  - You are about to drop the column `quantity` on the `room_types` table. All the data in the column will be lost.
  - You are about to drop the `price_adjustments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room_availability` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total_rooms` to the `room_types` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PricingRuleType" AS ENUM ('WEEKEND', 'HOLIDAY', 'SEASONAL');

-- DropForeignKey
ALTER TABLE "price_adjustments" DROP CONSTRAINT "price_adjustments_room_type_id_fkey";

-- DropForeignKey
ALTER TABLE "room_availability" DROP CONSTRAINT "room_availability_room_type_id_fkey";

-- AlterTable
ALTER TABLE "room_types" DROP COLUMN "quantity",
ADD COLUMN     "total_rooms" INTEGER NOT NULL;

-- DropTable
DROP TABLE "price_adjustments";

-- DropTable
DROP TABLE "room_availability";

-- CreateTable
CREATE TABLE "room_type_prices" (
    "id" TEXT NOT NULL,
    "room_type_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "available_rooms" INTEGER NOT NULL,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "room_type_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_overrides" (
    "id" TEXT NOT NULL,
    "room_type_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_overrides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_rules" (
    "id" TEXT NOT NULL,
    "type" "PricingRuleType" NOT NULL,
    "adjustment_type" "PriceAdjustmentType" NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "day_of_week" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "room_type_prices_room_type_id_date_idx" ON "room_type_prices"("room_type_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "room_type_prices_room_type_id_date_key" ON "room_type_prices"("room_type_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "price_overrides_room_type_id_date_key" ON "price_overrides"("room_type_id", "date");

-- AddForeignKey
ALTER TABLE "room_type_prices" ADD CONSTRAINT "room_type_prices_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_overrides" ADD CONSTRAINT "price_overrides_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
