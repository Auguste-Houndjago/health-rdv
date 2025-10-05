/*
  Warnings:

  - You are about to drop the column `dateNaissance` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Patient" DROP COLUMN "dateNaissance";

-- AlterTable
ALTER TABLE "public"."Utilisateur" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "dateNaissance" TIMESTAMP(3);
