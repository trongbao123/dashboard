'use client'

import { memo, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useProjects } from '@/hooks/use-projects'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const SCHEMA = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters.'),
  description: z.string().min(5, 'Description must be at least 5 characters.'),
  deadline: z.string().min(1, 'Please select a deadline.'),
})

type FormValues = z.infer<typeof SCHEMA>

const DEFAULT_VALUES: FormValues = {
  name: '',
  description: '',
  deadline: '',
}

export const CreateProjectDialog = memo(function CreateProjectDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { createProject, isCreating } = useProjects()

  const form = useForm<FormValues>({
    resolver: zodResolver(SCHEMA),
    defaultValues: DEFAULT_VALUES,
  })

  const onSubmit = useCallback(
    async (data: FormValues) => {
      try {
        const project = await createProject(data)
        toast.success('Project created', {
          description: `“${project.name}” has been created successfully.`,
        })
        form.reset()
        setOpen(false)
        router.push(`/dashboard/projects/${project.id}`)
      } catch {
        toast.error('Failed to create project')
      }
    },
    [createProject, router, form]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Fill in the details to create a new project.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Field name="name" label="Name" placeholder="Marketing Campaign" />
            <Field
              name="description"
              label="Description"
              placeholder="Brief description of the project"
            />
            <Field name="deadline" label="Deadline" type="date" />

            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Save Project'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
})

const Field = ({
  name,
  label,
  placeholder,
  type = 'text',
}: {
  name: keyof FormValues
  label: string
  placeholder?: string
  type?: string
}) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
