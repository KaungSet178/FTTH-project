import { motion } from 'framer-motion'
import { useTickets } from '../context/TicketContext'
import { Wifi, LogOut } from 'lucide-react'

export default function Header() {
  const { technician, logout } = useTickets()

  return (
    <header className="shrink-0 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <Wifi size={20} className="text-primary sm:size-[22px]" strokeWidth={2} />
          <h1 className="text-lg font-heading font-extrabold text-gray-900 leading-none">
            Init
          </h1>
        </div>
        <span className="hidden sm:inline text-sm text-gray-400 font-medium leading-none">·</span>
        <span className="hidden sm:inline text-sm text-gray-500 font-medium leading-none">Technician Portal</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 bg-surface px-4 py-2 rounded-full">
          <span className="bg-primary-light text-primary text-[11px] font-bold px-2.5 py-1 rounded-full leading-none tracking-wide uppercase">
            {technician?.name || 'Tech'}
          </span>
        </div>
        <motion.button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-danger px-3 py-2 rounded-full hover:bg-danger-light transition-colors duration-200"
          whileTap={{ scale: 0.92 }}
        >
          <LogOut size={15} strokeWidth={2} />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    </header>
  )
}
