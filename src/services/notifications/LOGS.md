# 📊 Guide des Logs de Notifications

## 🎯 Vue d'Ensemble

Le service de notifications génère maintenant des logs détaillés pour chaque envoi d'email, facilitant le debugging et le monitoring.

---

## 📧 Types de Logs

### 1. **Email Texte Brut** (`sendPlainEmail`)

```
📤 === ENVOI EMAIL TEXTE BRUT ===
📧 Destinataire: user@example.com
📝 Sujet: Test de notification
📄 Message: Salut Auguste 👋 Ceci est un email...
🔑 From: Attendancy <onboarding@resend.dev>

✅ Email texte envoyé avec succès !
🆔 Response: {
  "data": {
    "id": "msg_abc123xyz"
  }
}
================================
```

---

### 2. **Création de Rendez-vous** (`sendRendezVousCreatedNotification`)

```
🎯 ======================================
📧 NOTIFICATION: CRÉATION DE RENDEZ-VOUS
======================================
📋 Détails du RDV:
  🆔 ID: 123e4567-e89b-12d3-a456-426614174000
  📅 Date: 15/01/2025
  🕐 Heure: 10:00
  ⏱️  Durée: 30 minutes
  📝 Motif: Consultation de routine

👤 Patient:
  📧 Email: patient@example.com
  👨‍⚕️ Nom: Jean Dupont
  📱 Téléphone: 0612345678

👨‍⚕️ Médecin:
  📧 Email: dr.martin@hopital.com
  👨‍⚕️ Nom: Dr. Sophie Martin
  🩺 Spécialité: Cardiologie

🏥 Hôpital:
  🏢 Nom: Hôpital Central
  📍 Adresse: 123 Rue de la Santé, 75001 Paris
======================================

📤 [1/2] Envoi email au PATIENT...

📤 === ENVOI EMAIL ===
📧 Destinataire: patient@example.com
📝 Sujet: Confirmation de votre rendez-vous - 15/01/2025
📊 Taille HTML: 3456 caractères
📊 Taille Texte: 892 caractères
🔑 From: Plateforme Santé <noreply@votreplateforme.com>

✅ Email envoyé avec succès !
🆔 Message ID: msg_abc123xyz
📧 Envoyé à: patient@example.com
⏰ Date: 12/10/2025 à 14:30:25
===================

📤 [2/2] Envoi email au MÉDECIN...

📤 === ENVOI EMAIL ===
📧 Destinataire: dr.martin@hopital.com
📝 Sujet: Nouveau rendez-vous - Jean Dupont
📊 Taille HTML: 2987 caractères
📊 Taille Texte: 756 caractères
🔑 From: Plateforme Santé <noreply@votreplateforme.com>

✅ Email envoyé avec succès !
🆔 Message ID: msg_def456xyz
📧 Envoyé à: dr.martin@hopital.com
⏰ Date: 12/10/2025 à 14:30:26
===================

📊 === RÉSUMÉ ENVOI NOTIFICATIONS ===
👤 Patient: ✅ Envoyé
   🆔 Message ID: msg_abc123xyz
👨‍⚕️ Médecin: ✅ Envoyé
   🆔 Message ID: msg_def456xyz
=====================================
```

---

### 3. **Confirmation de Rendez-vous** (`sendRendezVousConfirmedNotification`)

```
🎯 ======================================
✅ NOTIFICATION: CONFIRMATION DE RDV
======================================
📋 Détails du RDV:
  🆔 ID: 123e4567-e89b-12d3-a456-426614174000
  📅 Date: 15/01/2025
  🕐 Heure: 10:00
  👨‍⚕️ Médecin: Dr. Sophie Martin

👤 Destinataire (Patient):
  📧 Email: patient@example.com
  👤 Nom: Jean Dupont
======================================

📤 Envoi email de CONFIRMATION au patient...

📤 === ENVOI EMAIL ===
📧 Destinataire: patient@example.com
📝 Sujet: Rendez-vous confirmé par le médecin - 15/01/2025
📊 Taille HTML: 2567 caractères
📊 Taille Texte: 645 caractères
🔑 From: Plateforme Santé <noreply@votreplateforme.com>

✅ Email envoyé avec succès !
🆔 Message ID: msg_confirm123
📧 Envoyé à: patient@example.com
⏰ Date: 12/10/2025 à 14:35:12
===================

📊 === RÉSUMÉ CONFIRMATION ===
Statut: ✅ Envoyé
🆔 Message ID: msg_confirm123
==============================
```

---

### 4. **Annulation de Rendez-vous** (`sendRendezVousCancelledNotification`)

```
🎯 ======================================
❌ NOTIFICATION: ANNULATION DE RDV
======================================
📋 Détails du RDV annulé:
  🆔 ID: 123e4567-e89b-12d3-a456-426614174000
  📅 Date: 15/01/2025
  🕐 Heure: 10:00
  📝 Motif original: Consultation de routine

👤 Patient:
  📧 Email: patient@example.com
  👤 Nom: Jean Dupont

👨‍⚕️ Médecin:
  📧 Email: dr.martin@hopital.com
  👨‍⚕️ Nom: Dr. Sophie Martin
======================================

📤 [1/2] Envoi email d'ANNULATION au PATIENT...
[... logs d'envoi ...]

📤 [2/2] Envoi email d'ANNULATION au MÉDECIN...
[... logs d'envoi ...]

📊 === RÉSUMÉ ANNULATION ===
👤 Patient: ✅ Envoyé
   🆔 Message ID: msg_cancel123
👨‍⚕️ Médecin: ✅ Envoyé
   🆔 Message ID: msg_cancel456
============================
```

---

### 5. **Rappel de Rendez-vous** (`sendRendezVousReminderNotification`)

```
🎯 ======================================
⏰ NOTIFICATION: RAPPEL DE RDV
======================================
📋 Détails du RDV:
  🆔 ID: 123e4567-e89b-12d3-a456-426614174000
  📅 Date: 15/01/2025
  🕐 Heure: 10:00
  👨‍⚕️ Médecin: Dr. Sophie Martin

👤 Destinataire (Patient):
  📧 Email: patient@example.com
  👤 Nom: Jean Dupont
======================================

📤 Envoi email de RAPPEL au patient...
[... logs d'envoi ...]

📊 === RÉSUMÉ RAPPEL ===
Statut: ✅ Envoyé
🆔 Message ID: msg_reminder123
========================
```

---

## ❌ Logs d'Erreur

### API Key Manquante

```
⚠️ RESEND_API_KEY non configurée, email non envoyé
📧 Détails email (non envoyé): {
  destinataire: 'user@example.com',
  sujet: 'Test',
  longueurHtml: 1234,
  longueurText: 456
}
```

### Erreur Resend

```
❌ Erreur Resend: {
  message: "Invalid API key",
  statusCode: 401
}
📧 Email non envoyé à: user@example.com
```

### Erreur Critique

```
❌ Erreur critique lors de l'envoi de l'email: Error: Connection timeout
📧 Destinataire concerné: user@example.com
```

---

## 🔍 Comment Utiliser les Logs

### 1. **En Développement**

Les logs apparaissent dans la console du terminal où tourne votre serveur Next.js :

```bash
npm run dev
```

Ensuite, déclencher une action (création RDV, confirmation, etc.) et observer les logs en temps réel.

### 2. **En Production (Vercel)**

Les logs sont disponibles dans :
- **Vercel Dashboard** → Votre projet → Functions → Logs
- Ou via la CLI : `vercel logs`

### 3. **Filtrer les Logs**

Utiliser `grep` pour filtrer :

```bash
# Voir uniquement les envois réussis
npm run dev 2>&1 | grep "✅"

# Voir uniquement les erreurs
npm run dev 2>&1 | grep "❌"

# Voir les logs de création de RDV
npm run dev 2>&1 | grep "CRÉATION DE RENDEZ-VOUS"
```

---

## 📊 Informations Disponibles

### Pour Chaque Email

| Info | Description |
|------|-------------|
| **Destinataire** | Email du destinataire |
| **Sujet** | Sujet de l'email |
| **Taille HTML** | Longueur du contenu HTML |
| **Taille Texte** | Longueur du contenu texte |
| **From** | Expéditeur configuré |
| **Message ID** | ID unique Resend (si succès) |
| **Date** | Timestamp d'envoi |

### Pour Chaque Notification RDV

| Info | Description |
|------|-------------|
| **ID RDV** | Identifiant unique du rendez-vous |
| **Date/Heure** | Date et heure du rendez-vous |
| **Durée** | Durée en minutes |
| **Motif** | Raison de la consultation |
| **Patient** | Nom, email, téléphone |
| **Médecin** | Nom, email, spécialité |
| **Hôpital** | Nom et adresse (si disponible) |
| **Statut** | Succès/Échec pour chaque destinataire |

---

## 🐛 Debugging

### Problème : Aucun log affiché

**Solutions :**
1. Vérifier que vous êtes dans le bon terminal (celui qui exécute `npm run dev`)
2. S'assurer que l'action qui déclenche l'email est bien exécutée
3. Vérifier que `console.log` n'est pas supprimé en production

### Problème : Logs trop verbeux

Pour désactiver les logs détaillés, créer une variable d'environnement :

```env
# .env
DEBUG_EMAILS=false
```

Puis modifier `email-service.ts` :

```typescript
const DEBUG = process.env.DEBUG_EMAILS === 'true';

if (DEBUG) {
  console.log('📤 === ENVOI EMAIL ===');
  // ... logs détaillés
}
```

### Problème : Message ID non affiché

Si le Message ID n'apparaît pas :
- ✅ L'email a été envoyé
- ❌ Mais la réponse Resend ne contient pas d'ID

**Solution :** Vérifier la structure de `data` retournée par Resend.

---

## 📝 Exemples d'Utilisation

### Test Simple

```bash
# Démarrer le serveur
npm run dev

# Ouvrir http://localhost:3000/test
# Envoyer un email de test
# Observer les logs dans le terminal
```

### Test Création RDV

```bash
# Démarrer le serveur
npm run dev

# Ouvrir http://localhost:3000/test/rendez-vous
# Remplir le formulaire
# Créer un RDV
# Observer les logs détaillés
```

---

## 🔐 Sécurité

⚠️ **Attention** : Les logs contiennent des informations sensibles (emails, noms).

En production :
- ✅ Les logs Vercel sont sécurisés et privés
- ✅ Ne jamais logger les mots de passe ou tokens
- ✅ Les logs sont automatiquement archivés par Vercel

---

## 📚 Références

- **Service** : `src/services/notifications/email-service.ts`
- **Documentation** : `README.md`
- **Exemples** : `EXAMPLE.md`
- **Architecture** : `ARCHITECTURE.md`

---

**Dernière mise à jour** : 12 octobre 2025  
**Version** : 1.1.0 (Avec logs détaillés)

