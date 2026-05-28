import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'

export default function EmptyState({ message = "No tickets in this section" }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Inbox size={28} className="text-gray-400" />
      </div>
      <p className="text-muted text-sm font-medium">{message}</p>
    </motion.div>
  )
}
