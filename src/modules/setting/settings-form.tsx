'use client'

import { memo, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { useUserSettings } from '@/hooks/use-user-settings'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

type FormValues = z.infer<typeof schema>

const FIELDS: {
  name: keyof FormValues
  label: string
  placeholder: string
  type?: string
  description: string
}[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'admin',
    description: 'This is your public display name.',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'admin@gmail.com',
    description: 'Your email address will be used for notifications.',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
    description: 'Must be at least 8 characters.',
  },
]

export const SettingsForm = memo(function SettingsForm() {
  const { settings, isLoading, updateSettings, isUpdating } = useUserSettings()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: settings?.name ?? '',
      email: settings?.email ?? '',
      password: settings?.password ?? '',
    },
  })

  useEffect(() => {
    if (settings) {
      form.reset(settings)
    }
  }, [settings, form])

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await updateSettings(values)
        toast.success('Profile updated', {
          description: 'Your profile has been updated successfully.',
        })
      } catch {
        toast.error('Update Failed', {
          description: 'Failed to update profile. Please try again.',
        })
      }
    },
    [updateSettings]
  )

  if (isLoading) return <SettingsFormSkeleton />

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your account profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {FIELDS.map(({ name, label, placeholder, type, description }) => (
              <FormField
                key={name}
                name={name}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={placeholder} type={type ?? 'text'} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
})

function SettingsFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your account profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}
