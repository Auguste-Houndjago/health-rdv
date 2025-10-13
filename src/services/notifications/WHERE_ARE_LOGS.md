# 🔍 Où Trouver les Logs de Notifications ?

## 🎯 Important : Logs Serveur vs Client

Les logs du service de notifications apparaissent dans **2 endroits différents** selon le code :

---

## 📊 Logs Serveur (Server Actions)

### Où les voir ?

Les logs détaillés (avec emojis 📧 ✅ ❌) apparaissent dans le **TERMINAL** où vous avez lancé `npm run dev`, **PAS dans la console du navigateur**.

### Commandes

```bash
# Démarrer le serveur
npm run dev

# Les logs apparaîtront ici ⬇️
```

### Exemple de ce que vous verrez

```
📤 === ENVOI EMAIL TEXTE BRUT ===
📧 Destinataire: test@example.com
📝 Sujet: Notification de test
📄 Message: Salut Auguste 👋...
🔑 From: Attendancy <onboarding@resend.dev>

✅ Email texte envoyé avec succès !
🆔 Response: {
  "data": {
    "id": "msg_abc123"
  }
}
================================
```

---

## 🔵 Logs Client (Navigateur)

### Où les voir ?

Les logs marqués `[CLIENT]` apparaissent dans la **console du navigateur** (F12 → Console).

### Exemple

```
🔵 [CLIENT] Début envoi email...
📧 Destinataire: test@example.com
📝 Sujet: Notification de test
⏳ [CLIENT] Appel de sendPlainEmail()...
📊 [CLIENT] Résultat reçu: { success: true, ... }
✅ [CLIENT] Email envoyé avec succès
```

---

## 🚀 Guide Pratique : Comment Tester

### Étape 1 : Ouvrir 2 Fenêtres

1. **Terminal** : Où tourne `npm run dev`
2. **Navigateur** : Console (F12 → Console)

### Étape 2 : Lancer le Test

1. Aller sur `http://localhost:3000/test`
2. Remplir le formulaire
3. Cliquer sur "Envoyer l'email"

### Étape 3 : Observer les Logs

**Dans le navigateur (Console F12)** :
```
🔵 [CLIENT] Début envoi email...
📧 Destinataire: test@example.com
⏳ [CLIENT] Appel de sendPlainEmail()...
```

**Dans le terminal** :
```
📤 === ENVOI EMAIL TEXTE BRUT ===
📧 Destinataire: test@example.com
📝 Sujet: Notification de test
✅ Email texte envoyé avec succès !
🆔 Response: { ... }
```

**Retour dans le navigateur** :
```
📊 [CLIENT] Résultat reçu: { success: true }
✅ [CLIENT] Email envoyé avec succès
```

---

## 📸 Capture d'Écran Recommandée

```
┌─────────────────────────────────────────┐
│  Terminal (npm run dev)                 │
│  📤 === ENVOI EMAIL ===                 │
│  ✅ Email envoyé !                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Navigateur (Console F12)               │
│  🔵 [CLIENT] Début envoi...             │
│  ✅ [CLIENT] Email envoyé               │
└─────────────────────────────────────────┘
```

---

## 🐛 Problèmes Courants

### 1. "Je ne vois aucun log serveur"

**Problème** : Vous regardez la console du navigateur.

**Solution** : Regarder le TERMINAL où tourne `npm run dev`.

---

### 2. "Je ne vois que les logs [CLIENT]"

**C'est normal !** Les logs serveur sont dans le terminal, pas dans le navigateur.

**Solution** : Ouvrir le terminal pour voir les logs détaillés.

---

### 3. "Les logs serveur n'apparaissent pas dans le terminal"

**Causes possibles** :
1. Le code serveur n'a pas été exécuté
2. Une erreur empêche l'exécution
3. Le serveur a crash

**Solution** :
```bash
# Redémarrer le serveur
Ctrl+C
npm run dev
```

---

### 4. "Les logs sont mélangés"

**C'est normal !** Next.js affiche beaucoup de logs. Utilisez les emojis pour filtrer :

```bash
# Dans un terminal séparé
npm run dev 2>&1 | grep "📤"
npm run dev 2>&1 | grep "✅"
npm run dev 2>&1 | grep "❌"
```

---

## 🎨 Comprendre les Icônes

| Icône | Signification | Où |
|-------|---------------|-----|
| 🔵 [CLIENT] | Log côté client | Navigateur |
| 📤 | Envoi d'email | Terminal (Serveur) |
| ✅ | Succès | Terminal (Serveur) |
| ❌ | Erreur | Terminal (Serveur) |
| 📧 | Email/Destinataire | Les deux |
| 📝 | Sujet | Les deux |
| 🆔 | Message ID | Terminal (Serveur) |
| ⏰ | Timestamp | Terminal (Serveur) |

---

## 📹 Workflow Complet

```
1. [NAVIGATEUR] L'utilisateur clique "Envoyer"
   └─> 🔵 [CLIENT] Logs dans la console du navigateur

2. [CLIENT → SERVER] Appel de la fonction server action
   └─> ⏳ Requête HTTP vers le serveur

3. [TERMINAL] Le serveur exécute sendPlainEmail()
   └─> 📤 Logs détaillés dans le terminal
   └─> 📧 Envoi via Resend
   └─> ✅ Confirmation

4. [SERVER → CLIENT] Retour du résultat
   └─> 📊 [CLIENT] Log du résultat dans le navigateur
```

---

## 🔧 Configuration pour Mieux Voir les Logs

### Option 1 : Split Terminal (Recommandé)

Utiliser 2 terminaux côte à côte :
```
┌─────────────┬─────────────┐
│  Terminal 1 │  Terminal 2 │
│  npm run dev│  git status │
└─────────────┴─────────────┘
```

### Option 2 : Filtrer les Logs

```bash
# Terminal 1 : Serveur
npm run dev

# Terminal 2 : Filtrer uniquement les notifications
npm run dev 2>&1 | grep -E "(📤|✅|❌|📧)"
```

### Option 3 : Fichier de Logs

```bash
# Sauvegarder les logs dans un fichier
npm run dev > logs.txt 2>&1 &
tail -f logs.txt | grep "📤"
```

---

## 🎯 Checklist de Vérification

Avant de dire "les logs ne fonctionnent pas" :

- [ ] J'ai regardé le **TERMINAL** (pas la console du navigateur)
- [ ] Le serveur `npm run dev` est bien en cours d'exécution
- [ ] J'ai bien cliqué sur "Envoyer" dans le navigateur
- [ ] Aucune erreur n'a interrompu l'envoi
- [ ] J'ai scroll dans le terminal (les logs peuvent être au-dessus)

---

## 📚 Ressources

- **Test Email** : `http://localhost:3000/test`
- **Test RDV** : `http://localhost:3000/test/rendez-vous`
- **Code Serveur** : `src/services/notifications/email-service.ts`
- **Logs Guide** : `src/services/notifications/LOGS.md`

---

## 💡 Astuce Pro

Utilisez **2 écrans** ou **split screen** :
- Écran 1 : Terminal avec les logs serveur
- Écran 2 : Navigateur avec la console ouverte

Vous verrez ainsi les logs des 2 côtés en temps réel ! 🚀

---

**Dernière mise à jour** : 12 octobre 2025

