'use client'

import { memo, useCallback, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Bell, Calendar, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { useProjects } from '@/hooks/use-projects'
import { useActivities } from '@/hooks/use-activities'

const INITIAL_FORM = {
  action: '',
  description: '',
  projectId: '',
}

export const QuickActions = memo(function QuickActions() {
  const { createActivity, isCreating } = useActivities()
  const { projects } = useProjects()

  const [isDialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)

  const handleGenericAction = useCallback((action: string) => {
    toast(`Action: ${action}`, {
      description: `You clicked on the ${action} action`,
    })
  }, [])

  const handleCreate = async () => {
    const { action, description, projectId } = form
    if (!action || !description) {
      toast.error('Missing required fields')
      return
    }

    try {
      await createActivity({
        action,
        description,
        time: 'Just now',
        isImportant: false,
        projectId: projectId || undefined,
      })

      toast.success('Activity created successfully.')
      setForm(INITIAL_FORM)
      setDialogOpen(false)
    } catch (err: any) {
      toast.error('Error', {
        description: err?.message ?? 'Failed to create activity.',
      })
    }
  }

  const ACTIONS = [
    {
      label: 'Add Activity',
      icon: Plus,
      onClick: () => setDialogOpen(true),
    },
    {
      label: 'Notifications',
      icon: Bell,
      onClick: () => handleGenericAction('Notifications'),
    },
    {
      label: 'Calendar',
      icon: Calendar,
      onClick: () => handleGenericAction('Calendar'),
    },
    {
      label: 'Clear All Activities',
      icon: Trash2,
      onClick: () => handleGenericAction('Clear All Activities'),
      variant: 'destructive' as const,
    },
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {ACTIONS.map(({ label, icon: Icon, onClick, variant = 'outline' }) => (
            <Button key={label} className="w-full justify-start" onClick={onClick}>
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Activity</DialogTitle>
            <DialogDescription>
              Create a new activity to appear in your recent activity list.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <FormField label="Title" id="activity-title">
              <Input
                value={form.action}
                onChange={e => setForm(prev => ({ ...prev, action: e.target.value }))}
              />
            </FormField>

            <FormField label="Description" id="activity-description">
              <Input
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </FormField>

            <FormField label="Project" id="activity-project">
              <Select
                value={form.projectId}
                onValueChange={val => setForm(prev => ({ ...prev, projectId: val }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a project (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {projects?.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <DialogFooter>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Add Activity'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
})

function FormField({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <div className="col-span-3">{children}</div>
    </div>
  )
}
