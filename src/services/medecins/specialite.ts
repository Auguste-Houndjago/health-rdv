"use server"

import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"

export interface SpecialiteMedecin {
  id: string
  nom: string
  description: string
  image?: string
  formation: string
  experience: number
  statut: 'ACTIVE' | 'EN_ATTENTE' | 'INACTIVE'
  patientsSuivis: number
  consultationsMois: number
  competences: string[]
}

export interface MedecinProfile {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  avatarUrl?: string
  dateNaissance?: string
  numLicence: string
  anneeExperience: number
  titre: string
  isDisponible: boolean
  statut: string
  specialite: {
    id: string
    nom: string
    description: string
    image?: string
  }
  hopitaux: Array<{
    id: string
    nom: string
    adresse: string
  }>
  createdAt: string
  updatedAt: string
}

/**
 * Obtenir la spécialité du médecin connecté
 */
export async function getSpecialiteMedecin() {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const medecin = await prisma.medecin.findUnique({
      where: { userId: user.id },
      include: {
        specialite: true,
        hopitaux: {
          include: {
            hopital: true
          }
        },
        rendezVous: {
          where: {
            statut: {
              in: ['CONFIRME', 'EN_ATTENTE']
            }
          },
          include: {
            patient: {
              include: {
                utilisateur: true
              }
            }
          }
        }
      }
    })

    if (!medecin) {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    // Calculer les statistiques
    const patientsUniques = new Set(medecin.rendezVous.map(rdv => rdv.patientId)).size
    const consultationsMois = medecin.rendezVous.filter(rdv => {
      const dateRdv = new Date(rdv.date)
      const maintenant = new Date()
      return dateRdv.getMonth() === maintenant.getMonth() && 
             dateRdv.getFullYear() === maintenant.getFullYear()
    }).length

    const specialiteData: SpecialiteMedecin = {
      id: medecin.specialite.id,
      nom: medecin.specialite.nom,
      description: medecin.specialite.description || '',
      image: medecin.specialite.image || undefined,
      formation: `DES ${medecin.specialite.nom} (4 ans)`,
      experience: medecin.anneeExperience || 1,
      statut: medecin.statut === 'APPROUVE' ? 'ACTIVE' : 'EN_ATTENTE',
      patientsSuivis: patientsUniques,
      consultationsMois: consultationsMois,
      competences: [
        "Diagnostic clinique",
        "Prescription médicale",
        "Suivi thérapeutique",
        "Éducation patient"
      ]
    }

    return {
      success: true,
      data: specialiteData
    }

  } catch (error) {
    console.error("Erreur lors de la récupération de la spécialité:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération de la spécialité"
    }
  }
}

/**
 * Obtenir le profil complet du médecin
 */
export async function getMedecinProfile() {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const medecin = await prisma.medecin.findUnique({
      where: { userId: user.id },
      include: {
        utilisateur: true,
        specialite: true,
        hopitaux: {
          include: {
            hopital: true
          }
        }
      }
    })

    if (!medecin) {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const profileData: MedecinProfile = {
      id: medecin.id,
      nom: medecin.utilisateur.nom,
      prenom: medecin.utilisateur.prenom || '',
      email: medecin.utilisateur.email,
      telephone: medecin.utilisateur.telephone || '',
      avatarUrl: medecin.utilisateur.avatarUrl || undefined,
      dateNaissance: medecin.utilisateur.dateNaissance?.toISOString().split('T')[0],
      numLicence: medecin.numLicence,
      anneeExperience: medecin.anneeExperience || 1,
      titre: medecin.titre,
      isDisponible: medecin.isDisponible,
      statut: medecin.statut,
      specialite: {
        id: medecin.specialite.id,
        nom: medecin.specialite.nom,
        description: medecin.specialite.description || '',
        image: medecin.specialite.image || undefined
      },
      hopitaux: medecin.hopitaux.map(mh => ({
        id: mh.hopital.id,
        nom: mh.hopital.nom,
        adresse: mh.hopital.adresse
      })),
      createdAt: medecin.utilisateur.createdAt.toISOString(),
      updatedAt: medecin.utilisateur.updatedAt.toISOString()
    }

    return {
      success: true,
      data: profileData
    }

  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération du profil"
    }
  }
}

/**
 * Mettre à jour le profil du médecin
 */
export async function updateMedecinProfile(data: {
  nom?: string
  prenom?: string
  telephone?: string
  dateNaissance?: string
  anneeExperience?: number
  titre?: string
  isDisponible?: boolean
}) {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    // Mettre à jour les informations utilisateur
    if (data.nom || data.prenom || data.telephone || data.dateNaissance) {
      await prisma.utilisateur.update({
        where: { id: user.id },
        data: {
          ...(data.nom && { nom: data.nom }),
          ...(data.prenom && { prenom: data.prenom }),
          ...(data.telephone && { telephone: data.telephone }),
          ...(data.dateNaissance && { dateNaissance: new Date(data.dateNaissance) })
        }
      })
    }

    // Mettre à jour les informations médecin
    if (data.anneeExperience || data.titre || data.isDisponible !== undefined) {
      await prisma.medecin.update({
        where: { userId: user.id },
        data: {
          ...(data.anneeExperience && { anneeExperience: data.anneeExperience }),
          ...(data.titre && { titre: data.titre }),
          ...(data.isDisponible !== undefined && { isDisponible: data.isDisponible })
        }
      })
    }

    return {
      success: true,
      message: "Profil mis à jour avec succès"
    }

  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error)
    return {
      success: false,
      error: "Erreur lors de la mise à jour du profil"
    }
  }
}
