-- CreateTable
CREATE TABLE "tutor_reviews" (
    "id" TEXT NOT NULL,
    "tutorProfileId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutor_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tutor_reviews_tutorProfileId_createdAt_idx" ON "tutor_reviews"("tutorProfileId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_reviews_userId_tutorProfileId_key" ON "tutor_reviews"("userId", "tutorProfileId");

-- AddForeignKey
ALTER TABLE "tutor_reviews" ADD CONSTRAINT "tutor_reviews_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "tutor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_reviews" ADD CONSTRAINT "tutor_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
