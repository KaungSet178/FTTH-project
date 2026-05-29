import { useTranslation } from "react-i18next"
import { useCustomer } from "@/context/customer-context"
import { Ticket, AlertCircle } from "lucide-react"
import { ComplaintCard } from "./complaint-card"
import { EmptyState, Skeleton } from "@/components/ui"

export function ComplaintList() {
  const { tickets, loading, error } = useCustomer()

  const { t } = useTranslation()

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-16 px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-danger-light">
          <AlertCircle className="h-8 w-8 text-danger" />
        </div>
        <p className="text-sm text-danger font-medium">{error}</p>
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <EmptyState
        icon={Ticket}
        title={t("complaints.no_complaints")}
        description={t("complaints.no_complaints_desc")}
      />
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-gray-900">{t("complaints.history")}</h2>
        <span className="text-xs text-muted">{t("complaints.ticket_count", { count: tickets.length })}</span>
      </div>
      {tickets.map((ticket, i) => (
        <ComplaintCard key={ticket.id} ticket={ticket} index={i} />
      ))}
    </div>
  )
}
