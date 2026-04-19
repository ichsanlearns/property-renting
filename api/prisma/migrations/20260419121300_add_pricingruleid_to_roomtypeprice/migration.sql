/*
  Warnings:

  - The values [MINUS,PLUS] on the enum `PriceAdjustmentDirection` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `day_of_week` on the `pricing_rules` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PriceAdjustmentDirection_new" AS ENUM ('DECREASE', 'INCREASE');
ALTER TABLE "pricing_rules" ALTER COLUMN "adjustment_direction" TYPE "PriceAdjustmentDirection_new" USING ("adjustment_direction"::text::"PriceAdjustmentDirection_new");
ALTER TYPE "PriceAdjustmentDirection" RENAME TO "PriceAdjustmentDirection_old";
ALTER TYPE "PriceAdjustmentDirection_new" RENAME TO "PriceAdjustmentDirection";
DROP TYPE "public"."PriceAdjustmentDirection_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "pricing_rules" DROP CONSTRAINT "pricing_rules_tenant_id_fkey";

-- AlterTable
ALTER TABLE "pricing_rules" DROP COLUMN "day_of_week",
ADD COLUMN     "days_of_week" INTEGER[],
ALTER COLUMN "end_date" SET DATA TYPE DATE,
ALTER COLUMN "start_date" SET DATA TYPE DATE,
ALTER COLUMN "tenant_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room_type_prices" ADD COLUMN     "pricing_rule_id" TEXT;

-- AddForeignKey
ALTER TABLE "room_type_prices" ADD CONSTRAINT "room_type_prices_pricing_rule_id_fkey" FOREIGN KEY ("pricing_rule_id") REFERENCES "pricing_rules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_rules" ADD CONSTRAINT "pricing_rules_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
