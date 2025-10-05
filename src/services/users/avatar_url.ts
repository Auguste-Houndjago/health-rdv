// src/services/users/avatar_url.ts
"use server";

import { createClient } from "@/utils/supabase/server";

import {prisma} from "@/lib/prisma";

export async function updateAvatar(avatarUrl: string) {
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

    const email = user.email;
    if (!email) {
      throw new Error("Email de l'utilisateur non trouvé");
    }

    // Mettre à jour les métadonnées Supabase
    const { error: userError } = await supabase.auth.updateUser({
      data: {
        avatar_url: avatarUrl,
      },
    });

    if (userError) {
      console.error("Erreur lors de la mise à jour des métadonnées Supabase:", userError);
      throw new Error(`Erreur Supabase: ${userError.message}`);
    }

    // Mettre à jour la base de données Prisma
    const updatedUser = await prisma.utilisateur.upsert({
      where: { email },
      update: {  avatarUrl },
      create: { 
        id: user.id,
        email, 
        avatarUrl,
        nom: user.user_metadata?.nom || " " ,

      },
    });

    return {
      success: true,
      user: updatedUser,
      avatarUrl,
    };
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de l'avatar:", error);
    return {
      success: false,
      error: error.message || "Erreur lors de la mise à jour de l'avatar",
    };
  }
} 