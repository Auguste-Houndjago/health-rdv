// src/hooks/entitySupabase/useEntityClient.ts
"use client"
import { useMemo } from 'react';
import { itemsToById, applyFilter, applySort, applyPagination } from './entityFilters';
import { useFilterFn } from './filterCache';
import { useSortFn } from './entityFilters';
import { useDeepMemo } from './memoHelpers';
import { FilterClientOptions } from './types';

/**
 * Hook pour appliquer des transformations client sur des données existantes
 * Utile pour créer plusieurs vues sur les mêmes données source sans refetch
 * 
 * @example
 * ```tsx
 * const { data, metadata } = useEntityClient(sourceData, {
 *   where: { category: 'electronics', price: { $lt: 1000 } },
 *   sort: { key: 'name', order: 'asc' },
 *   paginate: { page: 1, limit: 20 }
 * });
 * ```
 * 
 * @template T - Type des données avec un champ id obligatoire
 * @param sourceData - Données source au format { items, byId }
 * @param options - Options de traitement client
 * @returns Données transformées et métadonnées
 */
export const useEntityClient = <T extends { id: string }>(
  sourceData: { items: T[]; byId: Record<string, T> },
  options: FilterClientOptions<T> = {}
) => {
  // Stabilisation des options
  const stableOptions = useDeepMemo(options);
  const { where, sort, paginate } = stableOptions;

  // Filtrage optimisé avec cache
  const clientFilterFn = useFilterFn<T>(where);
  const clientSortFn = useSortFn<T>(sort);

  // Dépendances stables pour la mémoisation
  const stableDeps = useMemo(() => [
    sourceData.items, 
    clientFilterFn, 
    clientSortFn, 
    paginate?.page, 
    paginate?.limit
  ], [sourceData.items, clientFilterFn, clientSortFn, paginate?.page, paginate?.limit]);

  // Application des transformations aux données
  const processedData = useMemo(() => {
    let items = sourceData.items;
    
    // Application séquentielle des transformations
    if (clientFilterFn) items = applyFilter(items, clientFilterFn);
    if (clientSortFn) items = applySort(items, clientSortFn);
    
    const paginatedItems = applyPagination(items, paginate);
    
    return itemsToById(paginatedItems);
  }, stableDeps);

  // Métadonnées pour l'interface utilisateur
  const metadata = useMemo(() => {
    const total = sourceData.items.length;
    const filtered = processedData.items.length;
    const hasClientFilters = !!(where || sort);
    
    let page, totalPages;
    if (paginate) {
      page = paginate.page;
      totalPages = Math.ceil(filtered / paginate.limit);
    }

    return {
      total,
      filtered,
      hasClientFilters,
      page,
      totalPages
    };
  }, [
    sourceData.items.length, 
    processedData.items.length, 
    !!where,
    !!sort, 
    paginate?.page, 
    paginate?.limit
  ]);

  return {
    data: processedData,
    metadata
  };
};