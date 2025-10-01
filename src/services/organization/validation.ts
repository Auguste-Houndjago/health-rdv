// src/services/organization/validation.ts
import * as v from "valibot";

export const createOrganizationSchema = v.object({
  name: v.pipe(v.string(), v.minLength(3, "Le nom doit contenir au moins 3 caractères")),
  slug: v.pipe(
    v.string(),
    v.minLength(3, "Le slug doit contenir au moins 3 caractères"),
    v.regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets")
  ),
  domain: v.optional(v.string()),
  logo: v.optional(v.string()),
});

// Helper pour valider
export function validateCreateOrganization(data: unknown) {
  const result = v.safeParse(createOrganizationSchema, data);

  if (!result.success) {
    const messages = result.issues.map(issue => issue.message).join(", ");
    throw new Error(messages);
  }

  return result.output;
}


