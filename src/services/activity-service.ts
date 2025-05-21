const DELAY = 100

import type { Activity, ActivityFormData } from '@/types/activity'
import { delay } from '@/utils/delay'

class ActivityService {
  private activities: Activity[] = [
    {
      id: '1',
      action: 'Project Created',
      description: "You created a new project 'Marketing Campaign'",
      time: '2 hours ago',
      isImportant: true,
      projectId: 'project-1',
    },
    {
      id: '2',
      action: 'File Uploaded',
      description: "You uploaded 'presentation.pdf' to the project",
      time: '5 hours ago',
      isImportant: false,
      projectId: 'project-1',
    },
    {
      id: '3',
      action: 'Comment Added',
      description: "You commented on Jane's task",
      time: 'Yesterday',
      isImportant: false,
    },
    {
      id: '4',
      action: 'Task Completed',
      description: "You marked 'Design Homepage' as complete",
      time: '2 days ago',
      isImportant: true,
      projectId: 'project-2',
    },
    {
      id: '5',
      action: 'New Member',
      description: 'You added Alex to the team',
      time: '3 days ago',
      isImportant: false,
    },
    {
      id: '6',
      action: 'Meeting Scheduled',
      description: 'Team meeting scheduled for next Monday',
      time: '4 days ago',
      isImportant: false,
      projectId: 'project-1',
    },
    {
      id: '7',
      action: 'Project Updated',
      description: 'Project deadline extended by 2 weeks',
      time: '1 week ago',
      isImportant: true,
      projectId: 'project-2',
    },
    {
      id: '8',
      action: 'Invoice Paid',
      description: 'Client paid invoice #1234',
      time: '1 week ago',
      isImportant: false,
    },
    {
      id: '9',
      action: 'New Feature',
      description: 'Added dark mode support to the application',
      time: '2 weeks ago',
      isImportant: false,
      projectId: 'project-3',
    },
    {
      id: '10',
      action: 'Bug Fixed',
      description: 'Fixed login issue on mobile devices',
      time: '2 weeks ago',
      isImportant: false,
    },
    {
      id: '11',
      action: 'Performance Improved',
      description: 'Optimized database queries for faster loading',
      time: '3 weeks ago',
      isImportant: false,
      projectId: 'project-3',
    },
    {
      id: '12',
      action: 'New Client',
      description: 'Onboarded Acme Corp as a new client',
      time: '3 weeks ago',
      isImportant: true,
    },
    {
      id: '13',
      action: 'Feedback Collected',
      description: 'Received user feedback on new dashboard design',
      time: '1 month ago',
      isImportant: false,
      projectId: 'project-1',
    },
    {
      id: '14',
      action: 'Version Released',
      description: 'Released version 2.0 of the application',
      time: '1 month ago',
      isImportant: true,
      projectId: 'project-2',
    },
    {
      id: '15',
      action: 'Training Completed',
      description: 'Completed team training on new technologies',
      time: '1 month ago',
      isImportant: false,
    },
  ]

  async getActivities(page = 1, limit = 5): Promise<Activity[]> {
    await delay(DELAY)
    const start = (page - 1) * limit
    const end = start + limit
    return this.activities.slice(start, end)
  }

  async getActivity(id: string): Promise<Activity | null> {
    await delay(DELAY)
    return this.activities.find(a => a.id === id) || null
  }

  async getActivitiesByProject(projectId: string): Promise<Activity[]> {
    await delay(DELAY)
    return this.activities.filter(a => a.projectId === projectId)
  }

  deleteActivity = async (id: string): Promise<void> => {
    await delay(DELAY)
    const index = this.activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')
    this.activities.splice(index, 1)
  }

  updateActivity = async (id: string, data: Partial<Activity>): Promise<Activity> => {
    await delay(DELAY)
    const index = this.activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')

    this.activities[index] = { ...this.activities[index], ...data }
    return this.activities[index]
  }

  createActivity = async (data: ActivityFormData): Promise<Activity> => {
    await delay(DELAY)

    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      ...data,
    }

    this.activities.unshift(newActivity)
    return newActivity
  }
  getAllInternal(): Activity[] {
    return this.activities
  }
}

export const activityService = new ActivityService()
