'use client'

import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types/project'
import { ProjectActivities } from './project-activities'

interface ProjectContentProps {
  project: Project
}

export const ProjectContent = memo(function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium text-sm">Status</h3>
              <div className="mt-1">
                <Badge variant={project.status === 'active' ? 'default' : 'outline'}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm">Deadline</h3>
              <p className="text-muted-foreground">{project.deadline}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-medium text-sm">Description</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Project Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectActivities projectId={project.id} />
        </CardContent>
      </Card>
    </div>
  )
})
