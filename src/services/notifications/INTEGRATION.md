# 🔌 Guide d'Intégration du Service de Notifications

## ✅ Checklist d'Installation

### 1. Configuration Resend

- [ ] Créer un compte sur [resend.com](https://resend.com)
- [ ] Vérifier votre domaine d'envoi
- [ ] Générer une API Key
- [ ] Ajouter `RESEND_API_KEY` dans `.env`
- [ ] Ajouter `RESEND_FROM_EMAIL` dans `.env` (optionnel)

### 2. Installation du Service

✅ **Déjà fait !** Les fichiers suivants ont été créés :

```
src/services/notifications/
├── index.ts                # ✅ Point d'entrée
├── types.ts                # ✅ Types TypeScript
├── templates.ts            # ✅ Templates HTML/Text
├── email-service.ts        # ✅ Logique d'envoi
├── config.ts               # ✅ Configuration
├── README.md               # ✅ Documentation
├── EXAMPLE.md              # ✅ Exemples
├── CHANGELOG.md            # ✅ Historique
└── INTEGRATION.md          # ✅ Ce fichier
```

### 3. Intégration dans les Actions

✅ **Déjà fait !** Le service est intégré dans :

- ✅ `src/services/rendezvous/actions.ts`
  - ✅ `createRendezVous()` : Envoi email création RDV
  - ✅ `updateRendezVousStatut()` : Envoi emails confirmation/annulation

### 4. Variables d'Environnement

Ajouter dans votre `.env` :

```env
# Obligatoire
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Optionnel
RESEND_FROM_EMAIL=notifications@votredomaine.com
ENABLE_EMAILS=true
DEBUG_EMAILS=false
```

---

## 🚀 Comment Utiliser

### Méthode 1 : Utilisation Directe

```typescript
import { sendRendezVousCreatedNotification } from '@/services/notifications';

const result = await sendRendezVousCreatedNotification({
  id: 'rdv-123',
  date: new Date(),
  duree: 30,
  motif: 'Consultation',
  patient: { /* ... */ },
  medecin: { /* ... */ }
});
```

### Méthode 2 : Via les Server Actions (Recommandé)

```typescript
// Les server actions appellent automatiquement le service
import { createRendezVous } from '@/services/rendezvous/actions';

const result = await createRendezVous({
  date: new Date(),
  duree: 30,
  // ... autres données
});
// ✅ Les emails sont envoyés automatiquement
```

---

## 🧪 Tests

### Test Rapide

1. Créer un rendez-vous via l'interface patient
2. Vérifier les emails dans votre boîte de réception
3. Consulter les logs de la console :
   ```
   📧 Envoi des notifications de création de RDV...
   ✅ Notifications envoyées avec succès
   ```

### Test Manuel

```typescript
// src/scripts/test-notification.ts
import { sendRendezVousCreatedNotification } from '@/services/notifications';

async function test() {
  const result = await sendRendezVousCreatedNotification({
    id: 'test-123',
    date: new Date('2025-01-15T10:00:00'),
    heure: '10:00',
    duree: 30,
    motif: 'Test',
    patient: {
      nom: 'Test',
      prenom: 'Patient',
      email: 'votre-email@test.com'
    },
    medecin: {
      nom: 'Test',
      prenom: 'Médecin',
      email: 'medecin@test.com'
    }
  });

  console.log('Patient:', result.patient);
  console.log('Médecin:', result.medecin);
}

test();
```

Exécuter : `npx tsx src/scripts/test-notification.ts`

---

## 🔍 Vérification

### 1. Vérifier la Configuration

```typescript
import { validateEmailConfig } from '@/services/notifications/config';

const validation = validateEmailConfig();
console.log(validation);
// { valid: true, errors: [] }
```

### 2. Vérifier les Logs

Lors de l'envoi d'un email, vous devriez voir :

```
📧 Envoi des notifications de création de RDV...
✅ Email envoyé: msg_abc123xyz
✅ Email envoyé: msg_def456xyz
✅ Notifications envoyées avec succès
```

### 3. Vérifier sur Resend Dashboard

1. Connectez-vous à [resend.com/emails](https://resend.com/emails)
2. Vous devriez voir vos emails dans la liste
3. Statut : "Delivered" ✅

---

## ⚠️ Troubleshooting

### Problème : Emails non reçus

**Vérifications :**
1. ✅ `RESEND_API_KEY` est bien définie dans `.env`
2. ✅ Le domaine est vérifié sur Resend
3. ✅ L'email n'est pas dans les spams
4. ✅ Les logs ne montrent pas d'erreurs

**Solution :**
```typescript
// Activer le mode debug
// .env
DEBUG_EMAILS=true
```

### Problème : Erreur "Invalid API key"

**Solution :**
1. Régénérer une nouvelle API key sur Resend
2. Copier-coller dans `.env` (sans espaces)
3. Redémarrer le serveur : `npm run dev`

### Problème : Emails en mode dev

Par défaut, les emails sont désactivés en développement.

**Solution :**
```env
# .env
ENABLE_EMAILS=true
```

### Problème : Templates mal affichés

**Solution :**
1. Vérifier dans différents clients email (Gmail, Outlook, etc.)
2. La version texte devrait toujours fonctionner
3. Consulter les logs Resend pour plus de détails

---

## 📊 Monitoring

### Logs à Surveiller

| Log | Signification |
|-----|---------------|
| `📧 Envoi des notifications...` | Début d'envoi |
| `✅ Email envoyé: msg_xxx` | Succès |
| `✅ Notifications envoyées` | Tous les emails sont partis |
| `⚠️ RESEND_API_KEY non configurée` | Configuration manquante |
| `⚠️ Erreur lors de l'envoi` | Échec (pas bloquant) |

### Dashboard Resend

Surveillez :
- **Nombre d'emails envoyés** par jour/semaine
- **Taux de délivrabilité** (devrait être > 98%)
- **Bounces** (emails rejetés)
- **Complaints** (marqués comme spam)

---

## 🎨 Personnalisation

### Changer le Logo

Modifier `templates.ts` :

```typescript
const logoUrl = 'https://votredomaine.com/logo.png';

export function getPatientCreatedTemplate(data) {
  return {
    html: `
      <div style="text-align: center;">
        <img src="${logoUrl}" alt="Logo" style="max-width: 150px;" />
      </div>
      ...
    `
  };
}
```

### Changer les Couleurs

Modifier `config.ts` :

```typescript
export const NOTIFICATION_COLORS = {
  CREATED: '#YOUR_COLOR',
  CONFIRMED: '#YOUR_COLOR',
  // ...
} as const;
```

Puis mettre à jour les templates en conséquence.

---

## 🚀 Déploiement

### Avant de Déployer

- [ ] Tester tous les types de notifications en local
- [ ] Vérifier que `RESEND_API_KEY` est définie en production
- [ ] Configurer le domaine sur Resend
- [ ] Tester avec des emails réels (pas de +alias)

### Variables d'Environnement (Production)

```env
RESEND_API_KEY=re_prod_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=notifications@votredomaine.com
ENABLE_EMAILS=true
DEBUG_EMAILS=false
NODE_ENV=production
```

### Après le Déploiement

1. ✅ Créer un RDV de test
2. ✅ Vérifier la réception des emails
3. ✅ Consulter les logs Vercel/Railway
4. ✅ Vérifier le dashboard Resend

---

## 📚 Ressources

### Documentation
- [README.md](./README.md) - Documentation complète
- [EXAMPLE.md](./EXAMPLE.md) - Exemples d'utilisation
- [CHANGELOG.md](./CHANGELOG.md) - Historique des versions

### Liens Externes
- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Best Practices Email](https://resend.com/docs/best-practices)

---

## 🤝 Support

### En cas de problème :

1. Consulter les logs de la console
2. Vérifier le dashboard Resend
3. Lire la documentation dans `README.md`
4. Consulter les exemples dans `EXAMPLE.md`

### Contact

- **Issues** : Ouvrir une issue sur GitHub
- **Email** : dev@votreplateforme.com
- **Documentation** : Ce dossier

---

## ✨ Prochaines Étapes

### Maintenant que le service est installé :

1. **Tester** avec un RDV réel
2. **Configurer** les rappels automatiques (voir `EXAMPLE.md`)
3. **Personnaliser** les templates si nécessaire
4. **Monitorer** les envois via Resend

### Fonctionnalités Avancées (Optionnel)

- [ ] Système de rappels 24h avant (Cron Job)
- [ ] Préférences de notifications utilisateur
- [ ] Notifications SMS via Twilio
- [ ] Analytics avancées

Voir `CHANGELOG.md` pour la roadmap complète.

---

**🎉 Félicitations ! Le service de notifications est prêt à l'emploi.**

---

_Dernière mise à jour : 12 octobre 2025_

