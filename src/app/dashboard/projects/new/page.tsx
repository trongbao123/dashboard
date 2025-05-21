import { LoadingSpinner } from '@/components/common/loading-spinner'
import { NewProjectPage } from '@/modules/project/new-project-page'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NewProjectPage />
    </Suspense>
  )
}
