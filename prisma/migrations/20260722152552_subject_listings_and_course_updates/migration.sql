-- AlterEnum
BEGIN;
CREATE TYPE "CourseCategory_new" AS ENUM ('PROGRAMMING_TECHNOLOGY', 'TEST_PREPARATION', 'LANGUAGES', 'CREATIVE_SKILLS', 'MUSIC_INSTRUMENTS');
ALTER TABLE "courses" ALTER COLUMN "category" TYPE "CourseCategory_new" USING ("category"::text::"CourseCategory_new");
ALTER TYPE "CourseCategory" RENAME TO "CourseCategory_old";
ALTER TYPE "CourseCategory_new" RENAME TO "CourseCategory";
DROP TYPE "public"."CourseCategory_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_instructorId_fkey";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "lectureCountLabel" TEXT,
ALTER COLUMN "instructorId" DROP NOT NULL,
ALTER COLUMN "priceCents" DROP NOT NULL,
ALTER COLUMN "originalPriceCents" DROP NOT NULL,
ALTER COLUMN "durationHours" DROP NOT NULL,
ALTER COLUMN "lectureCount" DROP NOT NULL,
ALTER COLUMN "whatYoullLearn" DROP NOT NULL;

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gradeLevel" TEXT,
    "curriculum" TEXT,
    "hourlyRateCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor_subjects" (
    "id" TEXT NOT NULL,
    "tutorProfileId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "hourlyRateCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutor_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_subjects_tutorProfileId_subjectId_key" ON "tutor_subjects"("tutorProfileId", "subjectId");

-- AddForeignKey
ALTER TABLE "tutor_subjects" ADD CONSTRAINT "tutor_subjects_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "tutor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_subjects" ADD CONSTRAINT "tutor_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "tutor_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

