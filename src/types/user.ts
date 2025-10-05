// types/user.ts

import { GroupeSanguin, Sexe, StatusUtilisateur, StatutApproval, StatutRendezVous } from "@prisma/client";

export const UserRoles = {
    ADMIN: "ADMIN",
    MEDECIN: "MEDECIN", 
    PATIENT: "PATIENT",
    GUEST: "GUEST"
  } as const;
  
export type Role = typeof UserRoles[keyof typeof UserRoles];

export const Functions = {
     SUPER_ADMIN: "SUPER_ADMIN",
    RESPONSABLE: "RESPONSABLE",
} as const;

export type Function = typeof Functions[keyof typeof Functions];



// =========================
// 📌 INTERFACES DES STRUCTURES
// =========================

export interface InvitedBy {
  id?: string;
  nom?: string;
  email?: string;
}

export interface Hopital {
  id?: string;
  nom?: string;
  slug?: string;
}

export interface Medecin {
  specialite?: string;
  numLicence?: string;
  titre?: string;
  isDisponible?: boolean;
  statut?: StatutApproval
  hopitaux?: Hopital[];
}

export interface Patient {
  dateNaissance?: string;
  adresse?: string;
  groupeSanguin?: GroupeSanguin
  poids?: number;
  taille?: number;
  sexe?: Sexe
}



// =========================
// 📌 INTERFACE UTILISATEUR PRINCIPALE
// =========================

export interface UserInfo {
  // Identité et contact
  id?: string;
  email?: string;
  role?: Role;
  nom?: string;
  prenom?: string;
  avatar_url?: string;
  telephone?: string;
  
  // Vérifications
  email_verified?: boolean;
  phone_verified?: boolean;
  
  // Rôles et fonctions
  function?: Function
  hopital?: Hopital;
  hopitaux?: Hopital[];
  
  // Informations spécifiques aux rôles
  medecin?: Medecin;
  patient?: Patient;
  
  // Gestion des invitations et statut
  invited_by?: InvitedBy;
  status?: StatusUtilisateur;
  invitationToken?: string;
  invitationType?: string;
  
}








// =========================
// 📌 FONCTIONS UTILITAIRES
// =========================

// export function isValidRole(role: string): role is Role {
//   return Object.values(UserRoles).includes(role as Role);
// }

// export function isValidStatus(status: string): status is UserStatus {
//   return status === "ACTIF" || status === "INACTIF";
// }

// export function getDefaultUserInfo(): Partial<UserInfo> {
//   return {
//     status: "ACTIF",
//     email_verified: false,
//     phone_verified: false,
//     hopitaux: []
//   };
// }