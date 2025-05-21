import { LoadingSpinner } from '@/components/common/loading-spinner'
import { DashboardPage } from '@/components/pages/dashboard/dashboard-page'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardPage />
    </Suspense>
  )
}
