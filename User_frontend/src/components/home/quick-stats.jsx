import { motion } from "framer-motion"
import { CreditCard, TicketCheck } from "lucide-react"
import { useCustomer } from "@/context/customer-context"
import { Badge } from "@/components/ui"

const statConfig = {
  billing: { icon: CreditCard, label: "Billing Status", color: "text-success bg-success-light" },
  tickets: { icon: TicketCheck, label: "Open Tickets", color: "text-warning bg-warning-light" },
}

export function QuickStats() {
  const { customer, tickets } = useCustomer()
  const pendingTickets = tickets.filter((t) => t.status === "open").length

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        config={statConfig.billing}
        value={customer.billingStatus === "paid" ? "Paid" : "Pending"}
        meta={`Due ${customer.billingDate}`}
        delay={0}
      >
        <Badge status={customer.billingStatus} />
      </StatCard>
      <StatCard
        config={statConfig.tickets}
        value={pendingTickets}
        meta={pendingTickets === 1 ? "1 open ticket" : `${pendingTickets} open tickets`}
        delay={0.1}
      >
        <Badge status="pending" />
      </StatCard>
    </div>
  )
}

function StatCard({ config, value, meta, delay, children }) {
  const { icon: Icon, label, color } = config
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-2xl shadow-card border border-gray-100/60 p-3.5"
    >
      <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-4.5 w-4.5" />
      </div>
      <p className="text-xs text-muted mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
      {children ? children : <p className="text-xs text-muted mt-0.5">{meta}</p>}
    </motion.div>
  )
}
