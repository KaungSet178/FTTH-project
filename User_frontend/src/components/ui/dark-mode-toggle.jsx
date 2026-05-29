import { useTranslation } from "react-i18next"
import { useState } from "react"
import { Sun, Moon } from "lucide-react"

function getInitialDarkMode() {
  const saved = localStorage.getItem("app_dark_mode")
  if (saved !== null) return saved === "true"
  return false
}

const initialDark = getInitialDarkMode()
if (initialDark) {
  document.documentElement.classList.add("dark")
}

export function DarkModeToggle({ className = "" }) {
  const { i18n } = useTranslation()
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))

  const toggle = () => {
    const next = !isDark
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("app_dark_mode", next)
    setIsDark(next)
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
      title={i18n.language === "my" ? "အလင်းအမှောင်ပြောင်းရန်" : "Toggle dark mode"}
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      {isDark ? (i18n.language === "my" ? "Light" : "Light") : (i18n.language === "my" ? "Dark" : "Dark")}
    </button>
  )
}
