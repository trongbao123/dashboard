'use client'

import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useProjects } from '@/hooks/use-projects'
import { useRouter } from 'next/navigation'

const projectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters.'),
  description: z.string().min(5, 'Description must be at least 5 characters.'),
  deadline: z.string().min(1, 'Please select a deadline.'),
})

type ProjectFormValues = z.infer<typeof projectSchema>

export const NewProjectForm = memo(function NewProjectForm() {
  const { createProject, isCreating } = useProjects()
  const router = useRouter()

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      deadline: '',
    },
  })

  const onSubmit = useCallback(
    async (values: ProjectFormValues) => {
      try {
        const newProject = await createProject(values)

        toast.success('Project created', {
          description: `Project "${values.name}" created successfully.`,
        })

        router.push(`/dashboard/projects/${newProject.id}`)
      } catch {
        toast.error('Failed to create project. Please try again.')
      }
    },
    [createProject, router]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Information</CardTitle>
        <CardDescription>Enter details for your new project.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Marketing Campaign" {...field} />
                  </FormControl>
                  <FormDescription>Name of the project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short project summary"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Goals and scope of the project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Project completion date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Project'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
})
