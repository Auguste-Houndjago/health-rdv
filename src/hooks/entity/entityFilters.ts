///src/hooks/entity/entityFilters.ts
import { useMemo } from "react";
import { PartialDeep } from "./types";

/**
 * Applique un filtre à un tableau d'items
 * Retourne les items non modifiés si aucun filtre n'est spécifié
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
 * Retourne les items non modifiés si aucun tri n'est spécifié
 */
export const applySort = <T>(
  items: T[],
  sortFn?: (a: T, b: T) => number
): T[] => {
  if (!sortFn) return items;
  
  // Créer une copie pour éviter de muter le tableau original
  return [...items].sort(sortFn);
};

/**
 * Crée un dictionnaire byId à partir d'un tableau d'items
 * Réutilise le dictionnaire existant si les items n'ont pas changé
 */
export const createByIdMap = <T extends { id: string }>(
  items: T[],
  existingById?: Record<string, T>
): Record<string, T> => {
  // Si les items n'ont pas changé et qu'un byId existe déjà, on le réutilise
  if (existingById && Object.keys(existingById).length === items.length) {
    const firstItem = items[0];
    if (firstItem && existingById[firstItem.id] === firstItem) {
      return existingById;
    }
  }
  
  // Sinon, on crée un nouveau dictionnaire
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, T>);
};

/**
 * Fonction helper pour comparer une valeur avec une condition en utilisant les opérateurs
 * Légère et performante - vérifications minimales
 */
const matchesOperator = (val: any, condition: any): boolean => {
  // Si condition est une valeur primitive → équivalent à $eq
  if (condition === null || typeof condition !== "object") {
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
  if (condition.$contains !== undefined && typeof val === "string") {
    return val.includes(condition.$contains);
  }
  if (condition.$startsWith !== undefined && typeof val === "string") {
    return val.startsWith(condition.$startsWith);
  }
  if (condition.$endsWith !== undefined && typeof val === "string") {
    return val.endsWith(condition.$endsWith);
  }

  // Si aucun opérateur reconnu → égalité par défaut (rétrocompatibilité)
  return val === condition;
};

/**
 * Filtre récursif pour les objets imbriqués avec pré-compilation
 * Maintenant avec support complet des opérateurs
 */
export const useFilterFn = <T>(where?: PartialDeep<T>): ((item: T) => boolean) | undefined => {
  return useMemo(() => {
    if (!where) return undefined;

    // Pré-compilation des filtres (UNE SEULE FOIS par changement de where)
    const compiledFilters = Object.entries(where).map(([path, value]) => ({
      keys: path.split("."),   // Split fait UNE SEULE FOIS par filtre
      value
    }));

    return (item: T) =>
      compiledFilters.every(filter => {
        // Parcours du chemin pré-compilé
        let val: any = item;
        for (const key of filter.keys) {
          val = val?.[key];
          // Arrêt précoce si la valeur est undefined
          if (val === undefined) break;
        }
        
        // Utilisation de la nouvelle fonction avec opérateurs
        return matchesOperator(val, filter.value);
      });
  }, [where]);
};

/**
 * Tri simple par clé avec pré-compilation optimisée
 * (Reste inchangé - déjà performant)
 */
export const useSortFn = <T>(
  sort?: { key: string; order: "asc" | "desc" }
): ((a: T, b: T) => number) | undefined => {
  return useMemo(() => {
    if (!sort) return undefined;
    
    // Pré-compilation du chemin de tri
    const keys = sort.key.split(".");
    const order = sort.order;
    
    // Fonction helper pour récupérer une valeur nested (pré-compilée)
    const getNestedValue = (obj: any) => {
      let value = obj;
      for (const key of keys) {
        value = value?.[key];
        if (value === undefined) break;
      }
      return value;
    };
    
    return (a: T, b: T) => {
      const aVal = getNestedValue(a);
      const bVal = getNestedValue(b);
      
      // Gestion des valeurs null/undefined
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      
      // Comparaison en fonction du type et de l'ordre
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      // Conversion en string pour la comparaison
      const aStr = String(aVal);
      const bStr = String(bVal);
      
      return order === "asc" 
        ? aStr.localeCompare(bStr) 
        : bStr.localeCompare(aStr);
    };
  }, [sort]);
};