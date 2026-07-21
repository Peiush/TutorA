-- CreateEnum
CREATE TYPE "CourseRequestStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "saved_courses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "status" "CourseRequestStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "saved_courses_userId_courseId_key" ON "saved_courses"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "course_requests_userId_courseId_key" ON "course_requests"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "saved_courses" ADD CONSTRAINT "saved_courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_courses" ADD CONSTRAINT "saved_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_requests" ADD CONSTRAINT "course_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_requests" ADD CONSTRAINT "course_requests_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
