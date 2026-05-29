import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Wifi, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle"
import { normalizeDigits } from "@/lib/normalize"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

function validatePhone(value, t) {
  const cleaned = value.replace(/\s/g, "")
  if (!cleaned) return t("login.phone_required")
  if (!/^(0|\+?60)\d{8,10}$/.test(cleaned)) return t("login.phone_invalid")
  return ""
}

function validatePassword(value, t) {
  if (!value) return t("login.password_required")
  if (value.length < 6) return t("login.password_required")
  return ""
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true })
  }, [isAuthenticated, navigate])

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const phoneErr = validatePhone(phone, t)
    const passErr = validatePassword(password, t)
    setErrors({ phone: phoneErr, password: passErr })
    if (phoneErr || passErr) return

    setLoading(true)
    setFormError("")

    try {
      await login(phone.trim(), password)
      navigate("/", { replace: true })
    } catch (exception) {
      setFormError(exception.errors?.phone?.[0] || exception.message || t("login.error_unable"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="mx-auto w-full max-w-lg flex-1 flex flex-col px-6">
        <div className="flex justify-end pt-4 gap-1">
          <DarkModeToggle />
          <LanguageSwitcher />
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col justify-center pb-16"
        >
            <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
              <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg mb-5">
                <Wifi className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{t("login.welcome")}</h1>
              <p className="text-sm text-muted mt-2">{t("login.subtitle")}</p>
            </motion.div>

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("login.phone_label")}</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                  <input
                  type="tel"
                  inputMode="numeric"
                  name="phone"
                  autoComplete="tel"
                  placeholder={t("login.phone_placeholder")}
                  value={phone}
                  onChange={(e) => { setPhone(normalizeDigits(e.target.value)); if (errors.phone) setErrors((p) => ({ ...p, phone: "" })) }}
                  className={`w-full h-12 pl-10 pr-4 rounded-xl border bg-white dark:bg-slate-900 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                    errors.phone ? "border-danger ring-2 ring-danger/20" : "border-gray-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone}</p>}
            </motion.div>

            {formError && (
              <motion.p variants={itemVariants} className="text-sm text-danger">
                {formError}
              </motion.p>
            )}

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("login.password_label")}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                  <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder={t("login.password_placeholder")}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: "" })) }}
                  className={`w-full h-12 pl-10 pr-11 rounded-xl border bg-white dark:bg-slate-900 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                    errors.password ? "border-danger ring-2 ring-danger/20" : "border-gray-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-danger mt-1">{errors.password}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark disabled:bg-primary/60 text-white text-sm font-semibold flex items-center justify-center transition-colors mt-2"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : t("login.sign_in")}
              </button>
            </motion.div>
          </form>

          {/* <motion.div variants={itemVariants} className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {}}
              className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {t("login.forgot_password")}
            </button>
          </motion.div> */}
        </motion.div>
      </div>
    </div>
  )
}
