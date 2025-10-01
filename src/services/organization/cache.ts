// lib/organization/cache.ts
import { unstable_cache } from "next/cache";
import {prisma} from "@/lib/prisma";



//avec clé dynamique (recommandée)
export function getCachedOrganizationById(orgId: string) {
  return unstable_cache(
    async () => {
      return prisma.organization.findUnique({
        where: { id: orgId },
        select: {
          id: true,
          name: true,
          slug: true,
          logo: true,
          domain: true,
          settings: true,
          isActive:true,  
          updatedAt: true,
     
        },
      });
    },
    ["organization", orgId], // ✅ Clé dynamique avec l'ID
    {
      tags: ["organization", `org-${orgId}`],
      revalidate: 3600,
    },
  )();
}

// Fonction pour invalider le cache d'une organisation spécifique
export async function invalidateOrganizationCache(
  orgId?: string,
): Promise<void> {
  const { revalidateTag } = await import("next/cache");

  if (orgId) {
    // Invalide une organisation spécifique
    revalidateTag(`org-${orgId}`);
  } else {
    // Invalide toutes les organisations
    revalidateTag("organization");
  }
}
