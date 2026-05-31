import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Router, ChevronRight, AlertTriangle } from "lucide-react"

export function DeviceCard({ device, onReport, delay = 0 }) {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-card border border-gray-100/60 dark:border-slate-700/60 p-5 transition-shadow duration-200 hover:shadow-card-hover"
    >
      <div className="hidden dark:block absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
      <div className="dark:pl-[18px]">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light dark:bg-white/10">
            <Router className="h-7 w-7 text-primary" />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{device.name}</h3>
            <p className="mt-0.5 text-xs font-mono text-muted dark:text-slate-400">{device.id}</p>
            <p className="mt-1.5 text-xs text-muted dark:text-slate-400 leading-relaxed line-clamp-1">{device.address}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {/* <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-400 dark:bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 dark:hover:bg-primary-dark transition-all duration-200">
                {t("home.view_details")} <ChevronRight className="h-3.5 w-3.5" />
              </button> */}
              <button
                onClick={() => onReport(device)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-100 dark:bg-red-900/40 px-3 py-1.5 text-xs font-medium text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-800/60 transition-all duration-200"
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                {t("home.report_issue")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
