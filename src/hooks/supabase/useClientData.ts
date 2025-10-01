import { useMemo } from 'react';
import { itemsToById, useFilterFn, useSortFn, applyFilter, applySort, applyPagination } from './entityFilters';
import { ClientProcessingOptions } from './types';

/**
 * Hook pour appliquer des transformations client sur des données existantes
 * Utile pour créer plusieurs vues sur les mêmes données source
 */
export const useClientData = <T extends { id: string }>(
  sourceData: { items: T[]; byId: Record<string, T> },
  options: ClientProcessingOptions<T> = {}
) => {
  const { where, sort, paginate } = options;

  const clientFilterFn = useFilterFn<T>(where);
  const clientSortFn = useSortFn<T>(sort);

  const processedData = useMemo(() => {
    let items = sourceData.items;
    
    if (clientFilterFn) items = applyFilter(items, clientFilterFn);
    if (clientSortFn) items = applySort(items, clientSortFn);
    
    const paginatedItems = applyPagination(items, paginate);
    
    return itemsToById(paginatedItems);
  }, [sourceData.items, clientFilterFn, clientSortFn, paginate]);

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
  }, [sourceData.items.length, processedData.items.length, where, sort, paginate]);

  return {
    data: processedData,
    metadata
  };
};