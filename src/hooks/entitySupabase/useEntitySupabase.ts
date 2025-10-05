// src/hooks/entitySupabase/useEntitySupabase.ts
"use client";
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { useMemo } from 'react';
import { 
  UseSupabaseDataOptions, 
  SupabaseDataResult,
  SelectFields
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

type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];
type TableData<T extends TableName> = TableRow<T> & { id: string };

/**
 * Crée une requête typée vers Supabase
 * @param table - Nom de la table
 * @param select - Champs à sélectionner
 * @param filters - Filtres à appliquer
 * @returns Promise de la réponse Supabase
 */
const createTypedQuery = <T extends TableName,  S extends SelectFields<TableData<T>> = SelectFields<TableData<T>>>(
  table: T,
  select?: string,
  filters?: Record<string, any>
) => {
  return supabase
    .from(table)
    .select(select || '*')
    .match(filters || {}) as unknown as Promise<PostgrestResponse<TableData<T>>>;
};

/**
 * Hook principal pour la gestion des données Supabase avec cache et filtres client
 * 
 * @example
 * ```tsx
 * const { source, data, loading, metadata } = useEntitySupabase('User', {
 *   query: {
 *     select: '*',
 *     filters: { status: 'active' }
 *   },
 *   filterClient: {
 *     where: { age: { $gt: 18 } },
 *     sort: { key: 'name', order: 'asc' },
 *     paginate: { page: 1, limit: 10 }
 *   },
 *   queryOptions: { staleTime: 1000 * 60 * 5 }
 * });
 * ```
 * 
 * @template T - Nom de la table dans la base de données
 * @param table - Nom de la table Supabase
 * @param options - Options de configuration
 * @returns Objet contenant les données, état et métadonnées
 */
export const useEntitySupabase = <T extends TableName>(
  table: T,
  options: UseSupabaseDataOptions<TableData<T>> = {}
): SupabaseDataResult<TableData<T>> => {
  // Stabilisation des options pour éviter les re-rendus inutiles
  const stableOptions = useDeepMemo(options);
  const { query = {}, filterClient = {}, queryOptions = {} } = stableOptions;

  // Conversion du select typé en string Supabase
  const selectString = useMemo(() => {
    if (!query.select) return '*';
    
    if (typeof query.select === 'string') {
      return query.select;
    }
    
    return buildSelectString(query.select as SelectFields<TableData<T>>);
  }, [query.select]);

  // 1. Récupération des données via Supabase Cache Helpers
  const supabaseQuery = useQuery(
    createTypedQuery(table, selectString, query.filters),
    queryOptions
  );

  // 2. Transformation des données source en structure { items, byId }
  const sourceData = useMemo(() => {
    if (!supabaseQuery.data) return { items: [], byId: {} };
    
    const items = supabaseQuery.data as TableData<T>[];
    return itemsToById(items);
  }, [supabaseQuery.data]);

  // 3. Préparation des fonctions de filtrage client
  const clientFilterFn = useFilterFn<TableData<T>>(filterClient.where);
  const clientSortFn = useSortFn<TableData<T>>(filterClient.sort);

  // 4. Application des transformations client (filtrage, tri, pagination)
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

  // 5. Calcul des métadonnées pour l'interface utilisateur
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