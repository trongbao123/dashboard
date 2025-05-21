'use client'

import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Activity } from '@/types/activity'

interface ActivityContentProps {
  activity: Activity
}

export const ActivityContent = memo(function ActivityContent({ activity }: ActivityContentProps) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Activity Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm">Status</h3>
              <div className="mt-1">
                {activity.isImportant ? (
                  <Badge variant="default">Important</Badge>
                ) : (
                  <Badge variant="outline">Regular</Badge>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm">Time</h3>
              <p className="text-muted-foreground">{activity.time}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm">Description</h3>
              <p className="text-muted-foreground">{activity.description}</p>
            </div>
            {activity.projectId && (
              <div>
                <h3 className="font-medium text-sm">Related Project</h3>
                <p className="text-muted-foreground">Project ID: {activity.projectId}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
})
