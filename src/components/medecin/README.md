# PatientsPage - Gestion des Patients pour Médecins

## Vue d'ensemble

Cette implémentation fournit une interface complète pour les médecins afin de gérer leurs patients, inspirée de la structure existante `UserPage.tsx` et `users-table.tsx`.

## Composants créés

### 1. Server Actions (`src/services/patients/actions.ts`)
- `getPatients()` - Récupère tous les patients avec leurs informations
- `getPatientById(patientId)` - Récupère un patient spécifique
- `updatePatient(patientId, data)` - Met à jour les informations d'un patient
- `getPatientsByMedecin(medecinId)` - Récupère les patients d'un médecin spécifique

### 2. Hook personnalisé (`src/hooks/patients/usePatients.ts`)
- Hook inspiré de `useUsers.ts`
- Gestion des filtres (sexe, groupe sanguin, statut, recherche)
- Statistiques automatiques
- Intégration avec `useEntityFilter`

### 3. Table des Patients (`src/components/patients-table/`)
- `PatientsTable` - Table principale inspirée de `users-table.tsx`
- `table-columns.tsx` - Définition des colonnes avec actions
- `table-filters.tsx` - Filtres avancés
- `types.ts` - Types TypeScript

### 4. Page Médecin (`src/components/medecin/PatientsPage.tsx`)
- Interface complète pour les médecins
- Statistiques en temps réel
- Filtrage par onglets
- Intégration avec la table des patients

## Fonctionnalités

### Filtrage
- Par sexe (Homme, Femme, Autre)
- Par groupe sanguin (A+, A-, B+, B-, AB+, AB-, O+, O-)
- Par statut (Actif, Inactif, En attente)
- Recherche textuelle (nom, prénom, email, téléphone)

### Affichage des données
- Informations personnelles (nom, prénom, email, téléphone)
- Informations médicales (groupe sanguin, poids, taille, sexe)
- Dernier rendez-vous
- Statut du patient
- Actions (voir profil, modifier, supprimer)

### Statistiques
- Nombre total de patients
- Répartition par sexe
- Répartition par statut
- Répartition par groupe sanguin

## Utilisation

```tsx
import PatientsPage from "@/components/medecin/PatientsPage"

export default function MedecinPatientsPage() {
  return <PatientsPage />
}
```

## Structure des données

Les données suivent le schéma Prisma existant :
- `Patient` avec relation vers `Utilisateur`
- `RendezVous` pour l'historique des consultations
- Champs médicaux spécifiques (groupe sanguin, poids, taille, sexe)

## Intégration

Cette implémentation s'intègre parfaitement avec :
- Le système d'authentification existant
- La structure de base de données Prisma
- Les composants UI existants (shadcn/ui)
- Le système de filtrage `useEntityFilter`
