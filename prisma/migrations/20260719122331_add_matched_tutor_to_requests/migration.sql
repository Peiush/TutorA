-- AlterTable
ALTER TABLE "tutor_requests" ADD COLUMN     "matchedTutorId" TEXT;

-- AddForeignKey
ALTER TABLE "tutor_requests" ADD CONSTRAINT "tutor_requests_matchedTutorId_fkey" FOREIGN KEY ("matchedTutorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
