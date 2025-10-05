// hooks/useUser.ts
"use client"

import { getUserInfo, GetUserInfoOptions, getUserInfoRefresh } from '@/services/users'
import { useQuery, useQueryClient } from '@tanstack/react-query'


export const USER_QUERY_KEY = 'user-info'

export function useUser(options: GetUserInfoOptions = {}) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => getUserInfo(options),
    staleTime: 10 * 60 * 1000, // 10 minutes - même TTL que le cache serveur
    gcTime: 15 * 60 * 1000, // 15 minutes - garder en cache plus longtemps
    retry: 1,
    refetchOnWindowFocus: false,
  })

  // Fonction pour forcer le refresh
  const refresh = async () => {
    const freshData = await getUserInfoRefresh()
    queryClient.setQueryData([USER_QUERY_KEY], freshData)
    return freshData
  }

  // Fonction pour invalider le cache
  const invalidate = () => {
    return queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
  }

  return {
    ...query,
    user: query.data || null,
    refresh,
    invalidate,
    isAuthenticated: !!query.data?.id,
  }
}

// Hook spécifique pour les données fraîches
export function useUserRefresh() {
  return useUser({ refresh: true })
}

// Hook sans cache
export function useUserDirect() {
  return useUser({ cache: false })
}