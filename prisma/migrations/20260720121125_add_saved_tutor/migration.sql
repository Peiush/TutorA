-- CreateTable
CREATE TABLE "saved_tutors" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tutorProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_tutors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "saved_tutors_userId_tutorProfileId_key" ON "saved_tutors"("userId", "tutorProfileId");

-- AddForeignKey
ALTER TABLE "saved_tutors" ADD CONSTRAINT "saved_tutors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_tutors" ADD CONSTRAINT "saved_tutors_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "tutor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
