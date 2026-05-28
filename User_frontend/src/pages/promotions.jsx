import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import { useCustomer } from "@/context/customer-context"
import { PromotionCard } from "@/components/promotions/promotion-card"
import { EmptyState } from "@/components/ui"

export default function Promotions() {
  const { promotions } = useCustomer()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-gray-900">Promotions & Rewards</h1>
        <p className="text-sm text-muted mt-0.5">Exclusive offers for you</p>
      </div>

      {promotions.length === 0 ? (
        <EmptyState
          icon={Gift}
          title="No Offers Available"
          description="Check back later for new promotions."
        />
      ) : (
        <div className="space-y-3">
          {promotions.map((promo, i) => (
            <PromotionCard key={promo.id} promo={promo} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
