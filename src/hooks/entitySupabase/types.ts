// src/hooks/entitySupabase/types.ts

import { Database } from "@/types/database";
import { UseQueryOptions } from "@tanstack/react-query";

// Types de base pour Supabase
export type TableName = keyof Database['public']['Tables'];
export type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];
export type TableData<T extends TableName> = TableRow<T> & { id: string };

/**
 * Types pour la sélection avec jointures
 */

// Type de base pour les champs de sélection
export type SelectFields<T> = {
  [K in keyof T]?: T[K] extends object 
    ? SelectFields<T[K]> | boolean 
    : boolean;
};

// Type utilitaire pour inférer le type résultat d'une sélection
export type SelectResult<T, S> = 
  S extends SelectFields<T>
    ? {
        [K in keyof S & keyof T]: 
          S[K] extends true
            ? T[K]
            : S[K] extends object
              ? SelectResult<T[K], S[K]>
              : never;
      }
    : T; // Fallback vers le type complet si S est string

/**
 * Version simplifiée pour éviter les erreurs de récursion
 */
export type SimpleSelectResult<T, S> = T & {
  // On garde la structure de base et on ajoute les relations
  // Cette approche est moins précise mais évite les erreurs TypeScript
  [K in keyof S as K extends keyof T ? never : K]?: any;
};

/**
 * Options avec support générique pour le select
 */
export interface SupabaseQueryOptions<T, S = any> {
  filters?: PartialDeep<T>;
  select?: S | string;
}

export interface UseSupabaseDataOptions<T, S = any> {
  query?: SupabaseQueryOptions<T, S>;
  filterClient?: FilterClientOptions<SimpleSelectResult<T, S>>;
  queryOptions?: Partial<UseQueryOptions<any, any, any, any>>;
}

/**
 * Résultat avec type générique pour les données
 */
export interface SupabaseDataResult<T> {
  source: {
    items: T[];
    byId: Record<string, T>;
  };
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

// Gardez les autres types existants (FilterOperators, WhereCondition, etc.)
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

export interface FilterClientOptions<T> {
  where?: PartialDeep<T>;
  sort?: { key: Path<T>; order: 'asc' | 'desc' };
  paginate?: { page: number; limit: number };
}