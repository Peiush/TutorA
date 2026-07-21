-- CreateEnum
CREATE TYPE "CourseCategory" AS ENUM ('MATHEMATICS', 'SCIENCE', 'COMPUTER_SCIENCE', 'LANGUAGES', 'MUSIC', 'TEST_PREP', 'WRITING');

-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ALL_LEVELS');

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "instructorId" TEXT NOT NULL,
    "category" "CourseCategory" NOT NULL,
    "level" "CourseLevel" NOT NULL DEFAULT 'ALL_LEVELS',
    "priceCents" INTEGER NOT NULL,
    "originalPriceCents" INTEGER NOT NULL,
    "durationHours" DOUBLE PRECISION NOT NULL,
    "lectureCount" INTEGER NOT NULL,
    "whatYoullLearn" TEXT NOT NULL,
    "bestseller" BOOLEAN NOT NULL DEFAULT false,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "tutor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
