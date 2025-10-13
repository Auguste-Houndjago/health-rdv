# Configuration Nodemailer

## 📧 Service d'Emails

Ce projet utilise **Nodemailer** pour l'envoi d'emails transactionnels via SMTP.

## 🔑 Configuration requise

### Variables d'environnement

Ajoutez ces variables dans votre fichier `.env` :

```env
# === Nodemailer SMTP Configuration ===

# Configuration SMTP (Requis)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre.email@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_app

# Email de l'expéditeur (optionnel, utilise SMTP_USER par défaut)
SMTP_FROM_EMAIL=votre.email@gmail.com

# Email de test pour le mode développement (optionnel)
SMTP_TEST_EMAIL=piratestuart@gmail.com

# Activer l'envoi d'emails en développement (optionnel)
ENABLE_EMAILS=true

# Mode debug pour les logs détaillés (optionnel)
DEBUG_EMAILS=true
```

## 🚀 Configuration par Fournisseur

### 📮 Gmail

1. Activez la validation en 2 étapes sur votre compte Google
2. Générez un **mot de passe d'application** :
   - Allez sur https://myaccount.google.com/security
   - Cliquez sur "Mots de passe des applications"
   - Générez un nouveau mot de passe
3. Configuration :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre.email@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_app_16_caracteres
```

### 📮 Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre.email@outlook.com
SMTP_PASSWORD=votre_mot_de_passe
```

### 📮 Yahoo Mail

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre.email@yahoo.com
SMTP_PASSWORD=votre_mot_de_passe_app
```

### 📮 Mailtrap (Pour les tests)

Idéal pour tester sans envoyer de vrais emails :

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=votre_username_mailtrap
SMTP_PASSWORD=votre_password_mailtrap
```

Créez un compte gratuit sur [Mailtrap](https://mailtrap.io/)

### 📮 SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=votre_cle_api_sendgrid
```

### 📮 SMTP Personnalisé

```env
SMTP_HOST=smtp.votreserveur.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre_username
SMTP_PASSWORD=votre_password
```

## 🧪 Mode TEST

En **développement** (`NODE_ENV !== 'production'`) :
- Tous les emails sont automatiquement redirigés vers `SMTP_TEST_EMAIL`
- Le sujet des emails est préfixé par `[TEST]`
- Les logs détaillés sont affichés dans le terminal

En **production** :
- Les emails sont envoyés aux destinataires réels
- Pas de préfixe `[TEST]`

## 📨 Fonctions disponibles

```typescript
import { 
  sendRendezVousCreatedNotification,
  sendRendezVousConfirmedNotification,
  sendRendezVousCancelledNotification,
  sendRendezVousReminderNotification,
  sendPlainEmail
} from '@/services/notifications';
```

### Exemple d'utilisation

```typescript
// Envoi de notification de création de RDV
const result = await sendRendezVousCreatedNotification({
  id: 'rdv-123',
  date: new Date(),
  heure: '14:00',
  duree: 30,
  motif: 'Consultation générale',
  patient: {
    nom: 'Doe',
    prenom: 'John',
    email: 'john@example.com',
    telephone: '0612345678'
  },
  medecin: {
    nom: 'Smith',
    prenom: 'Jane',
    email: 'jane@example.com',
    titre: 'Dr.',
    specialite: 'Médecine générale'
  }
});

// Résultat
console.log(result.patient.success); // true/false
console.log(result.patient.messageId); // ID du message envoyé
console.log(result.medecin.success); // true/false
```

## 🔍 Logs

Les logs détaillés apparaissent dans le **terminal du serveur** :

```
📤 === ENVOI EMAIL ===
📧 Destinataire: piratestuart@gmail.com (MODE TEST)
📝 Sujet: [TEST] Nouveau rendez-vous confirmé
📊 Taille HTML: 2345 caractères
📊 Taille Texte: 567 caractères
🔑 From: Plateforme Santé <votre.email@gmail.com>
✅ Email envoyé avec succès !
🆔 Message ID: <abc123@gmail.com>
📧 Accepté: [ 'piratestuart@gmail.com' ]
📧 Rejeté: []
```

## ⚠️ Limites par Fournisseur

### Gmail (Gratuit)
- **500 emails/jour** avec un compte Gmail gratuit
- **2000 emails/jour** avec Google Workspace
- Limité à 99 destinataires par email

### Outlook (Gratuit)
- **300 emails/jour**
- Limité à 100 destinataires par email

### Yahoo (Gratuit)
- **500 emails/jour**

### Mailtrap (Gratuit)
- **500 emails/mois** (mode test uniquement)
- Emails non envoyés réellement (capturés pour tests)

### SendGrid (Gratuit)
- **100 emails/jour** en plan gratuit
- Jusqu'à 40 000 emails/mois avec compte gratuit

## 🔧 Dépannage

### "Invalid login" ou "Authentication failed"

1. Vérifiez que vous utilisez un **mot de passe d'application** (Gmail, Yahoo)
2. Vérifiez que SMTP_USER et SMTP_PASSWORD sont corrects
3. Pour Gmail, activez "Accès aux applications moins sécurisées" ou utilisez OAuth2

### "Connection timeout"

1. Vérifiez que le port SMTP est correct (587 pour TLS, 465 pour SSL)
2. Vérifiez que `SMTP_SECURE` est correct (`false` pour port 587, `true` pour 465)
3. Vérifiez votre pare-feu/antivirus

### Les emails ne partent pas

1. Vérifiez les logs dans le terminal du serveur
2. Vérifiez que `SMTP_USER` et `SMTP_PASSWORD` sont configurés
3. Testez la connexion SMTP avec un outil externe (telnet, swaks)

## 📚 Documentation officielle

- [Nodemailer Documentation](https://nodemailer.com/)
- [Nodemailer Examples](https://nodemailer.com/about/)

## ✅ Avantages de Nodemailer

- ✅ **Gratuit** et open-source
- ✅ **Flexible** : fonctionne avec n'importe quel serveur SMTP
- ✅ **Pas de limite** artificielle (dépend de votre fournisseur SMTP)
- ✅ **Pas de compte** externe requis (si vous avez un serveur SMTP)
- ✅ **Support complet** : HTML, pièces jointes, images inline, etc.
- ✅ **Testé en production** par des milliers de projets

---

✅ **Le service est maintenant configuré avec Nodemailer !**

