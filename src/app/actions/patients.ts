"use server"

import { getUserInfo } from '@/services/users'
import { revalidatePath } from 'next/cache'

export interface Patient {
  id: string
  nom: string
  prenom: string
  telephone: string
  email: string
  dateNaissance: string
  adresse: string
  ville: string
  codePostal: string
  medecinId: string
  statut: 'ACTIF' | 'INACTIF' | 'EN_ATTENTE'
  derniereVisite?: string
  maladie?: string
  notes?: string
}

export async function obtenirPatientsMedecin() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer les patients depuis la base de données
    // const patients = await prisma.patient.findMany({
    //   where: { medecinId: user.id },
    //   include: {
    //     derniereConsultation: true
    //   },
    //   orderBy: { nom: 'asc' }
    // })

    const patients: Patient[] = []

    return {
      success: true,
      data: patients
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des patients:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des patients"
    }
  }
}

export async function creerPatient(formData: FormData) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    const data = {
      nom: formData.get('nom') as string,
      prenom: formData.get('prenom') as string,
      telephone: formData.get('telephone') as string,
      email: formData.get('email') as string,
      dateNaissance: formData.get('dateNaissance') as string,
      adresse: formData.get('adresse') as string,
      ville: formData.get('ville') as string,
      codePostal: formData.get('codePostal') as string,
      medecinId: user.id,
      notes: formData.get('notes') as string
    }

    // Validation des données
    if (!data.nom || !data.prenom || !data.telephone || !data.email) {
      return {
        success: false,
        error: "Tous les champs obligatoires doivent être remplis"
      }
    }

    // Ici vous pouvez ajouter la logique pour créer le patient en base de données
    // const patient = await prisma.patient.create({
    //   data: {
    //     nom: data.nom,
    //     prenom: data.prenom,
    //     telephone: data.telephone,
    //     email: data.email,
    //     dateNaissance: new Date(data.dateNaissance),
    //     adresse: data.adresse,
    //     ville: data.ville,
    //     codePostal: data.codePostal,
    //     medecinId: data.medecinId,
    //     notes: data.notes,
    //     statut: 'ACTIF'
    //   }
    // })

    console.log("Patient créé:", data)
    
    revalidatePath('/medecin/patients')
    
    return {
      success: true,
      message: "Patient créé avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la création du patient:", error)
    return {
      success: false,
      error: "Erreur lors de la création du patient"
    }
  }
}

export async function modifierPatient(patientId: string, formData: FormData) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    const data = {
      nom: formData.get('nom') as string,
      prenom: formData.get('prenom') as string,
      telephone: formData.get('telephone') as string,
      email: formData.get('email') as string,
      dateNaissance: formData.get('dateNaissance') as string,
      adresse: formData.get('adresse') as string,
      ville: formData.get('ville') as string,
      codePostal: formData.get('codePostal') as string,
      statut: formData.get('statut') as string,
      notes: formData.get('notes') as string
    }

    // Validation des données
    if (!data.nom || !data.prenom || !data.telephone || !data.email) {
      return {
        success: false,
        error: "Tous les champs obligatoires doivent être remplis"
      }
    }

    // Ici vous pouvez ajouter la logique pour mettre à jour le patient en base de données
    // const patient = await prisma.patient.update({
    //   where: { 
    //     id: patientId,
    //     medecinId: user.id
    //   },
    //   data: {
    //     nom: data.nom,
    //     prenom: data.prenom,
    //     telephone: data.telephone,
    //     email: data.email,
    //     dateNaissance: new Date(data.dateNaissance),
    //     adresse: data.adresse,
    //     ville: data.ville,
    //     codePostal: data.codePostal,
    //     statut: data.statut,
    //     notes: data.notes
    //   }
    // })

    console.log("Patient modifié:", data)
    
    revalidatePath('/medecin/patients')
    
    return {
      success: true,
      message: "Patient modifié avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la modification du patient:", error)
    return {
      success: false,
      error: "Erreur lors de la modification du patient"
    }
  }
}

export async function supprimerPatient(patientId: string) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour supprimer le patient en base de données
    // await prisma.patient.delete({
    //   where: { 
    //     id: patientId,
    //     medecinId: user.id
    //   }
    // })

    console.log("Patient supprimé:", patientId)
    
    revalidatePath('/medecin/patients')
    
    return {
      success: true,
      message: "Patient supprimé avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la suppression du patient:", error)
    return {
      success: false,
      error: "Erreur lors de la suppression du patient"
    }
  }
}

export async function obtenirStatistiquesPatients() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour calculer les statistiques des patients
    // const stats = await prisma.patient.aggregate({
    //   where: { medecinId: user.id },
    //   _count: {
    //     id: true
    //   }
    // })

    const stats = {
      totalPatients: 0,
      patientsActifs: 0,
      patientsInactifs: 0,
      nouveauxPatients: 0
    }

    return {
      success: true,
      data: stats
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques des patients:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques des patients"
    }
  }
}
