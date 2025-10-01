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