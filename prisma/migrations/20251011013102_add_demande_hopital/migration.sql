-- CreateEnum
CREATE TYPE "StatutDemande" AS ENUM ('EN_ATTENTE', 'APPROUVE', 'REJETE');

-- CreateTable
CREATE TABLE "DemandeHopital" (
    "id" TEXT NOT NULL,
    "medecinId" TEXT NOT NULL,
    "hopitalId" TEXT NOT NULL,
    "statut" "StatutDemande" NOT NULL DEFAULT 'EN_ATTENTE',
    "message" TEXT,
    "dateDemande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateReponse" TIMESTAMP(3),
    "reponse" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DemandeHopital_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DemandeHopital_medecinId_idx" ON "DemandeHopital"("medecinId");

-- CreateIndex
CREATE INDEX "DemandeHopital_hopitalId_idx" ON "DemandeHopital"("hopitalId");

-- CreateIndex
CREATE INDEX "DemandeHopital_statut_idx" ON "DemandeHopital"("statut");

-- CreateIndex
CREATE UNIQUE INDEX "DemandeHopital_medecinId_hopitalId_key" ON "DemandeHopital"("medecinId", "hopitalId");

-- AddForeignKey
ALTER TABLE "DemandeHopital" ADD CONSTRAINT "DemandeHopital_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemandeHopital" ADD CONSTRAINT "DemandeHopital_hopitalId_fkey" FOREIGN KEY ("hopitalId") REFERENCES "Hopital"("id") ON DELETE CASCADE ON UPDATE CASCADE;
