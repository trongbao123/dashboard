import { config } from '@/configs'
import { AUTH_TOKEN_KEY } from '@/constants/auth'
import { delay } from '@/utils/delay'
const DELAY_MS = 200
export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  user: User
  token: string
}

class AuthService {
  private static readonly EMAIL = config.auth.email
  private static readonly PASSWORD = config.auth.password

  private static readonly USER: User = {
    id: '1',
    name: 'Admin',
    email: AuthService.EMAIL,
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    await delay(DELAY_MS)

    if (email !== AuthService.EMAIL) {
      throw new Error('Invalid email')
    }

    if (password !== AuthService.PASSWORD) {
      throw new Error('Invalid password')
    }
    const token = config.auth.token
    localStorage.setItem(AUTH_TOKEN_KEY, token)

    return {
      user: AuthService.USER,
      token,
    }
  }

  async logout(): Promise<void> {
    await delay(DELAY_MS)
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  async getCurrentUser(): Promise<User> {
    await delay(DELAY_MS)

    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) throw new Error('Not authenticated')

    return AuthService.USER
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authService = new AuthService()
