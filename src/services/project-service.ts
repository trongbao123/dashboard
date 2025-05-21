import type { Project, ProjectFormData } from '@/types/project'
import { delay } from '@/utils/delay'

const DELAY_MS = 100

const generateId = () => `project-${Date.now()}`
const formatDate = (date = new Date()) => date.toISOString().split('T')[0]

class ProjectService {
  private projects: Project[] = [
    {
      id: 'project-1',
      name: 'Marketing Campaign',
      description: 'Q3 marketing campaign for new product launch',
      deadline: '2023-09-30',
      status: 'active',
      createdAt: '2023-07-15',
    },
    {
      id: 'project-2',
      name: 'Website Redesign',
      description: 'Redesign the company website with new branding',
      deadline: '2023-10-15',
      status: 'active',
      createdAt: '2023-06-20',
    },
    {
      id: 'project-3',
      name: 'Mobile App Development',
      description: 'Develop a mobile app for iOS and Android',
      deadline: '2023-12-01',
      status: 'active',
      createdAt: '2023-05-10',
    },
  ]

  async getProjects(): Promise<Project[]> {
    await delay(DELAY_MS)
    return [...this.projects]
  }

  async getProject(id: string): Promise<Project | null> {
    await delay(DELAY_MS)
    return this.projects.find(p => p.id === id) ?? null
  }

  createProject = async (data: ProjectFormData): Promise<Project> => {
    await delay(DELAY_MS)

    const newProject: Project = {
      id: generateId(),
      ...data,
      status: 'active',
      createdAt: formatDate(),
    }

    this.projects.unshift(newProject)
    return newProject
  }

  updateProject = async (id: string, updates: Partial<Project>): Promise<Project> => {
    await delay(DELAY_MS)

    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Project not found')

    this.projects[index] = {
      ...this.projects[index],
      ...updates,
      id: this.projects[index].id,
      createdAt: this.projects[index].createdAt,
    }

    return this.projects[index]
  }

  async deleteProject(id: string): Promise<void> {
    await delay(DELAY_MS)

    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Project not found')

    this.projects.splice(index, 1)
  }
  getAllInternal() {
    return this.projects
  }
}

export const projectService = new ProjectService()
