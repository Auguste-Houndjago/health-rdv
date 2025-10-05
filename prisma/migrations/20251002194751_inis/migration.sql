-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('patient', 'medecin', 'admin');

-- CreateEnum
CREATE TYPE "public"."FonctionAdmin" AS ENUM ('RESPONSABLE', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "public"."Sexe" AS ENUM ('Homme', 'Femme', 'Autre');

-- CreateEnum
CREATE TYPE "public"."GroupeSanguin" AS ENUM ('A_POSITIF', 'A_NEGATIF', 'B_POSITIF', 'B_NEGATIF', 'AB_POSITIF', 'AB_NEGATIF', 'O_POSITIF', 'O_NEGATIF', 'INCONNU');

-- CreateEnum
CREATE TYPE "public"."StatutRendezVous" AS ENUM ('CONFIRME', 'ANNULE', 'EN_ATTENTE', 'TERMINE');

-- CreateEnum
CREATE TYPE "public"."StatusUtilisateur" AS ENUM ('ACTIF', 'INACTIF');

-- CreateEnum
CREATE TYPE "public"."StatutApproval" AS ENUM ('EN_ATTENTE', 'APPROUVE', 'REJETE');

-- CreateTable
CREATE TABLE "public"."Utilisateur" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "status" "public"."StatusUtilisateur" NOT NULL DEFAULT 'ACTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Administrateur" (
    "id" TEXT NOT NULL,
    "fonction" "public"."FonctionAdmin" NOT NULL DEFAULT 'RESPONSABLE',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Administrateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Patient" (
    "id" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "adresse" TEXT,
    "groupeSanguin" "public"."GroupeSanguin" NOT NULL DEFAULT 'INCONNU',
    "poids" DOUBLE PRECISION,
    "taille" DOUBLE PRECISION,
    "sexe" "public"."Sexe" NOT NULL DEFAULT 'Homme',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medecin" (
    "id" TEXT NOT NULL,
    "specialiteId" TEXT NOT NULL,
    "numLicence" TEXT NOT NULL,
    "anneeExperience" INTEGER,
    "titre" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isDisponible" BOOLEAN NOT NULL DEFAULT true,
    "statut" "public"."StatutApproval" NOT NULL DEFAULT 'EN_ATTENTE',

    CONSTRAINT "Medecin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RendezVous" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duree" INTEGER NOT NULL DEFAULT 30,
    "statut" "public"."StatutRendezVous" NOT NULL DEFAULT 'EN_ATTENTE',
    "motif" TEXT,
    "hopitalId" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "medecinId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hopital" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "description" TEXT,
    "contact" TEXT NOT NULL,
    "localisation" TEXT,
    "slug" TEXT,
    "fuseauHoraire" TEXT NOT NULL DEFAULT 'Europe/Paris',

    CONSTRAINT "Hopital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MedecinHopital" (
    "id" TEXT NOT NULL,
    "medecinId" TEXT NOT NULL,
    "hopitalId" TEXT NOT NULL,

    CONSTRAINT "MedecinHopital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Specialite" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Specialite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Recommandation" (
    "id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "medecinId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommandation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UtilisateurHopital" (
    "id" TEXT NOT NULL,
    "utilisateurId" TEXT NOT NULL,
    "hopitalId" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateFin" TIMESTAMP(3),

    CONSTRAINT "UtilisateurHopital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_HopitalToSpecialite" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_HopitalToSpecialite_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "public"."Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administrateur_userId_key" ON "public"."Administrateur"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "public"."Patient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_numLicence_key" ON "public"."Medecin"("numLicence");

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_userId_key" ON "public"."Medecin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RendezVous_medecinId_date_key" ON "public"."RendezVous"("medecinId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "RendezVous_patientId_date_key" ON "public"."RendezVous"("patientId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Hopital_slug_key" ON "public"."Hopital"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MedecinHopital_medecinId_hopitalId_key" ON "public"."MedecinHopital"("medecinId", "hopitalId");

-- CreateIndex
CREATE UNIQUE INDEX "UtilisateurHopital_utilisateurId_hopitalId_role_key" ON "public"."UtilisateurHopital"("utilisateurId", "hopitalId", "role");

-- CreateIndex
CREATE INDEX "_HopitalToSpecialite_B_index" ON "public"."_HopitalToSpecialite"("B");

-- AddForeignKey
ALTER TABLE "public"."Administrateur" ADD CONSTRAINT "Administrateur_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medecin" ADD CONSTRAINT "Medecin_specialiteId_fkey" FOREIGN KEY ("specialiteId") REFERENCES "public"."Specialite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Medecin" ADD CONSTRAINT "Medecin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RendezVous" ADD CONSTRAINT "RendezVous_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "public"."Medecin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RendezVous" ADD CONSTRAINT "RendezVous_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RendezVous" ADD CONSTRAINT "RendezVous_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "public"."Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RendezVous" ADD CONSTRAINT "RendezVous_hopitalId_fkey" FOREIGN KEY ("hopitalId") REFERENCES "public"."Hopital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MedecinHopital" ADD CONSTRAINT "MedecinHopital_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "public"."Medecin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MedecinHopital" ADD CONSTRAINT "MedecinHopital_hopitalId_fkey" FOREIGN KEY ("hopitalId") REFERENCES "public"."Hopital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recommandation" ADD CONSTRAINT "Recommandation_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "public"."Medecin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UtilisateurHopital" ADD CONSTRAINT "UtilisateurHopital_hopitalId_fkey" FOREIGN KEY ("hopitalId") REFERENCES "public"."Hopital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UtilisateurHopital" ADD CONSTRAINT "UtilisateurHopital_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "public"."Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_HopitalToSpecialite" ADD CONSTRAINT "_HopitalToSpecialite_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Hopital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_HopitalToSpecialite" ADD CONSTRAINT "_HopitalToSpecialite_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Specialite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
