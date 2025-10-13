# 📧 Service de Notifications - Nodemailer

## 🎯 Vue d'ensemble

Service complet d'envoi d'emails transactionnels utilisant **Nodemailer** avec support SMTP.

## 🚀 Démarrage Rapide

### 1. Installation

Les packages sont déjà installés :
- `nodemailer` - Bibliothèque d'envoi d'emails
- `@types/nodemailer` - Types TypeScript

### 2. Configuration

Ajoutez ces variables dans votre `.env` :

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre.email@gmail.com
SMTP_PASSWORD=votre_mot_de_passe_app
SMTP_TEST_EMAIL=votre.email@gmail.com
```

📖 Voir [ENV_VARIABLES.md](./ENV_VARIABLES.md) pour plus de détails

### 3. Utilisation

```typescript
import { sendRendezVousCreatedNotification } from '@/services/notifications';

const result = await sendRendezVousCreatedNotification({
  id: 'rdv-123',
  date: new Date(),
  heure: '14:00',
  duree: 30,
  motif: 'Consultation',
  patient: { /* ... */ },
  medecin: { /* ... */ }
});

if (result.patient.success && result.medecin.success) {
  console.log('✅ Emails envoyés !');
}
```

## 📁 Structure

```
src/services/notifications/
├── email.ts                  # Service d'envoi d'emails (Nodemailer)
├── templates.ts              # Templates HTML des emails
├── types.ts                  # Types TypeScript
├── config.ts                 # Configuration centralisée
├── index.ts                  # Point d'entrée
├── README_NODEMAILER.md      # Ce fichier
├── NODEMAILER_SETUP.md       # Guide complet de configuration
└── ENV_VARIABLES.md          # Variables d'environnement
```

## 🔧 Fonctions Disponibles

### `sendRendezVousCreatedNotification(data)`
Envoie des emails au patient ET au médecin lors de la création d'un RDV.

**Retour :**
```typescript
{
  patient: { success: boolean, messageId?: string, error?: string },
  medecin: { success: boolean, messageId?: string, error?: string }
}
```

### `sendRendezVousConfirmedNotification(data)`
Envoie un email au patient quand le médecin confirme le RDV.

### `sendRendezVousCancelledNotification(data)`
Envoie des emails au patient ET au médecin lors de l'annulation.

### `sendRendezVousReminderNotification(data)`
Envoie un rappel au patient avant le RDV.

### `sendPlainEmail(to, subject, message)`
Envoie un email texte simple.

## 🧪 Mode TEST

En développement, **tous les emails sont redirigés vers `SMTP_TEST_EMAIL`** :

- ✅ Pas d'envoi accidentel à de vrais patients
- ✅ Test facile de tous les templates
- ✅ Logs détaillés dans le terminal

## 📊 Logs

Tous les logs apparaissent dans le **terminal du serveur** :

```
📤 === ENVOI EMAIL ===
📧 Destinataire: test@example.com (MODE TEST)
📝 Sujet: [TEST] Nouveau rendez-vous confirmé
✅ Email envoyé avec succès !
🆔 Message ID: <abc123@gmail.com>
```

## 🎨 Templates

Les templates HTML sont dans `templates.ts` :

- `getPatientCreatedTemplate()` - RDV créé (patient)
- `getMedecinCreatedTemplate()` - RDV créé (médecin)
- `getPatientConfirmedTemplate()` - RDV confirmé
- `getCancelledTemplate()` - RDV annulé

Chaque template retourne :
```typescript
{
  subject: string,
  html: string,    // Version HTML avec CSS
  text: string     // Version texte brut
}
```

## 🔍 Debug

Activez les logs détaillés :

```env
DEBUG_EMAILS=true
```

## 📚 Documentation Complète

- [NODEMAILER_SETUP.md](./NODEMAILER_SETUP.md) - Configuration détaillée par fournisseur
- [ENV_VARIABLES.md](./ENV_VARIABLES.md) - Variables d'environnement
- [Nodemailer Docs](https://nodemailer.com/) - Documentation officielle

## ⚠️ En Production

1. Configurez un serveur SMTP professionnel (SendGrid, Mailgun, etc.)
2. Utilisez un domaine vérifié
3. Configurez SPF, DKIM, DMARC pour éviter le spam
4. Surveillez les rebonds et les plaintes

## ✅ Avantages

- ✅ **Gratuit** - Pas de coût supplémentaire
- ✅ **Flexible** - Fonctionne avec n'importe quel SMTP
- ✅ **Simple** - Configuration en 2 minutes
- ✅ **Fiable** - Utilisé par des millions de projets
- ✅ **Complet** - HTML, texte, pièces jointes

## 🎯 Tests

Testez vos emails sur :

- **http://localhost:3000/test** - Envoi d'email simple
- **http://localhost:3000/test/rendez-vous** - Test complet avec création de RDV

---

✨ **Service prêt à l'emploi !**

