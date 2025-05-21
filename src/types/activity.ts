export interface Activity {
  id: string
  action: string
  description: string
  time: string
  isImportant?: boolean
  projectId?: string
}

export type ActivityFormData = Omit<Activity, 'id'>
