import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ActiveTickets } from "@/components/home/active-tickets"
import { DeviceList } from "@/components/home/device-list"
import { PromotionBanner } from "@/components/home/promotion-banner"
import { TicketModal } from "@/components/modals/ticket-modal"
import { Skeleton, DeviceSkeleton } from "@/components/ui"
import { useCustomer } from "@/context/customer-context"

function LoadingState() {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-[88px]" />
        <Skeleton className="h-[88px]" />
      </div>
      <div className="rounded-2xl bg-gray-100 h-28" />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
        <DeviceSkeleton />
        <DeviceSkeleton />
      </div>
    </div>
  )
}

function WelcomeMessage() {
  const { t } = useTranslation()
  const { customer } = useCustomer()
  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return t("home.greeting_morning")
    if (h < 17) return t("home.greeting_afternoon")
    return t("home.greeting_evening")
  })()

  return (
    <p className="text-xl font-semibold text-gray-900">
      {greeting} {customer.name}
    </p>
  )
}

export default function HomeDashboard() {
  const [loading, setLoading] = useState(true)
  const [selectedDevice, setSelectedDevice] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <LoadingState />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          <WelcomeMessage />
          <ActiveTickets />
          {/* <PromotionBanner /> */}
          <DeviceList onReport={setSelectedDevice} />

          {selectedDevice && (
            <TicketModal device={selectedDevice} onClose={() => setSelectedDevice(null)} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
