import { useState } from 'react'
import Modal from './Modal'
import { useTickets } from '../context/TicketContext'
import { Clock } from 'lucide-react'

export default function AcceptModal({ open, onClose, ticket }) {
  const { acceptTicket, addToast } = useTickets()
  const [arrivalTime, setArrivalTime] = useState(() => {
    const date = new Date(Date.now() + 24 * 60 * 60 * 1000)

    return date.toISOString().slice(0, 10)
  })
  const [submitting, setSubmitting] = useState(false)

  const handleAccept = async () => {
    if (!arrivalTime.trim()) {
      addToast('Please enter an arrival time estimate', true)
      return
    }

    setSubmitting(true)

    try {
      await acceptTicket(ticket.id, arrivalTime.trim())
      addToast(`Ticket #${ticket.id} accepted — moved to In Progress`)
      onClose()
    } catch (exception) {
      addToast(exception.message || 'Could not start job', true)
    } finally {
      setSubmitting(false)
    }
  }

  if (!ticket) return null

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
          Accept Ticket #{ticket.id}
        </h3>

        <div className="bg-surface rounded-2xl p-4 space-y-2 text-sm mb-5 border border-gray-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 min-w-[80px]">Customer:</span>
            <span className="text-gray-600">{ticket.customer}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-700 min-w-[80px] shrink-0">Address:</span>
            <span className="text-gray-600">{ticket.address}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-700 min-w-[80px] shrink-0">Issue:</span>
            <span className="text-gray-600 italic">"{ticket.reportedIssue}"</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Clock size={15} />
            Estimated arrival date
          </label>
          <input
            type="date"
            value={arrivalTime}
            onChange={e => setArrivalTime(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors duration-200"
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-2xl bg-gray-100 text-gray-700 text-sm font-bold hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAccept}
            disabled={submitting}
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-2xl bg-primary text-white text-sm font-bold hover:bg-primary-dark disabled:bg-primary/60 transition-all duration-200 active:scale-[0.98]"
          >
            {submitting ? 'Starting...' : 'Accept & Move to In Progress'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
