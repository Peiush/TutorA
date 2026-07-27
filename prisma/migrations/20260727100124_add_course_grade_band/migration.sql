-- CreateEnum
CREATE TYPE "CourseGradeBand" AS ENUM ('GRADE_6_8', 'GRADE_8_10', 'GRADE_11_12', 'ALL_GRADES');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "gradeBand" "CourseGradeBand" NOT NULL DEFAULT 'ALL_GRADES';
