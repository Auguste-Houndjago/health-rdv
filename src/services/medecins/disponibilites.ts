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


export async function getAllCreneaux(
) {
  const creneaux = await prisma.creneauDisponibilite.findMany({
    include:{planning: true}
  })
  return creneaux
}

export async function getCreneauxDisponibles(
  medecinId: string,
  date: string,
  hopitalId?: string
) {
  try {
    // ✅ Correction : Gestion correcte du timezone
    const dateObj = new Date(date + 'T00:00:00.000Z'); // Forcer UTC
    const jourSemaine = getJourSemaineFromDate(dateObj);

    console.log("=== DEBUG getCreneauxDisponibles ===");
    console.log("Date reçue:", date);
    console.log("DateObj créé:", dateObj);
    console.log("Jour de la semaine:", jourSemaine);
    console.log("MedecinId:", medecinId);
    console.log("HopitalId:", hopitalId);

    // ✅ Vérification que la date est valide (retirer la vérification du futur pour debug)
    if (isNaN(dateObj.getTime())) {
      return {
        success: false,
        error: "Date invalide"
      };
    }

    // ✅ Construction de la query WHERE - Version simplifiée pour debug
    const whereClause: any = {
      planning: {
        medecinId: medecinId,
        actif: true,
        dateDebut: { lte: dateObj },
        OR: [
          { dateFin: null },
          { dateFin: { gte: dateObj } }
        ]
        // Temporairement ignorer hopitalId pour debug
      },
      jour: jourSemaine,
      actif: true
    };

    console.log("WHERE clause:", JSON.stringify(whereClause, null, 2));

    // ✅ Récupération des créneaux de disponibilité avec vérifications
    const creneaux = await prisma.creneauDisponibilite.findMany({
      where: whereClause,
      include: {
        planning: {
          include: {
            medecin: true
          }
        }
      },
      orderBy: {
        heureDebut: 'asc'
      }
    });
    console.log("CRENEAUX DISPONIBLES trouvés:", creneaux.length);
    console.log("CRENEAUX DISPONIBLES détails:", JSON.stringify(creneaux, null, 2));
    // ✅ Si aucun créneau trouvé
    if (creneaux.length === 0) {
      return {
        success: true,
        data: []
      };
    }

    // ✅ Récupération des rendez-vous existants avec gestion du timezone
    const startOfDay = new Date(dateObj);
    const endOfDay = new Date(dateObj);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const rendezVous = await prisma.rendezVous.findMany({
      where: {
        medecinId: medecinId,
        date: {
          gte: startOfDay,
          lt: endOfDay
        },
        statut: { 
          notIn: ['ANNULE'] 
        }
      },
      select: {
        date: true,
        duree: true
      },
      orderBy: { date: 'asc' }
    });

    // ✅ Génération des créneaux disponibles
    const creneauxDisponibles = [];
    
    for (const creneau of creneaux) {
      const slots = generateTimeSlotsFromCreneau(
        creneau, 
        dateObj, 
        rendezVous
      );
      creneauxDisponibles.push(...slots);
    }

    // ✅ Tri par heure de début
    creneauxDisponibles.sort((a, b) => 
      a.heureDebut.localeCompare(b.heureDebut)
    );

    return {
      success: true,
      data: creneauxDisponibles
    };

  } catch (error) {
    console.error("Erreur lors de la récupération des créneaux:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des créneaux disponibles"
    };
  }
}

// ✅ Helper function pour convertir la date en JourSemaine
function getJourSemaineFromDate(date: Date): JourSemaine {
  const jours = [
    'DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 
    'JEUDI', 'VENDREDI', 'SAMEDI'
  ];
  const jour = jours[date.getUTCDay()] as JourSemaine;
  console.log(`Date: ${date.toISOString()}, getUTCDay(): ${date.getUTCDay()}, Jour: ${jour}`);
  return jour;
}

// ✅ Helper function pour générer les créneaux
function generateTimeSlotsFromCreneau(
  creneau: any,
  date: Date,
  rendezVous: any[]
): any[] {
  const slots: any[] = [];
  
  const [debutHeures, debutMinutes] = creneau.heureDebut.split(':').map(Number);
  const [finHeures, finMinutes] = creneau.heureFin.split(':').map(Number);
  
  const debutTotal = debutHeures * 60 + debutMinutes;
  const finTotal = finHeures * 60 + finMinutes;
  const dureeCreneau = creneau.dureeConsultation;
  const pause = creneau.pauseEntreConsultations;

  let heureActuelle = debutTotal;
  
  while (heureActuelle + dureeCreneau <= finTotal) {
    const heureDebut = new Date(date);
    heureDebut.setUTCHours(
      Math.floor(heureActuelle / 60), 
      heureActuelle % 60, 
      0, 
      0
    );
    
    const heureFin = new Date(heureDebut);
    heureFin.setUTCMinutes(heureFin.getUTCMinutes() + dureeCreneau);

    // ✅ Vérification des conflits
    const hasConflict = rendezVous.some(rdv => {
      const rdvDebut = new Date(rdv.date);
      const rdvFin = new Date(rdvDebut);
      rdvFin.setUTCMinutes(rdvFin.getUTCMinutes() + rdv.duree);

      return (
        (heureDebut >= rdvDebut && heureDebut < rdvFin) ||
        (heureFin > rdvDebut && heureFin <= rdvFin) ||
        (heureDebut <= rdvDebut && heureFin >= rdvFin)
      );
    });

    if (!hasConflict) {
      slots.push({
        heureDebut: formatTime(heureDebut),
        heureFin: formatTime(heureFin),
        duree: dureeCreneau,
        creneauId: creneau.id
      });
    }

    // ✅ Gestion correcte de la pause
    heureActuelle += dureeCreneau + pause;
  }

  return slots;
}

// ✅ Helper function pour formater l'heure
function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5);
}