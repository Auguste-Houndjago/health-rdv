-- CreateEnum
CREATE TYPE "JourSemaine" AS ENUM ('LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE');

-- CreateTable
CREATE TABLE "PlanningDisponibilite" (
    "id" TEXT NOT NULL,
    "medecinId" TEXT NOT NULL,
    "hopitalId" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3),
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanningDisponibilite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreneauDisponibilite" (
    "id" TEXT NOT NULL,
    "planningId" TEXT NOT NULL,
    "jour" "JourSemaine" NOT NULL,
    "heureDebut" TEXT NOT NULL,
    "heureFin" TEXT NOT NULL,
    "dureeConsultation" INTEGER NOT NULL DEFAULT 30,
    "pauseEntreConsultations" INTEGER NOT NULL DEFAULT 0,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreneauDisponibilite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlanningDisponibilite_medecinId_idx" ON "PlanningDisponibilite"("medecinId");

-- CreateIndex
CREATE INDEX "PlanningDisponibilite_hopitalId_idx" ON "PlanningDisponibilite"("hopitalId");

-- CreateIndex
CREATE INDEX "PlanningDisponibilite_dateDebut_idx" ON "PlanningDisponibilite"("dateDebut");

-- CreateIndex
CREATE INDEX "PlanningDisponibilite_actif_idx" ON "PlanningDisponibilite"("actif");

-- CreateIndex
CREATE INDEX "CreneauDisponibilite_planningId_idx" ON "CreneauDisponibilite"("planningId");

-- CreateIndex
CREATE INDEX "CreneauDisponibilite_jour_idx" ON "CreneauDisponibilite"("jour");

-- CreateIndex
CREATE INDEX "CreneauDisponibilite_actif_idx" ON "CreneauDisponibilite"("actif");

-- CreateIndex
CREATE UNIQUE INDEX "CreneauDisponibilite_planningId_jour_heureDebut_key" ON "CreneauDisponibilite"("planningId", "jour", "heureDebut");

-- AddForeignKey
ALTER TABLE "PlanningDisponibilite" ADD CONSTRAINT "PlanningDisponibilite_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningDisponibilite" ADD CONSTRAINT "PlanningDisponibilite_hopitalId_fkey" FOREIGN KEY ("hopitalId") REFERENCES "Hopital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreneauDisponibilite" ADD CONSTRAINT "CreneauDisponibilite_planningId_fkey" FOREIGN KEY ("planningId") REFERENCES "PlanningDisponibilite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
