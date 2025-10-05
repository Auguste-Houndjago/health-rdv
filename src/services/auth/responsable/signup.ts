// // src/services/auth/responsable/signup.ts
// 'use server';

// import { signUpResponsable } from "../auth";
// import { createOrgResponsableDB } from "../database";

// export interface CreateOrgResponsableParams {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   telephone?: string;
//   avatar_url?: string;
// }

// export async function createOrgResponsable({
//   firstName,
//   lastName,
//   email,
//   telephone,
//   password,
//   avatar_url,
// }: CreateOrgResponsableParams) {
//   // 1️⃣ Création côté Supabase (auth)
//   const { data, error } = await signUpResponsable({
//     email,
//     password,
//     info: {
//       nom: `${firstName} ${lastName}`, 
//       telephone,
//       avatar_url,
//     },
//   });

//   if (error) {
//     throw new Error(error.message || "Erreur lors de l'inscription");
//   }

//   if (!data) {
//     throw new Error("Erreur lors de l'inscription");
//   }
//   const userId = data?.user?.id;

//   // 2️⃣ Création côté base locale (Prisma)
//   const responsable = await createOrgResponsableDB({
//     id: userId,
//     firstName,
//     lastName,
//     email,
//   });

//   return { responsable, data };
// }
