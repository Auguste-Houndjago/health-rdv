"use server"

import { prisma } from "@/lib/prisma";
import { getUserInfo } from "@/services/users";
// Types pour les jours de la semaine
type JourSemaine = "LUNDI" | "MARDI" | "MERCREDI" | "JEUDI" | "VENDREDI" | "SAMEDI" | "DIMANCHE";

export interface CreneauDisponibiliteInput {
  jour: JourSemaine;
  heureDebut: string;
  heureFin: string;
  dureeConsultation: number;
  pauseEntreConsultations: number;
  actif: boolean;
}

export interface PlanningDisponibiliteInput {
  hopitalId?: string;
  dateDebut: string;
  dateFin?: string;
  creneaux: CreneauDisponibiliteInput[];
}

/**
 * Créer un planning de disponibilité
 */
export async function creerPlanningDisponibilite(data: PlanningDisponibiliteInput) {
  try {
    const user = await getUserInfo();
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      };
    }

    // Vérifier que l'hôpital existe si spécifié
    if (data.hopitalId) {
      const hopital = await prisma.hopital.findUnique({
        where: { id: data.hopitalId }
      });

      if (!hopital) {
        return {
          success: false,
          error: "Hôpital non trouvé"
        };
      }
    }

    // Créer le planning avec les créneaux
    const planning = await prisma.planningDisponibilite.create({
      data: {
        medecinId: user.id,
        hopitalId: data.hopitalId,
        dateDebut: new Date(data.dateDebut),
        dateFin: data.dateFin ? new Date(data.dateFin) : null,
        actif: true,
        creneaux: {
          create: data.creneaux.map(creneau => ({
            jour: creneau.jour,
            heureDebut: creneau.heureDebut,
            heureFin: creneau.heureFin,
            dureeConsultation: creneau.dureeConsultation,
            pauseEntreConsultations: creneau.pauseEntreConsultations,
            actif: creneau.actif
          }))
        }
      },
      include: {
        creneaux: true,
        hopital: {
          select: {
            id: true,
            nom: true,
            adresse: true
          }
        }
      }
    });

    return {
      success: true,
      data: planning
    };

  } catch (error) {
    console.error("Erreur lors de la création du planning:", error);
    return {
      success: false,
      error: "Erreur lors de la création du planning"
    };
  }
}

/**
 * Récupérer les plannings de disponibilité d'un médecin
 */
export async function getPlanningsDisponibilite(medecinId?: string) {
  try {
    const user = await getUserInfo();
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      };
    }

    const targetMedecinId = medecinId || user.id;

    const plannings = await prisma.planningDisponibilite.findMany({
      where: {
        medecinId: targetMedecinId,
        actif: true
      },
      include: {
        creneaux: {
          where: { actif: true },
          orderBy: [
            { jour: 'asc' },
            { heureDebut: 'asc' }
          ]
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
        dateDebut: 'desc'
      }
    });

    return {
      success: true,
      data: plannings
    };

  } catch (error) {
    console.error("Erreur lors de la récupération des plannings:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des plannings"
    };
  }
}

/**
 * Modifier un planning de disponibilité
 */
export async function modifierPlanningDisponibilite(
  planningId: string, 
  data: PlanningDisponibiliteInput
) {
  try {
    const user = await getUserInfo();
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      };
    }

    // Vérifier que le planning appartient au médecin
    const existingPlanning = await prisma.planningDisponibilite.findFirst({
      where: {
        id: planningId,
        medecinId: user.id
      }
    });

    if (!existingPlanning) {
      return {
        success: false,
        error: "Planning non trouvé ou accès non autorisé"
      };
    }

    // Mettre à jour le planning
    const planning = await prisma.planningDisponibilite.update({
      where: { id: planningId },
      data: {
        hopitalId: data.hopitalId,
        dateDebut: new Date(data.dateDebut),
        dateFin: data.dateFin ? new Date(data.dateFin) : null,
        creneaux: {
          deleteMany: {},
          create: data.creneaux.map(creneau => ({
            jour: creneau.jour,
            heureDebut: creneau.heureDebut,
            heureFin: creneau.heureFin,
            dureeConsultation: creneau.dureeConsultation,
            pauseEntreConsultations: creneau.pauseEntreConsultations,
            actif: creneau.actif
          }))
        }
      },
      include: {
        creneaux: true,
        hopital: {
          select: {
            id: true,
            nom: true,
            adresse: true
          }
        }
      }
    });

    return {
      success: true,
      data: planning
    };

  } catch (error) {
    console.error("Erreur lors de la modification du planning:", error);
    return {
      success: false,
      error: "Erreur lors de la modification du planning"
    };
  }
}

/**
 * Supprimer un planning de disponibilité
 */
export async function supprimerPlanningDisponibilite(planningId: string) {
  try {
    const user = await getUserInfo();
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      };
    }

    // Vérifier que le planning appartient au médecin
    const existingPlanning = await prisma.planningDisponibilite.findFirst({
      where: {
        id: planningId,
        medecinId: user.id
      }
    });

    if (!existingPlanning) {
      return {
        success: false,
        error: "Planning non trouvé ou accès non autorisé"
      };
    }

    // Supprimer le planning (cascade supprimera les créneaux)
    await prisma.planningDisponibilite.delete({
      where: { id: planningId }
    });

    return {
      success: true,
      data: "Planning supprimé avec succès"
    };

  } catch (error) {
    console.error("Erreur lors de la suppression du planning:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression du planning"
    };
  }
}

/**
 * Vérifier la disponibilité d'un médecin pour une date/heure donnée
 */
export async function verifierDisponibilite(
  medecinId: string,
  date: string,
  heure: string,
  duree: number = 30,
  hopitalId?: string
) {
  try {
    const dateObj = new Date(date);
    const jourSemaine = dateObj.toLocaleDateString('fr-FR', { weekday: 'long' }).toUpperCase() as JourSemaine;

    // Récupérer les créneaux de disponibilité pour ce jour
    const creneaux = await prisma.creneauDisponibilite.findMany({
      where: {
        planning: {
          medecinId: medecinId,
          actif: true,
          dateDebut: { lte: dateObj },
          OR: [
            { dateFin: null },
            { dateFin: { gte: dateObj } }
          ],
          ...(hopitalId && { hopitalId: hopitalId })
        },
        jour: jourSemaine,
        actif: true,
        heureDebut: { lte: heure },
        heureFin: { gt: heure }
      },
      include: {
        planning: true
      }
    });

    if (creneaux.length === 0) {
      return {
        success: true,
        disponible: false,
        raison: "Aucun créneau de disponibilité trouvé"
      };
    }

    // Vérifier les conflits avec les rendez-vous existants
    const heureFin = new Date(dateObj);
    const [heures, minutes] = heure.split(':').map(Number);
    heureFin.setHours(heures, minutes + duree);

    const conflits = await prisma.rendezVous.findMany({
      where: {
        medecinId: medecinId,
        date: {
          gte: dateObj,
          lt: heureFin
        },
        statut: { not: 'ANNULE' }
      }
    });

    if (conflits.length > 0) {
      return {
        success: true,
        disponible: false,
        raison: "Conflit avec un rendez-vous existant"
      };
    }

    return {
      success: true,
      disponible: true
    };

  } catch (error) {
    console.error("Erreur lors de la vérification de disponibilité:", error);
    return {
      success: false,
      error: "Erreur lors de la vérification de disponibilité"
    };
  }
}

/**
 * Obtenir les créneaux disponibles pour une date donnée
 */
export async function getCreneauxDisponibles(
  medecinId: string,
  date: string,
  hopitalId?: string
) {
  try {
    const dateObj = new Date(date);
    const jourSemaine = dateObj.toLocaleDateString('fr-FR', { weekday: 'long' }).toUpperCase() as JourSemaine;

    // Récupérer les créneaux de disponibilité
    const creneaux = await prisma.creneauDisponibilite.findMany({
      where: {
        planning: {
          medecinId: medecinId,
          actif: true,
          dateDebut: { lte: dateObj },
          OR: [
            { dateFin: null },
            { dateFin: { gte: dateObj } }
          ],
          ...(hopitalId && { hopitalId: hopitalId })
        },
        jour: jourSemaine,
        actif: true
      },
      include: {
        planning: true
      }
    });

    // Récupérer les rendez-vous existants pour cette date
    const rendezVous = await prisma.rendezVous.findMany({
      where: {
        medecinId: medecinId,
        date: dateObj,
        statut: { not: 'ANNULE' }
      },
      orderBy: { date: 'asc' }
    });

    // Générer les créneaux disponibles
    const creneauxDisponibles = [];
    
    for (const creneau of creneaux) {
      const [debutHeures, debutMinutes] = creneau.heureDebut.split(':').map(Number);
      const [finHeures, finMinutes] = creneau.heureFin.split(':').map(Number);
      
      const debutTotal = debutHeures * 60 + debutMinutes;
      const finTotal = finHeures * 60 + finMinutes;
      const dureeCreneau = creneau.dureeConsultation;
      const pause = creneau.pauseEntreConsultations;

      let heureActuelle = debutTotal;
      
      while (heureActuelle + dureeCreneau <= finTotal) {
        const heureDebut = new Date(dateObj);
        heureDebut.setHours(Math.floor(heureActuelle / 60), heureActuelle % 60);
        
        const heureFin = new Date(heureDebut);
        heureFin.setMinutes(heureFin.getMinutes() + dureeCreneau);

        // Vérifier s'il y a un conflit avec un rendez-vous existant
        const conflit = rendezVous.some(rdv => {
          const rdvDebut = new Date(rdv.date);
          const rdvFin = new Date(rdvDebut);
          rdvFin.setMinutes(rdvFin.getMinutes() + rdv.duree);

          return (heureDebut < rdvFin && heureFin > rdvDebut);
        });

        if (!conflit) {
          creneauxDisponibles.push({
            heureDebut: heureDebut.toTimeString().slice(0, 5),
            heureFin: heureFin.toTimeString().slice(0, 5),
            duree: dureeCreneau
          });
        }

        heureActuelle += dureeCreneau + pause;
      }
    }

    return {
      success: true,
      data: creneauxDisponibles
    };

  } catch (error) {
    console.error("Erreur lors de la récupération des créneaux:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des créneaux"
    };
  }
}
