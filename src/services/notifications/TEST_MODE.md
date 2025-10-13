# 🧪 Mode TEST des Notifications

## 🎯 Problème Résolu

Resend en mode gratuit ne permet d'envoyer des emails **qu'à votre propre adresse email**.

### ❌ Erreur Précédente
```
You can only send testing emails to your own email address (piratestuart@gmail.com)
```

### ✅ Solution Implémentée

Un **MODE TEST** a été ajouté qui redirige automatiquement **TOUS les emails** vers votre adresse en développement.

---

## 🔧 Comment Ça Marche

### En Développement (par défaut)

Tous les emails sont redirigés vers `piratestuart@gmail.com` :

```
Patient : john.doe@example.com  →  piratestuart@gmail.com
Médecin : dr.martin@example.com  →  piratestuart@gmail.com
```

**Avantage** : Vous recevez tous les emails et pouvez tester sans limite !

### En Production

Les emails sont envoyés aux vrais destinataires :

```
Patient : john.doe@example.com  →  john.doe@example.com
Médecin : dr.martin@example.com  →  dr.martin@example.com
```

---

## 📊 Configuration

### Variables d'Environnement

```env
# .env

# Email pour les tests (votre email)
RESEND_TEST_EMAIL=piratestuart@gmail.com

# Pour activer le mode production (désactiver le mode test)
NODE_ENV=production
```

### Comportement par Défaut

| Environnement | Mode TEST | Emails envoyés à |
|---------------|-----------|------------------|
| Development | ✅ Activé | `piratestuart@gmail.com` |
| Production | ❌ Désactivé | Vrais destinataires |

---

## 🚀 Test Immédiat

### Étape 1 : Redémarrer le Serveur

```bash
# Arrêter (Ctrl+C)
npm run dev
```

### Étape 2 : Créer un RDV

1. Aller sur `http://localhost:3000/test/rendez-vous`
2. Remplir le formulaire
3. Cliquer sur "Créer le Rendez-vous"

### Étape 3 : Observer les Logs

**Dans le Terminal** :
```
🧪 MODE TEST : Email redirigé
   Original: capitainstuart@gmail.com
   → Test: piratestuart@gmail.com

📤 === ENVOI EMAIL ===
📧 Destinataire: piratestuart@gmail.com (MODE TEST)
📝 Sujet: [TEST] Confirmation de votre rendez-vous...
✅ Email envoyé avec succès !
🆔 Message ID: msg_abc123

🧪 MODE TEST : Email redirigé
   Original: sika5544sqd@yopmail.com
   → Test: piratestuart@gmail.com

📤 === ENVOI EMAIL ===
📧 Destinataire: piratestuart@gmail.com (MODE TEST)
📝 Sujet: [TEST] Nouveau rendez-vous...
✅ Email envoyé avec succès !
🆔 Message ID: msg_def456

📊 === RÉSUMÉ ENVOI NOTIFICATIONS ===
👤 Patient: ✅ Envoyé (msg_abc123)
👨‍⚕️ Médecin: ✅ Envoyé (msg_def456)
=====================================
```

### Étape 4 : Vérifier Votre Boîte Email

Vous devriez recevoir **2 emails** sur `piratestuart@gmail.com` :

1. **Email Patient** :
   - Sujet : `[TEST] Confirmation de votre rendez-vous...`
   - Contenu : Détails du RDV pour le patient

2. **Email Médecin** :
   - Sujet : `[TEST] Nouveau rendez-vous...`
   - Contenu : Détails du nouveau patient

---

## 🎨 Indicateurs du Mode TEST

### Dans les Logs

- 🧪 `MODE TEST : Email redirigé`
- 📧 `(MODE TEST)` après le destinataire
- 📝 `[TEST]` dans le sujet

### Dans les Emails

- Sujet commence par `[TEST]`
- Vous recevez tous les emails (patient + médecin)

---

## 🔧 Personnalisation

### Changer l'Email de Test

```env
# .env
RESEND_TEST_EMAIL=votre-autre-email@gmail.com
```

### Désactiver le Mode TEST (Même en Dev)

```env
# .env
NODE_ENV=production
```

⚠️ **Attention** : Vous devrez alors avoir un domaine vérifié sur Resend.

---

## 📋 Avantages du Mode TEST

| Avantage | Description |
|----------|-------------|
| ✅ **Pas de limite** | Envoi illimité à votre email |
| ✅ **Tests rapides** | Pas besoin de créer de vrais comptes |
| ✅ **Sécurisé** | Aucun email envoyé aux vrais users par erreur |
| ✅ **Facile** | Fonctionne immédiatement |
| ✅ **Complet** | Vous recevez tous les types d'emails |

---

## 🐛 Dépannage

### Problème : Les emails ne sont toujours pas envoyés

**Solution** :
1. Vérifier que `RESEND_API_KEY` est définie
2. **Redémarrer le serveur** (important !)
3. Vérifier les logs pour le message `🧪 MODE TEST`

### Problème : Je ne reçois aucun email

**Solutions** :
1. Vérifier les spams de `piratestuart@gmail.com`
2. Vérifier sur [resend.com/emails](https://resend.com/emails)
3. Attendre quelques minutes (délai de livraison)

### Problème : Je veux tester avec de vrais emails

**Solution** : Utiliser des services de test :
- [Yopmail](https://yopmail.com) : Emails temporaires
- [Temp-Mail](https://temp-mail.org) : Emails temporaires
- [Mailtrap](https://mailtrap.io) : Serveur SMTP de test

Mais avec le mode TEST, ce n'est plus nécessaire !

---

## 🎯 Pour la Production

Quand vous serez prêt pour la production :

### 1. Vérifier un Domaine sur Resend

Voir `RESEND_SETUP.md` pour les instructions complètes.

### 2. Mettre à Jour `.env`

```env
NODE_ENV=production
RESEND_FROM_EMAIL=noreply@votredomaine.com
```

### 3. Déployer

Le mode TEST sera automatiquement désactivé et les emails seront envoyés aux vrais destinataires.

---

## 📊 Résumé

### Avant
```
❌ Erreur : Can only send to piratestuart@gmail.com
❌ Impossible de tester avec plusieurs emails
```

### Après
```
✅ MODE TEST activé automatiquement
✅ Tous les emails redirigés vers votre adresse
✅ Tests illimités
✅ Logs clairs avec 🧪 MODE TEST
```

---

## 🔍 Code Source

### Configuration (`config.ts`)

```typescript
export const EMAIL_CONFIG = {
  TEST_MODE: process.env.NODE_ENV !== 'production',
  TEST_EMAIL: process.env.RESEND_TEST_EMAIL || 'piratestuart@gmail.com'
}
```

### Service (`email-service.ts`)

```typescript
const finalTo = EMAIL_CONFIG.TEST_MODE 
  ? EMAIL_CONFIG.TEST_EMAIL 
  : to;

if (EMAIL_CONFIG.TEST_MODE && to !== finalTo) {
  console.log('🧪 MODE TEST : Email redirigé');
  console.log(`   Original: ${to}`);
  console.log(`   → Test: ${finalTo}`);
}
```

---

## ✅ Prochaine Étape

**Redémarrez votre serveur et testez !**

```bash
# Terminal
Ctrl+C
npm run dev

# Navigateur
http://localhost:3000/test/rendez-vous
```

Vous devriez maintenant recevoir tous les emails sur `piratestuart@gmail.com` ! 🎉

---

**Date** : 12 octobre 2025  
**Status** : ✅ Fonctionnel  
**Version** : 1.2.0 - Mode TEST

