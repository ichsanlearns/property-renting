-- AlterTable
ALTER TABLE "property_images" ADD COLUMN     "image_public_id" TEXT,
ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "room_type_images" ADD COLUMN     "image_public_id" TEXT,
ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profile_image_public_id" TEXT;
