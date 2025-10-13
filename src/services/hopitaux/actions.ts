// src/services/hopitaux/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { generateRandomSuffix } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createHopitalSchema = z.object({
  nom: z.string().min(1, "Le nom est requis").max(150, "Le nom est trop long"),
  adresse: z.string().min(1, "L'adresse est requise").max(255),
  contact: z.string().min(1, "Le contact est requis").max(100),
  description: z.string().max(500).optional(),
  image: z.string().url().optional().or(z.literal("")).transform(v => (v === "" ? undefined : v)),
  url: z.string().url().optional(),
  localisation: z.string().optional(),
  fuseauHoraire: z.string().optional(),
});

export type CreateHopitalData = z.infer<typeof createHopitalSchema>;

export async function getHopitaux() {
  const hopitaux = await prisma.hopital.findMany({
    orderBy: { nom: "asc" },
    include: {
      _count: {
        select: {
          medecin: true,
          specialites: true,
          utilisateurHopitals: true,
          rendevous: true,
        },
      },
    },
  });
  return hopitaux;
}



export type HopitalWithDetails = Awaited<ReturnType<typeof getHopitauxWithDetails>>[number];

export async function getHopitauxWithDetails() {
  try {
    const hopitaux = await prisma.hopital.findMany({
      include: {
        // Inclure les spécialités de l'hôpital
        specialites: {
          select: {
            id: true,
            nom: true,
            image: true,
            description: true
          }
        },
        // Inclure les médecins de l'hôpital avec leurs détails
        medecin: {
          include: {
            medecin: {
              include: {
                utilisateur: {
                  select: {
                    id: true,
                    nom: true,
                    prenom: true,
                    email: true,
                    telephone: true,
                    avatarUrl: true
                  }
                },
                specialite: {
                  select: {
                    id: true,
                    nom: true
                  }
                }
              },
            }
          }
        },
        // Inclure les utilisateurs associés à l'hôpital
        utilisateurHopitals: {
          include: {
            utilisateur: {
              select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                role: true
              }
            }
          }
        }
      },
      orderBy: {
        nom: 'asc'
      }
    });

    // Transformer les données pour un format plus pratique
    const hopitauxFormatted = hopitaux.map(hopital => ({
      id: hopital.id,
      nom: hopital.nom,
      adresse: hopital.adresse,
      description: hopital.description,
      image: hopital.image,
      url: hopital.url,
      contact: hopital.contact,
      localisation: hopital.localisation,
      slug: hopital.slug,
      fuseauHoraire: hopital.fuseauHoraire,
      // Médecins avec leurs informations complètes
      medecins: hopital.medecin.map(mh => ({
        id: mh.medecin.id,
        numLicence: mh.medecin.numLicence,
        anneeExperience: mh.medecin.anneeExperience,
        titre: mh.medecin.titre,
        isDisponible: mh.medecin.isDisponible,
        utilisateur: mh.medecin.utilisateur,
        specialite: mh.medecin.specialite
      })),
      // Spécialités disponibles dans l'hôpital
      specialites: hopital.specialites,
      // Utilisateurs associés à l'hôpital
      utilisateurs: hopital.utilisateurHopitals.map(uh => ({
        id: uh.utilisateur.id,
        nom: uh.utilisateur.nom,
        prenom: uh.utilisateur.prenom,
        email: uh.utilisateur.email,
        role: uh.utilisateur.role,
        dateDebut: uh.dateDebut,
        dateFin: uh.dateFin
      }))
    }));

    return hopitauxFormatted;
  } catch (error) {
    console.error("Erreur lors de la récupération des hôpitaux:", error);
    throw new Error("Impossible de récupérer les informations des hôpitaux");
  }
}




export async function generateSlug(nom: string, randomSuffix: string = generateRandomSuffix()) {
  // Créer le slug de base
  const baseSlug = nom
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-z0-9 -]/g, "") // Supprimer les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/-+/g, '-') // Supprimer les tirets multiples
    .trim();

  // Format: slug-base--rsuffix-123abc
  const slug = `${baseSlug}--rsuffix-${randomSuffix}`;

  // Vérifier si le slug existe déjà
  const existing = await prisma.hopital.findFirst({
    where: { slug },
    select: { id: true },
  });

  // Si le slug existe, régénérer avec un nouveau suffixe
  if (existing) {
    return generateSlug(nom, generateRandomSuffix());
  }

  return slug;
}

// Générer un suffixe aléatoire de 6 caractères (chiffres + lettres)


export async function createHopital(formData: FormData) {
  const rawData = {
    nom: formData.get("nom") as string,
    adresse: formData.get("adresse") as string,
    contact: formData.get("contact") as string,
    description: (formData.get("description") as string) || undefined,
    image: (formData.get("image") as string) || undefined,
    url: (formData.get("url") as string) || undefined,
    localisation: (formData.get("localisation") as string) || undefined,
    fuseauHoraire: (formData.get("fuseauHoraire") as string) || undefined,
  };

  const validation = createHopitalSchema.safeParse(rawData);
  if (!validation.success) {
    throw new Error(
      "Données invalides: " + JSON.stringify(validation.error.flatten().fieldErrors)
    );
  }

  const { nom, adresse, contact, description, image, url, localisation, fuseauHoraire } =
    validation.data;

  const existing = await prisma.hopital.findFirst({
    where: { nom: { equals: nom.trim(), mode: "insensitive" } },
    select: { id: true },
  });
  if (existing) {
    throw new Error("Un hôpital avec ce nom existe déjà");
  }

  const slug = await generateSlug(nom);

  const hopital = await prisma.hopital.create({
    data: {
      nom: nom.trim(),
      adresse: adresse.trim(),
      contact: contact.trim(),
      description: description?.trim() || null,
      image: image || null,
      url: url || null,
      localisation: localisation?.trim() || null,
      fuseauHoraire: fuseauHoraire || undefined,
      slug: slug,
    },
    include: {
      _count: {
        select: { medecin: true, specialites: true, utilisateurHopitals: true, rendevous: true },
      },
    },
  });

  revalidatePath("/admin/hospitals");
  revalidatePath("/hopitaux");

  return hopital;
}

export async function getHopitalBySlug(slug: string) {
  const hopital = await prisma.hopital.findUnique({
    where: { slug },
  });
  return hopital;
}




export async function updateHopital(
  id: string,
  data: Partial<CreateHopitalData>
) {
  if (data.nom) {
    const existing = await prisma.hopital.findFirst({
      where: {
        nom: { equals: data.nom.trim(), mode: "insensitive" },
        NOT: { id },
      },
      select: { id: true },
    });
    if (existing) {
      throw new Error("Un hôpital avec ce nom existe déjà");
    }
  }

  const hopital = await prisma.hopital.update({
    where: { id },
    data: {
      ...(data.nom && { nom: data.nom.trim() }),
      ...(data.adresse && { adresse: data.adresse.trim() }),
      ...(data.contact && { contact: data.contact.trim() }),
      ...(data.description !== undefined && { description: data.description?.trim() || null }),
      ...(data.image !== undefined && { image: data.image || null }),
      ...(data.url !== undefined && { url: data.url || null }),
      ...(data.localisation !== undefined && { localisation: data.localisation?.trim() || null }),
      ...(data.fuseauHoraire !== undefined && { fuseauHoraire: data.fuseauHoraire }),
    },
    include: {
      _count: {
        select: { medecin: true, specialites: true, utilisateurHopitals: true, rendevous: true },
      },
    },
  });

  revalidatePath("/admin/hospitals");
  revalidatePath("/hopitaux");

  return hopital;
}

export async function deleteHopital(id: string) {
  const linked = await prisma.hopital.findUnique({
    where: { id },
    include: { medecin: { take: 1 }, rendevous: { take: 1 } },
  });
  if (!linked) {
    return { success: false, error: "Hôpital introuvable" } as const;
  }
  if ((linked.medecin?.length ?? 0) > 0) {
    throw new Error("Impossible de supprimer: des médecins sont associés à cet hôpital");
  }
  if ((linked.rendevous?.length ?? 0) > 0) {
    throw new Error("Impossible de supprimer: des rendez-vous sont associés à cet hôpital");
  }

  await prisma.hopital.delete({ where: { id } });

  revalidatePath("/admin/hospitals");
  revalidatePath("/hopitaux");

  return { success: true } as const;
}


