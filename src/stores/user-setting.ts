import { USER_SETTINGS_KEY } from '@/constants/query-key'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserSettings {
  name: string
  email: string
  password: string
}

interface UserSettingsState {
  localSettings: UserSettings
  setLocalSettings: (data: Partial<UserSettings>) => void
  resetSettings: () => void
}

export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    set => ({
      localSettings: {
        name: '',
        email: '',
        password: '',
      },
      setLocalSettings: data =>
        set(state => ({
          localSettings: {
            ...state.localSettings,
            ...data,
          },
        })),
      resetSettings: () =>
        set({
          localSettings: {
            name: '',
            email: '',
            password: '',
          },
        }),
    }),
    {
      name: USER_SETTINGS_KEY,
    }
  )
)
