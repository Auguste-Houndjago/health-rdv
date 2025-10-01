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
} from "./entityFilters";
import { PartialDeep, Path } from "./types";

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


