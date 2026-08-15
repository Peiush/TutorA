-- DropIndex
DROP INDEX "tutor_reviews_userId_tutorProfileId_key";

-- CreateIndex
CREATE INDEX "tutor_reviews_userId_tutorProfileId_idx" ON "tutor_reviews"("userId", "tutorProfileId");
