import { motion } from 'framer-motion'
import { MapPin, Clock, MessageSquare, CheckCircle, Wrench, Camera } from 'lucide-react'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function TicketCard({ ticket, index, onAccept, onComplete }) {
  return (
    <motion.div
      className="relative bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-shadow duration-200 hover:shadow-card-hover overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl ${
        ticket.status === 'pending' ? 'bg-warning' :
        ticket.status === 'in-progress' ? 'bg-primary' :
        'bg-success'
      }`} />

      <div className="pl-3">
        <div className={`rounded-xl px-3 py-2 mb-3 transition-colors duration-300 ${
          ticket.status === 'pending' ? 'bg-warning/10' :
          ticket.status === 'in-progress' ? 'bg-primary/10' :
          'bg-success/10'
        }`}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-gray-900">
                #{ticket.id}
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {ticket.customer}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            <span>{ticket.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400 shrink-0" />
            <span>Reported: {formatDate(ticket.reportedTime)}</span>
          </div>
          {ticket.arrivalTime && (
            <div className="flex items-center gap-2">
              <Wrench size={14} className="text-gray-400 shrink-0" />
              <span>ETA: {ticket.arrivalTime}</span>
            </div>
          )}
        </div>

        <div className="mt-3 bg-surface rounded-2xl px-4 py-3 border border-gray-100">
          <div className="flex items-start gap-2">
            <MessageSquare size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "{ticket.reportedIssue}"
            </p>
          </div>
        </div>

        {ticket.workNote && (
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
            <CheckCircle size={12} className="text-success" />
            Work note: {ticket.workNote}
          </div>
        )}

        {ticket.completionPhoto && (
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
            <CheckCircle size={12} className="text-success" />
            Completion photo uploaded
          </div>
        )}

        {ticket.status === 'pending' && onAccept && (
          <div className="flex justify-start mt-4">
            <button
              onClick={(e) => { e.stopPropagation(); onAccept(ticket) }}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-3 sm:py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all duration-200 active:scale-[0.98]"
            >
              <Wrench size={14} />
              Accept & Set Arrival
            </button>
          </div>
        )}

        {ticket.status === 'in-progress' && onComplete && (
          <div className="flex justify-start mt-4">
            <button
              onClick={(e) => { e.stopPropagation(); onComplete(ticket) }}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-3 sm:py-2.5 rounded-full bg-success text-white text-xs font-bold hover:bg-[#059669] transition-all duration-200 active:scale-[0.98]"
            >
              <Camera size={14} />
              Complete & Upload Photo
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
