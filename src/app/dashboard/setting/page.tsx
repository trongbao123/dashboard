import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { SettingsPage } from '@/modules/setting/settings-page'

export default function Setting() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SettingsPage />
    </Suspense>
  )
}
