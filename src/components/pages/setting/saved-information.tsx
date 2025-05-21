'use client'

import { memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserSettings } from '@/hooks/use-user-settings'

const TITLE = 'Saved Information'
const DESCRIPTION = 'Your current saved profile information'

export const SavedInformation = memo(function SavedInformation() {
  const { settings, isLoading, error } = useUserSettings()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{TITLE}</CardTitle>
        <CardDescription>{DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <ErrorState />}
        {isLoading && <LoadingState />}
        {!isLoading && !error && <DataState settings={settings} />}
      </CardContent>
    </Card>
  )
})

function ErrorState() {
  return <div className="text-center text-red-500 py-4">Failed to load saved information</div>
}

function LoadingState() {
  return (
    <div className="space-y-2">
      <Row label="Name:">
        <Skeleton className="h-4 w-32" />
      </Row>
      <Row label="Email:">
        <Skeleton className="h-4 w-48" />
      </Row>
      <Row label="Password:">
        <Skeleton className="h-4 w-24" />
      </Row>
    </div>
  )
}

function DataState({ settings }: { settings: any }) {
  if (!settings) {
    return (
      <p className="text-muted-foreground">
        No information saved yet. Fill out the form to save your details.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <Row label="Name:">{settings.name || ''}</Row>
      <Row label="Email:">{settings.email || ''}</Row>
      <Row label="Password:">{settings.password ? '••••••••' : ''}</Row>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium w-20">{label}</span>
      {children}
    </div>
  )
}
