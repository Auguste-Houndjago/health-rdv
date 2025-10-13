# Module Filters - Composants de Filtrage Réutilisables

Ce module contient tous les composants de filtrage modulaires et réutilisables.

## 🎯 Structure

```
filters/
├── index.ts                      # Exports centralisés
├── types.ts                      # Types TypeScript
├── constants.ts                  # Constantes (options de statut)
├── FilterBadge.tsx              # Badge cliquable pour filtres
├── SearchInput.tsx              # Champ de recherche
├── StatutFilter.tsx             # Sélecteur de statut
├── ActiveFiltersIndicator.tsx   # Indicateurs de filtres actifs
└── README.md                     # Cette documentation
```

## 📦 Composants

### 1. FilterBadge
Badge cliquable avec icône pour afficher et activer des filtres.

**Props:**
```tsx
interface FilterBadgeProps {
  label: string;                    // Texte du badge
  count: number;                    // Nombre à afficher
  isActive: boolean;                // Si le filtre est actif
  icon?: React.ComponentType;       // Icône optionnelle
  onClick: () => void;              // Callback au clic
  variant?: BadgeVariant;           // Variante Shadcn
  className?: string;               // Classes CSS supplémentaires
}
```

**Utilisation:**
```tsx
<FilterBadge
  label="En attente"
  count={45}
  isActive={filter === "EN_ATTENTE"}
  icon={Clock}
  onClick={() => setFilter("EN_ATTENTE")}
/>
```

### 2. SearchInput
Champ de recherche avec icône de loupe.

**Props:**
```tsx
interface SearchInputProps {
  value: string;                    // Valeur du champ
  onChange: (value: string) => void; // Callback au changement
  placeholder?: string;             // Texte placeholder
  className?: string;               // Classes CSS supplémentaires
}
```

**Utilisation:**
```tsx
<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Rechercher..."
/>
```

### 3. StatutFilter
Sélecteur dropdown pour filtrer par statut.

**Props:**
```tsx
interface StatutFilterProps {
  value: string;                    // Valeur sélectionnée
  onValueChange: (value: string) => void; // Callback au changement
  options: readonly FilterOption[]; // Options disponibles
  placeholder?: string;             // Texte placeholder
  className?: string;               // Classes CSS supplémentaires
}
```

**Utilisation:**
```tsx
<StatutFilter
  value={statutFilter}
  onValueChange={setStatutFilter}
  options={STATUT_OPTIONS}
  className="w-[180px]"
/>
```

### 4. ActiveFiltersIndicator
Affiche les filtres actuellement actifs avec boutons de suppression.

**Props:**
```tsx
interface ActiveFiltersIndicatorProps {
  searchTerm: string;               // Terme de recherche
  statutFilter: FilterStatut;       // Filtre de statut
  onSearchChange: (value: string) => void; // Callback recherche
  onStatutChange: (value: FilterStatut) => void; // Callback statut
  statutOptions: readonly FilterOption[]; // Options de statut
}
```

**Utilisation:**
```tsx
<ActiveFiltersIndicator
  searchTerm={searchTerm}
  statutFilter={statutFilter}
  onSearchChange={setSearchTerm}
  onStatutChange={setStatutFilter}
  statutOptions={STATUT_OPTIONS}
/>
```

## 🔧 Types

### FilterStatut
```tsx
type FilterStatut = 'all' | 'EN_ATTENTE' | 'APPROUVE' | 'REJETE';
```

### FilterStats
```tsx
interface FilterStats {
  total: number;
  enAttente: number;
  approuve: number;
  rejete: number;
}
```

### FilterOption
```tsx
interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
}
```

### FiltersBarProps
```tsx
interface FiltersBarProps {
  searchTerm: string;
  statutFilter: FilterStatut;
  stats: FilterStats;
  onSearchChange: (value: string) => void;
  onStatutChange: (value: FilterStatut) => void;
  onClearFilters: () => void;
  searchPlaceholder?: string;
  customFilters?: React.ReactNode;
}
```

## 🎨 Constantes

### STATUT_OPTIONS
Configuration prédéfinie des options de statut :

```tsx
export const STATUT_OPTIONS = [
  { value: "all", label: "Tous les statuts" },
  { value: "EN_ATTENTE", label: "En attente", icon: Clock },
  { value: "APPROUVE", label: "Approuvées", icon: CheckCircle },
  { value: "REJETE", label: "Rejetées", icon: XCircle },
] as const satisfies readonly FilterOption[];
```

## 🎣 Hook associé

### useFilters
Hook personnalisé pour gérer l'état des filtres.

**Localisation:** `src/hooks/useFilters.ts`

**Utilisation:**
```tsx
const {
  searchTerm,
  statutFilter,
  setSearchTerm,
  setStatutFilter,
  hasActiveFilters,
  clearFilters
} = useFilters({
  initialSearch: "",
  initialStatut: "all"
});
```

**Retourne:**
- `searchTerm`: Terme de recherche actuel
- `statutFilter`: Filtre de statut actuel
- `setSearchTerm`: Fonction pour modifier la recherche
- `setStatutFilter`: Fonction pour modifier le statut
- `hasActiveFilters`: Boolean indiquant si des filtres sont actifs
- `clearFilters`: Fonction pour réinitialiser tous les filtres

## 📝 Exemple complet

```tsx
import { 
  FilterBadge, 
  SearchInput, 
  StatutFilter,
  ActiveFiltersIndicator,
  STATUT_OPTIONS,
  type FilterStats
} from "@/components/admin/demandes/filters";
import { useFilters } from "@/hooks/useFilters";

export function MyFilterComponent() {
  const {
    searchTerm,
    statutFilter,
    setSearchTerm,
    setStatutFilter,
    clearFilters
  } = useFilters();

  const stats: FilterStats = {
    total: 150,
    enAttente: 45,
    approuve: 80,
    rejete: 25
  };

  return (
    <div className="space-y-4">
      {/* Recherche et sélecteur */}
      <div className="flex gap-2">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher..."
        />
        <StatutFilter
          value={statutFilter}
          onValueChange={setStatutFilter}
          options={STATUT_OPTIONS}
        />
      </div>

      {/* Badges de filtres */}
      <div className="flex gap-2">
        <FilterBadge
          label="Total"
          count={stats.total}
          isActive={statutFilter === "all"}
          onClick={() => setStatutFilter("all")}
        />
        <FilterBadge
          label="En attente"
          count={stats.enAttente}
          isActive={statutFilter === "EN_ATTENTE"}
          icon={Clock}
          onClick={() => setStatutFilter("EN_ATTENTE")}
        />
      </div>

      {/* Indicateur de filtres actifs */}
      <ActiveFiltersIndicator
        searchTerm={searchTerm}
        statutFilter={statutFilter}
        onSearchChange={setSearchTerm}
        onStatutChange={setStatutFilter}
        statutOptions={STATUT_OPTIONS}
      />
    </div>
  );
}
```

## ✅ Avantages

1. **Réutilisabilité** : Chaque composant peut être utilisé indépendamment
2. **Maintenabilité** : Modifications centralisées
3. **Type Safety** : TypeScript strict partout
4. **Extensibilité** : Facile d'ajouter de nouveaux filtres
5. **Testabilité** : Composants isolés et testables
6. **Consistance** : Même look & feel partout
7. **Customisation** : Props pour personnaliser le comportement
8. **Performance** : Composants légers et optimisés

## 🔄 Réutilisation dans d'autres parties

Ces composants peuvent être utilisés pour d'autres types de filtrage :

```tsx
// Pour filtrer des patients
<SearchInput 
  value={search} 
  onChange={setSearch}
  placeholder="Rechercher un patient..."
/>

// Pour filtrer des rendez-vous
<StatutFilter
  value={rdvStatut}
  onValueChange={setRdvStatut}
  options={RDV_STATUT_OPTIONS}
/>

// Badge personnalisé
<FilterBadge
  label="Urgents"
  count={urgentCount}
  isActive={showUrgent}
  icon={AlertTriangle}
  onClick={toggleUrgent}
/>
```

## 🎓 Bonnes pratiques

1. ✅ Toujours typer les props avec TypeScript
2. ✅ Utiliser les tokens Shadcn (pas de couleurs en dur)
3. ✅ Passer les callbacks via props (pas de context)
4. ✅ Garder les composants petits et focalisés
5. ✅ Documenter les props et l'utilisation
6. ✅ Exporter via index.ts pour imports propres
7. ✅ Utiliser `readonly` pour les constantes
8. ✅ Préfixer les interfaces par leur nom de composant


