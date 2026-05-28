import { motion } from "framer-motion"
import { Wifi, Clock } from "lucide-react"
import { Badge } from "@/components/ui"

export function ComplaintCard({ ticket, index }) {
  const categoryIcon = ticket.category === "No Internet" || ticket.category === "Slow Speed"
    ? "bg-red-50 text-red-500"
    : ticket.category === "Device Offline"
    ? "bg-orange-50 text-orange-500"
    : "bg-gray-50 text-muted"

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="bg-white rounded-2xl shadow-card border border-gray-100/60 p-4"
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${categoryIcon}`}>
          <Wifi className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{ticket.category}</h3>
            <Badge status={ticket.status} />
          </div>
          <p className="mt-0.5 text-xs font-mono text-muted">{ticket.id}</p>
          <p className="mt-1 text-xs text-muted line-clamp-2">{ticket.description}</p>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-muted">
            <span className="flex items-center gap-1">
              <Wifi className="h-3 w-3" />
              {ticket.deviceName}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {ticket.updatedAt}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
