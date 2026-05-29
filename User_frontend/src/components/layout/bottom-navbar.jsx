import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Home, Ticket, Bell } from "lucide-react"
import { useCustomer } from "@/context/customer-context"

export function BottomNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { tickets } = useCustomer()

  const tabs = [
    { path: "/", label: t("navbar.home"), icon: Home },
    { path: "/complaints", label: t("navbar.tickets"), icon: Ticket },
    { path: "/promotions", label: t("navbar.notifications"), icon: Bell },
  ]

  const openTickets = tickets.filter((t) => t.status === "open").length

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-t border-gray-200/60 dark:border-slate-700/60">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-around h-16">
          {tabs.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path
            return (
              <motion.button
                key={path}
                whileTap={{ scale: 0.92 }}
                onClick={() => navigate(path)}
                className="relative flex flex-col items-center gap-0.5 min-w-0 px-3 py-1"
              >
                <div className="relative">
                  <Icon
                    className={`h-5 w-5 transition-colors duration-150 ${
                      isActive ? "text-primary" : "text-gray-400"
                    }`}
                    fill={isActive ? "currentColor" : "none"}
                  />
                  {path === "/promotions" && (
                    <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-warning border-2 border-white dark:border-slate-800" />
                  )}
                  {path === "/complaints" && openTickets > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white leading-none">
                      {openTickets}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-150 ${
                    isActive ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
