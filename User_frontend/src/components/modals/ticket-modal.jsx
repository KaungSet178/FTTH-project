import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle } from "lucide-react"
import { useCustomer } from "@/context/customer-context"
import { complaintCategories } from "@/lib/mock-data"

export function TicketModal({ device, onClose }) {
  const { addTicket } = useCustomer()
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    addTicket({
      deviceId: device.id,
      deviceName: device.name,
      category,
      description,
    })
    setSubmitted(true)
    setTimeout(onClose, 1500)
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
          className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <h2 className="text-base font-semibold text-gray-900">Report Issue</h2>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
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
              <p className="text-sm font-semibold text-gray-900">Ticket Submitted</p>
              <p className="text-xs text-muted mt-1">We'll get back to you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Device</label>
                <input
                  type="text"
                  value={`${device.name} (${device.id})`}
                  readOnly
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-500 outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="" disabled>Select a category</option>
                  {complaintCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {category === "Others" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">Specify Issue</label>
                  <input
                    type="text"
                    placeholder="e.g. Port not working"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </motion.div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  placeholder="Briefly describe the issue..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors active:scale-[0.98]"
              >
                Submit Ticket
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
