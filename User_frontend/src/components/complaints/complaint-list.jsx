import { useCustomer } from "@/context/customer-context"
import { Ticket } from "lucide-react"
import { ComplaintCard } from "./complaint-card"
import { EmptyState } from "@/components/ui"

export function ComplaintList() {
  const { tickets } = useCustomer()

  if (tickets.length === 0) {
    return (
      <EmptyState
        icon={Ticket}
        title="No Complaints"
        description="You haven't submitted any tickets yet."
      />
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-gray-900">Complaint History</h2>
        <span className="text-xs text-muted">{tickets.length} ticket{tickets.length > 1 ? "s" : ""}</span>
      </div>
      {tickets.map((ticket, i) => (
        <ComplaintCard key={ticket.id} ticket={ticket} index={i} />
      ))}
    </div>
  )
}
