import { delay } from '@/utils/delay'

const DELAY_MS = 100

export interface Stat {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
}

const getRandomChange = (): Pick<Stat, 'change' | 'changeType'> => {
  const value = +(Math.random() * 30).toFixed(1)
  return value > 15
    ? { change: `+${value}%`, changeType: 'positive' }
    : { change: `-${value}%`, changeType: 'negative' }
}

const generateStat = (title: string, value: string): Stat => ({
  title,
  value,
  ...getRandomChange(),
})

class StatsService {
  async getStats(): Promise<Stat[]> {
    await delay(DELAY_MS)

    return [
      generateStat('Total Revenue', `$${(Math.random() * 100_000).toFixed(2)}`),
      generateStat('Subscriptions', `${Math.floor(Math.random() * 5_000)}`),
      generateStat('Active Users', `${Math.floor(Math.random() * 10_000)}`),
      generateStat('Conversion Rate', `${(Math.random() * 10).toFixed(1)}%`),
    ]
  }
}

export const statsService = new StatsService()
