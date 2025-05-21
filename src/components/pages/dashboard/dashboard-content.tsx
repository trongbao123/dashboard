'use client'

import { memo } from 'react'

const RecentActivity = withDynamic(
  () => import('@/components/pages/dashboard/recent-activity'),
  'RecentActivity',
  { loading: () => <LoadingSpinner /> }
)

const DashboardStats = withDynamic(
  () => import('@/components/pages/dashboard/dashboard-stats'),
  'DashboardStats',
  { loading: () => <LoadingSpinner /> }
)

const QuickActions = withDynamic(
  () => import('@/components/pages/dashboard/quick-actions'),
  'QuickActions',
  { loading: () => <LoadingSpinner /> }
)

import { LoadingSpinner } from '@/components/common/loading-spinner'
import { withDynamic } from '@/lib/with-dynamic'

export const DashboardContent = memo(function DashboardContent() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <DashboardStats />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentActivity />
        <QuickActions />
      </div>
    </>
  )
})
