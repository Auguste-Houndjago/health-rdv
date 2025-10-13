

"use server";

import { prisma } from "@/lib/prisma";

export type MedecinInfoById = Awaited<ReturnType<typeof getMedecinInfoById>>;
export async function getMedecinInfoById({medecinId}:{medecinId:string}) {
    try {
        const medecin = await prisma.medecin.findUnique({
            where:{id: medecinId },
            include: {
                utilisateur: true,
                specialite: {
                    select: {
                        id: true,
                        nom: true,
                        description: true,
                        image: true,
                    },
                },

              },
        })
        return medecin
    } catch (error) {
        console.error('Erreur lors de la recherche medecin :', error);
        throw new Error('Impossible de trouver le médecin');
    }
}

export type MedecinPlanning = Awaited<ReturnType<typeof getMedecinPlanning>>;

export async function getMedecinPlanning({ 
    medecinId, 
    hopitalSlug 
  }: { 
    medecinId: string;
    hopitalSlug?: string;
  }) {
    try {
      const medecin = await prisma.medecin.findUnique({
        where: { id: medecinId , isDisponible: true , },
        select: {
          utilisateur: {
            select: {
              nom: true,
              prenom: true,
              avatarUrl: true,
              telephone: true
            }
          },
          specialite: {
            select: {
                id: true,
              nom: true,
              description: true
            }
          },
          plannings: {
            where: {
              OR: [
                { hopital: { slug: hopitalSlug } },
                { hopitalId: null }
              ],
              actif: true
            },
            select: {
              creneaux: {
                where: { actif: true },
                select:{
                    id: true,
                    jour: true,
                    heureDebut: true,
                    heureFin: true,
                    dureeConsultation: true,
                    planningId: true,
                    actif: true,
                    createdAt: true,
                    updatedAt: true,
                    pauseEntreConsultations: true,
                }
              }
            }
          },
          rendezVous: {
            where: {
              hopital: { slug: hopitalSlug },
              date: { gte: new Date() }
            },
            select: {
              id: true,
              date: true,
              statut: true,
              patient: {
                select: {
                  utilisateur: {
                    select: {
                      id: true,
                      nom: true,
                      prenom: true
                    }
                  }
                }
              }
            },
            orderBy: { date: 'asc' }
          }
        }
      });
  

  
      return {
        medecin,
      };
  
    } catch (error) {
      console.error('Erreur:', error);
      throw new Error('Impossible de récupérer les informations du médecin');
    }
  }
