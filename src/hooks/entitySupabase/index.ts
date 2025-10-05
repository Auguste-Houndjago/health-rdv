// src/hooks/entitySupabase/index.ts

/**
 * Système de gestion de cache client pour Supabase avec filtres avancés
 * @module EntitySupabase
 */

export { useEntitySupabase } from './useEntitySupabase';
export { useEntityClient } from './useEntityClient';
export type { 
  UseSupabaseDataOptions, 
  SupabaseDataResult,
  FilterClientOptions,
  PartialDeep,
  Path 
} from './types';

export { applyPagination } from './entityFilters';

export * from './utils';
