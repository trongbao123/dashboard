'use client'

import { useQuery } from '@tanstack/react-query'
import { projectService } from '@/services/project-service'

export function useProject(id: string) {
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
  })

  return {
    project,
    isLoading,
    error,
  }
}
