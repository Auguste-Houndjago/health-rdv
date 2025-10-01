// src/services/users/getUserInfo.ts 
"use server"
import { createClient } from "@/utils/supabase/server"
import type { UserInfo } from "@/types/user"
import { jwtDecode } from "jwt-decode"
import { getUser, setUser } from "./lru-cache"

export async function getUserInfo(): Promise<Partial<UserInfo> | null> {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) return null

  const token: any = jwtDecode(session.access_token)
  const userId = token.sub

  // Check cache
  const cached = getUser(userId)
  if (cached) return cached

  // Build user info from token metadata
  const userMetadata = token.user_metadata || {}
  
  const userInfo: Partial<UserInfo> = {
    id: userId,
    email: token.email,
    role: userMetadata.role || "GUEST",
    nom: userMetadata.nom,
    prenom: userMetadata.prenom,
    avatar_url: userMetadata.avatar_url || "/avatar.png",
    telephone: userMetadata.telephone,
    function: userMetadata.function || "GUEST",
    hopital: userMetadata.hopital,
    hopitaux: userMetadata.hopitaux,
    
    // Informations spécifiques aux rôles
    medecin: userMetadata.medecin,
    patient: userMetadata.patient,
    
    invited_by: userMetadata.invited_by,
    status: userMetadata.status || "ACTIF",
    invitationToken: userMetadata.invitationToken,
    invitationType: userMetadata.invitationType,
    
    email_verified: userMetadata.email_verified || false,
    phone_verified: userMetadata.phone_verified || false,
  }

  // Store in cache
  setUser(userId, userInfo)
  return userInfo
}