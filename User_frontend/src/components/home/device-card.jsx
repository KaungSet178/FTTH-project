import { motion } from "framer-motion"
import { Router, ChevronRight, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui"

export function DeviceCard({ device, onReport, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="group bg-white rounded-2xl shadow-card border border-gray-100/60 p-5 transition-shadow duration-200 hover:shadow-card-hover"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light">
          <Router className="h-7 w-7 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{device.name}</h3>
            {/* <Badge status={device.signal} /> */}
          </div>
          <p className="mt-0.5 text-xs font-mono text-muted">{device.id}</p>
          <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-1">{device.address}</p>

          <div className="mt-3 flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-400 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 transition-all duration-200">
              View Details <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onReport(device)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Report Issue
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
