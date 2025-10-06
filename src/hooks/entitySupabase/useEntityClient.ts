// src/hooks/entitySupabase/useEntityClient.ts
"use client"
import { useMemo } from 'react';
import { itemsToById, applyFilter, applySort, applyPagination } from './entityFilters';
import { useFilterFn } from './filterCache';
import { useSortFn } from './entityFilters';
import { useDeepMemo } from './memoHelpers';
import { FilterClientOptions } from './types';

/**
 * Hook client optimisé avec types simplifiés
 */
export const useEntityClient = <T extends { id: string }>(
  sourceData: { items: T[]; byId: Record<string, T> },
  options: FilterClientOptions<T> = {}
) => {
  const stableOptions = useDeepMemo(options);
  const { where, sort, paginate } = stableOptions;

  const clientFilterFn = useFilterFn<T>(where);
  const clientSortFn = useSortFn<T>(sort);

  const processedData = useMemo(() => {
    let items = sourceData.items;
    
    if (clientFilterFn) items = applyFilter(items, clientFilterFn);
    if (clientSortFn) items = applySort(items, clientSortFn);
    
    const paginatedItems = applyPagination(items, paginate);
    return itemsToById(paginatedItems);
  }, [
    sourceData.items, 
    clientFilterFn, 
    clientSortFn, 
    paginate?.page, 
    paginate?.limit
  ]);

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