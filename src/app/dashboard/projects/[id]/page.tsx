'use client'

import { LoadingSpinner } from '@/components/common/loading-spinner'
import { withDynamic } from '@/lib/with-dynamic'
import { useParams } from 'next/navigation'

const ProjectDetailPage = withDynamic(
  () => import('@/modules/project/project-detail-page'),
  'ProjectDetailPage',
  {
    loading: () => {
      return <LoadingSpinner />
    },
    ssr: true,
  }
)

export default async function Page() {
  const params = useParams()
  const id = params.id as string
  return <ProjectDetailPage id={id} />
}
