import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ComplaintList } from "@/components/complaints/complaint-list"

export default function ComplaintStatus() {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-gray-900">{t("complaints.title")}</h1>
        <p className="text-sm text-muted mt-0.5">{t("complaints.subtitle")}</p>
      </div>
      <ComplaintList />
    </motion.div>
  )
}
