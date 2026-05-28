import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Wifi, Phone, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"

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

function validatePhone(value) {
  const cleaned = value.replace(/\s/g, "")
  if (!cleaned) return "Phone number is required"
  if (!/^0\d{8,11}$/.test(cleaned)) return "Enter a valid phone number (e.g. 0123456789)"
  return ""
}

function validatePassword(value) {
  if (!value) return "Password is required"
  return ""
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const phoneErr = validatePhone(phone)
    const passErr = validatePassword(password)
    setErrors({ phone: phoneErr, password: passErr })
    if (phoneErr || passErr) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    login(phone.trim(), password)
    navigate("/", { replace: true })
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="mx-auto w-full max-w-lg flex-1 flex flex-col px-6">
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
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-muted mt-1">Enter your phone number to continue</p>
          </motion.div>

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                  <input
                  type="tel"
                  inputMode="numeric"
                  name="phone"
                  autoComplete="tel"
                  placeholder="e.g. 0123456789"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((p) => ({ ...p, phone: "" })) }}
                  className={`w-full h-12 pl-10 pr-4 rounded-xl border bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                    errors.phone ? "border-danger ring-2 ring-danger/20" : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                  <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: "" })) }}
                  className={`w-full h-12 pl-10 pr-11 rounded-xl border bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all ${
                    errors.password ? "border-danger ring-2 ring-danger/20" : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
              </button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {}}
              className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
              Forgot password?
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
