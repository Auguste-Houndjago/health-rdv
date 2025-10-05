// src/services/users/getUserInfo.ts
"use server"
import { createClient } from "@/utils/supabase/server"
import type { UserInfo } from "@/types/user"
import { jwtDecode } from "jwt-decode"
import { getUser, setUser, removeUser } from "./lru-cache"

export interface GetUserInfoOptions {
  /**
   * cache = true (par défaut) : utiliser le cache si disponible
   * cache = false : ignorer complètement le cache (lecture et écriture)
   */
  cache?: boolean
  
  /**
   * refresh = true : forcer la récupération des données fraîches et mettre à jour le cache
   * refresh = false (défaut) : utiliser le cache si disponible
   * 
   * Note: si cache = false, cette option est ignorée
   */
  refresh?: boolean
}

/**
 * Récupère les informations utilisateur depuis Supabase Auth
 * Toujours à jour mais plus lent qu'une lecture du cache
 */
async function fetchUserFromSupabase(): Promise<Partial<UserInfo> | null> {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  const userMetadata = user.user_metadata || {}
  
  return {
    id: user.id,
    email: user.email,
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
}

/**
 * Récupère l'ID utilisateur depuis la session
 * Retourne null si pas de session
 */
async function getUserId(): Promise<string | null> {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.access_token) return null

  const token: any = jwtDecode(session.access_token)
  return token.sub
}

/**
 * Récupère les informations utilisateur avec gestion avancée du cache
 * 
 * @param options - Options de contrôle du cache
 * @returns Les informations utilisateur ou null
 * 
 * @example
 * ```typescript
 * // Utilisation par défaut (avec cache) - RAPIDE ⚡
 * const user = await getUserInfo()
 * 
 * // Forcer le refresh du cache - Met à jour les données
 * const freshUser = await getUserInfo({ refresh: true })
 * 
 * // Ignorer complètement le cache - Données toujours fraîches
 * const directUser = await getUserInfo({ cache: false })
 * ```
 */
export async function getUserInfo(
  options: GetUserInfoOptions = {}
): Promise<Partial<UserInfo> | null> {
  const { cache = true, refresh = false } = options
  
  // Récupérer l'ID utilisateur
  const userId = await getUserId()
  if (!userId) return null

  // CAS 1: Cache désactivé - aller directement à la source
  if (!cache) {
    return await fetchUserFromSupabase()
  }

  // CAS 2: Refresh forcé - récupérer les données fraîches et mettre à jour le cache
  if (refresh) {
    const freshUserInfo = await fetchUserFromSupabase()
    
    if (freshUserInfo) {
      // Mettre à jour le cache avec les nouvelles données
      setUser(userId, freshUserInfo)
    } else {
      // Si Supabase retourne null, invalider le cache
      removeUser(userId)
    }
    
    return freshUserInfo
  }

  // CAS 3: Utilisation normale du cache (mode par défaut - RAPIDE)
  const cached = getUser(userId)
  if (cached) {
    return cached
  }

  // Cache miss - récupérer depuis Supabase et mettre en cache
  const userInfo = await fetchUserFromSupabase()
  if (userInfo) {
    setUser(userId, userInfo)
  }
  
  return userInfo
}

/**
 * Alias pour l'utilisation par défaut avec cache
 * 
 * @example
 * ```typescript
 * // Dans ton middleware
 * const user = await getUserInfoCached()
 * ```
 */
export async function getUserInfoCached(): Promise<Partial<UserInfo> | null> {
  return getUserInfo({ cache: true, refresh: false })
}

/**
 * Récupère les données directement depuis Supabase (bypass cache)
 * 
 * @example
 * ```typescript
 * // Pour des vérifications critiques
 * const user = await getUserInfoDirect()
 * ```
 */
export async function getUserInfoDirect(): Promise<Partial<UserInfo> | null> {
  return getUserInfo({ cache: false })
}

/**
 * Force le refresh du cache avec les dernières données
 * 
 * @example
 * ```typescript
 * // Après une mise à jour de profil
 * await updateUserProfile(...)
 * const user = await getUserInfoRefresh()
 * ```
 */
export async function getUserInfoRefresh(): Promise<Partial<UserInfo> | null> {
  return getUserInfo({ cache: true, refresh: true })
}