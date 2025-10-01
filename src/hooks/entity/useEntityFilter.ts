//@/hooks/entity/useEntityFilter.ts
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
 * Options pour useEntityFilter avec syntaxe shorthand
 */
export interface UseEntityFilterOptions<T> extends UseEntityOptions<T> {
  where?: PartialDeep<T>;
  sort?: { key: Path<T>; order: "asc" | "desc" };
  page?: number;
  limit?: number;
}

/**
 * Hook useEntityFilter - Combine useEntity avec la syntaxe shorthand
 * pour le filtrage, le tri et la pagination.
 *
 * - Utilise le cache principal comme source
 * - N’applique les transformations (filtre/tri) que si elles sont spécifiées
 * - Pagination ultra simple via slice natif
 */
export const useEntityFilter = <T extends { id: string }>(
  options: UseEntityFilterOptions<T>
) => {
  const { where, sort, page = 1, limit, ...entityOptions } = options;

  // Utilise le hook principal pour récupérer les données de base
  const entityData = useEntity<T>(entityOptions);

  // Mémoïsation des fonctions de filtrage et de tri
  const filterFn = useFilterFn<T>(where);
  const sortFn = useSortFn<T>(sort);

  // Mémoïsation des résultats filtrés, triés et paginés
  const viewData = useMemo(() => {
    const { items, byId } = entityData.data;

    // Si aucun filtre ni tri, renvoyer directement les données brutes
    const processedItems = where || sort
      ? applySort(applyFilter(items, filterFn), sortFn)
      : items;

    const processedById = where || sort
      ? createByIdMap(processedItems)
      : byId;

    // Pagination ultra simple - slice natif seulement si limit est défini
    const paginatedItems = limit
      ? processedItems.slice((page - 1) * limit, page * limit)
      : processedItems;

    return {
      items: paginatedItems,
      byId: processedById,
      allItems: items,
      allById: byId,
      total: processedItems.length,
      isFilteredView: !!(where || sort)
    };
  }, [entityData.data, where, sort, filterFn, sortFn, page, limit]);

  return {
    data: {
      items: viewData.items,
      byId: viewData.byId,
      // Références aux données complètes pour accès direct
      allItems: viewData.allItems,
      allById: viewData.allById,
      total: viewData.total,
    },
    loading: entityData.loading,
    refreshing: entityData.refreshing,
    error: entityData.error,
    refetch: entityData.refetch,
    refetchWithParams: entityData.refetchWithParams,
    isFilteredView: viewData.isFilteredView
  };
};


/* 
  usage de helper dans le fichier util.ts pour gerer les filtres et paginations
*/