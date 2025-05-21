'use client'
import { withDynamic } from '@/lib/with-dynamic'
import { LoadingSpinner } from '@/components/common/loading-spinner'
const SettingsForm = withDynamic(() => import('./settings-form'), 'SettingsForm', {
  loading: () => <LoadingSpinner />,
})
const SavedInformation = withDynamic(() => import('./saved-information'), 'SavedInformation', {
  loading: () => <LoadingSpinner />,
})
export const SettingsContent = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SettingsForm />
      <SavedInformation />
    </div>
  )
}
