// src/hooks/entitySupabase/types.ts

import { UseQueryOptions } from "@tanstack/react-query";

/**
 * @typedef {Object} FilterOperators
 * Opérateurs de filtrage supportés pour les requêtes
 */
export type FilterOperators<T> = {
  /** Égalité stricte */
  $eq?: T;
  /** Non égalité */
  $ne?: T;
  /** Plus grand que */
  $gt?: T extends number | Date ? T : never;
  /** Plus grand ou égal */
  $gte?: T extends number | Date ? T : never;
  /** Plus petit que */
  $lt?: T extends number | Date ? T : never;
  /** Plus petit ou égal */
  $lte?: T extends number | Date ? T : never;
  /** Inclus dans la liste */
  $in?: T[];
  /** Non inclus dans la liste */
  $notIn?: T[];
  /** Contient la sous-chaîne */
  $contains?: T extends string ? string : never;
  /** Commence par */
  $startsWith?: T extends string ? string : never;
  /** Termine par */
  $endsWith?: T extends string ? string : never;
  /** Entre deux valeurs */
  $between?: T extends number | Date ? [T, T] : never;
};

/**
 * @typedef {Object} WhereCondition
 * Condition de filtrage simple ou avec opérateurs
 */
export type WhereCondition<T> = T | FilterOperators<T>;

/**
 * @typedef {Object} PartialDeep
 * Version partielle et profonde d'un type, supportant le filtrage nested
 */
export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends object 
    ? PartialDeep<T[P]> 
    : WhereCondition<T[P]>;
};

/**
 * @typedef {string} Path
 * Chemin d'accès aux propriétés nested (ex: 'user.profile.name')
 */
export type Path<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object 
        ? `${K & string}.${Path<T[K]>}` 
        : K & string
    }[keyof T]
  : never;

/**
 * @typedef {Object} SelectFields
 * Structure pour la sélection typée des champs
 */
export type SelectFields<T> = {
  [K in keyof T]?: T[K] extends object 
    ? SelectFields<T[K]> | boolean 
    : boolean;
};

/**
 * @typedef {string} SelectString
 * String de sélection Supabase (compatibilité)
 */
export type SelectString<T> = string;


// Infère le type final à partir d'un objet select
export type SelectToType<T, S> = {
  [K in keyof S & keyof T]: S[K] extends true
    ? T[K]
    : S[K] extends object
      ? SelectToType<T[K], S[K]>
      : never;
};


/**
 * @interface SupabaseQueryOptions
 * Options pour les requêtes Supabase côté serveur
 */
export interface SupabaseQueryOptions<T> {
  /** Filtres à appliquer côté base de données */
  filters?: PartialDeep<T>;
  /** Sélection des champs (objet typé ou string) */
  select?: SelectFields<T> | string;
}

/**
 * @interface FilterClientOptions
 * Options pour le traitement des données côté client
 */
export interface FilterClientOptions<T> {
  /** Filtres à appliquer côté client */
  where?: PartialDeep<T>;
  /** Configuration du tri */
  sort?: { key: Path<T>; order: 'asc' | 'desc' };
  /** Configuration de la pagination */
  paginate?: { page: number; limit: number };
}

/**
 * @interface UseSupabaseDataOptions
 * Options complètes pour le hook useEntitySupabase
 */
export interface UseSupabaseDataOptions<T> {
  /** Options de requête Supabase */
  query?: SupabaseQueryOptions<T>;
  /** Options de filtrage client */
  filterClient?: FilterClientOptions<T>;
  /** Options supplémentaires pour react-query */
  queryOptions?: Partial<UseQueryOptions<any, any, any, any>>;
}

/**
 * @interface SupabaseDataResult
 * Résultat retourné par le hook useEntitySupabase
 */
export interface SupabaseDataResult<T> {
  /** Données brutes récupérées de Supabase */
  source: {
    items: T[];
    byId: Record<string, T>;
  };
  /** Données après traitement client */
  data: {
    items: T[];
    byId: Record<string, T>;
  };
  /** État de chargement */
  loading: boolean;
  /** Erreur éventuelle */
  error: Error | null;
  /** Fonction de rechargement */
  refetch: () => Promise<any>;
  /** Métadonnées sur les données */
  metadata: {
    total: number;
    filtered: number;
    hasClientFilters: boolean;
    page?: number;
    totalPages?: number;
  };
}