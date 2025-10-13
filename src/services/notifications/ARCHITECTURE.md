# 🏗️ Architecture du Service de Notifications

## 📐 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  (Server Actions: createRendezVous, updateRendezVousStatut) │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              NOTIFICATION SERVICE LAYER                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   index.ts   │  │   types.ts   │  │  config.ts   │     │
│  │  (Exports)   │  │  (Types)     │  │  (Config)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           email-service.ts                            │  │
│  │  - sendRendezVousCreatedNotification()               │  │
│  │  - sendRendezVousConfirmedNotification()             │  │
│  │  - sendRendezVousCancelledNotification()             │  │
│  │  - sendRendezVousReminderNotification()              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           templates.ts                                │  │
│  │  - getPatientCreatedTemplate()                        │  │
│  │  - getMedecinCreatedTemplate()                        │  │
│  │  - getPatientConfirmedTemplate()                      │  │
│  │  - getCancelledTemplate()                             │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│                  ┌──────────────┐                           │
│                  │    Resend    │                           │
│                  │   (Emails)   │                           │
│                  └──────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Structure des Fichiers

### 1. `index.ts` - Point d'Entrée

**Rôle** : Exporte les fonctions et types publics du service.

```typescript
export {
  sendRendezVousCreatedNotification,
  sendRendezVousConfirmedNotification,
  sendRendezVousCancelledNotification,
  sendRendezVousReminderNotification
} from './email-service';

export type {
  NotificationType,
  NotificationRecipient,
  RendezVousNotificationData,
  NotificationResult
} from './types';
```

**Usage** :
```typescript
import { sendRendezVousCreatedNotification } from '@/services/notifications';
```

---

### 2. `types.ts` - Définitions TypeScript

**Rôle** : Définit les types et interfaces partagés.

```typescript
export type NotificationType = 
  | 'RDV_CREATED'
  | 'RDV_CONFIRMED'
  | 'RDV_CANCELLED'
  | 'RDV_REMINDER';

export interface RendezVousNotificationData {
  id: string;
  date: Date | string;
  heure?: string;
  duree: number;
  motif: string;
  patient: { /* ... */ };
  medecin: { /* ... */ };
  hopital?: { /* ... */ };
}

export interface NotificationResult {
  success: boolean;
  messageId?: string;
  error?: string;
}
```

---

### 3. `config.ts` - Configuration

**Rôle** : Centralise la configuration et les constantes.

```typescript
export const EMAIL_CONFIG = {
  FROM: {
    EMAIL: process.env.RESEND_FROM_EMAIL || 'noreply@...',
    NAME: 'Plateforme Santé'
  },
  ENABLED: process.env.NODE_ENV === 'production',
  DEBUG: process.env.DEBUG_EMAILS === 'true'
};

export const NOTIFICATION_COLORS = {
  CREATED: '#3B82F6',
  CONFIRMED: '#10B981',
  CANCELLED: '#EF4444',
  REMINDER: '#F59E0B'
};
```

---

### 4. `templates.ts` - Templates HTML/Text

**Rôle** : Génère le contenu HTML et texte des emails.

**Fonctions** :
- `getPatientCreatedTemplate()` : Email patient lors de la création
- `getMedecinCreatedTemplate()` : Email médecin lors de la création
- `getPatientConfirmedTemplate()` : Email patient lors de la confirmation
- `getCancelledTemplate()` : Email d'annulation (patient ou médecin)

**Structure d'un template** :
```typescript
export function getPatientCreatedTemplate(data) {
  return {
    subject: "...",
    html: `<!DOCTYPE html>...`,
    text: `Version texte...`
  };
}
```

---

### 5. `email-service.ts` - Logique d'Envoi

**Rôle** : Gère l'envoi des emails via Resend.

**Fonction privée** :
```typescript
async function sendEmail(to, subject, html, text) {
  // Utilise resend.emails.send()
  // Gestion des erreurs
  // Retourne { success, messageId, error }
}
```

**Fonctions publiques** :
```typescript
export async function sendRendezVousCreatedNotification(data) {
  // 1. Récupère les templates
  // 2. Envoie au patient
  // 3. Envoie au médecin
  // 4. Retourne les résultats
}
```

---

## 🔄 Flux de Données

### Création d'un Rendez-vous

```
1. User Action
   └─> createRendezVous() in actions.ts

2. Database Operation
   └─> prisma.rendezVous.create() with includes

3. Notification Service
   └─> sendRendezVousCreatedNotification({
         patient: { ... },
         medecin: { ... }
       })

4. Template Generation
   ├─> getPatientCreatedTemplate() → HTML/Text
   └─> getMedecinCreatedTemplate() → HTML/Text

5. Email Sending
   ├─> resend.emails.send(patient.email, ...)
   └─> resend.emails.send(medecin.email, ...)

6. Result
   └─> {
         patient: { success: true, messageId: "..." },
         medecin: { success: true, messageId: "..." }
       }
```

### Confirmation d'un Rendez-vous

```
1. Medecin Action
   └─> updateRendezVousStatut(rdvId, 'CONFIRME')

2. Status Check
   └─> Vérifier ancien statut !== 'CONFIRME'

3. Database Update
   └─> prisma.rendezVous.update({ statut: 'CONFIRME' })

4. Notification Service
   └─> sendRendezVousConfirmedNotification({
         patient: { ... },
         medecin: { ... }
       })

5. Template Generation
   └─> getPatientConfirmedTemplate() → HTML/Text

6. Email Sending
   └─> resend.emails.send(patient.email, ...)

7. Result
   └─> { success: true, messageId: "..." }
```

---

## 🧩 Dépendances

### Externes

```json
{
  "resend": "^3.0.0"  // Service d'envoi d'emails
}
```

### Internes

```
notifications/
├── index.ts          → email-service.ts, types.ts
├── email-service.ts  → resend, templates.ts, types.ts, config.ts
├── templates.ts      → types.ts
├── config.ts         → (standalone)
└── types.ts          → (standalone)
```

---

## 🔒 Gestion des Erreurs

### Principe : Non-Bloquant

Les erreurs d'envoi d'email **ne doivent jamais bloquer** l'action principale.

```typescript
// ✅ BON
try {
  const rdv = await prisma.rendezVous.create(data);
  
  try {
    await sendNotification(rdv);
  } catch (emailError) {
    console.error('⚠️ Email failed:', emailError);
    // Continue quand même
  }
  
  return { success: true, data: rdv };
} catch (error) {
  return { success: false, error };
}
```

```typescript
// ❌ MAUVAIS
try {
  const rdv = await prisma.rendezVous.create(data);
  await sendNotification(rdv); // Si fail, bloque tout
  return { success: true, data: rdv };
} catch (error) {
  return { success: false, error };
}
```

### Niveaux d'Erreur

| Niveau | Action | Impact |
|--------|--------|--------|
| `console.warn` | API key manquante | Email non envoyé, RDV créé |
| `console.error` | Erreur Resend | Email non envoyé, RDV créé |
| `throw` | **JAMAIS** | Bloquerait l'action principale |

---

## 🎯 Patterns Utilisés

### 1. Service Layer Pattern

Le service de notifications est isolé de la logique métier :
- **Avantage** : Facile à tester, réutilisable
- **Implémentation** : Dossier `services/notifications/`

### 2. Template Method Pattern

Les templates sont générés par des fonctions dédiées :
- **Avantage** : Facile à personnaliser
- **Implémentation** : `templates.ts`

### 3. Strategy Pattern

Différents templates selon le type de notification :
- **Avantage** : Extensible
- **Implémentation** : Fonctions `get*Template()`

### 4. Factory Pattern

La fonction `sendEmail()` est une factory pour l'envoi :
- **Avantage** : Centralise la logique d'envoi
- **Implémentation** : `email-service.ts`

---

## 📊 Performance

### Optimisations

1. **Envoi Asynchrone** : Les emails sont envoyés en parallèle
   ```typescript
   const results = await Promise.allSettled([
     sendEmail(patient.email, ...),
     sendEmail(medecin.email, ...)
   ]);
   ```

2. **Non-Bloquant** : L'échec d'un email n'affecte pas l'autre
   ```typescript
   try { await sendEmail(patient); } catch {}
   try { await sendEmail(medecin); } catch {}
   ```

3. **Lazy Loading** : Les templates ne sont générés que quand nécessaire

### Métriques Attendues

| Métrique | Valeur Cible |
|----------|--------------|
| Temps d'envoi | < 500ms par email |
| Taux de délivrabilité | > 98% |
| Taux d'échec toléré | < 2% |

---

## 🧪 Testabilité

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

### Test d'Intégration

```typescript
describe('Notification Service', () => {
  it('should send email on RDV creation', async () => {
    const rdv = await createRendezVous(data);
    
    expect(sendRendezVousCreatedNotification).toHaveBeenCalledWith({
      patient: expect.objectContaining({ email: 'test@test.com' })
    });
  });
});
```

---

## 🔮 Évolution Future

### Architecture Modulaire pour Multi-Canal

```
notifications/
├── channels/
│   ├── email/          (actuel)
│   ├── sms/            (futur)
│   └── push/           (futur)
├── orchestrator.ts     (décide quel canal utiliser)
└── preferences.ts      (préférences utilisateur)
```

### Event-Driven Architecture

```
1. Event Emitter
   └─> emit('RDV_CREATED', data)

2. Notification Listener
   └─> on('RDV_CREATED', sendNotification)

3. Multiple Listeners
   ├─> Email Listener
   ├─> SMS Listener
   └─> Push Listener
```

---

## 📚 Références

- **Documentation** : `README.md`
- **Exemples** : `EXAMPLE.md`
- **Historique** : `CHANGELOG.md`
- **Installation** : `INTEGRATION.md`

---

_Dernière mise à jour : 12 octobre 2025_

