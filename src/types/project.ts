export interface Project {
  id: string
  name: string
  description: string
  deadline: string
  status: 'active' | 'completed' | 'archived'
  createdAt: string
}

export type ProjectFormData = Omit<Project, 'id' | 'status' | 'createdAt'>
