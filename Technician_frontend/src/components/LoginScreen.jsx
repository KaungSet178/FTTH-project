import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTickets } from '../context/TicketContext'
import { Wifi } from 'lucide-react'

export default function LoginScreen() {
  const { login, addToast } = useTickets()
  const [phone, setPhone] = useState('09111111101')
  const [password, setPassword] = useState('password')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!phone.trim()) {
      addToast('Please enter your phone number', true)
      return
    }

    setLoading(true)

    try {
      const user = await login(phone.trim(), password)
      addToast(`Welcome back, ${user.name}`)
    } catch (exception) {
      addToast(exception.errors?.phone?.[0] || exception.message || 'Unable to sign in', true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-xl shadow-black/5">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary-light mb-3 sm:mb-4">
              <Wifi size={24} className="text-primary sm:size-[28px]" strokeWidth={2} />
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">
              Init
            </h1>
            <p className="text-sm text-muted mt-1 font-medium">
              Technician Login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors duration-200"
                placeholder="Enter your phone"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors duration-200"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all duration-200 active:scale-[0.98]"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
