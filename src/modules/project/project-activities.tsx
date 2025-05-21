'use client'

import { memo } from 'react'

import { useProjectActivities } from '@/hooks/use-project-activities'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { ActivityItem } from '../dashboard/activity-item'

interface ProjectActivitiesProps {
  projectId: string
}

export const ProjectActivities = memo(function ProjectActivities({
  projectId,
}: ProjectActivitiesProps) {
  const { activities, isLoading, error } = useProjectActivities(projectId)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Failed to load activities</div>
  }

  if (activities.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No activities found for this project
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  )
})
