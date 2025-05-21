'use client'

import { useQuery } from '@tanstack/react-query'

import { STAT_KEY } from '@/constants/query-key'
import type { Stat } from '@/types/stat'
import { STAT_ICON_MAP } from '@/constants/stat-icon-map'
import { statsService } from '@/services/stats-service'

export function useStats() {
  const { data, isLoading, error } = useQuery<Stat[]>({
    queryKey: [STAT_KEY],
    queryFn: statsService.getStats,
  })

  const stats = (data || [])?.map(stat => ({
    ...stat,
    icon: STAT_ICON_MAP[stat.title] ?? STAT_ICON_MAP.default,
  }))

  return { stats, isLoading, error }
}
