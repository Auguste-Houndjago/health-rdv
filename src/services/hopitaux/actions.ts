// src/services/hopitaux/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
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


