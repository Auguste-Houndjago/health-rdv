// src/hooks/useProfileMutations.ts
"use client"

import { useMutation } from "@tanstack/react-query"
import { upsertIdentiteUtilisateur, upsertDateAvatar, upsertProfilUtilisateur } from "@/services/auth/profile/patient"
import { upsertProfilMedecin } from "@/services/auth/profile/medecin"
import type { Sexe, GroupeSanguin } from "@prisma/client"

type Role = 'PATIENT' | 'MEDECIN'

interface PatientPayload {
  role: 'PATIENT'
  nom: string
  prenom: string
  telephone?: string
  avatarUrl?: string
  dateNaissance: string
  sexe: Sexe
  groupeSanguin: GroupeSanguin
  adresse?: string
}

interface MedecinPayload {
  role: 'MEDECIN'
  nom: string
  prenom: string
  telephone?: string
  avatarUrl?: string
  dateNaissance: string
  specialiteId: string
  numLicence: string
  anneeExperience?: number
  titre: string
}

type Payload = PatientPayload | MedecinPayload

export function useProfileMutations(role: Role) {
  const identiteMutation = useMutation({
    mutationFn: async (data: { nom: string; prenom: string; telephone?: string }) => {
      return upsertIdentiteUtilisateur(data)
    },
  })

  const naissanceMutation = useMutation({
    mutationFn: async (data: { dateNaissance: string; avatarUrl?: string }) => {
      return upsertDateAvatar(data)
    },
  })

  const profilMutation = useMutation({
    mutationFn: async (data: any) => {
      if (role === 'PATIENT') {
        const { sexe, groupeSanguin, adresse } = data as PatientPayload
        return upsertProfilUtilisateur({ sexe, groupeSanguin, adresse })
      } else {
        const { specialiteId, numLicence, anneeExperience, titre } = data as MedecinPayload
        return upsertProfilMedecin({ specialiteId, numLicence, anneeExperience, titre })
      }
    },
  })

  const submitAll = async (payload: Payload) => {
    try {
      // Étape 1: Identité
      await identiteMutation.mutateAsync({
        nom: payload.nom,
        prenom: payload.prenom,
        telephone: payload.telephone,
      })

      // Étape 2: Date et avatar
      await naissanceMutation.mutateAsync({
        dateNaissance: payload.dateNaissance,
        avatarUrl: payload.avatarUrl,
      })

      // Étape 3: Profil spécifique
      await profilMutation.mutateAsync(payload)
    } catch (error) {
      console.error("Erreur lors de la soumission:", error)
      throw error
    }
  }

  return {
    submitAll,
    identiteMutation,
    naissanceMutation,
    profilMutation,
  }
}