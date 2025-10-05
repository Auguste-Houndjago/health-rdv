// src/hooks/entitySupabase/memoHelpers.ts
'use client'

import { useRef } from "react";


/**
 * Hook pour la mémoisation profonde basée sur JSON.stringify
 * Utile pour les objets de configuration qui changent rarement
 * 
 * @example
 * ```tsx
 * const stableOptions = useDeepMemo(options);
 * ```
 * 
 * @param value - Valeur à mémoiser
 * @returns Valeur mémoisée
 */
export const useDeepMemo = <T>(value: T): T => {
  const ref = useRef<{ value: T; stringified: string }>(null);

  const stringified = JSON.stringify(value);
  
  if (!ref.current || ref.current.stringified !== stringified) {
    ref.current = { value, stringified };
  }
  
  return ref.current.value;
};

/**
 * Transforme les tableaux de dépendances en versions stables
 * 
 * @param deps - Tableau de dépendances
 * @returns Tableau de dépendances stable
 */
export const useStableDeps = <T extends any[]>(deps: T): T => {
  const ref = useRef<{ deps: T; stringified: string }>(null);
  
  const stringified = JSON.stringify(deps);
  
  if (!ref.current || ref.current.stringified !== stringified) {
    ref.current = { deps, stringified };
  }
  
  return ref.current.deps;
};