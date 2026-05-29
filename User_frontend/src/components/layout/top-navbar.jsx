import { useNavigate, useLocation } from "react-router-dom"
import { LogOut, ChevronLeft } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/context/auth-context"
import { useCustomer } from "@/context/customer-context"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle"

export function TopNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { logout } = useAuth()
  const { customer } = useCustomer()
  const isHome = location.pathname === "/"
  const initials = customer.name.split(" ").map((n) => n[0]).join("").toUpperCase()

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-lg px-4">
        <div className="flex h-14 items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {!isHome && (
              <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">{customer.name}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => { logout(); navigate("/login") }}
              title={t("navbar.logout")}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
