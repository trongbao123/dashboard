'use client'

import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { useActivities } from '@/hooks/use-activities'
import { Activity } from '@/types/activity'
import { withDynamic } from '@/lib/with-dynamic'
const ActivityItem = withDynamic(() => import('./activity-item'), 'ActivityItem', {
  loading: () => <LoadingSpinner />,
})
export function RecentActivity() {
  const { activities, isLoading, error, fetchMore, hasNextPage, isFetchingNextPage } =
    useActivities()

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchMore()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchMore])

  const renderSkeletons = useMemo(
    () => (
      <div className="space-y-4" aria-hidden>
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0"
          >
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    ),
    []
  )

  const isLoadingMore = isLoading || isFetchingNextPage

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your activity from the past 7 days</CardDescription>
      </CardHeader>

      <CardContent>
        {error ? (
          <p className="text-center text-red-500 py-4">Failed to load activities.</p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scroll-smooth">
            {activities.map((activity: Activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}

            {isLoadingMore && renderSkeletons}

            {hasNextPage && <div ref={ref} className="h-6" />}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchMore}
          disabled={isLoadingMore || !hasNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'No more activities'}
        </Button>
      </CardFooter>
    </Card>
  )
}
