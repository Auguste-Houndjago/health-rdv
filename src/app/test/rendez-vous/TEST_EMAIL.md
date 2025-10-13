# 📧 Guide de Test - Envoi d'Emails lors de la Création de RDV

## 🎯 Objectif

Tester l'envoi automatique d'emails de notification lorsqu'un rendez-vous est créé via la page `/test/rendez-vous`.

---

## ✨ Ce qui a été Implémenté

La fonction `creerRendezVous()` a été modifiée pour :

1. ✅ Récupérer les informations complètes du patient et du médecin
2. ✅ Appeler `sendRendezVousCreatedNotification()` automatiquement
3. ✅ Envoyer **2 emails** :
   - Un au **patient** avec confirmation du RDV
   - Un au **médecin** avec les détails du nouveau RDV
4. ✅ Gérer les erreurs d'email sans bloquer la création du RDV

---

## 🚀 Comment Tester

### Étape 1 : Préparation

```bash
# 1. Ouvrir le terminal
npm run dev

# 2. Garder ce terminal visible pour voir les logs
```

### Étape 2 : Navigateur

1. Ouvrir `http://localhost:3000/test/rendez-vous`
2. Ouvrir la console du navigateur (F12 → Console)

### Étape 3 : Remplir le Formulaire

1. **Patient** : Sélectionner un patient dans la liste
2. **Date** : Choisir une date future
3. **Heure** : Sélectionner une heure (ex: 10:00)
4. **Durée** : 30 minutes (par défaut)
5. **Spécialité** : Optionnel
6. **Motif** : "Consultation de test pour vérifier l'envoi d'emails"
7. **Notes** : Optionnel

### Étape 4 : Créer le RDV

Cliquer sur **"Créer le Rendez-vous"**

### Étape 5 : Observer les Logs

**🔵 Dans le Navigateur (Console)** :
```
[CLIENT] Rendez-vous créé: { success: true, message: "..." }
```

**📤 Dans le Terminal** :
```
✅ Rendez-vous validé, préparation des données pour notification...
📋 Données récupérées pour l'email:
  Patient: patient@example.com
  Médecin: medecin@example.com

🎯 ======================================
📧 NOTIFICATION: CRÉATION DE RENDEZ-VOUS
======================================
📋 Détails du RDV:
  🆔 ID: temp-1234567890
  📅 Date: 15/01/2025
  🕐 Heure: 10:00
  ⏱️  Durée: 30 minutes
  📝 Motif: Consultation de test pour vérifier l'envoi d'emails

👤 Patient:
  📧 Email: patient@example.com
  👨‍⚕️ Nom: Jean Dupont
  📱 Téléphone: 0612345678

👨‍⚕️ Médecin:
  📧 Email: medecin@example.com
  👨‍⚕️ Nom: Dr. Sophie Martin
  🩺 Spécialité: Cardiologie
======================================

📤 [1/2] Envoi email au PATIENT...

📤 === ENVOI EMAIL ===
📧 Destinataire: patient@example.com
📝 Sujet: Confirmation de votre rendez-vous - 15 janvier 2025
📊 Taille HTML: 3456 caractères
📊 Taille Texte: 892 caractères
🔑 From: Plateforme Santé <noreply@votreplateforme.com>

✅ Email envoyé avec succès !
🆔 Message ID: msg_abc123xyz
📧 Envoyé à: patient@example.com
⏰ Date: 12/10/2025 à 15:30:25
===================

📤 [2/2] Envoi email au MÉDECIN...

📤 === ENVOI EMAIL ===
📧 Destinataire: medecin@example.com
📝 Sujet: Nouveau rendez-vous - Jean Dupont
📊 Taille HTML: 2987 caractères
📊 Taille Texte: 756 caractères
🔑 From: Plateforme Santé <noreply@votreplateforme.com>

✅ Email envoyé avec succès !
🆔 Message ID: msg_def456xyz
📧 Envoyé à: medecin@example.com
⏰ Date: 12/10/2025 à 15:30:26
===================

📊 === RÉSUMÉ ENVOI NOTIFICATIONS ===
👤 Patient: ✅ Envoyé
   🆔 Message ID: msg_abc123xyz
👨‍⚕️ Médecin: ✅ Envoyé
   🆔 Message ID: msg_def456xyz
=====================================

✅ Notifications envoyées avec succès
✅ Rendez-vous créé: {...}
```

---

## 📊 Flux Complet

```
┌─────────────────────────────────────────────────────┐
│  1. NAVIGATEUR : Formulaire rempli                  │
│     └─> Clic sur "Créer le Rendez-vous"            │
└─────────────────────────────────────────────────────┘
                        ⬇️
┌─────────────────────────────────────────────────────┐
│  2. SERVER ACTION : creerRendezVous()                │
│     ├─> Validation des données                      │
│     ├─> Vérification disponibilité                  │
│     ├─> Récupération patient (Prisma)              │
│     ├─> Récupération médecin (Prisma)              │
│     └─> ✅ Données prêtes                           │
└─────────────────────────────────────────────────────┘
                        ⬇️
┌─────────────────────────────────────────────────────┐
│  3. NOTIFICATION SERVICE                             │
│     ├─> sendRendezVousCreatedNotification()         │
│     ├─> Génération template patient (HTML+Text)     │
│     ├─> Génération template médecin (HTML+Text)     │
│     └─> ✅ Templates prêts                          │
└─────────────────────────────────────────────────────┘
                        ⬇️
┌─────────────────────────────────────────────────────┐
│  4. RESEND API                                       │
│     ├─> Email → Patient                             │
│     │   └─> ✅ msg_abc123                           │
│     └─> Email → Médecin                             │
│         └─> ✅ msg_def456                           │
└─────────────────────────────────────────────────────┘
                        ⬇️
┌─────────────────────────────────────────────────────┐
│  5. RÉSULTAT                                         │
│     ├─> Message de succès dans le navigateur        │
│     ├─> Logs complets dans le terminal              │
│     └─> Emails reçus par patient et médecin         │
└─────────────────────────────────────────────────────┘
```

---

## ✅ Critères de Succès

### Dans le Terminal

- [x] `✅ Rendez-vous validé, préparation des données...`
- [x] `📋 Données récupérées pour l'email:`
- [x] `🎯 NOTIFICATION: CRÉATION DE RENDEZ-VOUS`
- [x] `📤 [1/2] Envoi email au PATIENT...`
- [x] `✅ Email envoyé avec succès !`
- [x] `🆔 Message ID: msg_...`
- [x] `📤 [2/2] Envoi email au MÉDECIN...`
- [x] `✅ Email envoyé avec succès !`
- [x] `📊 === RÉSUMÉ ENVOI NOTIFICATIONS ===`
- [x] `✅ Notifications envoyées avec succès`

### Dans le Navigateur

- [x] Toast de succès : "Rendez-vous créé avec succès et notifications envoyées !"
- [x] Message vert : "Le rendez-vous a été créé..."
- [x] Formulaire réinitialisé

### Dans les Boîtes Email

- [x] **Patient** reçoit un email de confirmation avec :
  - Détails du RDV (date, heure, durée, motif)
  - Informations du médecin
  - Informations de l'hôpital
  - Instructions (arriver 15 min avant, etc.)
  
- [x] **Médecin** reçoit un email avec :
  - Détails du patient
  - Détails du RDV
  - Lien vers son espace médecin (futur)

---

## 🐛 Dépannage

### Problème : "Patient ou médecin introuvable"

**Cause** : Le patient ou médecin sélectionné n'existe pas dans la DB.

**Solution** :
1. Vérifier que le patient sélectionné existe bien
2. Vérifier que vous êtes connecté en tant que médecin

---

### Problème : Les logs ne s'affichent pas

**Cause** : Vous regardez la console du navigateur au lieu du terminal.

**Solution** : Regarder le **TERMINAL** où tourne `npm run dev`.

---

### Problème : "⚠️ Erreur lors de l'envoi des notifications"

**Causes possibles** :
1. `RESEND_API_KEY` non configurée
2. API Key invalide
3. Email du patient ou médecin invalide

**Solution** :
```bash
# Vérifier la configuration
cat .env | grep RESEND_API_KEY

# Si vide, ajouter :
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

---

### Problème : Les emails ne sont pas reçus

**Solutions** :
1. Vérifier les spams
2. Consulter [resend.com/emails](https://resend.com/emails)
3. Vérifier les logs pour les Message IDs
4. Vérifier que les emails sont valides

---

## 📝 Notes Importantes

### Non-Bloquant

Si l'envoi d'email échoue, **le RDV est quand même créé**. C'est voulu pour ne pas bloquer l'utilisateur.

```
✅ RDV créé
❌ Email échoué
➡️ L'utilisateur voit quand même le succès
```

### ID Temporaire

Actuellement, l'ID du RDV est temporaire (`temp-${Date.now()}`). 

**Pour la production** : Utiliser l'ID réel après l'insertion en DB.

### Emails de Test

Pour tester sans envoyer de vrais emails, utiliser des services comme :
- [Yopmail](https://yopmail.com)
- [Temp-Mail](https://temp-mail.org)
- [Mailtrap](https://mailtrap.io) (dev)

---

## 🎯 Prochaines Étapes

1. ✅ Tester la création de RDV avec envoi d'email
2. 📧 Vérifier la réception des 2 emails
3. 🔍 Inspecter les logs détaillés
4. 💾 Activer la vraie création en DB (décommenter le code)
5. 🔗 Intégrer dans les vrais workflows

---

## 📚 Fichiers Modifiés

- `src/app/actions/rendez-vous.ts` : Ajout de l'envoi d'emails
- `src/app/test/rendez-vous/page.tsx` : Ajout d'infos sur l'email
- `src/services/notifications/email-service.ts` : Logs détaillés

---

**Date** : 12 octobre 2025  
**Status** : ✅ Prêt pour tests  
**Version** : 1.0.0

