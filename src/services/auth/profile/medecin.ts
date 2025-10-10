// src/services/auth/profile/medecin.ts
"use server"
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/services/users/utils";
import { createClient } from "@/utils/supabase/server";

export async function upsertProfilMedecin(params: {
  specialiteId: string
  numLicence: string
  anneeExperience?: number
  titre: string
}) {
  const { specialiteId, numLicence, anneeExperience, titre } = params
  const user = await getAuthUser()
  if (!user) {
    throw new Error("=== User not found ===")
  }

  const userId = user.id

  const existingMedecin = await prisma.medecin.findUnique({ where: { userId } })
  if (!existingMedecin) {
    await prisma.medecin.create({
      data: {
        id: userId,
        userId,
        specialiteId,
        numLicence,
        anneeExperience: anneeExperience ?? null,
        titre,
      },
    })
  } else {
    await prisma.medecin.update({
      where: { userId },
      data: {
        specialiteId,
        numLicence,
        anneeExperience: anneeExperience ?? null,
        titre,
      },
    })
  }

  return prisma.utilisateur.findUnique({ where: { id: userId } })
}



export async function userInfoMedecin(){
  try {
    const supabase = await createClient();

    // Récupérer l'utilisateur authentifié
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("Utilisateur non authentifié");
    }

    // Mettre à jour les métadonnées Supabase
    const { error: userError } = await supabase.auth.updateUser({
      data: {
       
      },
    });

    if (userError) {
      console.error("Erreur lors de la mise à jour des métadonnées Supabase:", userError);
      throw new Error(`Erreur Supabase: ${userError.message}`);
    }


    return {
      success: true,
      // user: updatedUser,
    
    };
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du profil médecin:", error);
    return {
      success: false,
      error: error.message || "Erreur lors de la mise à jour du profil médecin",
    };
  }

}

// export async function updateAvatar(avatarUrl: string) {
//   try {
//     const supabase = await createClient();

//     // Récupérer l'utilisateur authentifié
//     const {
//       data: { user },
//       error: authError,
//     } = await supabase.auth.getUser();

//     if (authError || !user) {
//       throw new Error("Utilisateur non authentifié");
//     }

//     const email = user.email;
//     if (!email) {
//       throw new Error("Email de l'utilisateur non trouvé");
//     }

//     // Mettre à jour les métadonnées Supabase
//     const { error: userError } = await supabase.auth.updateUser({
//       data: {
//         avatar_url: avatarUrl,
//       },
//     });

//     if (userError) {
//       console.error("Erreur lors de la mise à jour des métadonnées Supabase:", userError);
//       throw new Error(`Erreur Supabase: ${userError.message}`);
//     }

//     // Mettre à jour la base de données Prisma
//     const updatedUser = await prisma.utilisateur.upsert({
//       where: { email },
//       update: { avatarUrl },
//       create: { 
//         id: user.id,
//         email, 
//         avatarUrl,
//         nom: user.user_metadata?.nom || " ",
//       },
//     });

//     return {
//       success: true,
//       user: updatedUser,
//       avatarUrl,
//     };
//   } catch (error: any) {
//     console.error("Erreur lors de la mise à jour de l'avatar:", error);
//     return {
//       success: false,
//       error: error.message || "Erreur lors de la mise à jour de l'avatar",
//     };
//   }
// }