import { useTranslation } from "react-i18next"
import { useCustomer } from "@/context/customer-context"
import { Ticket } from "lucide-react"
import { ComplaintCard } from "./complaint-card"
import { EmptyState } from "@/components/ui"

export function ComplaintList() {
  const { tickets } = useCustomer()

  const { t } = useTranslation()

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
