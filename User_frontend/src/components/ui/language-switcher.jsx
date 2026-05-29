import { useTranslation } from "react-i18next"
import { Languages } from "lucide-react"

export function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation()
  const isMyanmar = i18n.language === "my"

  const toggle = () => {
    const next = isMyanmar ? "en" : "my"
    i18n.changeLanguage(next)
    localStorage.setItem("app_language", next)
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
      title={isMyanmar ? "Switch to English" : "မြန်မာဘာသာသို့ ပြောင်းရန်"}
    >
      <Languages className="h-3.5 w-3.5" />
      {isMyanmar ? "EN" : "မြန်မာ"}
    </button>
  )
}
