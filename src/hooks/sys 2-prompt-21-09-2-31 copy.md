hooks/
  core/
    useEntity.ts          // Hook de base sans filtrage (interne)
    useEntityCache.ts     // Hook unifié avec syntaxe shorthand
    entityFilters.ts      // Logique de filtrage externe



//@/hooks/core/useEntity.ts
"use client";
import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { EntityFetchFn, EntityParams } from "@/types/core";
import { Path } from "@/types/core"; // Assurez-vous d'avoir défini le type Path<T>

// Fonction de transformation par défaut réutilisable
const defaultTransform = <T extends { id: string }>(items: T[]) => ({
  items,
  byId: items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, T>)
});

export interface UseEntityOptions<T> {
  entityName: string;
  fetchFn: EntityFetchFn<T>;
  transformFn?: (items: T[]) => any;
  suspense?: boolean;
  enabled?: boolean;
  initialParams?: EntityParams;
  staleTime?: number;
}

/**
 * Hook principal pour la gestion des entités - Source de vérité unique
 * Version optimisée avec refetchWithParams amélioré
 */
export const useEntity = <T extends { id: string }>(
  options: UseEntityOptions<T>
) => {
  const {
    entityName,
    fetchFn,
    transformFn,
    suspense = false,
    enabled = true,
    initialParams,
    staleTime = 1000 * 60 * 5
  } = options;

  const queryClient = useQueryClient();
  const queryKey = [entityName, initialParams].filter(Boolean);

  const {
    data,
    isLoading,
    isFetching,
    error,
    isError,
    isSuccess,
    refetch,
  } = useQuery<T[], Error, any>({
    queryKey,
    queryFn: () => fetchFn(initialParams),
    staleTime,
    refetchOnWindowFocus: false,
    enabled,
    ...(suspense ? { suspense: true } : {}),
    
    // Utilisation de la transformation cohérente
    select: transformFn || defaultTransform,
  });

  /**
   * Refetch qui maintient la cohérence du cache avec les améliorations demandées
   */
  const refetchWithParams = async (newParams: EntityParams) => {
    // 1. Utiliser la clé complète pour la cohérence du cache
    const newQueryKey = [entityName, newParams].filter(Boolean);
    
    // 2. Fetch des nouvelles données
    const newData = await fetchFn(newParams);
    
    // 3. Application de la transformation pour uniformité
    const transformedNewData = transformFn 
      ? transformFn(newData) 
      : defaultTransform(newData);
    
    // 4. Mise à jour du cache avec la clé complète
    queryClient.setQueryData(newQueryKey, (oldData: any) => {
      if (!oldData) return transformedNewData;
      
      // 5. Fusion intelligente basée sur les IDs
      const mergedItems = mergeItemsById(oldData.items, newData);
      
      // 6. Application de la transformation aux données fusionnées
      const mergedTransformed = transformFn 
        ? transformFn(mergedItems) 
        : defaultTransform(mergedItems);
      
      return mergedTransformed;
    });
    
    return newData;
  };

  return {
    data: data || { items: [], byId: {} },
    loading: isLoading,
    refreshing: isFetching,
    error,
    isError,
    isSuccess,
    refetch,
    refetchWithParams,
    queryClient,
  };
};


// Helpers pour la manipulation des données
function mergeItemsById<T extends { id: string }>(oldItems: T[], newItems: T[]): T[] {
  const result = [...oldItems];
  
  newItems.forEach(newItem => {
    const index = result.findIndex(item => item.id === newItem.id);
    if (index >= 0) {
      result[index] = newItem;
    } else {
      result.push(newItem);
    }
  });
  
  return result;
}

function itemsToById<T extends { id: string }>(items: T[]): Record<string, T> {
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, T>);
}


//@/hooks/core/entityFilters.ts
import { PartialDeep } from "@/types/core";
import { useMemo } from "react";

/**
 * Applique un filtre à un tableau d'items
 * Retourne les items non modifiés si aucun filtre n'est spécifié
 */
export const applyFilter = <T>(
  items: T[],
  filterFn?: (item: T) => boolean
): T[] => {
  if (!filterFn) return items;
  return items.filter(filterFn);
};

/**
 * Applique un tri à un tableau d'items
 * Retourne les items non modifiés si aucun tri n'est spécifié
 */
export const applySort = <T>(
  items: T[],
  sortFn?: (a: T, b: T) => number
): T[] => {
  if (!sortFn) return items;
  
  // Créer une copie pour éviter de muter le tableau original
  return [...items].sort(sortFn);
};

/**
 * Crée un dictionnaire byId à partir d'un tableau d'items
 * Réutilise le dictionnaire existant si les items n'ont pas changé
 */
export const createByIdMap = <T extends { id: string }>(
  items: T[],
  existingById?: Record<string, T>
): Record<string, T> => {
  // Si les items n'ont pas changé et qu'un byId existe déjà, on le réutilise
  if (existingById && Object.keys(existingById).length === items.length) {
    const firstItem = items[0];
    if (firstItem && existingById[firstItem.id] === firstItem) {
      return existingById;
    }
  }
  
  // Sinon, on crée un nouveau dictionnaire
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, T>);
};


/**
 * Filtre récursif pour les objets imbriqués avec pré-compilation
 */
export const useFilterFn = <T>(where?: PartialDeep<T>): ((item: T) => boolean) | undefined => {
  return useMemo(() => {
    if (!where) return undefined;

    // Pré-compilation des filtres
    const compiledFilters = Object.entries(where).map(([path, value]) => ({
      keys: path.split("."),   // Split fait UNE SEULE FOIS par filtre
      value
    }));

    return (item: T) =>
      compiledFilters.every(filter => {
        // Parcours du chemin pré-compilé
        let val: any = item;
        for (const key of filter.keys) {
          val = val?.[key];
          // Arrêt précoce si la valeur est undefined
          if (val === undefined) break;
        }
        return val === filter.value;
      });
  }, [where]);
};

/**
 * Tri simple par clé avec pré-compilation optimisée
 */
export const useSortFn = <T>(
  sort?: { key: string; order: "asc" | "desc" }
): ((a: T, b: T) => number) | undefined => {
  return useMemo(() => {
    if (!sort) return undefined;
    
    // Pré-compilation du chemin de tri
    const keys = sort.key.split(".");
    const order = sort.order;
    
    // Fonction helper pour récupérer une valeur nested (pré-compilée)
    const getNestedValue = (obj: any) => {
      let value = obj;
      for (const key of keys) {
        value = value?.[key];
        if (value === undefined) break;
      }
      return value;
    };
    
    return (a: T, b: T) => {
      const aVal = getNestedValue(a);
      const bVal = getNestedValue(b);
      
      // Gestion des valeurs null/undefined
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      
      // Comparaison en fonction du type et de l'ordre
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      // Conversion en string pour la comparaison
      const aStr = String(aVal);
      const bStr = String(bVal);
      
      return order === "asc" 
        ? aStr.localeCompare(bStr) 
        : bStr.localeCompare(aStr);
    };
  }, [sort]);
};


//@/hooks/core/useEntityCache.ts
"use client";
import { useEntity, UseEntityOptions } from "./useEntity";
import { useMemo } from "react";
import {
  applyFilter,
  applySort,
  createByIdMap,
  useFilterFn,
  useSortFn,
  PartialDeep
} from "./entityFilters";

/**
 * Options pour useEntityCache avec syntaxe shorthand
 */
export interface UseEntityCacheOptions<T> extends UseEntityOptions<T> {
  where?: PartialDeep<T>;
  sort?: { key: Path<T>; order: "asc" | "desc" };
}

/**
 * Hook useEntityCache - Combine useEntity avec la syntaxe shorthand pour le filtrage/tri
 * Performance optimale : n'applique les transformations que si des filtres/tris sont spécifiés
 */
export const useEntityCache = <T extends { id: string }>(
  options: UseEntityCacheOptions<T>
) => {
  const { where, sort, ...entityOptions } = options;
  
  // Utilise le cache principal comme source
  const entityData = useEntity<T>(entityOptions);

  // Mémoïsation des fonctions de filtrage et tri
  const filterFn = useFilterFn<T>(where);
  const sortFn = useSortFn<T>(sort);

  // Mémoïsation des résultats filtrés et triés
  const viewData = useMemo(() => {
    const { items, byId } = entityData.data;
    
    // Si aucun filtre ni tri n'est spécifié, retourner les données brutes
    if (!where && !sort) {
      return {
        items,
        byId,
        isFilteredView: false
      };
    }

    // Appliquer les filtres et tris
    const filteredItems = applyFilter(items, filterFn);
    const sortedItems = applySort(filteredItems, sortFn);
    const viewById = createByIdMap(sortedItems, byId);

    return {
      items: sortedItems,
      byId: viewById,
      isFilteredView: true
    };
  }, [entityData.data, where, sort, filterFn, sortFn]);

  return {
    data: {
      items: viewData.items,
      byId: viewData.byId,
      // Références aux données complètes pour accès direct
      allItems: entityData.data.items,
      allById: entityData.data.byId
    },
    loading: entityData.loading,
    refreshing: entityData.refreshing,
    error: entityData.error,
    refetch: entityData.refetch,
    refetchWithParams: entityData.refetchWithParams,
    isFilteredView: viewData.isFilteredView
  };
};



export const fetchTeachers = async (): Promise<TeacherWithDepartment[]> => {
  const response = await fetch("/api/teachers");

  if (!response.ok) {
    // Gestion robuste des erreurs
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Erreur lors du chargement des professeurs");
  }

  return response.json();
};

// types/core.ts

/**
 * Types de base pour le système d'entités
 */
export interface EntityParams {
  /** Paramètres de pagination */
  page?: number;
  limit?: number;
  /** Autres paramètres personnalisés */
  [key: string]: any;
}

export type EntityFetchFn<T> = (params?: EntityParams) => Promise<T[]>;

/**
 * Type pour le filtrage profond (nested objects)
 */
export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends object ? PartialDeep<T[P]> : T[P];
};

export type Path<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object 
        ? `${K & string}.${Path<T[K]>}` 
        : K
    }[keyof T]
  : never;


//usage 

// Cas 1: Sans filtre (performance maximale)
const { data } = useEntityCache({
  entityName: "teachers",
  fetchFn: fetchTeachers
});

// Cas 2: Avec filtre et tri en syntaxe shorthand
const { data } = useEntityCache({
  entityName: "teachers",
  fetchFn: fetchTeachers,
  where: { "department.id": "maths" },
  sort: { key: "name", order: "asc" }
});

// Cas 3: Avec tri sur une propriété nested
const { data } = useEntityCache({
  entityName: "teachers",
  fetchFn: fetchTeachers,
  sort: { key: "department.name", order: "desc" }
});



// Créer une fonction de transformation par défaut réutilisable
const defaultTransform = <T extends { id: string }>(items: T[]) => ({
  items,
  byId: items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, T>)
});

// Dans useQuery
select: transformFn || defaultTransform,

// Dans refetchWithParams
const transformedNewData = transformFn 
  ? transformFn(newData) 
  : defaultTransform(newData);









