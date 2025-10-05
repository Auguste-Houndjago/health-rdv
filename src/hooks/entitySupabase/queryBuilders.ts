import {  FilterClientOptions, SupabaseQueryOptions } from "./types";

/**
 * Builder simple pour les queries Supabase
 */
export const buildQuery = <T>(
  select: SupabaseQueryOptions<T>["select"],
  filters?: SupabaseQueryOptions<T>["filters"]
): SupabaseQueryOptions<T> => ({ 
  select, 
  filters 
});

/**
 * Builder pour les options client
 */
export const buildClient = <T>(
  where?: FilterClientOptions<T>["where"],
  sort?: FilterClientOptions<T>["sort"],
  paginate?: FilterClientOptions<T>["paginate"]
): FilterClientOptions<T> => ({
  where,
  sort,
  paginate
});