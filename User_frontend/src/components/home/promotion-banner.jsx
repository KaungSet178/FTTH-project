import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { useCustomer } from "@/context/customer-context"

const colorMap = {
  primary: "from-primary to-secondary",
  secondary: "from-secondary to-cyan-400",
  success: "from-success to-emerald-400",
}

export function PromotionBanner() {
  const { promotions } = useCustomer()
  const [current, setCurrent] = useState(0)
  const promo = promotions[current]

  if (!promotions.length) return null

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className={`relative bg-linear-135 ${colorMap[promo.color]} p-5 text-white`}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
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

          {promotions.length > 1 && (
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => setCurrent((p) => (p === 0 ? promotions.length - 1 : p - 1))}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <div className="flex gap-1.5">
                {promotions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrent((p) => (p === promotions.length - 1 ? 0 : p + 1))}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
