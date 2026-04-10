/*
  Warnings:

  - A unique constraint covering the columns `[reservation_code]` on the table `reservations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reservations_reservation_code_key" ON "reservations"("reservation_code");
