import * as v from "valibot";

// Schéma pour les créneaux horaires de disponibilité
export const disponibiliteSchema = v.object({
  jour: v.pipe(
    v.string("Le jour est requis"),
    v.picklist([
      "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"
    ], "Jour de la semaine invalide")
  ),
  heureDebut: v.pipe(
    v.string("L'heure de début est requise"),
    v.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide (HH:MM)")
  ),
  heureFin: v.pipe(
    v.string("L'heure de fin est requise"),
    v.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide (HH:MM)")
  ),
  dureeConsultation: v.pipe(
    v.number("La durée de consultation est requise"),
    v.minValue(15, "La durée minimum est de 15 minutes"),
    v.maxValue(120, "La durée maximum est de 120 minutes")
  ),
  pauseEntreConsultations: v.optional(
    v.pipe(
      v.number(),
      v.minValue(0, "La pause ne peut pas être négative"),
      v.maxValue(60, "La pause maximum est de 60 minutes")
    )
  ),
  actif: v.optional(v.boolean())
});

// Schéma pour la création d'un planning de disponibilité
export const planningDisponibiliteSchema = v.object({
  medecinId: v.pipe(
    v.string("L'ID du médecin est requis"),
    v.minLength(1, "L'ID du médecin ne peut pas être vide")
  ),
  specialiteId: v.pipe(
    v.string("L'ID de la spécialité est requis"),
    v.minLength(1, "L'ID de la spécialité ne peut pas être vide")
  ),
  creneaux: v.pipe(
    v.array(disponibiliteSchema, "Les créneaux sont requis"),
    v.minLength(1, "Au moins un créneau doit être défini")
  ),
  dateDebut: v.pipe(
    v.string("La date de début est requise"),
    v.regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)")
  ),
  dateFin: v.optional(
    v.pipe(
      v.string(),
      v.regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)")
    )
  )
});

// Schéma pour la validation des horaires
export const horaireValidationSchema = v.pipe(
  planningDisponibiliteSchema,
  v.forward(
    v.check(
      (input) => {
        // Vérifier que l'heure de fin est après l'heure de début pour chaque créneau
        return input.creneaux.every(creneau => {
          const [debutH, debutM] = creneau.heureDebut.split(':').map(Number);
          const [finH, finM] = creneau.heureFin.split(':').map(Number);
          const debutMinutes = debutH * 60 + debutM;
          const finMinutes = finH * 60 + finM;
          return finMinutes > debutMinutes;
        });
      },
      "L'heure de fin doit être après l'heure de début"
    ),
    ["creneaux"]
  )
);

// Fonction utilitaire pour valider les créneaux
export function validerCreneauxDisponibilite(data: unknown) {
  return v.safeParse(horaireValidationSchema, data);
}