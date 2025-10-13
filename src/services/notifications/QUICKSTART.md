# ⚡ Guide de Démarrage Rapide - Notifications

## 🚀 En 3 Minutes

### 1️⃣ Configuration (2 min)

```env
# Ajouter dans .env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=notifications@votredomaine.com
```

**Obtenir une API Key** :
1. Créer un compte sur [resend.com](https://resend.com)
2. Vérifier votre domaine
3. Copier l'API Key

---

### 2️⃣ Utilisation (1 min)

Le service est **déjà intégré** ! Aucun code supplémentaire nécessaire.

✅ Les emails sont automatiquement envoyés lors :
- **Création** d'un rendez-vous → Patient + Médecin
- **Confirmation** d'un rendez-vous → Patient
- **Annulation** d'un rendez-vous → Patient + Médecin

---

### 3️⃣ Test

Créer un rendez-vous via l'interface → Vérifier vos emails !

---

## 📧 Fonctions Disponibles

### Import

```typescript
import {
  sendRendezVousCreatedNotification,
  sendRendezVousConfirmedNotification,
  sendRendezVousCancelledNotification,
  sendRendezVousReminderNotification
} from '@/services/notifications';
```

### Utilisation

```typescript
// Création d'un RDV
const result = await sendRendezVousCreatedNotification({
  id: 'rdv-123',
  date: new Date('2025-01-15T10:00:00'),
  heure: '10:00',
  duree: 30,
  motif: 'Consultation',
  patient: {
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@email.com'
  },
  medecin: {
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'dr.martin@hopital.com',
    specialite: 'Cardiologie'
  },
  hopital: {
    nom: 'Hôpital Central',
    adresse: '123 Rue de la Santé'
  }
});

console.log(result);
// {
//   patient: { success: true, messageId: "msg_abc123" },
//   medecin: { success: true, messageId: "msg_def456" }
// }
```

---

## 🎨 Templates Inclus

### 1. Création de RDV

**Patient** : Email avec tous les détails du RDV + infos médecin
**Médecin** : Email avec les détails du patient + RDV

### 2. Confirmation de RDV

**Patient** : Notification que le médecin a confirmé

### 3. Annulation de RDV

**Patient & Médecin** : Notification d'annulation avec les détails

### 4. Rappel de RDV

**Patient** : Rappel 24h avant le rendez-vous

---

## 🔧 Personnalisation Rapide

### Changer l'Email Expéditeur

```env
RESEND_FROM_EMAIL=notifications@mondomaine.com
```

### Activer/Désactiver en Dev

```env
# Désactiver en développement
ENABLE_EMAILS=false

# Activer les logs détaillés
DEBUG_EMAILS=true
```

---

## 🐛 Dépannage Rapide

### ❌ Emails non reçus ?

1. ✅ Vérifier `RESEND_API_KEY` dans `.env`
2. ✅ Vérifier que le domaine est vérifié sur Resend
3. ✅ Vérifier les spams
4. ✅ Consulter [resend.com/emails](https://resend.com/emails)

### ❌ Erreur "Invalid API key" ?

1. Régénérer une nouvelle clé sur Resend
2. Copier dans `.env` (sans espaces)
3. Redémarrer : `npm run dev`

---

## 📊 Vérifier que ça Marche

### Logs Console

Vous devriez voir :
```
📧 Envoi des notifications de création de RDV...
✅ Email envoyé: msg_abc123
✅ Email envoyé: msg_def456
✅ Notifications envoyées avec succès
```

### Dashboard Resend

Connectez-vous à [resend.com/emails](https://resend.com/emails) pour voir :
- ✅ Emails envoyés
- ✅ Statut "Delivered"
- ✅ Aucune erreur

---

## 📚 Documentation Complète

| Fichier | Description |
|---------|-------------|
| [README.md](./README.md) | Documentation complète |
| [EXAMPLE.md](./EXAMPLE.md) | Exemples d'utilisation |
| [INTEGRATION.md](./INTEGRATION.md) | Guide d'intégration |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Architecture technique |
| [CHANGELOG.md](./CHANGELOG.md) | Historique des versions |

---

## 🎯 Prochaines Étapes

1. ✅ **Configurer** : Ajouter `RESEND_API_KEY` dans `.env`
2. ✅ **Tester** : Créer un RDV et vérifier les emails
3. ✅ **Monitorer** : Consulter le dashboard Resend
4. 🔜 **Personnaliser** : Adapter les templates si nécessaire
5. 🔜 **Étendre** : Ajouter des rappels automatiques (voir `EXAMPLE.md`)

---

## ⚡ Commandes Utiles

```bash
# Démarrer le serveur
npm run dev

# Tester l'envoi d'un email
npx tsx src/scripts/test-notification.ts

# Vérifier la configuration
npx tsx -e "import { validateEmailConfig } from './src/services/notifications/config'; console.log(validateEmailConfig())"
```

---

## 💡 Tips

### En Développement

```env
ENABLE_EMAILS=false  # Désactiver l'envoi réel
DEBUG_EMAILS=true    # Voir les logs détaillés
```

### En Production

```env
ENABLE_EMAILS=true
DEBUG_EMAILS=false
RESEND_API_KEY=re_prod_xxxxx  # Clé de production
```

---

## 🆘 Support

- 📖 Lire [README.md](./README.md)
- 💻 Consulter [EXAMPLE.md](./EXAMPLE.md)
- 🏗️ Voir [ARCHITECTURE.md](./ARCHITECTURE.md)
- 🌐 [Documentation Resend](https://resend.com/docs)

---

**🎉 C'est tout ! Votre service de notifications est prêt.**

_Temps de setup : ~3 minutes_  
_Dernière mise à jour : 12 octobre 2025_

