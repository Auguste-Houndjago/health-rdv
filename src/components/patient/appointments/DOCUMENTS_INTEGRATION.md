# 📄 Intégration des Documents dans AppointmentConfirmation

## ✅ Fonctionnalités Ajoutées

### 1. **Système d'Onglets**

Le composant `AppointmentConfirmation` utilise maintenant un système d'onglets pour organiser :
- **Onglet "Détails"** : Motif de consultation
- **Onglet "Documents"** : Visualisation et ajout de documents

### 2. **Visualisation des Documents**

Via le composant `DocumentsList` :
- Affiche tous les documents du patient
- Tri par date (plus récent en premier)
- Informations affichées :
  - Titre du document
  - Description (si disponible)
  - Date de création
- Actions disponibles :
  - **Voir** : Ouvre le document dans un nouvel onglet
  - **Télécharger** : Télécharge le document

### 3. **Ajout de Documents**

Via le composant `DocumentUpload` :
- Upload de fichiers (PDF, images, Word, Excel)
- Formulaire avec :
  - Sélection du fichier (drag & drop ou clic)
  - Titre (auto-rempli avec le nom du fichier)
  - Description (optionnelle)
- Limite : 50MB par fichier
- Rafraîchissement automatique de la liste après upload

### 4. **Hook useUser**

Utilisation du hook `useUser` pour :
- Récupérer l'ID de l'utilisateur connecté
- `patientId = user.id` (directement l'ID utilisateur)
- Gestion des états de chargement
- Vérification de l'authentification

## 🔧 Architecture Technique

### Composants

```
AppointmentConfirmation
├── Tabs
│   ├── TabsContent "details"
│   │   └── Input motif de consultation
│   └── TabsContent "documents"
│       ├── DocumentsList (visualisation)
│       └── DocumentUpload (ajout)
```

### Flux de Données

```
1. useUser() → Récupère user
2. user.id → patientId
3. DocumentsList(patientId) → Affiche les documents
4. DocumentUpload(patientId) → Upload nouveau document
5. handleDocumentUploadSuccess() → Rafraîchit DocumentsList
```

### États Gérés

```typescript
const [documentsRefresh, setDocumentsRefresh] = useState(0)
const [patientId, setPatientId] = useState<string | null>(null)
const { user, isLoading: userLoading } = useUser()
```

## 📊 Modèle de Données

### Document (Prisma)

```prisma
model Document {
  id           String   @id @default(uuid())
  titre        String
  description  String?
  dateCreation DateTime @default(now())
  patientId    String?
  url          String
  patient      Patient? @relation(fields: [patientId], references: [id], onDelete: Cascade)
}
```

### Interface TypeScript

```typescript
interface Document {
  id: string
  titre: string
  description?: string
  url: string
  dateCreation: Date
}
```

## 🎨 UI/UX

### États Conditionnels

1. **Loading** : Affiche un spinner pendant le chargement de l'utilisateur
2. **Authentifié** : Affiche DocumentsList + DocumentUpload
3. **Non Authentifié** : Message d'erreur avec icône

### Responsive Design

- Onglets en grille 2 colonnes
- Liste de documents adaptative
- Upload avec preview du fichier sélectionné

### Feedback Utilisateur

- Toast de succès après upload
- Toast d'erreur si problème
- Compteur de documents
- État vide informatif

## 🔐 Sécurité

### Validations

- ✅ Vérification de l'authentification (useUser)
- ✅ Validation du patientId avant affichage
- ✅ Vérification backend dans getPatientDocuments
- ✅ Types de fichiers limités (.pdf, .jpg, .png, .doc, .xls)
- ✅ Taille maximale : 50MB

### Permissions

- Seul le patient peut voir ses propres documents
- L'upload est lié à l'utilisateur connecté

## 📝 Server Actions

### getPatientDocuments(patientId)

**Fichier** : `src/services/documents/documents.ts`

```typescript
export async function getPatientDocuments(patientId: string) {
  // Récupère tous les documents du patient
  // Tri par dateCreation DESC
  // Include patient et utilisateur
  return { success, documents }
}
```

**Retour** :
```typescript
{
  success: boolean
  documents?: Document[]
  error?: string
}
```

### createDocument(input)

**Fichier** : `src/services/documents/documents.ts`

```typescript
interface CreateDocumentInput {
  titre: string
  description?: string
  url: string
  patientId: string
  fileName: string
  fileSize: number
  fileType: string
}
```

## 🚀 Utilisation

### Dans AppointmentConfirmation

```tsx
import { DocumentUpload } from '@/components/documents/DocumentUpload'
import { DocumentsList } from '@/components/documents/DocumentsList'
import { useUser } from '@/hooks/useUser'

// Dans le composant
const { user, isLoading: userLoading } = useUser()
const [patientId, setPatientId] = useState<string | null>(null)
const [documentsRefresh, setDocumentsRefresh] = useState(0)

useEffect(() => {
  if (user?.id) {
    setPatientId(user.id)
  }
}, [user])

const handleDocumentUploadSuccess = () => {
  setDocumentsRefresh(prev => prev + 1)
}

// Dans le JSX
<Tabs>
  <TabsContent value="documents">
    {userLoading ? (
      <LoadingSpinner />
    ) : patientId ? (
      <>
        <DocumentsList 
          patientId={patientId} 
          refreshTrigger={documentsRefresh}
        />
        <DocumentUpload 
          patientId={patientId}
          onUploadSuccess={handleDocumentUploadSuccess}
        />
      </>
    ) : (
      <ErrorMessage />
    )}
  </TabsContent>
</Tabs>
```

## 📈 Améliorations Possibles

### Court Terme
- [ ] Filtrer les documents par type
- [ ] Recherche dans les documents
- [ ] Prévisualisation des PDF inline

### Moyen Terme
- [ ] Catégorisation des documents
- [ ] Tags/labels personnalisables
- [ ] Partage de documents avec le médecin
- [ ] Historique des modifications

### Long Terme
- [ ] OCR pour extraction de texte
- [ ] Analyse automatique des documents
- [ ] Intégration avec dossier médical
- [ ] Signature électronique

## 🐛 Debugging

### Problèmes Courants

**Document ne s'affiche pas**
- Vérifier que `patientId` est correctement défini
- Vérifier les logs de `getPatientDocuments`
- Vérifier le `refreshTrigger`

**Upload échoue**
- Vérifier la taille du fichier (< 50MB)
- Vérifier le type de fichier
- Vérifier les logs de `createDocument`

**User null**
- Vérifier l'authentification avec `useUser`
- Vérifier le cache React Query
- Forcer un refresh si nécessaire

### Logs Utiles

```typescript
console.log("User:", user)
console.log("PatientId:", patientId)
console.log("Documents refresh:", documentsRefresh)
```

## ✅ Checklist d'Intégration

- [x] Import des composants DocumentUpload et DocumentsList
- [x] Import du hook useUser
- [x] Import des composants Tabs
- [x] Ajout des états (patientId, documentsRefresh)
- [x] useEffect pour récupérer patientId
- [x] Handler handleDocumentUploadSuccess
- [x] Structure Tabs avec 2 onglets
- [x] Gestion du loading state
- [x] Gestion de l'état non authentifié
- [x] Props correctes pour DocumentsList
- [x] Props correctes pour DocumentUpload
- [x] Tests de linting (0 erreurs)

## 📚 Dépendances

### Composants UI
- `@/components/ui/tabs`
- `@/components/ui/card`
- `@/components/ui/button`
- `@/components/ui/skeleton`

### Services
- `@/services/documents/documents`
- `@/hooks/useUser`
- `@/hooks/utils/useDocumentUploader`

### Icons
- `lucide-react` : File, Download, Eye, Calendar

---

**Créé le** : 12 octobre 2025  
**Dernière mise à jour** : 12 octobre 2025  
**Version** : 1.0.0  
**Status** : ✅ Opérationnel


