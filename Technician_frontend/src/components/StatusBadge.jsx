import { Clock, Wrench, CheckCircle2, AlertTriangle } from 'lucide-react'

const statusConfig = {
  'pending': {
    label: 'Pending',
    classes: 'bg-warning-light text-warning',
    icon: Clock
  },
  'in-progress': {
    label: 'In Progress',
    classes: 'bg-primary-light text-primary',
    icon: Wrench
  },
  'completed': {
    label: 'Completed',
    classes: 'bg-success-light text-success',
    icon: CheckCircle2
  }
}

export default function StatusBadge({ status, discrepancyReported }) {
  const config = statusConfig[status] || statusConfig.pending
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold leading-none ${config.classes}`}>
      <Icon size={13} strokeWidth={2.5} />
      {config.label}
      {discrepancyReported && (
        <AlertTriangle size={12} strokeWidth={2.5} className="text-warning ml-0.5" />
      )}
    </span>
  )
}
