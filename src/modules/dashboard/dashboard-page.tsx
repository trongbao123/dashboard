'use client'

import { PageTitle } from '@/components/common/page-title'
import { AppShell } from '@/components/layout/app-shell'
import { DashboardContent } from './dashboard-content'
import { withDynamic } from '@/lib/with-dynamic'
import { LoadingSpinner } from '@/components/common/loading-spinner'
const CreateProjectDialog = withDynamic(
  () => import('@/modules/project/create-project-dialog'),
  'CreateProjectDialog',
  { loading: () => <LoadingSpinner /> }
)
export function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        <PageTitle title="Dashboard" description="Overview of your account and recent activity." />
        <div className="flex flex-col sm:flex-row justify-end items-start gap-2 mb-6">
          <CreateProjectDialog />
        </div>
      </div>
      <DashboardContent />
    </AppShell>
  )
}
