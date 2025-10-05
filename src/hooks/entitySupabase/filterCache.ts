// src/hooks/entitySupabase/filterCache.ts
'use client'
import { useMemo } from 'react';
import { PartialDeep } from './types';

/**
 * Cache optimisé pour les fonctions de filtrage utilisant WeakMap
 * Permet le garbage collection automatique quand les objets ne sont plus référencés
 */
class FilterCache {
  private static instance: FilterCache;
  private cache: WeakMap<object, any>;

  private constructor() {
    this.cache = new WeakMap();
  }

  /**
   * Instance singleton du cache
   */
  static getInstance(): FilterCache {
    if (!FilterCache.instance) {
      FilterCache.instance = new FilterCache();
    }
    return FilterCache.instance;
  }

  /**
   * Récupère une valeur du cache
   */
  get<T>(key: object): T | undefined {
    return this.cache.get(key);
  }

  /**
   * Stocke une valeur dans le cache
   */
  set<T>(key: object, value: T): void {
    this.cache.set(key, value);
  }
}

/**
 * Factory pour créer des getters optimisés d'accès aux propriétés nested
 * 
 * @param path - Chemin d'accès sous forme de tableau ['user', 'profile', 'name']
 * @returns Fonction getter optimisée
 */
export const createValueGetter = (path: string[]) => {
  // Cas simple : accès direct à une propriété racine
  if (path.length === 1) {
    const key = path[0];
    return (item: any) => item[key];
  }

  // Cas nested : fonction optimisée avec boucle
  return (item: any) => {
    let value = item;
    for (let i = 0; i < path.length; i++) {
      if (value == null) return undefined;
      value = value[path[i]];
    }
    return value;
  };
};

/**
 * Vérifie si un objet contient des opérateurs de filtrage
 * 
 * @param obj - Objet à vérifier
 * @returns true si l'objet contient des opérateurs
 */
export const isOperatorObject = (obj: any): boolean => {
  if (!obj || typeof obj !== 'object') return false;
  
  const operatorKeys = ['$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$in', '$notIn', '$contains', '$startsWith', '$endsWith', '$between'];
  return Object.keys(obj).some(key => operatorKeys.includes(key));
};

/**
 * Compile les filtres en fonctions optimisées de test
 * 
 * @param where - Configuration des filtres
 * @returns Tableau de fonctions de test compilées
 */
export const compileFilters = <T>(where: PartialDeep<T>): Array<{ test: (item: T) => boolean }> => {
  const filters: Array<{ test: (item: T) => boolean }> = [];

  /**
   * Fonction récursive de compilation des filtres nested
   */
  const compileRecursive = (obj: any, path: string[] = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = [...path, key];
      
      if (value && typeof value === 'object' && !isOperatorObject(value)) {
        // Exploration récursive des objets nested
        compileRecursive(value, currentPath);
      } else {
        // Création du filtre pour cette propriété
        filters.push(createFilterTest(currentPath, value));
      }
    });
  };

  compileRecursive(where);
  return filters;
};

/**
 * Crée une fonction de test optimisée pour un chemin spécifique
 * 
 * @param path - Chemin d'accès à la propriété
 * @param condition - Condition de filtrage
 * @returns Objet avec fonction test
 */
const createFilterTest = (path: string[], condition: any) => {
  const getValue = createValueGetter(path);
  
  return {
    test: (item: any) => matchesOperatorOptimized(getValue(item), condition)
  };
};

/**
 * Version optimisée de matchesOperator avec validation de type
 * 
 * @param val - Valeur à tester
 * @param condition - Condition à appliquer
 * @returns true si la condition est satisfaite
 */
const matchesOperatorOptimized = (val: any, condition: any): boolean => {
  // Condition primitive → équivalent à $eq
  if (condition === null || typeof condition !== 'object' || Array.isArray(condition)) {
    return val === condition;
  }

  // Validation et application des opérateurs
  const operators = {
    $eq: () => val === condition.$eq,
    $ne: () => val !== condition.$ne,
    $gt: () => typeof val === 'number' && val > condition.$gt,
    $gte: () => typeof val === 'number' && val >= condition.$gte,
    $lt: () => typeof val === 'number' && val < condition.$lt,
    $lte: () => typeof val === 'number' && val <= condition.$lte,
    $in: () => Array.isArray(condition.$in) && condition.$in.includes(val),
    $notIn: () => Array.isArray(condition.$notIn) && !condition.$notIn.includes(val),
    $contains: () => typeof val === 'string' && typeof condition.$contains === 'string' && val.includes(condition.$contains),
    $startsWith: () => typeof val === 'string' && typeof condition.$startsWith === 'string' && val.startsWith(condition.$startsWith),
    $endsWith: () => typeof val === 'string' && typeof condition.$endsWith === 'string' && val.endsWith(condition.$endsWith),
    $between: () => {
      if (!Array.isArray(condition.$between) || condition.$between.length !== 2) return false;
      return val >= condition.$between[0] && val <= condition.$between[1];
    }
  };

  // Trouver et exécuter le premier opérateur valide
  for (const [op, fn] of Object.entries(operators)) {
    if (condition[op] !== undefined) {
      return fn();
    }
  }

  // Fallback : égalité par défaut
  return val === condition;
};

/**
 * Hook de filtrage optimisé avec cache WeakMap
 * 
 * @param where - Configuration des filtres
 * @returns Fonction de filtrage mémoisée ou undefined
 */
export const useFilterFn = <T>(where?: PartialDeep<T>): ((item: T) => boolean) | undefined => {
  const cache = FilterCache.getInstance();
  
  return useMemo(() => {
    if (!where) return undefined;

    // Vérification du cache
    const cachedFn = cache.get<(item: T) => boolean>(where);
    if (cachedFn) {
      return cachedFn;
    }

    // Compilation des filtres
    const compiledFilters = compileFilters(where);
    
    const filterFn = (item: T) => {
      // Évaluation court-circuit : s'arrête au premier échec
      for (const filter of compiledFilters) {
        if (!filter.test(item)) return false;
      }
      return true;
    };

    // Mise en cache
    cache.set(where, filterFn);
    return filterFn;
  }, [where]);
};