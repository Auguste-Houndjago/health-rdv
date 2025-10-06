// src/hooks/entitySupabase/useEntitySupabase.ts
"use client";
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { useMemo } from 'react';
import { 
  UseSupabaseDataOptions, 
  SupabaseDataResult,
  SelectFields,
  SimpleSelectResult,
  TableName,
  TableData
} from './types';
import { 
  itemsToById, 
  applyFilter, 
  applySort, 
  applyPagination 
} from './entityFilters';
import { useFilterFn } from './filterCache';
import { useSortFn } from './entityFilters';
import { useDeepMemo } from './memoHelpers';

import { Database } from '@/types/database';
import { supabase } from '@/utils/supabase/client';
import { PostgrestResponse } from '@supabase/supabase-js';
import { buildSelectString } from './utils';

/**
 * Crée une requête typée vers Supabase
 */
const createTypedQuery = <T extends TableName>(
  table: T,
  select?: string,
  filters?: Record<string, any>
) => {
  return supabase
    .from(table)
    .select(select || '*')
    .match(filters || {}) as unknown as Promise<PostgrestResponse<any>>;
};

/**
 * Hook principal avec support des sélections typées
 * 
 * @example
 * ```tsx
 * // Sélection simple
 * const { data } = useEntitySupabase('User', {
 *   query: {
 *     select: { id: true, firstName: true, email: true }
 *   }
 * });
 * 
 * // Sélection avec jointure (le typage sera inféré)
 * const { data } = useEntitySupabase('UserOrganization', {
 *   query: {
 *     select: {
 *       id: true,
 *       role: true,
 *       user: { id: true, firstName: true, email: true }
 *     }
 *   }
 * });
 * ```
 */
export const useEntitySupabase = <
  T extends TableName,
  S extends SelectFields<TableData<T>> | string = SelectFields<TableData<T>>
>(
  table: T,
  options: UseSupabaseDataOptions<TableData<T>, S> = {}
): SupabaseDataResult<SimpleSelectResult<TableData<T>, S>> => {
  // Stabilisation des options
  const stableOptions = useDeepMemo(options);
  const { query = {}, filterClient = {}, queryOptions = {} } = stableOptions;

  // Conversion du select en string
  const selectString = useMemo(() => {
    if (!query.select) return '*';
    
    if (typeof query.select === 'string') {
      return query.select;
    }
    
    return buildSelectString(query.select as SelectFields<TableData<T>>);
  }, [query.select]);

  // 1. Récupération des données
  const supabaseQuery = useQuery(
    createTypedQuery(table, selectString, query.filters),
    queryOptions
  );

  // Type inféré pour les données
  type ResultType = SimpleSelectResult<TableData<T>, S>;

  // 2. Transformation des données source
  const sourceData = useMemo(() => {
    if (!supabaseQuery.data) return { items: [], byId: {} };
    
    const items = supabaseQuery.data as ResultType[];
    return itemsToById(items);
  }, [supabaseQuery.data]);

  // 3. Préparation des fonctions de filtrage client
  const clientFilterFn = useFilterFn<ResultType>(filterClient.where);
  const clientSortFn = useSortFn<ResultType>(filterClient.sort);

  // 4. Application des transformations client
  const processedData = useMemo(() => {
    let items = sourceData.items;
    
    if (clientFilterFn) items = applyFilter(items, clientFilterFn);
    if (clientSortFn) items = applySort(items, clientSortFn);
    
    const paginatedItems = applyPagination(items, filterClient.paginate);
    return itemsToById(paginatedItems);
  }, [
    sourceData.items, 
    clientFilterFn, 
    clientSortFn, 
    filterClient.paginate?.page, 
    filterClient.paginate?.limit
  ]);

  // 5. Métadonnées
  const metadata = useMemo(() => {
    const total = sourceData.items.length;
    const filtered = processedData.items.length;
    const hasClientFilters = !!(filterClient.where || filterClient.sort);
    
    let page, totalPages;
    if (filterClient.paginate) {
      page = filterClient.paginate.page;
      totalPages = Math.ceil(filtered / filterClient.paginate.limit);
    }

    return { total, filtered, hasClientFilters, page, totalPages };
  }, [
    sourceData.items.length, 
    processedData.items.length, 
    !!filterClient.where, 
    !!filterClient.sort, 
    filterClient.paginate?.page, 
    filterClient.paginate?.limit
  ]);

  return {
    source: sourceData,
    data: processedData,
    loading: supabaseQuery.isLoading,
    error: supabaseQuery.error,
    refetch: supabaseQuery.refetch,
    metadata
  };
};