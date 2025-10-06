-- AlterTable
ALTER TABLE "Hopital" ADD COLUMN     "image" TEXT,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Recommandation" ADD COLUMN     "documentId" TEXT,
ADD COLUMN     "file" TEXT;

-- AddForeignKey
ALTER TABLE "Recommandation" ADD CONSTRAINT "Recommandation_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
