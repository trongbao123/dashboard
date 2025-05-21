'use client'

import { LoadingSpinner } from '@/components/common/loading-spinner'
import { PageTitle } from '@/components/common/page-title'
import { AppShell } from '@/components/layout/app-shell'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ProjectContent } from './project-content'
import { useProject } from '@/hooks/use-project'

interface ProjectDetailPageProps {
  id: string
}

export function ProjectDetailPage({ id }: ProjectDetailPageProps) {
  const { project, isLoading, error } = useProject(id)

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

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center text-red-500 py-8">Failed to load project</div>
      ) : project ? (
        <>
          <PageTitle title={project.name} description={project.description} />
          <ProjectContent project={project} />
        </>
      ) : (
        <div className="text-center py-8">Project not found</div>
      )}
    </AppShell>
  )
}
