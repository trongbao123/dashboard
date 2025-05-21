'use client'

import { PageTitle } from '@/components/common/page-title'
import { AppShell } from '@/components/layout/app-shell'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { NewProjectForm } from './new-project-form'

export function NewProjectPage() {
  return (
    <AppShell>
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <PageTitle
        title="Create New Project"
        description="Fill in the details to create a new project."
      />
      <div className="max-w-2xl">
        <NewProjectForm />
      </div>
    </AppShell>
  )
}
