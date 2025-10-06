/*
  Warnings:

  - Added the required column `updatedAt` to the `RendezVous` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Specialite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RendezVous" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Specialite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "RendezVous_medecinId_date_idx" ON "RendezVous"("medecinId", "date");

-- CreateIndex
CREATE INDEX "RendezVous_patientId_date_idx" ON "RendezVous"("patientId", "date");
