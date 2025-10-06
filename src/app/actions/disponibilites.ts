"use server"

import { validerCreneauxDisponibilite } from '@/services/validation'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface CreneauDisponibilite {
  jour: string
  heureDebut: string
  heureFin: string
  dureeConsultation: number
  pauseEntreConsultations?: number
  actif?: boolean
}

export interface PlanningDisponibilite {
  medecinId: string
  specialiteId: string
  creneaux: CreneauDisponibilite[]
  dateDebut: string
  dateFin?: string
}

export async function creerPlanningDisponibilite(formData: FormData) {
  try {
    const data = {
      medecinId: formData.get('medecinId') as string,
      specialiteId: formData.get('specialiteId') as string,
      creneaux: JSON.parse(formData.get('creneaux') as string),
      dateDebut: formData.get('dateDebut') as string,
      dateFin: formData.get('dateFin') as string || undefined
    }

    // Validation des données
    const result = validerCreneauxDisponibilite(data)
    
    if (!result.success) {
      return {
        success: false,
        errors: result.issues.map(issue => issue.message)
      }
    }

    // Ici vous pouvez ajouter la logique de sauvegarde en base de données
    // Par exemple avec Prisma :
    // const planning = await prisma.planningDisponibilite.create({
    //   data: {
    //     medecinId: data.medecinId,
    //     specialiteId: data.specialiteId,
    //     dateDebut: new Date(data.dateDebut),
    //     dateFin: data.dateFin ? new Date(data.dateFin) : null,
    //     creneaux: {
    //       create: data.creneaux.map(creneau => ({
    //         jour: creneau.jour,
    //         heureDebut: creneau.heureDebut,
    //         heureFin: creneau.heureFin,
    //         dureeConsultation: creneau.dureeConsultation,
    //         pauseEntreConsultations: creneau.pauseEntreConsultations,
    //         actif: creneau.actif
    //       }))
    //     }
    //   }
    // })

    console.log("Planning de disponibilité créé:", result.output)
    
    // Revalider le cache pour mettre à jour l'interface
    revalidatePath('/medecin/disponibilites')
    
    return {
      success: true,
      message: "Planning de disponibilité créé avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la création du planning:", error)
    return {
      success: false,
      errors: ["Erreur lors de la sauvegarde du planning"]
    }
  }
}

export async function modifierPlanningDisponibilite(planningId: string, formData: FormData) {
  try {
    const data = {
      medecinId: formData.get('medecinId') as string,
      specialiteId: formData.get('specialiteId') as string,
      creneaux: JSON.parse(formData.get('creneaux') as string),
      dateDebut: formData.get('dateDebut') as string,
      dateFin: formData.get('dateFin') as string || undefined
    }

    // Validation des données
    const result = validerCreneauxDisponibilite(data)
    
    if (!result.success) {
      return {
        success: false,
        errors: result.issues.map(issue => issue.message)
      }
    }

    // Logique de mise à jour en base de données
    // const planning = await prisma.planningDisponibilite.update({
    //   where: { id: planningId },
    //   data: {
    //     dateDebut: new Date(data.dateDebut),
    //     dateFin: data.dateFin ? new Date(data.dateFin) : null,
    //     creneaux: {
    //       deleteMany: {},
    //       create: data.creneaux.map(creneau => ({
    //         jour: creneau.jour,
    //         heureDebut: creneau.heureDebut,
    //         heureFin: creneau.heureFin,
    //         dureeConsultation: creneau.dureeConsultation,
    //         pauseEntreConsultations: creneau.pauseEntreConsultations,
    //         actif: creneau.actif
    //       }))
    //     }
    //   }
    // })

    console.log("Planning de disponibilité modifié:", result.output)
    
    revalidatePath('/medecin/disponibilites')
    
    return {
      success: true,
      message: "Planning de disponibilité modifié avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la modification du planning:", error)
    return {
      success: false,
      errors: ["Erreur lors de la mise à jour du planning"]
    }
  }
}

export async function supprimerPlanningDisponibilite(planningId: string) {
  try {
    // Logique de suppression en base de données
    // await prisma.planningDisponibilite.delete({
    //   where: { id: planningId }
    // })

    console.log("Planning de disponibilité supprimé:", planningId)
    
    revalidatePath('/medecin/disponibilites')
    
    return {
      success: true,
      message: "Planning de disponibilité supprimé avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la suppression du planning:", error)
    return {
      success: false,
      errors: ["Erreur lors de la suppression du planning"]
    }
  }
}

export async function obtenirPlanningDisponibilite(medecinId: string) {
  try {
    // Logique de récupération en base de données
    // const planning = await prisma.planningDisponibilite.findFirst({
    //   where: { medecinId },
    //   include: {
    //     creneaux: true
    //   },
    //   orderBy: { createdAt: 'desc' }
    // })

    // Pour l'instant, retourner des données vides
    return {
      success: true,
      data: null
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération du planning:", error)
    return {
      success: false,
      errors: ["Erreur lors de la récupération du planning"]
    }
  }
}
