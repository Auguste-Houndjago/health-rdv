// src/services/auth/supabase.ts
"use server";
import { createClient } from "@/utils/supabase/server";
import {prisma} from "@/lib/prisma";
import { redirect } from "next/navigation";

import { Functions, UserInfo } from "@/types/user";
import { Role, StatusUtilisateur } from "@prisma/client";
import { getUserInfo } from "../users/userInfo";


// Définir l'URL de redirection de base
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface SignUpParams {
  email: string;
  password: string;
  info?: Partial<Pick<UserInfo, "nom" | "telephone" | "avatar_url">>;
}



// export async function signUpResponsable(params: SignUpParams) {
//   const { email, password, info } = params;

//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
    
//     options: {
//       emailRedirectTo: `${baseUrl}/auth/callback`,
//       data: {
//         ...info,
//         role: Role.ADMIN,
//         function: Functions.SUPER_ADMIN,
//       },
//     },
//   });

//   return { data, error };
// }



export async function login( formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { data: authData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) {
    return { error: "Email ou mot de passe incorrect" };
  }

  if (!authData.user) {
    return { error: "Erreur lors de la connexion" };
  }

  // Utiliser getUserInfo pour récupérer les métadonnées de l'utilisateur
  const userInfo = await getUserInfo();
  
  if (!userInfo) {
    console.log("Impossible de récupérer les informations utilisateur");
    return { error: "Erreur lors de la récupération des informations utilisateur" };
  }

  const userRole = userInfo.role;
  const orgSlug = userInfo.hopital?.slug;

  if (!userRole || !orgSlug) {
    console.log("Informations utilisateur manquantes");
    return { error: "Informations utilisateur incomplètes" };
  }

  // Définir le chemin de redirection
  const redirectPath =
    userRole === "ADMIN" ? `/${orgSlug}/admin` : `/${orgSlug}/teacher`;

  return { redirectPath };
}



export async function updateUser(email: string, password: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.updateUser({
      password: password,
      email: email,
      data: {
        grade: "NEW_TEACHER",
      },
    });

    if (error) throw error;

    return { success: true, user: data.user };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Sign-in failed",
    };
  }
}


export async function signUp(
  email: string,
  password: string,
  metadata?: {
    name?: string;
    phone?: string;
    avatar_url?: string;
    role?: Role;
    status?:StatusUtilisateur
  },
) {
  try {
    const supabase = await createClient();

    // 🔽 On fusionne les métadonnées, y compris le rôle
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${baseUrl}/auth/callback`,
        data: {
          name: metadata?.name ?? null,
          phone: metadata?.phone ?? null,
          avatar_url: metadata?.avatar_url ?? null,
          role: metadata?.role || "PATIENT", 
          status:metadata?.status || "PENDING"
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: `Check your email (${email}) to continue sign up process`,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Sign up failed",
    };
  }
}



// Connexion avec OAuth (Google)
export async function signInWithGoogle() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });

    if (error) throw error;

    return { success: true, url: data.url };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Google sign-in failed",
    };
  }
}

// Connexion avec GitHub
export async function signInWithGitHub() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });

    if (error) throw error;

    return { success: true, url: data.url };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "GitHub sign-in failed",
    };
  }
}

// Déconnexion

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}

export async function LogOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Sign out failed",
    };
  }
}

// Réinitialisation de mot de passe
export async function resetPassword(email: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/auth/update-password`,
    });

    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Password reset failed",
    };
  }
}

// Mise à jour du profil
export async function updateProfile(
  userId: string,
  data: {
    name?: string;
    phone?: string;
    avatar_url?: string;
  },
) {
  try {
    const supabase = await createClient();

    // Mise à jour dans Auth
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        name: data.name,
        phone: data.phone,
        avatar_url: data.avatar_url,
      },
    });

    if (authError) throw authError;

    // Mise à jour dans Prisma
    const updatedUser = await prisma.utilisateur.update({
      where: { id: userId },
      data,
    });

    return { success: true, user: updatedUser };
  } catch (error: any) {
    console.error("Profile update error:", error);
    return { success: false, error: error.message };
  }
}


