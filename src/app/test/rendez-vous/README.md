# 🧪 Page de Test - Création de Rendez-vous

## 📍 URL

```
http://localhost:3000/test/rendez-vous
```

## 🎯 Objectif

Cette page permet de tester la fonction `creerRendezVous()` qui crée un rendez-vous médecin avec validation de disponibilité.

## ✨ Fonctionnalités Testées

- ✅ Validation des données obligatoires
- ✅ Vérification de la disponibilité du médecin
- ✅ Création du rendez-vous (commenté dans le code actuel)
- ✅ Revalidation du cache
- ✅ Gestion des erreurs

## 📋 Champs du Formulaire

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| **Patient ID** | UUID | ✅ | Identifiant du patient (doit exister en DB) |
| **Date** | Date | ✅ | Date du rendez-vous |
| **Heure** | Time | ✅ | Heure du rendez-vous |
| **Durée** | Number | ✅ | Durée en minutes (15-120) |
| **Spécialité ID** | UUID | ❌ | Identifiant de la spécialité |
| **Motif** | Text | ✅ | Raison de la consultation |
| **Notes** | Text | ❌ | Notes supplémentaires |

## 🔐 Prérequis

### 1. Authentification

Vous devez être connecté en tant que **MEDECIN**. La fonction utilise :

```typescript
const user = await getUserInfo()

if (!user?.medecin) {
  return { success: false, error: "Pas de profil médecin" }
}
```

### 2. Données en Base

- ✅ Un **patient** avec l'ID fourni doit exister
- ✅ Le **médecin** connecté doit avoir un profil valide
- ✅ La **spécialité** (si fournie) doit exister

## 🚀 Utilisation

### Étape 1 : Obtenir un Patient ID

**Option A : Via Prisma Studio**
```bash
npx prisma studio
```
Ouvrir la table `Patient` et copier un `id`.

**Option B : Via la console**
```sql
SELECT id, utilisateur.nom, utilisateur.prenom 
FROM Patient 
JOIN Utilisateur ON Patient.userId = Utilisateur.id 
LIMIT 1;
```

**Option C : Créer un patient de test**
```typescript
const patient = await prisma.patient.create({
  data: {
    utilisateur: {
      create: {
        nom: "Test",
        prenom: "Patient",
        email: "patient.test@example.com",
        role: "PATIENT"
      }
    }
  }
});
console.log("Patient ID:", patient.id);
```

### Étape 2 : Remplir le Formulaire

1. Coller le **Patient ID**
2. Sélectionner une **Date** (future)
3. Sélectionner une **Heure**
4. Définir la **Durée** (ex: 30 minutes)
5. Écrire le **Motif** (ex: "Consultation de routine")
6. Ajouter des **Notes** (optionnel)
7. Cliquer sur **"Créer le Rendez-vous"**

### Étape 3 : Vérifier le Résultat

**Succès** ✅
```
Message: "Rendez-vous créé avec succès"
Console: "Rendez-vous créé: { patientId, date, heure, ... }"
```

**Erreur** ❌
```
Exemples d'erreurs possibles:
- "Utilisateur non trouvé ou pas de profil médecin"
- "Tous les champs obligatoires doivent être remplis"
- "Le médecin n'est pas disponible à cette date et heure"
- "Erreur lors de la création du rendez-vous"
```

## 🔍 Flux de la Fonction

```
1. getUserInfo()
   └─> Vérifier que l'utilisateur est un médecin

2. Validation des données
   └─> Tous les champs obligatoires présents ?

3. verifierDisponibilite()
   └─> Le médecin est-il disponible à cette date/heure ?

4. Création du RDV (commenté actuellement)
   └─> prisma.rendezVous.create({ ... })

5. Revalidation
   └─> revalidatePath('/medecin/rendez-vous')

6. Retour
   └─> { success: true, message: "..." }
```

## 📊 Logs

Les logs apparaissent dans la console :

```
✅ Rendez-vous créé: {
  patientId: "...",
  date: "2025-01-15",
  heure: "10:00",
  duree: 30,
  motif: "Consultation de routine",
  notes: "",
  medecinId: "...",
  specialiteId: "..."
}
```

## 🐛 Dépannage

### Erreur : "Utilisateur non trouvé ou pas de profil médecin"

**Solution** : 
1. Vérifier que vous êtes connecté
2. Vérifier que votre utilisateur a le rôle `MEDECIN`
3. Vérifier que `user.medecin` existe

### Erreur : "Le médecin n'est pas disponible"

**Solution** :
1. Vérifier qu'il n'y a pas déjà un RDV à cette date/heure
2. Choisir une autre date/heure
3. Vérifier la fonction `verifierDisponibilite()`

### Erreur : "Tous les champs obligatoires doivent être remplis"

**Solution** : Remplir tous les champs marqués d'un `*` :
- Patient ID
- Date
- Heure
- Durée
- Motif

## 🔧 Activation de la Création en DB

Actuellement, la création en base de données est **commentée**. Pour l'activer :

1. Ouvrir `src/app/actions/rendez-vous.ts`
2. Décommenter les lignes 158-170 :

```typescript
const rendezVous = await prisma.rendezVous.create({
  data: {
    patientId: data.patientId,
    medecinId: data.medecinId,
    specialiteId: data.specialiteId,
    date: new Date(data.date),
    heure: data.heure,
    duree: data.duree,
    motif: data.motif,
    notes: data.notes,
    statut: 'EN_ATTENTE'
  }
})
```

3. Retourner le RDV créé :

```typescript
return {
  success: true,
  message: "Rendez-vous créé avec succès",
  data: rendezVous
}
```

## 📧 Intégration avec les Notifications

Pour envoyer automatiquement des emails lors de la création :

```typescript
import { sendRendezVousCreatedNotification } from '@/services/notifications';

// Après la création du RDV
try {
  await sendRendezVousCreatedNotification({
    id: rendezVous.id,
    date: rendezVous.date,
    duree: rendezVous.duree,
    motif: rendezVous.motif,
    patient: { /* ... */ },
    medecin: { /* ... */ }
  });
} catch (emailError) {
  console.error('⚠️ Email error:', emailError);
}
```

## 🎨 Composants Utilisés

- `Card`, `CardContent`, `CardHeader`, `CardTitle`, `CardDescription`
- `Button`
- `Input`
- `Label`
- `Textarea`
- Icons: `Calendar`, `Clock`, `User`, `FileText`, `Stethoscope`, `CheckCircle`, `AlertCircle`

## 🗑️ Suppression

Pour supprimer cette page de test :

```bash
rm -rf src/app/test/rendez-vous
```

## 🔒 Sécurité

⚠️ **Important** : Cette page de test ne devrait **PAS** être accessible en production.

Options :
1. Supprimer avant le déploiement
2. Ajouter une authentification admin
3. Désactiver via variable d'environnement

---

**Créé le** : 12 octobre 2025  
**Dernière mise à jour** : 12 octobre 2025  
**Fonction testée** : `creerRendezVous()` from `@/app/actions/rendez-vous`

