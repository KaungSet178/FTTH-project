import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTickets } from '../context/TicketContext'
import TicketCard from './TicketCard'
import EmptyState from './EmptyState'
import AcceptModal from './AcceptModal'
import CompleteModal from './CompleteModal'
import { ListTodo, Wrench, CheckCircle2 } from 'lucide-react'

export default function Dashboard() {
  const { tickets, activeTab, loading, error } = useTickets()
  const [modalState, setModalState] = useState({ type: null, ticket: null })

  const filteredTickets = useMemo(() => {
    if (activeTab === 'pending') return tickets.filter(t => t.status === 'pending')
    if (activeTab === 'progress') return tickets.filter(t => t.status === 'in-progress')
    return tickets.filter(t => t.status === 'completed')
  }, [tickets, activeTab])

  const stats = useMemo(() => ({
    pending: tickets.filter(t => t.status === 'pending').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    completed: tickets.filter(t => t.status === 'completed').length
  }), [tickets])

  const statCards = [
    { label: 'Pending', value: stats.pending, icon: ListTodo, color: 'bg-warning-light text-warning' },
    { label: 'In Progress', value: stats.inProgress, icon: Wrench, color: 'bg-primary-light text-primary' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'bg-success-light text-success' }
  ]

  return (
    <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-surface">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6 pb-28">
        <motion.div
          className="grid grid-cols-3 gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {statCards.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200 transition-shadow duration-200 hover:shadow-card-hover"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-semibold text-muted truncate">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900 mt-0.5 sm:mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                    <Icon size={16} strokeWidth={2} className="sm:size-[20px]" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="space-y-2 sm:space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {loading ? (
            <EmptyState message="Loading jobs..." />
          ) : error ? (
            <EmptyState message={error} />
          ) : filteredTickets.length === 0 ? (
            <EmptyState />
          ) : (
            filteredTickets.map((ticket, index) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                index={index}
                onAccept={(t) => setModalState({ type: 'accept', ticket: t })}
                onComplete={(t) => setModalState({ type: 'complete', ticket: t })}
              />
            ))
          )}
        </motion.div>
      </div>

      <AcceptModal
        open={modalState.type === 'accept'}
        onClose={() => setModalState({ type: null, ticket: null })}
        ticket={modalState.ticket}
      />
      <CompleteModal
        open={modalState.type === 'complete'}
        onClose={() => setModalState({ type: null, ticket: null })}
        ticket={modalState.ticket}
      />
    </main>
  )
}
