# 🧪 Page de Test - Envoi d'Emails

## 📍 URL

```
http://localhost:3000/test
```

## 🎯 Objectif

Cette page permet de tester rapidement l'envoi d'emails via le service de notifications modulaire sans avoir à créer un rendez-vous complet.

## ✨ Fonctionnalités

- ✅ Formulaire interactif pour saisir les informations
- ✅ Envoi d'email texte brut
- ✅ Feedback visuel (succès/erreur)
- ✅ Affichage de l'ID du message envoyé
- ✅ Toast notifications
- ✅ Design responsive avec Shadcn UI

## 🔧 Configuration

Assurez-vous que `RESEND_API_KEY` est configurée dans votre `.env` :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

## 📧 Service Utilisé

Cette page utilise la fonction `sendPlainEmail()` du service de notifications modulaire :

```typescript
import { sendPlainEmail } from "@/services/notifications";

const result = await sendPlainEmail(
  "destinataire@email.com",
  "Sujet",
  "Message"
);
```

## 🚀 Utilisation

1. Accéder à `/test`
2. Remplir les champs :
   - **Destinataire** : Email du destinataire
   - **Sujet** : Sujet de l'email
   - **Message** : Contenu du message (texte brut)
3. Cliquer sur "Envoyer l'email"
4. Vérifier le résultat :
   - ✅ Message de succès avec l'ID
   - ❌ Message d'erreur avec les détails

## 🎨 Composants Utilisés

- `Card`, `CardContent`, `CardHeader`, `CardTitle`, `CardDescription`
- `Button`
- `Input`
- `Label`
- `Textarea`
- Icons: `Mail`, `Send`, `CheckCircle`, `AlertCircle`

## 🐛 Dépannage

### Erreur : "Service d'email non configuré"

**Solution** : Vérifier que `RESEND_API_KEY` est définie dans `.env` et redémarrer le serveur.

### Erreur : "Invalid API key"

**Solution** : Régénérer une nouvelle API key sur [resend.com](https://resend.com) et mettre à jour `.env`.

### Email non reçu

**Solutions** :
1. Vérifier les spams
2. Consulter le dashboard Resend : [resend.com/emails](https://resend.com/emails)
3. Vérifier que le domaine est vérifié sur Resend

## 📊 Logs

Les logs apparaissent dans la console :

```
✅ Email envoyé: { id: "msg_abc123" }
```

ou

```
❌ Erreur: { message: "Invalid API key" }
```

## 🔒 Sécurité

⚠️ **Important** : Cette page de test ne devrait **PAS** être accessible en production. 

Options :
1. Supprimer le dossier `src/app/test/` avant le déploiement
2. Ajouter une authentification admin
3. Désactiver via une variable d'environnement

## 🗑️ Suppression

Pour supprimer cette page de test :

```bash
rm -rf src/app/test
```

---

**Créé le** : 12 octobre 2025  
**Dernière mise à jour** : 12 octobre 2025

