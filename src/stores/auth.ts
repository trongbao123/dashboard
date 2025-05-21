import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService, type User } from '@/services/auth-service'
import { AUTH_STORAGE_KEY, AUTH_TOKEN_KEY } from '@/constants/auth'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  initAuth: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      initAuth: async () => {
        const token = typeof window !== 'undefined' && localStorage.getItem(AUTH_TOKEN_KEY)

        if (!token) {
          set({ isLoading: false, user: null, isAuthenticated: false })
          return
        }

        try {
          const user = await authService.getCurrentUser()
          set({ user, isAuthenticated: true })
        } catch {
          localStorage.removeItem(AUTH_TOKEN_KEY)
          set({ user: null, isAuthenticated: false })
        } finally {
          set({ isLoading: false })
        }
      },

      login: async (email, password) => {
        set({ isLoading: true })

        try {
          const { user, token } = await authService.login(email, password)
          localStorage.setItem(AUTH_TOKEN_KEY, token)
          set({ user, isAuthenticated: true })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await authService.logout()
          localStorage.removeItem(AUTH_TOKEN_KEY)
          set({ user: null, isAuthenticated: false })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
