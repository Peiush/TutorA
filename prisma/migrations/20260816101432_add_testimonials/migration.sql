-- CreateEnum
CREATE TYPE "TestimonialRole" AS ENUM ('PARENT', 'STUDENT', 'TUTOR');

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "TestimonialRole" NOT NULL,
    "quote" TEXT NOT NULL,
    "rating" INTEGER,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testimonials_userId_key" ON "testimonials"("userId");

-- CreateIndex
CREATE INDEX "testimonials_approved_createdAt_idx" ON "testimonials"("approved", "createdAt");

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
