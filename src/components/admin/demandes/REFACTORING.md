# 🔄 Refactoring - DemandeFiltersBar

## 📊 Résumé de la refactorisation

Le composant `DemandeFiltersBar.tsx` a été refactorisé selon l'approche modulaire décrite dans `demand.md`.

### Avant (172 lignes monolithiques)
```
DemandeFiltersBar.tsx  [172 lignes]
├── Logique de recherche (inline)
├── Sélecteur de statut (inline)
├── Badges de filtres (inline)
└── Indicateurs actifs (inline)
```

### Après (Structure modulaire)
```
filters/
├── index.ts                      [15 lignes]  ← Exports
├── types.ts                      [29 lignes]  ← Types
├── constants.ts                  [22 lignes]  ← Constantes
├── FilterBadge.tsx              [41 lignes]  ← Composant réutilisable
├── SearchInput.tsx              [27 lignes]  ← Composant réutilisable
├── StatutFilter.tsx             [41 lignes]  ← Composant réutilisable
├── ActiveFiltersIndicator.tsx   [54 lignes]  ← Composant réutilisable
└── README.md                     [doc]

DemandeFiltersBar.tsx             [105 lignes] ← Orchestrateur

hooks/
└── useFilters.ts                 [32 lignes]  ← Hook personnalisé
```

## 📈 Métriques

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Fichiers | 1 | 10 | +900% |
| Lignes totales | 172 | ~366 (avec doc) | +113% (mais modulaire) |
| Lignes max/fichier | 172 | 105 | -39% |
| Composants réutilisables | 0 | 4 | ∞ |
| Hooks personnalisés | 0 | 1 | +1 |
| Types exportés | 0 | 5 | +5 |
| Complexité | Haute | Basse | ↓↓↓ |

## 🎯 Objectifs atteints

### 1. ✅ Séparation des responsabilités
- **Avant** : Tout mélangé dans un fichier
- **Après** : Chaque composant a une responsabilité unique

### 2. ✅ Réutilisabilité
- **Avant** : Code dupliqué nécessaire pour réutilisation
- **Après** : Import simple des composants nécessaires

### 3. ✅ Type Safety
- **Avant** : Types inline ou absents
- **Après** : Types centralisés et exportés

### 4. ✅ Maintenabilité
- **Avant** : Modifications risquées (tout connecté)
- **Après** : Modifications localisées et sûres

### 5. ✅ Testabilité
- **Avant** : Difficile de tester unitairement
- **Après** : Chaque composant testable indépendamment

### 6. ✅ Documentation
- **Avant** : Aucune documentation
- **Après** : README complet avec exemples

## 🔧 Composants extraits

### FilterBadge
**Responsabilité** : Afficher un badge cliquable avec compteur

**Avant** :
```tsx
<Badge 
  variant={statutFilter === "EN_ATTENTE" ? "default" : "outline"}
  className="cursor-pointer transition-colors"
  onClick={() => onStatutChange(statutFilter === "EN_ATTENTE" ? "all" : "EN_ATTENTE")}
>
  <Clock className="w-3 h-3 mr-1" />
  En attente: {stats.enAttente}
</Badge>
```

**Après** :
```tsx
<FilterBadge
  label="En attente"
  count={stats.enAttente}
  isActive={statutFilter === "EN_ATTENTE"}
  icon={Clock}
  onClick={() => onStatutChange(statutFilter === "EN_ATTENTE" ? "all" : "EN_ATTENTE")}
/>
```

### SearchInput
**Responsabilité** : Champ de recherche avec icône

**Avant** :
```tsx
<div className="flex-1 relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
  <Input
    placeholder="Rechercher par nom, email, spécialité..."
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
    className="pl-10"
  />
</div>
```

**Après** :
```tsx
<SearchInput
  value={searchTerm}
  onChange={onSearchChange}
  placeholder={searchPlaceholder}
/>
```

### StatutFilter
**Responsabilité** : Dropdown pour sélectionner un statut

**Avant** :
```tsx
<Select value={statutFilter} onValueChange={onStatutChange}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Statut" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">Tous les statuts</SelectItem>
    <SelectItem value="EN_ATTENTE">
      <div className="flex items-center gap-2">
        <Clock className="w-3 h-3" />
        En attente
      </div>
    </SelectItem>
    {/* ... */}
  </SelectContent>
</Select>
```

**Après** :
```tsx
<StatutFilter
  value={statutFilter}
  onValueChange={onStatutChange}
  options={STATUT_OPTIONS}
  className="w-[180px]"
/>
```

### ActiveFiltersIndicator
**Responsabilité** : Afficher les filtres actifs avec suppression

**Avant** : Inline conditionnel de 30 lignes

**Après** :
```tsx
<ActiveFiltersIndicator 
  searchTerm={searchTerm}
  statutFilter={statutFilter}
  onSearchChange={onSearchChange}
  onStatutChange={onStatutChange}
  statutOptions={STATUT_OPTIONS}
/>
```

## 🎣 Hook personnalisé

### useFilters
**Responsabilité** : Gérer l'état des filtres

**Avant** : État géré manuellement dans le composant parent
```tsx
const [searchTerm, setSearchTerm] = useState("");
const [statutFilter, setStatutFilter] = useState<string>("all");

const clearFilters = () => {
  setSearchTerm("");
  setStatutFilter("all");
};
```

**Après** : Hook réutilisable
```tsx
const {
  searchTerm,
  statutFilter,
  setSearchTerm,
  setStatutFilter,
  hasActiveFilters,
  clearFilters
} = useFilters();
```

## 📦 Constantes centralisées

### STATUT_OPTIONS
**Responsabilité** : Configuration des options de statut

**Avant** : Hardcodé dans le JSX

**Après** : Constante typée et réutilisable
```tsx
export const STATUT_OPTIONS = [
  { value: "all", label: "Tous les statuts" },
  { value: "EN_ATTENTE", label: "En attente", icon: Clock },
  { value: "APPROUVE", label: "Approuvées", icon: CheckCircle },
  { value: "REJETE", label: "Rejetées", icon: XCircle },
] as const satisfies readonly FilterOption[];
```

## 🎨 Types exportés

### Types disponibles
```tsx
export type FilterStatut = 'all' | 'EN_ATTENTE' | 'APPROUVE' | 'REJETE';

export interface FilterStats {
  total: number;
  enAttente: number;
  approuve: number;
  rejete: number;
}

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
}

export interface FiltersBarProps {
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

## 💡 Améliorations apportées

### 1. Extensibilité
Ajout du prop `customFilters` pour insérer des filtres supplémentaires :
```tsx
<DemandeFiltersBar
  {...props}
  customFilters={
    <Select>
      <SelectTrigger>Date</SelectTrigger>
      {/* ... */}
    </Select>
  }
/>
```

### 2. Placeholder personnalisable
```tsx
<DemandeFiltersBar
  {...props}
  searchPlaceholder="Rechercher un médecin..."
/>
```

### 3. Options configurables
Les options de statut sont maintenant configurables :
```tsx
const MY_OPTIONS = [
  { value: "all", label: "Tous" },
  { value: "ACTIF", label: "Actifs", icon: Check },
  { value: "INACTIF", label: "Inactifs", icon: X },
];

<StatutFilter options={MY_OPTIONS} />
```

## 🚀 Exemples d'utilisation

### Utilisation standard (inchangée)
```tsx
import { DemandeFiltersBar } from "@/components/admin/demandes";

<DemandeFiltersBar
  searchTerm={searchTerm}
  statutFilter={statutFilter}
  stats={stats}
  onSearchChange={setSearchTerm}
  onStatutChange={setStatutFilter}
  onClearFilters={clearFilters}
/>
```

### Utilisation avec hook
```tsx
import { DemandeFiltersBar } from "@/components/admin/demandes";
import { useFilters } from "@/hooks/useFilters";

const MyComponent = () => {
  const filters = useFilters();
  
  return (
    <DemandeFiltersBar
      {...filters}
      stats={stats}
    />
  );
};
```

### Réutilisation de sous-composants
```tsx
import { SearchInput, FilterBadge } from "@/components/admin/demandes/filters";

// Dans une autre page
<SearchInput 
  value={search}
  onChange={setSearch}
  placeholder="Rechercher un patient..."
/>

<FilterBadge
  label="Urgents"
  count={urgentCount}
  isActive={showUrgent}
  icon={AlertTriangle}
  onClick={toggleUrgent}
/>
```

## 🧪 Tests possibles

Chaque composant peut maintenant être testé indépendamment :

```tsx
// FilterBadge.test.tsx
describe('FilterBadge', () => {
  it('affiche le label et le count', () => {
    render(<FilterBadge label="Test" count={5} isActive={false} onClick={jest.fn()} />);
    expect(screen.getByText('Test: 5')).toBeInTheDocument();
  });

  it('applique le variant "default" quand actif', () => {
    render(<FilterBadge label="Test" count={5} isActive={true} onClick={jest.fn()} />);
    // ... assertions
  });

  it('appelle onClick au clic', () => {
    const onClick = jest.fn();
    render(<FilterBadge label="Test" count={5} isActive={false} onClick={onClick} />);
    fireEvent.click(screen.getByText('Test: 5'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## 📚 Documentation

- ✅ `filters/README.md` : Documentation complète des composants
- ✅ `REFACTORING.md` : Ce fichier (guide de migration)
- ✅ Types exportés et documentés
- ✅ Exemples d'utilisation partout

## ✨ Résultat final

### Avant
- ❌ 172 lignes monolithiques
- ❌ Aucune réutilisabilité
- ❌ Difficile à tester
- ❌ Difficile à maintenir
- ❌ Pas de documentation

### Après
- ✅ 4 composants réutilisables
- ✅ 1 hook personnalisé
- ✅ 5 types exportés
- ✅ Constantes configurables
- ✅ Documentation complète
- ✅ Facilement testable
- ✅ Hautement maintenable
- ✅ Extensible à volonté

**La refactorisation est un succès ! 🎉**


