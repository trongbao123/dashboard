'use client'

import { useCallback } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { activityService } from '@/services/activity-service'
import type { Activity, ActivityFormData } from '@/types/activity'
import { ACTIVITIES_KEY, ACTIVITY_KEY, PROJECT_ACTIVITIES } from '@/constants/query-key'

const ITEMS_PER_PAGE = 5

export function useActivities() {
  const queryClient = useQueryClient()

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [ACTIVITIES_KEY],
      queryFn: ({ pageParam = 1 }) => activityService.getActivities(pageParam, ITEMS_PER_PAGE),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === ITEMS_PER_PAGE ? allPages.length + 1 : undefined,
      initialPageParam: 1,
    })

  const activities = data?.pages.flat() || []

  const invalidateAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [ACTIVITIES_KEY] })
    queryClient.invalidateQueries({ queryKey: [PROJECT_ACTIVITIES] })
  }, [queryClient])

  const createMutation = useMutation({
    mutationFn: activityService.createActivity,
    onSuccess: newActivity => {
      invalidateAll()

      if (newActivity.projectId) {
        queryClient.invalidateQueries({
          queryKey: [PROJECT_ACTIVITIES, newActivity.projectId],
        })
      }

      queryClient.setQueryData<any>([ACTIVITIES_KEY], (old: any) => {
        if (!old) {
          return { pages: [[newActivity]], pageParams: [1] }
        }

        const [firstPage, ...rest] = old.pages
        return {
          ...old,
          pages: [[newActivity, ...firstPage.slice(0, ITEMS_PER_PAGE - 1)], ...rest],
        }
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Activity }) =>
      activityService.updateActivity(id, data),
    onSuccess: updated => {
      invalidateAll()
      queryClient.invalidateQueries({
        queryKey: [ACTIVITY_KEY, updated.id],
      })

      if (updated.projectId) {
        queryClient.invalidateQueries({
          queryKey: [PROJECT_ACTIVITIES, updated.projectId],
        })
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: activityService.deleteActivity,
    onSuccess: (_, id) => {
      invalidateAll()
      queryClient.removeQueries({ queryKey: [ACTIVITY_KEY, id] })
    },
  })

  const fetchMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return {
    activities,
    isLoading,
    error,
    fetchMore,
    hasNextPage,
    isFetchingNextPage,
    createActivity: useCallback(
      (data: ActivityFormData) => createMutation.mutateAsync(data),
      [createMutation]
    ),
    updateActivity: useCallback(
      (id: string, data: Activity) => updateMutation.mutateAsync({ id, data }),
      [updateMutation]
    ),
    deleteActivity: useCallback((id: string) => deleteMutation.mutateAsync(id), [deleteMutation]),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
