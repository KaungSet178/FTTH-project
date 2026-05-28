import { motion, AnimatePresence } from 'framer-motion'
import { useTickets } from '../context/TicketContext'
import { CheckCircle2, XCircle } from 'lucide-react'

const toastVariants = {
  initial: { opacity: 0, y: 50, x: '-50%' },
  animate: { opacity: 1, y: 0, x: '-50%' },
  exit: { opacity: 0, y: -20, x: '-50%' }
}

export default function ToastContainer() {
  const { toasts } = useTickets()

  return (
    <div className="fixed bottom-24 left-1/2 z-[60] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-lg text-sm font-medium leading-none ${
              toast.isError
                ? 'bg-danger text-white'
                : 'bg-[#1e293b] text-white'
            }`}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            layout
          >
            {toast.isError
              ? <XCircle size={16} className="shrink-0" />
              : <CheckCircle2 size={16} className="shrink-0" />
            }
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
