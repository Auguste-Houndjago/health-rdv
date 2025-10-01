// src/services/organization.ts
"use server";
import  {prisma}  from "@/lib/prisma"; 
import { createSubscription } from "../subscription/subscription";
import { getUserInfo } from "../users";
import { getAuthorization } from "../auth/permission";

export async function createOrganization({
  name,
  slug,
  domain,
  logo,
}: {
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
}) {


  const user = await getUserInfo()

  if (!user) throw new Error("Utilisateur non authentifié");
  const email = user?.email!

  await getAuthorization(user,"ADMIN","PRINCIPAL")

  const org = await prisma.organization.create({
    data: {
      name,
      slug,
      domain,
      logo,
    },
  });

  // Créer une subscription pour cette org
  await createSubscription(org.id, email);

  return org;
}
