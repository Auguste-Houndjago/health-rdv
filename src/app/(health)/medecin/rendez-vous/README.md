# Page de Gestion des Rendez-vous Médecin

## 📋 Vue d'ensemble

Cette page permet aux médecins de gérer leurs rendez-vous avec les fonctionnalités suivantes :
- ✅ Visualisation de tous les rendez-vous
- ✅ Confirmation des rendez-vous
- ✅ Annulation des rendez-vous
- ✅ Statistiques en temps réel
- ✅ Recherche et filtres

## 🎯 Fonctionnalités

### 1. **Visualisation des Rendez-vous**

#### Mode Liste
- Affichage en tableau avec toutes les informations
- Colonnes : Patient, Date & Heure, Motif, Durée, Statut, Actions
- Recherche en temps réel
- Badge de statut avec icône

#### Mode Calendrier
- Vue calendrier mensuelle
- Liste des rendez-vous pour la date sélectionnée
- Navigation intuitive

### 2. **Statistiques**

Cartes de statistiques affichant :
- **Total RDV** : Nombre de rendez-vous ce mois-ci
- **Aujourd'hui** : Rendez-vous prévus aujourd'hui
- **Confirmés** : Rendez-vous confirmés à venir
- **En Attente** : Rendez-vous nécessitant une confirmation

### 3. **Actions sur les Rendez-vous**

#### Confirmation
- Accessible uniquement pour les rendez-vous "EN_ATTENTE"
- Bouton "Confirmer" dans le dialog de détails
- Mise à jour instantanée du statut
- Toast de succès/erreur
- Revalidation automatique des données

#### Annulation
- Accessible pour tous les rendez-vous sauf "ANNULE"
- Dialog de confirmation avec motif (optionnel)
- Bouton "Annuler RDV" dans le dialog de détails
- Confirmation en deux étapes pour éviter les erreurs
- Mise à jour instantanée du statut
- Toast de succès/erreur

### 4. **Recherche et Filtres**

- Recherche par :
  - Nom du patient
  - Prénom du patient
  - Motif de consultation
- Résultats filtrés en temps réel
- Compteur de résultats

## 🔧 Server Actions

### `confirmerRendezVous(rendezVousId: string)`

**Description** : Confirme un rendez-vous en attente

**Validations** :
- ✅ Utilisateur authentifié avec rôle MEDECIN
- ✅ Rendez-vous existe et appartient au médecin
- ✅ Rendez-vous non déjà confirmé
- ✅ Rendez-vous non annulé

**Retour** :
```typescript
{
  success: boolean;
  message?: string;
  error?: string;
}
```

**Effets** :
- Met à jour le statut à "CONFIRME"
- Revalide le cache de la page
- Enregistre la date de mise à jour

---

### `annulerRendezVous(rendezVousId: string, motifAnnulation?: string)`

**Description** : Annule un rendez-vous

**Paramètres** :
- `rendezVousId` : ID du rendez-vous
- `motifAnnulation` : (optionnel) Raison de l'annulation

**Validations** :
- ✅ Utilisateur authentifié avec rôle MEDECIN
- ✅ Rendez-vous existe et appartient au médecin
- ✅ Rendez-vous non déjà annulé

**Retour** :
```typescript
{
  success: boolean;
  message?: string;
  error?: string;
}
```

**Effets** :
- Met à jour le statut à "ANNULE"
- Revalide le cache de la page
- Enregistre la date de mise à jour

---

### `obtenirStatistiquesRendezVous()`

**Description** : Récupère les statistiques des rendez-vous du médecin

**Calculs** :
- **totalRDV** : Depuis le début du mois
- **rdvAujourdhui** : Entre 00:00 et 23:59 aujourd'hui
- **rdvConfirmes** : Statut CONFIRME, date >= aujourd'hui
- **rdvEnAttente** : Statut EN_ATTENTE, date >= aujourd'hui

**Retour** :
```typescript
{
  success: boolean;
  data?: {
    totalRDV: number;
    rdvAujourdhui: number;
    rdvConfirmes: number;
    rdvEnAttente: number;
  };
  error?: string;
}
```

## 📊 États de l'application

### Loading States
- État initial avec spinner
- Actions individuelles avec spinner dans les boutons
- Désactivation des boutons pendant l'action

### Error States
- Toast d'erreur pour les échecs d'API
- Messages d'erreur contextuels
- Possibilité de réessayer

### Empty States
- Message informatif si aucun rendez-vous
- Suggestion d'actions

## 🎨 UI/UX

### Dialogs

#### Dialog de Détails
- Informations complètes du patient
- Détails du rendez-vous
- Actions contextuelles (Confirmer/Annuler)
- Badge de statut
- Avatar du patient

#### Dialog d'Annulation
- Confirmation en deux étapes
- Champ de motif optionnel
- Résumé du rendez-vous concerné
- Boutons clairement distincts

### Badges de Statut

| Statut | Couleur | Icône |
|--------|---------|-------|
| CONFIRME | Vert | CheckCircle |
| EN_ATTENTE | Jaune | AlertCircle |
| ANNULE | Rouge | XCircle |
| TERMINE | Bleu | CheckCircle |

### Toasts
- **Succès** : Vert avec icône de validation
- **Erreur** : Rouge avec icône d'alerte
- Durée : 3-5 secondes
- Position : Top right

## 📱 Responsive Design

- **Desktop** : Tableau complet avec toutes les colonnes
- **Tablet** : Optimisation de l'espacement
- **Mobile** : 
  - Cartes empilées au lieu du tableau
  - Statistiques en grille 2x2
  - Dialogs plein écran

## 🔐 Sécurité

### Validations Backend
- ✅ Authentification requise
- ✅ Vérification du rôle (MEDECIN)
- ✅ Vérification de la propriété du rendez-vous
- ✅ Validation de l'état du rendez-vous

### Protection CSRF
- Actions serveur sécurisées par Next.js
- Revalidation automatique du cache

## 📈 Performance

### Optimisations
- Chargement parallèle des données (Promise.all)
- Revalidation ciblée avec `revalidatePath`
- États de chargement granulaires
- Mise à jour optimiste possible

### Caching
- Cache Next.js pour les données statiques
- Revalidation automatique après actions

## 🧪 Tests Possibles

### Tests Unitaires
```typescript
describe('confirmerRendezVous', () => {
  it('devrait confirmer un rendez-vous en attente', async () => {
    // Test logic
  });

  it('devrait échouer si rendez-vous déjà confirmé', async () => {
    // Test logic
  });
});
```

### Tests d'Intégration
- Test du flux complet de confirmation
- Test du flux complet d'annulation
- Test des statistiques

### Tests E2E
- Scénario utilisateur complet
- Navigation entre les vues
- Actions multiples

## 🚀 Évolutions Futures

### Court Terme
- [ ] Filtres avancés (par date, par statut)
- [ ] Export des rendez-vous (PDF/CSV)
- [ ] Impression de la liste
- [ ] Tri personnalisable des colonnes

### Moyen Terme
- [ ] Notifications temps réel
- [ ] Rappels automatiques
- [ ] Historique des modifications
- [ ] Notes médicales attachées

### Long Terme
- [ ] Visioconférence intégrée
- [ ] Gestion des absences du médecin
- [ ] Statistiques avancées avec graphiques
- [ ] IA pour suggestions d'horaires

## 📝 Notes Techniques

### Schéma Prisma
```prisma
model RendezVous {
  id            String           @id @default(uuid())
  date          DateTime
  duree         Int              @default(30)
  statut        StatutRendezVous @default(EN_ATTENTE)
  motif         String?
  hopitalId     String
  utilisateurId String
  medecinId     String
  patientId     String
  medecin       Medecin          @relation(fields: [medecinId], references: [id])
  patient       Patient          @relation(fields: [patientId], references: [id])
  utilisateur   Utilisateur      @relation(fields: [utilisateurId], references: [id])
  hopital       Hopital          @relation(fields: [hopitalId], references: [id])
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
}
```

### Enum Statut
```prisma
enum StatutRendezVous {
  EN_ATTENTE
  CONFIRME
  ANNULE
  TERMINE
}
```

## 🐛 Debugging

### Logs
Les logs sont ajoutés dans les server actions :
```typescript
console.log("Rendez-vous confirmé:", rendezVousId);
console.error("Erreur lors de la confirmation:", error);
```

### Prisma Studio
Vérifier les données en DB :
```bash
npx prisma studio
```

### React DevTools
- Inspecter les états des composants
- Vérifier les re-renders

---

**Créé le** : 12 octobre 2025  
**Dernière mise à jour** : 12 octobre 2025  
**Version** : 1.0.0


