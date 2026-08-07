-- AlterTable
ALTER TABLE "subjects" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "subjects_slug_key" ON "subjects"("slug");
