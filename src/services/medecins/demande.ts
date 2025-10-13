"use server"

import { prisma } from "@/lib/prisma";
import { getUserInfo } from "@/services/users";
import { StatutDemande } from "@prisma/client";
import { sendDemandeHopitalCreatedNotification, sendDemandeHopitalApprouveeNotification, sendDemandeHopitalRefuseeNotification } from "@/services/notifications";

export interface DemandeHopitalPayload {
  id: string;
  medecinId: string;
  hopitalId: string;
  statut: StatutDemande;
  message?: string;
  dateDemande: Date;
  dateReponse?: Date;
  reponse?: string;
  hopital: {
    id: string;
    nom: string;
    adresse: string;
    contact: string;
  };
  medecin: {
    id: string;
    numLicence: string;
    titre: string;
    utilisateur: {
      nom: string;
      prenom: string;
      email: string;
    };
  };
}

/**
 * Créer une nouvelle demande d'hôpital
 */
export async function creerDemandeHopital({
  hopitalId,
  message,
}: {
  hopitalId: string;
  message?: string;
}) {
  try {
    const user = await getUserInfo();
    
    if (user?.role !== "MEDECIN") {
        return {
          success: false,
          error: `Profil médecin non trouvé ${user?.role}`
        };
      }

    // Vérifier si une demande existe déjà pour ce médecin et cet hôpital
    const demandeExistante = await prisma.demandeHopital.findUnique({
      where: {
        medecinId_hopitalId: {
          medecinId: user.id,
          hopitalId: hopitalId
        }
      }
    });

    if (demandeExistante) {
      return {
        success: false,
        error: "Une demande a déjà été envoyée à cet hôpital"
      };
    }

    // Vérifier que l'hôpital existe
    const hopital = await prisma.hopital.findUnique({
      where: { id: hopitalId }
    });

    if (!hopital) {
      return {
        success: false,
        error: "Hôpital non trouvé"
      };
    }

    const demande = await prisma.demandeHopital.create({
      data: {
        medecinId: user.id,
        hopitalId: hopitalId,
        message: message,
        statut: "EN_ATTENTE"
      },
      include: {
        hopital: {
          select: {
            id: true,
            nom: true,
            adresse: true,
            contact: true
          }
        },
        medecin: {
          select: {
            id: true,
            numLicence: true,
            titre: true,
            anneeExperience: true,
            specialite: {
              select: {
                nom: true
              }
            },
            utilisateur: {
              select: {
                nom: true,
                prenom: true,
                email: true,
                telephone: true
              }
            }
          }
        }
      }
    });

    // Récupérer l'email de l'admin
    try {
      const admin = await prisma.utilisateur.findFirst({
        where: { role: "ADMIN" },
        select: { email: true }
      });

      if (admin?.email) {
        // Envoyer la notification à l'admin
        await sendDemandeHopitalCreatedNotification(
          {
            id: demande.id,
            dateDemande: demande.dateDemande,
            message: demande.message || undefined,
            medecin: {
              nom: demande.medecin.utilisateur.nom,
              prenom: demande.medecin.utilisateur.prenom || '',
              email: demande.medecin.utilisateur.email,
              titre: demande.medecin.titre || undefined,
              numLicence: demande.medecin.numLicence,
              specialite: demande.medecin.specialite?.nom || undefined,
              anneeExperience: demande.medecin.anneeExperience || undefined,
              telephone: demande.medecin.utilisateur.telephone || undefined
            },
            hopital: {
              nom: demande.hopital.nom,
              adresse: demande.hopital.adresse
            }
          },
          admin.email
        );
      }
    } catch (emailError) {
      console.error("⚠️ Erreur lors de l'envoi de l'email à l'admin:", emailError);
      // On ne bloque pas la création de la demande si l'email échoue
    }

    return {
      success: true,
      data: demande
    };

  } catch (error) {
    console.error("Erreur lors de la création de la demande:", error);
    return {
      success: false,
      error: "Erreur lors de la création de la demande"
    };
  }
}

/**
 * Récupérer les demandes d'un médecin
 */
export async function getDemandesMedecin() {
  try {
    const user = await getUserInfo();
    
    if (user?.role !== "MEDECIN") {
        return {
          success: false,
          error: `Profil médecin non trouvé ${user.role}`
        };
      }

    const demandes = await prisma.demandeHopital.findMany({
      where: {
        medecinId: user.id
      },
      include: {
        hopital: {
          select: {
            id: true,
            nom: true,
            adresse: true,
            contact: true,
            slug: true
          }
        }
      },
      orderBy: {
        dateDemande: "desc"
      }
    });

    return {
      success: true,
      data: demandes
    };

  } catch (error) {
    console.error("Erreur lors de la récupération des demandes:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des demandes"
    };
  }
}

/**
 * Récupérer le statut d'une demande pour un hôpital spécifique
 */
export async function getStatutDemandeHopital(hopitalId: string) {
  try {
    const user = await getUserInfo();
    
    if (user?.role !== "MEDECIN") {
        return {
          success: false,
          error: `Profil médecin non trouvé ${user.role}`
        };
      }

    const demande = await prisma.demandeHopital.findUnique({
      where: {
        medecinId_hopitalId: {
          medecinId: user.id,
          hopitalId: hopitalId
        }
      },
      include: {
        hopital: {
          select: {
            id: true,
            nom: true,
            adresse: true,
            contact: true
          }
        }
      }
    });

    return {
      success: true,
      data: demande
    };

  } catch (error) {
    console.error("Erreur lors de la récupération du statut de la demande:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération du statut de la demande"
    };
  }
}

/**
 * Annuler une demande d'hôpital
 */
export async function annulerDemandeHopital(hopitalId: string) {
  try {
    const user = await getUserInfo();
    
    if (user?.role !== "MEDECIN") {
        return {
          success: false,
          error: `Profil médecin non trouvé ${user.role}`
        };
      }

    const demande = await prisma.demandeHopital.findUnique({
      where: {
        medecinId_hopitalId: {
          medecinId: user.id,
          hopitalId: hopitalId
        }
      }
    });

    if (!demande) {
      return {
        success: false,
        error: "Demande non trouvée"
      };
    }

    if (demande.statut !== "EN_ATTENTE") {
      return {
        success: false,
        error: "Impossible d'annuler une demande déjà traitée"
      };
    }

    await prisma.demandeHopital.delete({
      where: {
        id: demande.id
      }
    });

    return {
      success: true,
      data: "Demande annulée avec succès"
    };

  } catch (error) {
    console.error("Erreur lors de l'annulation de la demande:", error);
    return {
      success: false,
      error: "Erreur lors de l'annulation de la demande"
    };
  }
}

/**
 * Récupérer toutes les demandes d'un hôpital (pour les administrateurs)
 */
export async function getDemandesHopital(hopitalId?: string) {
  try {
    const user = await getUserInfo();
    
    // if (user?.role !== "ADMIN") {
    //   return {
    //     success: false,
    //     error: "Accès non autorisé"
    //   };
    // }

    // Si aucun hopitalId fourni, récupérer toutes les demandes
    const whereClause = hopitalId ? { hopitalId } : {};

    const demandes = await prisma.demandeHopital.findMany({
      where: whereClause,
      include: {
        medecin: {
          select: {
            id: true,
            numLicence: true,
            titre: true,
            anneeExperience: true,
            utilisateur: {
              select: {
                nom: true,
                prenom: true,
                email: true,
                telephone: true
              }
            },
            specialite: {
              select: {
                nom: true
              }
            }
          }
        },
        hopital: {
          select: {
            id: true,
            nom: true,
            adresse: true
          }
        }
      },
      orderBy: {
        dateDemande: "desc"
      }
    });

    return {
      success: true,
      data: demandes
    };

  } catch (error) {
    console.error("Erreur lors de la récupération des demandes de l'hôpital:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des demandes de l'hôpital"
    };
  }
}


export async function addHopitalToMedecin(medecinId: string, hopitalId: string) {
  try {
    const liaison = await prisma.medecinHopital.create({
      data: {
        medecinId: medecinId,
        hopitalId: hopitalId
      }
    });

    return liaison;
  } catch (error) {
    console.error("Erreur:", error);
    throw new Error("Impossible d'ajouter l'hôpital au médecin");
  }
}
/**
 * Mettre à jour le statut d'une demande (pour les administrateurs)
 */
export async function mettreAJourStatutDemande({
  demandeId,
  statut,
  reponse
}: {
  demandeId: string;
  statut: StatutDemande;
  reponse?: string;
}) {
  try {
    const user = await getUserInfo();
    
    // Vérification des permissions (à décommenter si nécessaire)
    if (user?.role !== "ADMIN") {
      return { success: false, error: "Accès non autorisé" };
    }

    const adminId = user?.id;
    // Utilisation d'une transaction pour plus de sécurité
    const result = await prisma.$transaction(async (tx) => {
      // 1. Mettre à jour la demande
      const demande = await tx.demandeHopital.update({
        where: { id: demandeId },
        data: {
          statut: statut,
          reponse: reponse,
          dateReponse: new Date()
        },
        include: {
          medecin: {
            select: {
              id: true,
              numLicence: true,
              titre: true,
              utilisateur: {
                select: {
                  email: true,
                  nom: true,
                  prenom: true
                }
              }
            }
          },
          hopital: {
            select: { 
              nom: true,
              adresse: true
            }
          }
        }
      });

      // 2. Créer la liaison seulement si la demande est approuvée
      if (statut === 'APPROUVE') {
        await tx.medecinHopital.create({
          data: {
            medecinId: demande.medecinId,
            hopitalId: demande.hopitalId
          }
        });
      }

      return demande;
    });

    // Envoyer une notification au médecin selon le statut
    try {
      if (statut === 'APPROUVE') {
        await sendDemandeHopitalApprouveeNotification({
          id: result.id,
          dateDemande: result.dateDemande,
          statut: result.statut,
          reponse: result.reponse || undefined,
          medecin: {
            nom: result.medecin.utilisateur.nom,
            prenom: result.medecin.utilisateur.prenom || '',
            email: result.medecin.utilisateur.email,
            numLicence: result.medecin.numLicence
          },
          hopital: {
            nom: result.hopital.nom,
            adresse: result.hopital.adresse
          }
        });
      } else if (statut === 'REJETE') {
        await sendDemandeHopitalRefuseeNotification({
          id: result.id,
          dateDemande: result.dateDemande,
          statut: result.statut,
          reponse: result.reponse || undefined,
          medecin: {
            nom: result.medecin.utilisateur.nom,
            prenom: result.medecin.utilisateur.prenom || '',
            email: result.medecin.utilisateur.email,
            numLicence: result.medecin.numLicence
          },
          hopital: {
            nom: result.hopital.nom,
            adresse: result.hopital.adresse
          }
        });
      }
    } catch (emailError) {
      console.error("⚠️ Erreur lors de l'envoi de l'email au médecin:", emailError);
      // On ne bloque pas la mise à jour si l'email échoue
    }

    return {
      success: true,
      data: result
    };

  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return {
      success: false,
      error: "Erreur lors de la mise à jour du statut"
    };
  }
}