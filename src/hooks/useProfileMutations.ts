//src/hooks/useProfileMutations
"use client"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { upsertIdentiteUtilisateur, upsertDateAvatar, upsertProfilUtilisateur } from "@/services/auth/profile/patient"
import type { Sexe, GroupeSanguin } from "@prisma/client"

export interface IdentitePayload {
  nom: string
  prenom?: string
  telephone?: string
}

export interface DateNaissancePayload {
  dateNaissance: string // ISO yyyy-mm-dd
  avatarUrl?: string
}

export interface ProfilPayload {
  sexe: Sexe
  groupeSanguin: GroupeSanguin
  adresse?: string
}

export interface SubmitAllPayload extends IdentitePayload, DateNaissancePayload, ProfilPayload {}

export function useProfileMutations(options?: {
  identite?: UseMutationOptions<any, unknown, IdentitePayload>
  naissance?: UseMutationOptions<any, unknown, DateNaissancePayload>
  profil?: UseMutationOptions<any, unknown, ProfilPayload>
  onAllSuccess?: () => void
  onAllError?: (error: unknown) => void
}) {
  const identiteMutation = useMutation({
    mutationKey: ["profile", "identite"],
    mutationFn: (payload: IdentitePayload) => upsertIdentiteUtilisateur(payload as any),
    ...options?.identite,
  })

  const naissanceMutation = useMutation({
    mutationKey: ["profile", "utilisateur"],
    mutationFn: (payload: DateNaissancePayload) => upsertDateAvatar(payload as any),
    ...options?.naissance,
  })

  const profilMutation = useMutation({
    mutationKey: ["profile", "patient"],
    mutationFn: (payload: ProfilPayload) => upsertProfilUtilisateur(payload as any),
    ...options?.profil,
  })

  const submitAll = async (payload: SubmitAllPayload) => {
    try {
      // Étape 1 – Identité (Utilisateur)
      await identiteMutation.mutateAsync({
        nom: payload.nom,
        prenom: payload.prenom,
        telephone: payload.telephone,
      })

      // Étape 2 – Profil utilisateur
      await naissanceMutation.mutateAsync({
        dateNaissance: payload.dateNaissance,
        avatarUrl: payload.avatarUrl,
      })

      // Étape 3 – Profil patient
      await profilMutation.mutateAsync({
        sexe: payload.sexe,
        groupeSanguin: payload.groupeSanguin,
        adresse: payload.adresse,
      })

      options?.onAllSuccess?.()
      return true
    } catch (error) {
      options?.onAllError?.(error)
      throw error
    }
  }

  return {
    identiteMutation,
    naissanceMutation,
    profilMutation,
    submitAll,
  }
} 