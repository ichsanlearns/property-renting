/*
  Warnings:

  - You are about to drop the column `type` on the `pricing_rules` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `pricing_rules` table. All the data in the column will be lost.
  - The `day_of_week` column on the `pricing_rules` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `adjustmentValue` to the `pricing_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adjustment_direction` to the `pricing_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `pricing_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `pricing_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope_type` to the `pricing_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `pricing_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `pricing_rules` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PriceAdjustmentDirection" AS ENUM ('MINUS', 'PLUS');

-- CreateEnum
CREATE TYPE "ScopeType" AS ENUM ('SYSTEM', 'TENANT', 'PROPERTY', 'ROOM_TYPE');

-- AlterTable
ALTER TABLE "pricing_rules" DROP COLUMN "type",
DROP COLUMN "value",
ADD COLUMN     "adjustmentValue" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "adjustment_direction" "PriceAdjustmentDirection" NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "property_id" TEXT,
ADD COLUMN     "room_type_id" TEXT,
ADD COLUMN     "scope_type" "ScopeType" NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tenant_id" TEXT NOT NULL,
DROP COLUMN "day_of_week",
ADD COLUMN     "day_of_week" INTEGER[];

-- DropEnum
DROP TYPE "PricingRuleType";

-- CreateIndex
CREATE INDEX "pricing_rules_tenant_id_idx" ON "pricing_rules"("tenant_id");

-- CreateIndex
CREATE INDEX "pricing_rules_property_id_idx" ON "pricing_rules"("property_id");

-- CreateIndex
CREATE INDEX "pricing_rules_room_type_id_idx" ON "pricing_rules"("room_type_id");

-- CreateIndex
CREATE INDEX "pricing_rules_start_date_end_date_idx" ON "pricing_rules"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "pricing_rules_tenant_id_scope_type_idx" ON "pricing_rules"("tenant_id", "scope_type");

-- CreateIndex
CREATE INDEX "pricing_rules_tenant_id_property_id_idx" ON "pricing_rules"("tenant_id", "property_id");

-- CreateIndex
CREATE INDEX "pricing_rules_tenant_id_room_type_id_idx" ON "pricing_rules"("tenant_id", "room_type_id");

-- AddForeignKey
ALTER TABLE "pricing_rules" ADD CONSTRAINT "pricing_rules_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_rules" ADD CONSTRAINT "pricing_rules_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_rules" ADD CONSTRAINT "pricing_rules_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
