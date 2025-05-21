'use client'

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
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodTypeAny } from 'zod'

type Field = {
  name: string
  label: string
  type?: string
  placeholder?: string
}

type GenericDialogFormProps<T extends ZodTypeAny> = {
  triggerLabel: string
  title: string
  description?: string
  schema: T
  fields: Field[]
  onSubmit: (values: z.infer<T>) => void
}

export function GenericDialogForm<T extends ZodTypeAny>({
  triggerLabel,
  title,
  description,
  schema,
  fields,
  onSubmit,
}: GenericDialogFormProps<T>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  })

  const submitHandler = (data: z.infer<T>) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {fields.map(field => (
              <div key={field.name} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.name} className="text-right">
                  {field.label}
                </Label>
                <div className="col-span-3">
                  <Input
                    id={field.name}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    {...register(field.name as any)}
                  />
                  {errors[field.name as keyof typeof errors] && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[field.name as keyof typeof errors]?.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
