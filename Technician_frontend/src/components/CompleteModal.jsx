import { useState, useRef } from 'react'
import Modal from './Modal'
import { useTickets } from '../context/TicketContext'
import { Camera, Upload, CheckCircle, X } from 'lucide-react'

export default function CompleteModal({ open, onClose, ticket }) {
  const { completeTicket, addToast } = useTickets()
  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [workNote, setWorkNote] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      addToast('Please select an image file', true)
      return
    }
    setPhotoFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setPhotoPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = async () => {
    if (!photoFile) {
      addToast('You must upload a completion photo', true)
      return
    }

    setSubmitting(true)

    try {
      await completeTicket(ticket.id, photoFile, workNote)
      addToast(`Ticket #${ticket.id} completed!`)
      handleClose()
    } catch (exception) {
      addToast(exception.message || 'Could not complete ticket', true)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setPhotoPreview(null)
    setPhotoFile(null)
    setWorkNote('')
    setIsDragging(false)
    onClose()
  }

  if (!ticket) return null

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-heading font-bold text-gray-900 mb-1">
          Complete Ticket #{ticket.id}
        </h3>
        <p className="text-sm text-muted mb-5">
          {ticket.customer} · {ticket.address}
        </p>

        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Camera size={15} />
            Completion photo <span className="text-danger">*</span>
          </label>

          {!photoPreview ? (
            <div
              className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 bg-gray-50/50 hover:border-primary hover:bg-primary/5'
              }`}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <Upload size={28} className="mx-auto mb-3 text-gray-400" />
              <p className="text-sm font-medium text-gray-600">
                Click or drag image here
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP</p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-gray-200">
              <img src={photoPreview} alt="Completion proof" className="w-full max-h-48 object-cover" />
              <button
                onClick={() => { setPhotoPreview(null); setPhotoFile(null) }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X size={14} className="text-white" />
              </button>
              <div className="absolute bottom-2 left-2 bg-success/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle size={12} />
                Uploaded
              </div>
            </div>
          )}
        </div>

        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            Work summary
          </label>
          <textarea
            value={workNote}
            onChange={e => setWorkNote(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors duration-200 resize-none"
            placeholder="e.g., Replaced router, adjusted settings, fixed wiring..."
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-2xl bg-gray-100 text-gray-700 text-sm font-bold hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-2xl bg-success text-white text-sm font-bold hover:bg-[#059669] disabled:bg-success/60 transition-all duration-200 active:scale-[0.98]"
          >
            {submitting ? 'Completing...' : 'Mark as Completed'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
