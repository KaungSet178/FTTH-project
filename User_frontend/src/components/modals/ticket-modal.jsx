import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { X, AlertTriangle } from "lucide-react"
import { useCustomer } from "@/context/customer-context"

export function TicketModal({ device, onClose }) {
  const { t } = useTranslation()
  const { addTicket, categories, loading } = useCustomer()
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const selectedCategory = categories.find((item) => String(item.id) === category)

    if (!selectedCategory) return

    setSubmitting(true)
    setError("")

    try {
      await addTicket({
        deviceId: device.id,
        deviceName: device.name,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        description,
      })
      setSubmitted(true)
      setTimeout(onClose, 1500)
    } catch (exception) {
      setError(exception.message || t("ticket_modal.error"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-800 dark:border dark:border-slate-700/60 p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950">
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">{t("ticket_modal.title")}</h2>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="h-5 w-5" />
            </button>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success-light">
                <svg className="h-7 w-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{t("ticket_modal.submitted_title")}</p>
              <p className="text-xs text-muted mt-1">{t("ticket_modal.submitted_desc")}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">{t("ticket_modal.device_label")}</label>
                <input
                  type="text"
                  value={`${device.name} (${device.id})`}
                  readOnly
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 px-3.5 py-2.5 text-sm text-gray-500 outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">{t("ticket_modal.category_label")}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="" disabled>{t("ticket_modal.category_placeholder")}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{t(`category.${cat.name.toLowerCase().replace(/\s+/g, "_")}`, cat.name)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">{t("ticket_modal.description_label")}</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  placeholder={t("ticket_modal.description_placeholder")}
                  className="w-full resize-none rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              {error && <p className="text-xs text-danger">{error}</p>}

              {categories.length === 0 && !loading && (
                <p className="text-xs text-muted text-center">Loading categories...</p>
              )}

              <button
                type="submit"
                disabled={submitting || categories.length === 0}
                className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:bg-primary/60 transition-colors active:scale-[0.98]"
              >
                {submitting ? t("ticket_modal.submitting") : t("ticket_modal.submit")}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
