'use client'

import { LoadingSpinner } from '@/components/common/loading-spinner'
import { withDynamic } from '@/lib/with-dynamic'
import { useParams } from 'next/navigation'

const ActivityDetailPage = withDynamic(
  () => import('@/components/pages/activities/activity-detail-page'),
  'ActivityDetailPage',
  {
    loading: () => {
      return <LoadingSpinner />
    },
    ssr: true,
  }
)

export default function Page() {
  const params = useParams()
  const id = params.id as string

  return <ActivityDetailPage id={id} />
}
