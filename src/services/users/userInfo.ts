// src/services/users/getUserInfo.ts
"use server"
import { cache } from "react"
import { createClient } from "@/utils/supabase/server"
import type { UserInfo } from "@/types/user"
import { jwtDecode } from "jwt-decode"
import { getUser, setUser, removeUser } from "./lru-cache"

export interface GetUserInfoOptions {
  /**
   * cache = true (par défaut) : utiliser le cache LRU si disponible
   * cache = false : ignorer complètement le cache LRU (lecture et écriture)
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
 * Toujours à jour mais plus lent qu'une lecture du cache LRU
 * 
 * Gère silencieusement les erreurs d'authentification (utilisateurs déconnectés)
 */
const fetchUserFromSupabase = cache(async (): Promise<Partial<UserInfo> | null> => {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    // Ignorer silencieusement les erreurs d'auth (token invalide, expiré, etc.)
    if (error) {
      // Log uniquement en dev si ce n'est pas une erreur blocante
      // if (process.env.NODE_ENV === 'development' && error.status !== 400) {
      //   console.warn('[getUserInfo] Supabase auth error:', error.message)
      // }
      return null
    }
    
    if (!user) return null

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
  } catch (error) { // <-- AJOUT DE CETTE LIGNE MANQUANTE
    // Gestion des erreurs inattendues
    if (process.env.NODE_ENV === 'development') {
      console.warn('[getUserInfo] Unexpected error in fetchUserFromSupabase:', error)
    }
    return null
  }
})

/**
 * Récupère l'ID utilisateur depuis la session
 * Dédupliqué automatiquement par React Cache durant le même render
 * 
 * Retourne null silencieusement si pas de session (utilisateur déconnecté)
 */
const getUserId = cache(async (): Promise<string | null> => {
  try {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    
    // Pas de session = utilisateur déconnecté (normal)
    if (error || !session?.access_token) return null

    const token: any = jwtDecode(session.access_token)
    return token.sub
  } catch (error) {
    // Erreur de décodage JWT ou autre
    if (process.env.NODE_ENV === 'development') {
      console.warn('[getUserInfo] Error getting user ID:', error)
    }
    return null
  }
})

/**
 * Implémentation interne de getUserInfo (non cachée par React)
 * Permet de gérer les options cache et refresh correctement
 */
async function getUserInfoInternal(
  options: GetUserInfoOptions = {}
): Promise<Partial<UserInfo> | null> {
  const { cache = true, refresh = false } = options
  
  // Récupérer l'ID utilisateur (dédupliqué par React Cache)
  const userId = await getUserId()
  if (!userId) return null

  // CAS 1: Cache LRU désactivé - aller directement à Supabase
  if (!cache) {
    return await fetchUserFromSupabase()
  }

  // CAS 2: Refresh forcé - récupérer les données fraîches et mettre à jour le cache LRU
  if (refresh) {
    const freshUserInfo = await fetchUserFromSupabase()
    
    if (freshUserInfo) {
      // Mettre à jour le cache LRU avec les nouvelles données
      setUser(userId, freshUserInfo)
    } else {
      // Si Supabase retourne null, invalider le cache LRU
      removeUser(userId)
    }
    
    return freshUserInfo
  }

  // CAS 3: Utilisation normale du cache LRU (mode par défaut - ULTRA RAPIDE ⚡)
  const cached = getUser(userId)
  if (cached) {
    return cached
  }

  // Cache miss - récupérer depuis Supabase et mettre en cache LRU
  const userInfo = await fetchUserFromSupabase()
  if (userInfo) {
    setUser(userId, userInfo)
  }
  
  return userInfo
}

/**
 * Récupère les informations utilisateur avec double cache stratégique :
 * 
 * 🔥 NIVEAU 1 - React Cache (Request-level)
 *    Déduplique les appels durant le même render/request
 *    Si Header.tsx + Sidebar.tsx appellent getUserInfo(), 
 *    seul 1 appel sera réellement exécuté
 * 
 * ⚡ NIVEAU 2 - LRU Cache (Cross-request)
 *    Stocke les données entre les requêtes (10 min TTL)
 *    Évite les appels répétés à Supabase
 * 
 * Performance:
 * - Même composant appelé 10x dans 1 render = 1 seule exécution
 * - Requêtes différentes dans les 10min = lecture LRU O(1)
 * - Après 10min = 1 appel Supabase puis cache LRU
 * 
 * @param options - Options de contrôle du cache
 * @returns Les informations utilisateur ou null
 * 
 * @example
 * ```typescript
 * // Utilisation par défaut (double cache) - ULTRA RAPIDE ⚡⚡
 * const user = await getUserInfo()
 * 
 * // Forcer le refresh du cache LRU
 * const freshUser = await getUserInfo({ refresh: true })
 * 
 * // Ignorer le cache LRU (React Cache actif quand même)
 * const directUser = await getUserInfo({ cache: false })
 * ```
 */
export const getUserInfo = cache(getUserInfoInternal)

/**
 * Alias pour l'utilisation par défaut avec double cache
 * 
 * @example
 * ```typescript
 * // Dans ton middleware ou layout
 * const user = await getUserInfoCached()
 * ```
 */
export async function getUserInfoCached(): Promise<Partial<UserInfo> | null> {
  return getUserInfo({ cache: true, refresh: false })
}

/**
 * Récupère les données directement depuis Supabase (bypass cache LRU)
 * ⚠️ React Cache reste actif pour dédupliquer durant le même render
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
 * Force le refresh du cache LRU avec les dernières données
 * React Cache évite les appels multiples durant le même render
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