'use client'

import { useActivity } from '@/hooks/use-activity'
import { AppShell } from '@/components/layout/app-shell'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { PageTitle } from '@/components/common/page-title'
import { ActivityContent } from './activity-content'

interface ActivityDetailPageProps {
  id: string
}

export function ActivityDetailPage({ id }: ActivityDetailPageProps) {
  const { activity, isLoading, error } = useActivity(id)

  return (
    <AppShell>
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center text-red-500 py-8">Failed to load activity</div>
      ) : activity ? (
        <>
          <PageTitle title={activity.action} description={activity.description} />
          <ActivityContent activity={activity} />
        </>
      ) : (
        <div className="text-center py-8">Activity not found</div>
      )}
    </AppShell>
  )
}
