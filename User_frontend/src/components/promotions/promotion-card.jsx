import { motion } from "framer-motion"
import { Sparkles, Gift, Zap } from "lucide-react"
import { useCustomer } from "@/context/customer-context"

const iconMap = {
  primary: Sparkles,
  secondary: Gift,
  success: Zap,
}

const colorMap = {
  primary: "from-primary to-secondary text-white",
  secondary: "from-secondary to-cyan-400 text-white",
  success: "from-success to-emerald-400 text-white",
}

export function PromotionCard({ promo, index }) {
  const Icon = iconMap[promo.color] || Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-2xl shadow-card border border-gray-100/60"
    >
      <div className={`bg-linear-135 ${colorMap[promo.color]} p-5`}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">{promo.title}</h3>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm">
                {promo.badge}
              </span>
            </div>
            <p className="mt-1 text-xs text-white/80 leading-relaxed">{promo.description}</p>
          </div>
        </div>
      </div>
      <div className="bg-white px-5 py-3">
        <button className="text-xs font-medium text-primary hover:text-primary-dark transition-colors">
          Learn More →
        </button>
      </div>
    </motion.div>
  )
}
