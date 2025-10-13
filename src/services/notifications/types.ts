// Types pour le service de notifications

export type NotificationType = 
  | 'RDV_CREATED'
  | 'RDV_CONFIRMED'
  | 'RDV_CANCELLED'
  | 'RDV_REMINDER'
  | 'RDV_UPDATED'
  | 'DEMANDE_HOPITAL_CREATED'
  | 'DEMANDE_HOPITAL_APPROUVEE'
  | 'DEMANDE_HOPITAL_REFUSEE';

export interface NotificationRecipient {
  email: string;
  name: string;
  role: 'PATIENT' | 'MEDECIN';
}

export interface RendezVousNotificationData {
  id: string;
  date: Date | string;
  heure?: string;
  duree: number;
  motif: string;
  statut?: string;
  patient: {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
  };
  medecin: {
    nom: string;
    prenom: string;
    email: string;
    titre?: string;
    specialite?: string;
  };
  hopital?: {
    nom: string;
    adresse?: string;
  };
}

export interface NotificationResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface DemandeHopitalNotificationData {
  id: string;
  dateDemande: Date | string;
  message?: string;
  statut?: string;
  reponse?: string;
  medecin: {
    nom: string;
    prenom: string;
    email: string;
    titre?: string;
    numLicence: string;
    specialite?: string;
    anneeExperience?: number;
    telephone?: string;
  };
  hopital: {
    nom: string;
    adresse: string;
  };
  admin?: {
    email: string;
  };
}

