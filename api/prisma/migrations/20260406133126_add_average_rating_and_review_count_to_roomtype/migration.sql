-- AlterTable
ALTER TABLE "room_types" ADD COLUMN     "average_rating" DECIMAL(1,1),
ADD COLUMN     "review_count" INTEGER NOT NULL DEFAULT 0;
