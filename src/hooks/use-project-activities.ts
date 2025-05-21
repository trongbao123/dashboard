'use client'

import { useQuery } from '@tanstack/react-query'
import { activityService } from '@/services/activity-service'
import { PROJECT_ACTIVITIES_KEY } from '@/constants/query-key'

export function useProjectActivities(projectId: string) {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryKey: [PROJECT_ACTIVITIES_KEY, projectId],
    queryFn: () => activityService.getActivitiesByProject(projectId),
    enabled: !!projectId,
  })

  return {
    activities: activities || [],
    isLoading,
    error,
  }
}
