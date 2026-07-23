-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "tutor_profiles" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_profiles_slug_key" ON "tutor_profiles"("slug");

