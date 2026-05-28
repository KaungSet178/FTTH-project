import { motion } from "framer-motion"
import { ComplaintList } from "@/components/complaints/complaint-list"

export default function ComplaintStatus() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-gray-900">Complaint Status</h1>
        <p className="text-sm text-muted mt-0.5">Track your reported issues</p>
      </div>
      <ComplaintList />
    </motion.div>
  )
}
