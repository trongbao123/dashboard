'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { projectService } from '@/services/project-service'
import type { Project } from '@/types/project'
import { PROJECT_KEY } from '@/constants/query-key'

export function useProjects() {
  const queryClient = useQueryClient()

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [PROJECT_KEY.ALL],
    queryFn: projectService.getProjects,
    staleTime: 1000 * 60 * 5,
  })

  const createMutation = useMutation({
    mutationFn: projectService.createProject,
    onSuccess: (newProject: Project) => {
      queryClient.setQueryData<Project[]>(
        [PROJECT_KEY.ALL],
        (old: Project[] | undefined = []): Project[] => [newProject, ...old]
      )
      queryClient.invalidateQueries({ queryKey: [PROJECT_KEY.ALL] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      projectService.updateProject(id, data),
    onSuccess: (updated: any) => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_KEY.ALL] })
      queryClient.invalidateQueries({
        queryKey: [PROJECT_KEY.detail(updated.id)],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_KEY.ALL] })
      queryClient.removeQueries({ queryKey: [PROJECT_KEY.detail(id)] })
    },
  })

  return {
    projects,
    isLoading,
    error,
    createProject: createMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
