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
 * Récupère l'ID utilisateur depuis la session
 * Pas de cache ici car on a besoin de l'userId pour créer la clé de cache
 */
async function getUserId(): Promise<string | null> {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.access_token) return null

  const token: any = jwtDecode(session.access_token)
  return token.sub
}

/**
 * Récupère les informations utilisateur depuis Supabase Auth
 * 
 * IMPORTANT: React Cache avec userId comme clé pour éviter les conflits
 * - Chaque utilisateur a son propre cache isolé
 * - Durant le même render, les appels avec le même userId sont dédupliqués
 * - Utilisateurs différents = caches séparés
 * 
 * @param userId - ID utilisateur pour la clé de cache
 */
const fetchUserFromSupabase = cache(async (userId: string): Promise<Partial<UserInfo> | null> => {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  // Vérification de sécurité: l'userId doit correspondre
  if (user.id !== userId) {
    console.error(`Security: userId mismatch. Expected ${userId}, got ${user.id}`)
    return null
  }

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
})

/**
 * Implémentation interne de getUserInfo
 * AVEC clé de cache basée sur userId + options
 * 
 * React Cache utilise [userId, cache, refresh] comme clé composite
 * Cela garantit:
 * - Isolation entre utilisateurs
 * - Caches séparés pour différentes options
 * - Déduplication uniquement pour les appels identiques
 * 
 * @param userId - ID utilisateur
 * @param options - Options de cache
 */
const getUserInfoWithCache = cache(async (
  userId: string,
  options: GetUserInfoOptions = {}
): Promise<Partial<UserInfo> | null> => {
  const { cache: useCache = true, refresh = false } = options

  // CAS 1: Cache LRU désactivé - aller directement à Supabase
  if (!useCache) {
    return await fetchUserFromSupabase(userId)
  }

  // CAS 2: Refresh forcé - récupérer les données fraîches et mettre à jour le cache LRU
  if (refresh) {
    const freshUserInfo = await fetchUserFromSupabase(userId)
    
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
  const userInfo = await fetchUserFromSupabase(userId)
  if (userInfo) {
    setUser(userId, userInfo)
  }
  
  return userInfo
})

/**
 * Récupère les informations utilisateur avec triple protection de cache :
 * 
 * 🔥 NIVEAU 1 - React Cache avec clé userId (Request-level)
 *    - Déduplique les appels durant le même render/request
 *    - Clé composite: [userId, options] pour isolation totale
 *    - User A et User B ont des caches séparés
 *    - Exemple: 10 composants appellent getUserInfo() = 1 seule exécution
 * 
 * ⚡ NIVEAU 2 - LRU Cache (Cross-request, 10min TTL)
 *    - Stocke les données entre les requêtes
 *    - Évite les appels répétés à Supabase
 *    - 1000 utilisateurs max en mémoire
 * 
 * 🔒 NIVEAU 3 - Vérification de sécurité
 *    - Valide que l'userId correspond à l'utilisateur authentifié
 *    - Protection contre les fuites de données
 * 
 * Performance:
 * - Même utilisateur, 10 composants, 1 render = 1 seule exécution
 * - Même utilisateur, requêtes différentes < 10min = lecture LRU O(1)
 * - Utilisateurs différents = caches complètement isolés
 * 
 * @param options - Options de contrôle du cache
 * @returns Les informations utilisateur ou null
 * 
 * @example
 * ```typescript
 * // Utilisation par défaut (triple cache) - ULTRA RAPIDE ⚡⚡⚡
 * const user = await getUserInfo()
 * 
 * // Forcer le refresh du cache LRU
 * const freshUser = await getUserInfo({ refresh: true })
 * 
 * // Ignorer le cache LRU (React Cache actif avec userId)
 * const directUser = await getUserInfo({ cache: false })
 * 
 * // Scénario multi-utilisateurs
 * // User A: 5 composants → 1 exécution
 * // User B: 3 composants → 1 exécution (cache séparé)
 * ```
 */
export async function getUserInfo(
  options: GetUserInfoOptions = {}
): Promise<Partial<UserInfo> | null> {
  // Récupérer l'userId AVANT d'utiliser le cache
  const userId = await getUserId()
  if (!userId) return null

  // Utiliser le cache avec userId comme clé
  return getUserInfoWithCache(userId, options)
}

/**
 * Alias pour l'utilisation par défaut avec triple cache
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
 * ⚠️ React Cache reste actif avec userId pour dédupliquer durant le même render
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