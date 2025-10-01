typescript
import { UseQueryOptions } from '@tanstack/react-query';

/**
 * Types de base pour le système Supabase Cache
 */
export type FilterOperators<T> = {
  $eq?: T;
  $ne?: T;
  $gt?: T extends number | Date ? T : never;
  $gte?: T extends number | Date ? T : never;
  $lt?: T extends number | Date ? T : never;
  $lte?: T extends number | Date ? T : never;
  $in?: T[];
  $notIn?: T[];
  $contains?: T extends string ? string : never;
  $startsWith?: T extends string ? string : never;
  $endsWith?: T extends string ? string : never;
  $between?: T extends number | Date ? [T, T] : never;
};

export type WhereCondition<T> = T | FilterOperators<T>;

export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends object 
    ? PartialDeep<T[P]> 
    : WhereCondition<T[P]>;
};

export type Path<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object 
        ? `${K & string}.${Path<T[K]>}` 
        : K & string
    }[keyof T]
  : never;

export interface SupabaseQueryOptions {
  filters?: Record<string, any>;
  select?: string;
}

export interface ClientProcessingOptions<T> {
  where?: PartialDeep<T>;
  sort?: { key: Path<T>; order: 'asc' | 'desc' };
  paginate?: { page: number; limit: number };
}

export interface UseSupabaseDataOptions<T> {
  query?: SupabaseQueryOptions;
  client?: ClientProcessingOptions<T>;
  queryOptions?: Partial<UseQueryOptions>;
}

export interface SupabaseDataResult<T> {
  // Données source (cache Supabase)
  source: {
    items: T[];
    byId: Record<string, T>;
  };
  // Données transformées
  data: {
    items: T[];
    byId: Record<string, T>;
  };
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  metadata: {
    total: number;
    filtered: number;
    hasClientFilters: boolean;
    page?: number;
    totalPages?: number;
  };
}
2. Fonctions de filtrage (/hooks/supabase-cache/entityFilters.ts)
typescript
import { useMemo } from 'react';
import { PartialDeep, Path } from './types';

/**
 * Transforme un tableau d'items en structure { items, byId }
 */
export const itemsToById = <T extends { id: string }>(items: T[]) => ({
  items,
  byId: items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, T>)
});

/**
 * Compare une valeur avec une condition en utilisant les opérateurs
 */
const matchesOperator = (val: any, condition: any): boolean => {
  // Si condition est une valeur primitive → équivalent à $eq
  if (condition === null || typeof condition !== 'object') {
    return val === condition;
  }

  // Gestion des opérateurs avec arrêt précoce
  if (condition.$eq !== undefined) return val === condition.$eq;
  if (condition.$ne !== undefined) return val !== condition.$ne;
  if (condition.$gt !== undefined) return val > condition.$gt;
  if (condition.$gte !== undefined) return val >= condition.$gte;
  if (condition.$lt !== undefined) return val < condition.$lt;
  if (condition.$lte !== undefined) return val <= condition.$lte;
  if (condition.$in !== undefined) return condition.$in.includes(val);
  if (condition.$notIn !== undefined) return !condition.$notIn.includes(val);
  if (condition.$contains !== undefined && typeof val === 'string') {
    return val.includes(condition.$contains);
  }
  if (condition.$startsWith !== undefined && typeof val === 'string') {
    return val.startsWith(condition.$startsWith);
  }
  if (condition.$endsWith !== undefined && typeof val === 'string') {
    return val.endsWith(condition.$endsWith);
  }
  if (condition.$between !== undefined && (typeof val === 'number' || val instanceof Date)) {
    return val >= condition.$between[0] && val <= condition.$between[1];
  }

  // Si aucun opérateur reconnu → égalité par défaut
  return val === condition;
};

/**
 * Filtre récursif pour les objets imbriqués avec pré-compilation
 */
export const useFilterFn = <T>(where?: PartialDeep<T>): ((item: T) => boolean) | undefined => {
  return useMemo(() => {
    if (!where) return undefined;

    // Pré-compilation des filtres
    const compiledFilters = Object.entries(where).map(([path, value]) => ({
      keys: path.split('.'),
      value
    }));

    return (item: T) =>
      compiledFilters.every(filter => {
        let val: any = item;
        for (const key of filter.keys) {
          val = val?.[key];
          if (val === undefined) break;
        }
        return matchesOperator(val, filter.value);
      });
  }, [where]);
};

/**
 * Helper pour récupérer une valeur nested
 */
const getNestedValue = (obj: any, keys: string[]) => {
  let value = obj;
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) break;
  }
  return value;
};

/**
 * Tri simple par clé avec pré-compilation optimisée
 */
export const useSortFn = <T>(
  sort?: { key: Path<T>; order: 'asc' | 'desc' }
): ((a: T, b: T) => number) | undefined => {
  return useMemo(() => {
    if (!sort) return undefined;
    
    const keys = (sort.key as string).split('.');
    const order = sort.order;
    
    return (a: T, b: T) => {
      const aVal = getNestedValue(a, keys);
      const bVal = getNestedValue(b, keys);
      
      // Gestion des valeurs null/undefined
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      
      // Comparaison en fonction du type
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      if (aVal instanceof Date && bVal instanceof Date) {
        return order === 'asc' ? aVal.getTime() - bVal.getTime() : bVal.getTime() - aVal.getTime();
      }
      
      // Conversion en string pour la comparaison
      const aStr = String(aVal);
      const bStr = String(bVal);
      
      return order === 'asc' 
        ? aStr.localeCompare(bStr) 
        : bStr.localeCompare(aStr);
    };
  }, [sort]);
};

/**
 * Applique un filtre à un tableau d'items
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
 */
export const applySort = <T>(
  items: T[],
  sortFn?: (a: T, b: T) => number
): T[] => {
  if (!sortFn) return items;
  return [...items].sort(sortFn);
};

/**
 * Applique une pagination à un tableau d'items
 */
export const applyPagination = <T>(
  items: T[],
  paginate?: { page: number; limit: number }
): T[] => {
  if (!paginate) return items;
  const start = (paginate.page - 1) * paginate.limit;
  return items.slice(start, start + paginate.limit);
};
3. Hook Principal (/hooks/supabase-cache/useSupabaseData.ts)
typescript
import { useQuery } from '@supabase-cache-helpers/react-query';
import { useMemo } from 'react';
import { supabase } from '@/lib/supabase'; // Votre client Supabase
import { Database } from '@/types/database'; // Vos types générés
import { 
  UseSupabaseDataOptions, 
  SupabaseDataResult 
} from './types';
import { 
  itemsToById, 
  useFilterFn, 
  useSortFn, 
  applyFilter, 
  applySort, 
  applyPagination 
} from './entityFilters';

type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];

/**
 * Hook principal pour la gestion des données Supabase avec cache et filtres client
 */
export const useSupabaseData = <T extends TableRow<TableName> & { id: string }>(
  table: TableName,
  options: UseSupabaseDataOptions<T> = {}
): SupabaseDataResult<T> => {
  const { query = {}, client = {}, queryOptions = {} } = options;

  // 1. Récupération des données via Supabase Cache Helpers
  const supabaseQuery = useQuery(
    supabase
      .from(table)
      .select(query.select || '*')
      .match(query.filters || {}),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      ...queryOptions
    }
  );

  // 2. Transformation des données source
  const sourceData = useMemo(() => {
    if (!supabaseQuery.data) return { items: [], byId: {} };
    return itemsToById(supabaseQuery.data as T[]);
  }, [supabaseQuery.data]);

  // 3. Préparation des fonctions de filtrage client
  const clientFilterFn = useFilterFn<T>(client.where);
  const clientSortFn = useSortFn<T>(client.sort);

  // 4. Application des transformations client
  const processedData = useMemo(() => {
    let items = sourceData.items;
    
    // Application des filtres
    if (clientFilterFn) {
      items = applyFilter(items, clientFilterFn);
    }
    
    // Application du tri
    if (clientSortFn) {
      items = applySort(items, clientSortFn);
    }
    
    // Application de la pagination
    const paginatedItems = applyPagination(items, client.paginate);
    
    return itemsToById(paginatedItems);
  }, [sourceData.items, clientFilterFn, clientSortFn, client.paginate]);

  // 5. Calcul des métadonnées
  const metadata = useMemo(() => {
    const total = sourceData.items.length;
    const filtered = processedData.items.length;
    const hasClientFilters = !!(client.where || client.sort);
    
    let page, totalPages;
    if (client.paginate) {
      page = client.paginate.page;
      totalPages = Math.ceil(filtered / client.paginate.limit);
    }

    return {
      total,
      filtered,
      hasClientFilters,
      page,
      totalPages
    };
  }, [sourceData.items.length, processedData.items.length, client.where, client.sort, client.paginate]);

  return {
    source: sourceData,
    data: processedData,
    loading: supabaseQuery.isLoading,
    error: supabaseQuery.error,
    refetch: supabaseQuery.refetch,
    metadata
  };
};

// Export des helpers pour une utilisation séparée
export { useFilterFn, useSortFn, itemsToById };
4. Hook pour données client-only (/hooks/supabase-cache/useClientData.ts)
typescript
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