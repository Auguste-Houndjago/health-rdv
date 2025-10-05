/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `Utilisateur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Utilisateur" DROP COLUMN "avatar_url",
ADD COLUMN     "avatarUrl" TEXT;
