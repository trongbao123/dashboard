'use client'

import { useState, memo } from 'react'
import Link from 'next/link'
import { Clock, MoreHorizontal, Trash2, Edit, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useActivities } from '@/hooks/use-activities'
import type { Activity } from '@/types/activity'

interface ActivityItemProps {
  activity: Activity
}

export const ActivityItem = memo(function ActivityItem({ activity }: ActivityItemProps) {
  const { deleteActivity, updateActivity } = useActivities()
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setDeleting] = useState(false)

  const toggleImportant = async () => {
    try {
      await updateActivity(activity.id, {
        ...activity,
        isImportant: !activity.isImportant,
      })

      toast.success(activity.isImportant ? 'Unmarked as important' : 'Marked as important', {
        description: `The activity has been ${
          activity.isImportant ? 'unmarked' : 'marked'
        } as important.`,
      })
    } catch {
      toast.error('Failed to update activity.')
    }
  }

  const confirmDelete = async () => {
    setDeleting(true)
    try {
      await deleteActivity(activity.id)
      toast.success('Activity deleted successfully.')
    } catch (err: any) {
      toast.error('Error deleting activity', {
        description: err?.message || 'Please try again.',
      })
    } finally {
      setDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <div
      className={`flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0 ${
        activity.isImportant ? 'bg-primary/5 p-2 rounded-md -mx-2' : ''
      }`}
    >
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Clock className="h-4 w-4" />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex justify-between">
          <Link href={`/dashboard/activities/${activity.id}`} className="hover:underline">
            <h4 className="text-sm font-medium">{activity.action}</h4>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/activities/${activity.id}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleImportant}>
                <Edit className="mr-2 h-4 w-4" />
                {activity.isImportant ? 'Unmark as important' : 'Mark as important'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-sm text-muted-foreground">{activity.description}</p>
        <span className="text-xs text-muted-foreground">{activity.time}</span>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the activity.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
})
