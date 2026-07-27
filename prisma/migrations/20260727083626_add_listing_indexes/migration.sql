-- CreateIndex
CREATE INDEX "courses_published_createdAt_idx" ON "courses"("published", "createdAt");

-- CreateIndex
CREATE INDEX "courses_published_category_rating_idx" ON "courses"("published", "category", "rating");

-- CreateIndex
CREATE INDEX "tutor_profiles_status_updatedAt_idx" ON "tutor_profiles"("status", "updatedAt");
