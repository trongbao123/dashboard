'use client'

import { ACTIVITY_KEY } from '@/constants/query-key'
import { activityService } from '@/services/activity-service'
import { useQuery } from '@tanstack/react-query'

export function useActivity(id: string) {
  const {
    data: activity,
    isLoading,
    error,
  } = useQuery({
    queryKey: [ACTIVITY_KEY, id],
    queryFn: () => activityService.getActivity(id),
    enabled: !!id,
  })

  return {
    activity,
    isLoading,
    error,
  }
}
