//src/hooks/entitySupabase/entityFilters.ts
'use client'
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