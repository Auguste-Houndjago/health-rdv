# 📧 Service de Notifications Modulaire

Service complet de notifications par email utilisant Resend pour l'envoi d'emails transactionnels liés aux rendez-vous médicaux.

## 📁 Structure

```
notifications/
├── index.ts                # Point d'entrée (exports)
├── types.ts                # Types TypeScript
├── templates.ts            # Templates HTML/Text des emails
├── email-service.ts        # Logique d'envoi des emails
└── README.md               # Cette documentation
```

## 🚀 Installation et Configuration

### 1. Variables d'Environnement

Ajoutez dans votre `.env` :

```env
# Resend API Key (obligatoire)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email expéditeur (optionnel, par défaut : noreply@votreplateforme.com)
RESEND_FROM_EMAIL=notifications@votredomaine.com
```

### 2. Obtenir une API Key Resend

1. Créez un compte sur [resend.com](https://resend.com)
2. Vérifiez votre domaine
3. Générez une API Key dans les settings
4. Ajoutez-la dans `.env`

## 🎯 Fonctionnalités

### Types de Notifications

| Type | Déclencheur | Destinataires |
|------|-------------|---------------|
| **RDV_CREATED** | Création d'un rendez-vous | Patient + Médecin |
| **RDV_CONFIRMED** | Confirmation par le médecin | Patient |
| **RDV_CANCELLED** | Annulation du rendez-vous | Patient + Médecin |
| **RDV_REMINDER** | 24h avant le RDV | Patient |

### Fonctions Disponibles

#### `sendRendezVousCreatedNotification(data)`

Envoie une notification lors de la création d'un rendez-vous.

**Utilisation :**
```typescript
import { sendRendezVousCreatedNotification } from '@/services/notifications';

const result = await sendRendezVousCreatedNotification({
  id: 'rdv-123',
  date: new Date('2025-01-15T10:00:00'),
  heure: '10:00',
  duree: 30,
  motif: 'Consultation de routine',
  patient: {
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@email.com',
    telephone: '0612345678'
  },
  medecin: {
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'dr.martin@hopital.com',
    titre: 'Docteur',
    specialite: 'Cardiologie'
  },
  hopital: {
    nom: 'Hôpital Central',
    adresse: '123 Rue de la Santé, 75001 Paris'
  }
});
```

**Retour :**
```typescript
{
  patient: { success: boolean; messageId?: string; error?: string },
  medecin: { success: boolean; messageId?: string; error?: string }
}
```

---

#### `sendRendezVousConfirmedNotification(data)`

Envoie une notification au patient quand le médecin confirme le RDV.

**Utilisation :**
```typescript
await sendRendezVousConfirmedNotification(notificationData);
```

**Retour :**
```typescript
{
  success: boolean;
  messageId?: string;
  error?: string;
}
```

---

#### `sendRendezVousCancelledNotification(data)`

Envoie une notification lors de l'annulation d'un rendez-vous.

**Utilisation :**
```typescript
const result = await sendRendezVousCancelledNotification(notificationData);
```

**Retour :**
```typescript
{
  patient: { success: boolean; messageId?: string; error?: string },
  medecin: { success: boolean; messageId?: string; error?: string }
}
```

---

#### `sendRendezVousReminderNotification(data)`

Envoie un rappel 24h avant le rendez-vous.

**Utilisation :**
```typescript
await sendRendezVousReminderNotification(notificationData);
```

## 🔧 Intégration dans les Server Actions

### Exemple avec `createRendezVous`

```typescript
import { sendRendezVousCreatedNotification } from '@/services/notifications';

export async function createRendezVous(data) {
  try {
    // 1. Créer le rendez-vous avec les relations
    const rendezVous = await prisma.rendezVous.create({
      data,
      include: {
        patient: { include: { utilisateur: true } },
        medecin: { include: { utilisateur: true, specialite: true } },
        hopital: true
      }
    });

    // 2. Envoyer les notifications (non-bloquant)
    try {
      await sendRendezVousCreatedNotification({
        id: rendezVous.id,
        date: rendezVous.date,
        duree: rendezVous.duree,
        motif: rendezVous.motif || '',
        patient: {
          nom: rendezVous.patient.utilisateur.nom,
          prenom: rendezVous.patient.utilisateur.prenom || '',
          email: rendezVous.patient.utilisateur.email,
          telephone: rendezVous.patient.utilisateur.telephone
        },
        medecin: {
          nom: rendezVous.medecin.utilisateur.nom,
          prenom: rendezVous.medecin.utilisateur.prenom || '',
          email: rendezVous.medecin.utilisateur.email,
          titre: rendezVous.medecin.titre,
          specialite: rendezVous.medecin.specialite?.nom
        },
        hopital: {
          nom: rendezVous.hopital.nom,
          adresse: rendezVous.hopital.adresse
        }
      });
    } catch (emailError) {
      console.error('⚠️ Email error:', emailError);
      // Ne pas bloquer la création du RDV
    }

    return { success: true, data: rendezVous };
  } catch (error) {
    return { success: false, error: 'Erreur création RDV' };
  }
}
```

### Exemple avec `updateRendezVousStatut`

```typescript
import { 
  sendRendezVousConfirmedNotification,
  sendRendezVousCancelledNotification 
} from '@/services/notifications';

export async function updateRendezVousStatut(rdvId, statut) {
  try {
    // 1. Récupérer l'ancien statut
    const oldRdv = await prisma.rendezVous.findUnique({
      where: { id: rdvId },
      select: { statut: true }
    });

    // 2. Mettre à jour
    const rendezVous = await prisma.rendezVous.update({
      where: { id: rdvId },
      data: { statut },
      include: { /* relations */ }
    });

    // 3. Envoyer notification selon le changement
    try {
      if (statut === 'CONFIRME' && oldRdv.statut !== 'CONFIRME') {
        await sendRendezVousConfirmedNotification(notificationData);
      } else if (statut === 'ANNULE' && oldRdv.statut !== 'ANNULE') {
        await sendRendezVousCancelledNotification(notificationData);
      }
    } catch (emailError) {
      console.error('⚠️ Email error:', emailError);
    }

    return { success: true, data: rendezVous };
  } catch (error) {
    return { success: false, error: 'Erreur mise à jour' };
  }
}
```

## 📧 Templates d'Emails

### Design

Les emails utilisent un design responsive et professionnel :
- **Header coloré** avec titre et icône
- **Cartes d'information** avec bordures colorées
- **Typographie** : Arial, sans-serif
- **Largeur max** : 600px
- **Format** : HTML + version texte (fallback)

### Personnalisation

Pour modifier les templates, éditez `templates.ts` :

```typescript
// Exemple : Changer la couleur du header
.header { 
  background: #3B82F6;  // Bleu par défaut
  color: white; 
}
```

### Couleurs par Type

| Type | Couleur | Hex |
|------|---------|-----|
| Création | Bleu | `#3B82F6` |
| Confirmation | Vert | `#10B981` |
| Annulation | Rouge | `#EF4444` |
| Rappel | Orange | `#F59E0B` |

## 🔒 Sécurité et Bonnes Pratiques

### 1. Gestion des Erreurs

```typescript
try {
  await sendNotification(data);
  console.log('✅ Email envoyé');
} catch (error) {
  console.error('⚠️ Erreur email:', error);
  // NE PAS bloquer le flux principal
}
```

### 2. Validation des Données

Le service valide automatiquement :
- ✅ Présence de l'API Key
- ✅ Format des emails
- ✅ Données requises

### 3. Logs

Les emails sont loggés pour le suivi :
```
✅ Email envoyé: msg_abc123
⚠️ Erreur lors de l'envoi: Invalid API key
```

### 4. Rate Limiting

Resend applique des limites :
- **Plan gratuit** : 100 emails/jour
- **Plan Pro** : 50,000 emails/mois

## 🧪 Tests

### Test Manuel

```typescript
// Créez un fichier test.ts
import { sendRendezVousCreatedNotification } from '@/services/notifications';

const testData = {
  id: 'test-123',
  date: new Date(),
  duree: 30,
  motif: 'Test notification',
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
};

await sendRendezVousCreatedNotification(testData);
```

### Mock pour Tests Unitaires

```typescript
// __mocks__/notifications.ts
export const sendRendezVousCreatedNotification = jest.fn(() =>
  Promise.resolve({ 
    patient: { success: true, messageId: 'mock-id' },
    medecin: { success: true, messageId: 'mock-id' }
  })
);
```

## 📊 Monitoring

### Logs à Surveiller

```typescript
console.log('📧 Envoi des notifications de création de RDV...');
console.log('✅ Notifications envoyées avec succès');
console.error('⚠️ Erreur lors de l\'envoi des notifications:', error);
```

### Dashboard Resend

Connectez-vous à [resend.com/dashboard](https://resend.com/dashboard) pour voir :
- Nombre d'emails envoyés
- Taux de délivrabilité
- Erreurs et rejets
- Métriques d'ouverture (si activées)

## 🚀 Évolutions Futures

### Court Terme
- [ ] Template pour RDV_UPDATED
- [ ] Support des pièces jointes
- [ ] Variables d'environnement pour les templates

### Moyen Terme
- [ ] Notifications SMS (via Twilio)
- [ ] Notifications Push (web/mobile)
- [ ] Préférences de notifications utilisateur
- [ ] Templates personnalisables par hôpital

### Long Terme
- [ ] A/B testing des templates
- [ ] Analytics avancées
- [ ] Système de queue pour gros volumes
- [ ] Multi-langue

## 🐛 Dépannage

### Problème : Emails non reçus

**Solutions :**
1. Vérifier `RESEND_API_KEY` dans `.env`
2. Vérifier que le domaine est vérifié sur Resend
3. Checker les logs pour des erreurs
4. Vérifier les spam/courrier indésirable

### Problème : Erreur "Invalid API key"

**Solutions :**
1. Régénérer une nouvelle API key sur Resend
2. Vérifier qu'il n'y a pas d'espaces dans la clé
3. Redémarrer le serveur après modification

### Problème : Templates mal affichés

**Solutions :**
1. Tester avec différents clients email
2. Vérifier la version texte (fallback)
3. Utiliser des outils comme [Litmus](https://litmus.com)

## 📚 Ressources

- [Documentation Resend](https://resend.com/docs)
- [API Reference](https://resend.com/docs/api-reference)
- [Best Practices Email](https://resend.com/docs/best-practices)

---

**Créé le** : 12 octobre 2025  
**Dernière mise à jour** : 12 octobre 2025  
**Version** : 1.0.0  
**Mainteneur** : Équipe Dev

