import { motion } from 'framer-motion'
import { useTickets } from '../context/TicketContext'
import { Clock, Wrench, CheckCircle2 } from 'lucide-react'

const tabs = [
  { key: 'pending', label: 'Pending', icon: Clock, activeColor: 'text-warning' },
  { key: 'progress', label: 'In Progress', icon: Wrench, activeColor: 'text-primary' },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, activeColor: 'text-success' }
]

export default function TabBar() {
  const { activeTab, setTab } = useTickets()

  return (
    <nav className="shrink-0 z-40 bg-white border-t border-gray-200 pb-3 pt-1 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around max-w-lg mx-auto h-14">
        {tabs.map(tab => {
          const isActive = activeTab === tab.key
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full rounded-xl transition-colors duration-200 ${
                isActive ? tab.activeColor : 'text-muted hover:text-gray-600'
              }`}
              whileTap={{ scale: 0.92 }}
            >
              {isActive && (
                <motion.div
                  className="absolute top-0 w-5 h-0.5 rounded-full bg-current"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.75}
                className="transition-all duration-200"
              />
              <span className="text-[10px] font-bold leading-tight tracking-wide">
                {tab.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
