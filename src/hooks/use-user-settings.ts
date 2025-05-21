'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/user-service'
import { toast } from 'sonner'
import { USER_SETTINGS_KEY } from '@/constants/query-key'
import { useUserSettingsStore } from '@/stores/user-setting'
import { useEffect } from 'react'

export function useUserSettings() {
  const queryClient = useQueryClient()
  const { localSettings, setLocalSettings, resetSettings } = useUserSettingsStore()
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USER_SETTINGS_KEY],
    queryFn: userService.getUserSettings,
  })

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings)
    }
  }, [settings, setLocalSettings])

  const { mutateAsync: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: userService.updateUserSettings,
    onSuccess: updatedData => {
      setLocalSettings(updatedData)
      queryClient.invalidateQueries({ queryKey: [USER_SETTINGS_KEY] })
    },
    onError: () => {
      toast.error('Update Failed', {
        description: 'Could not update settings. Please try again.',
      })
    },
  })

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    isUpdating,
  }
}
