import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Clock, TicketCheck, ChevronRight } from "lucide-react"
import { useCustomer } from "@/context/customer-context"
import { Badge } from "@/components/ui"

export function ActiveTickets() {
  const { t } = useTranslation()
  const { tickets } = useCustomer()
  const openTickets = tickets.filter((t) => ["open", "assigned", "in_progress"].includes(t.status))
  const visibleTicket = openTickets.slice(0, 1)

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className={`text-sm font-semibold ${openTickets.length === 0 ? 'text-muted' : 'text-gray-900'}`}>{t("home.active_tickets")}</h2>
          <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 text-[10px] font-semibold bg-warning-light text-warning rounded-md">
            {openTickets.length}
          </span>
        </div>
        <Link
          to="/complaints"
          className="text-xs font-medium text-warning hover:text-warning/80 transition-colors"
        >
          {t("home.see_all")}
        </Link>
      </div>
      <div className="space-y-2.5">
        {openTickets.length === 0 ? (
          // <div className="flex flex-col items-center py-10 text-center">
          //   <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-success-light">
          //     <TicketCheck className="h-5 w-5 text-success" />
          //   </div>
          //   <p className="text-sm font-medium text-gray-900">All clear!</p>
          //   <p className="text-xs text-muted mt-0.5">No open tickets</p>
          // </div>
          null
        ) : (
          <>
            {visibleTicket.map((ticket, i) => (
              <TicketCard key={ticket.id} ticket={ticket} index={i} />
            ))}
            {openTickets.length > 1 && (
              <Link
                to="/complaints"
                className="flex items-center justify-center gap-1 rounded-2xl border border-dashed border-warning/30 bg-warning-light/30 py-2.5 text-xs font-medium text-warning hover:bg-warning-light/60 transition-colors"
              >
                {t("home.view_all_tickets", { count: openTickets.length })} <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function TicketCard({ ticket, index }) {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-card border border-gray-100/60 dark:border-slate-700/60 transition-shadow duration-200 hover:shadow-card-hover"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-warning" />
      <div className="pl-[18px] pr-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{ticket.deviceName}</h3>
              <Badge status={ticket.status} />
            </div>
            <p className="text-xs text-warning font-medium mt-0.5">{t(`category.${ticket.category.toLowerCase().replace(/\s+/g, "_")}`, ticket.category)}</p>
            <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-1">{ticket.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-warning-light px-2.5 py-1.5 mt-0.5">
            {ticket.eta ? (
              <>
                <Clock className="h-3 w-3 text-warning" />
                <span className="text-[11px] font-semibold text-warning whitespace-nowrap">{t("home.fix_eta", { eta: ticket.eta })}</span>
              </>
            ) : (
              <>
                <motion.span
                  className="h-2 w-2 rounded-full bg-warning"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-[11px] font-medium text-warning whitespace-nowrap">{t("home.calculating")}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
