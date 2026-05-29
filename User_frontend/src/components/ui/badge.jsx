const variants = {
  open: "bg-warning-light text-warning",
  assigned: "bg-primary-light text-primary",
  in_progress: "bg-primary-light text-primary",
  closed: "bg-gray-100 text-muted",
  cancelled: "bg-danger-light text-danger",
  paid: "bg-success-light text-success",
  pending: "bg-warning-light text-warning",
  overdue: "bg-danger-light text-danger",
  online: "bg-success-light text-success",
  offline: "bg-danger-light text-danger",
  strong: "bg-success-light text-success",
  medium: "bg-warning-light text-warning",
  weak: "bg-danger-light text-danger",
}

const defaults = {
  open: "Open",
  assigned: "Assigned",
  in_progress: "In Progress",
  closed: "Closed",
  cancelled: "Cancelled",
  paid: "Paid",
  pending: "Pending",
  online: "Online",
  offline: "Offline",
  strong: "Strong",
  medium: "Medium",
  weak: "Weak",
}

export function Badge({ status, children, className = "" }) {
  const colorClass = variants[status] || "bg-gray-100 text-muted"
  const label = children || defaults[status] || status
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass} ${className}`}>
      {status === "online" || status === "strong" ? (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      ) : null}
      {label}
    </span>
  )
}
