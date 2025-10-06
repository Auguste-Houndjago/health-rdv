/*
  Warnings:

  - You are about to drop the column `role` on the `UtilisateurHopital` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[utilisateurId,hopitalId]` on the table `UtilisateurHopital` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."UtilisateurHopital_utilisateurId_hopitalId_role_key";

-- AlterTable
ALTER TABLE "public"."Utilisateur" ADD COLUMN     "role" "public"."Role" NOT NULL;

-- AlterTable
ALTER TABLE "public"."UtilisateurHopital" DROP COLUMN "role";

-- CreateIndex
CREATE UNIQUE INDEX "UtilisateurHopital_utilisateurId_hopitalId_key" ON "public"."UtilisateurHopital"("utilisateurId", "hopitalId");
