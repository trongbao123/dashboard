'use client'

import { PageTitle } from '@/components/common/page-title'
import { AppShell } from '@/components/layout/app-shell'
import { SettingsContent } from './settings-content'

export function SettingsPage() {
  return (
    <AppShell>
      <PageTitle title="Settings" description="Manage your account settings and preferences." />
      <SettingsContent />
    </AppShell>
  )
}
