import { delay } from '@/utils/delay'

const DELAY_MS = 100

interface UserSettings {
  name: string
  email: string
  password: string
}

let mockSettings: UserSettings = {
  name: '',
  email: '',
  password: '',
}

class UserService {
  async getUserSettings(): Promise<UserSettings> {
    await delay(DELAY_MS)
    return mockSettings
  }

  async updateUserSettings(data: UserSettings): Promise<UserSettings> {
    await delay(DELAY_MS)
    mockSettings = data
    return data
  }
}

export const userService = new UserService()
