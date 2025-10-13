-- CreateEnum
CREATE TYPE "TypeNotification" AS ENUM ('RENDEZ_VOUS', 'MESSAGE', 'SYSTEME', 'RAPPEL', 'URGENCE', 'DOCUMENT', 'RECOMMANDATION', 'DEMANDE', 'AUTRE');

-- CreateEnum
CREATE TYPE "StatutNotification" AS ENUM ('NON_LU', 'LU', 'ARCHIVE');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "TypeNotification" NOT NULL,
    "statut" "StatutNotification" NOT NULL DEFAULT 'NON_LU',
    "utilisateurId" TEXT NOT NULL,
    "lien" TEXT,
    "data" JSONB,
    "dateEnvoi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateLecture" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_utilisateurId_idx" ON "Notification"("utilisateurId");

-- CreateIndex
CREATE INDEX "Notification_statut_idx" ON "Notification"("statut");

-- CreateIndex
CREATE INDEX "Notification_type_idx" ON "Notification"("type");

-- CreateIndex
CREATE INDEX "Notification_dateEnvoi_idx" ON "Notification"("dateEnvoi");

-- CreateIndex
CREATE INDEX "Notification_dateLecture_idx" ON "Notification"("dateLecture");

-- CreateIndex
CREATE INDEX "Notification_expiresAt_idx" ON "Notification"("expiresAt");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
