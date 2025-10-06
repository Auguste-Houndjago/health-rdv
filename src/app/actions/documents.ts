"use server"

import { getUserInfo } from '@/services/users'
import { revalidatePath } from 'next/cache'

export interface Document {
  id: string
  nom: string
  type: 'PRESCRIPTION' | 'ORDONNANCE' | 'CERTIFICAT' | 'RAPPORT' | 'AUTRE'
  patientId: string
  medecinId: string
  dateCreation: string
  contenu: string
  statut: 'BROUILLON' | 'FINALISE' | 'SIGNE'
  taille: number
  url?: string
}

export async function obtenirDocumentsMedecin() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer les documents depuis la base de données
    // const documents = await prisma.document.findMany({
    //   where: { medecinId: user.id },
    //   include: {
    //     patient: true
    //   },
    //   orderBy: { dateCreation: 'desc' }
    // })

    const documents: Document[] = []

    return {
      success: true,
      data: documents
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des documents"
    }
  }
}

export async function creerDocument(formData: FormData) {
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
      type: formData.get('type') as string,
      patientId: formData.get('patientId') as string,
      medecinId: user.id,
      contenu: formData.get('contenu') as string,
      statut: 'BROUILLON'
    }

    // Validation des données
    if (!data.nom || !data.type || !data.patientId || !data.contenu) {
      return {
        success: false,
        error: "Tous les champs obligatoires doivent être remplis"
      }
    }

    // Ici vous pouvez ajouter la logique pour créer le document en base de données
    // const document = await prisma.document.create({
    //   data: {
    //     nom: data.nom,
    //     type: data.type,
    //     patientId: data.patientId,
    //     medecinId: data.medecinId,
    //     contenu: data.contenu,
    //     statut: data.statut,
    //     dateCreation: new Date(),
    //     taille: data.contenu.length
    //   }
    // })

    console.log("Document créé:", data)
    
    revalidatePath('/medecin/documents')
    
    return {
      success: true,
      message: "Document créé avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la création du document:", error)
    return {
      success: false,
      error: "Erreur lors de la création du document"
    }
  }
}

export async function finaliserDocument(documentId: string) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour finaliser le document en base de données
    // const document = await prisma.document.update({
    //   where: { 
    //     id: documentId,
    //     medecinId: user.id
    //   },
    //   data: {
    //     statut: 'FINALISE'
    //   }
    // })

    console.log("Document finalisé:", documentId)
    
    revalidatePath('/medecin/documents')
    
    return {
      success: true,
      message: "Document finalisé avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la finalisation du document:", error)
    return {
      success: false,
      error: "Erreur lors de la finalisation du document"
    }
  }
}
