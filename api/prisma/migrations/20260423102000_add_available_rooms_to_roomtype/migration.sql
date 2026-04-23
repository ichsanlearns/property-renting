/*
  Warnings:

  - You are about to drop the column `pricing_rule_id` on the `room_type_prices` table. All the data in the column will be lost.
  - Added the required column `available_rooms` to the `room_types` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "room_type_prices" DROP CONSTRAINT "room_type_prices_pricing_rule_id_fkey";

-- AlterTable
ALTER TABLE "room_type_prices" DROP COLUMN "pricing_rule_id",
ADD COLUMN     "applied_pricing_rule_id" TEXT;

-- AlterTable
ALTER TABLE "room_types" ADD COLUMN     "available_rooms" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "room_type_prices" ADD CONSTRAINT "room_type_prices_applied_pricing_rule_id_fkey" FOREIGN KEY ("applied_pricing_rule_id") REFERENCES "pricing_rules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
