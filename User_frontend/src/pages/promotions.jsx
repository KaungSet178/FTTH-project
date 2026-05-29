import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Gift } from "lucide-react"
import { useCustomer } from "@/context/customer-context"
import { PromotionCard } from "@/components/promotions/promotion-card"
import { EmptyState } from "@/components/ui"

export default function Promotions() {
  const { t } = useTranslation()
  const { promotions } = useCustomer()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-gray-900">{t("promotions.title")}</h1>
        <p className="text-sm text-muted mt-0.5">{t("promotions.subtitle")}</p>
      </div>

      {promotions.length === 0 ? (
        <EmptyState
          icon={Gift}
          title={t("promotions.no_offers")}
          description={t("promotions.no_offers_desc")}
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
