import { DollarSign, Users, CreditCard, Activity as ActivityIcon } from 'lucide-react'

export const STAT_ICON_MAP: Record<string, React.ElementType> = {
  'Total Revenue': DollarSign,
  Subscriptions: CreditCard,
  'Active Users': Users,
  'Conversion Rate': ActivityIcon,
  default: ActivityIcon,
}
