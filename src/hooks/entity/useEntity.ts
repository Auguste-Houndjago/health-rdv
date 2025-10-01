//@/hooks/entity/useEntity.ts
"use client";
import { useQuery, useQueryClient,  } from "@tanstack/react-query";
import { EntityFetchFn, EntityParams } from "./types";

// Fonction de transformation par défaut réutilisable
export const itemsToById = <T extends { id: string }>(items: T[]) => ({
  items,
  byId: items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, T>)
});


export interface UseEntityOptions<T> {
  entityName: string;
  fetchFn: EntityFetchFn<T>;
  transformFn?: (items: T[]) => any;
  suspense?: boolean;
  enabled?: boolean;
  initialParams?: EntityParams;
  staleTime?: number;
}

/**
 * Hook principal pour la gestion des entités - Source de vérité unique
 * Version optimisée avec refetchWithParams amélioré
 */
export const useEntity = <T extends { id: string }>(
  options: UseEntityOptions<T>
) => {
  const {
    entityName,
    fetchFn,
    transformFn,
    suspense = false,
    enabled = true,
    initialParams,
    staleTime = 1000 * 60 * 5
  } = options;

  const queryClient = useQueryClient();
  const queryKey = [entityName, initialParams].filter(Boolean);

  const {
    data,
    isLoading,
    isFetching,
    error,
    isError,
    isSuccess,
    refetch,
  } = useQuery<T[], Error, any>({
    queryKey,
    queryFn: () => fetchFn(initialParams),
    staleTime,
    refetchOnWindowFocus: false,
    enabled,
    ...(suspense ? { suspense: true } : {}),
    
    // Utilisation de la transformation cohérente
    select: transformFn || itemsToById,
  });

  /**
   * Refetch qui maintient la cohérence du cache avec les améliorations demandées
   */
  const refetchWithParams = async (newParams: EntityParams) => {
    // 1. Utiliser la clé complète pour la cohérence du cache
    const newQueryKey = [entityName, newParams].filter(Boolean);
    
    // 2. Fetch des nouvelles données
    const newData = await fetchFn(newParams);
    
    // 3. Application de la transformation pour uniformité
    const transformedNewData = transformFn 
      ? transformFn(newData) 
      : itemsToById(newData);
    
    // 4. Mise à jour du cache avec la clé complète
    queryClient.setQueryData(newQueryKey, (oldData: any) => {
      if (!oldData) return transformedNewData;
      
      // 5. Fusion intelligente basée sur les IDs
      const mergedItems = mergeItemsById(oldData.items, newData);
      
      // 6. Application de la transformation aux données fusionnées
      const mergedTransformed = transformFn 
        ? transformFn(mergedItems) 
        : itemsToById(mergedItems);
      
      return mergedTransformed;
    });
    
    return newData;
  };

  return {
    data: data || { items: [], byId: {} },
    loading: isLoading,
    refreshing: isFetching,
    error,
    isError,
    isSuccess,
    refetch,
    refetchWithParams,
    queryClient,
  };
};

// Helpers pour la manipulation des données et la fusion
function mergeItemsById<T extends { id: string }>(oldItems: T[], newItems: T[]): T[] {
  const result = [...oldItems];
  
  newItems.forEach(newItem => {
    const index = result.findIndex(item => item.id === newItem.id);
    if (index >= 0) {
      result[index] = newItem;
    } else {
      result.push(newItem);
    }
  });
  
  return result;
}


/**
 * Wrapper ultra-simple extraire les items des return commplexes
 * @tutorial : Pour les APIs qui retournent un objet avec items et total ..
 */
export const asEntityFetcher = <T extends { id: string }>(
    paginatedFetchFn: (params?: any) => Promise<{ items: T[] }>
  ): EntityFetchFn<T> => {
    return async (params) => {
      const response = await paginatedFetchFn(params);
      return response.items;
    };
  };