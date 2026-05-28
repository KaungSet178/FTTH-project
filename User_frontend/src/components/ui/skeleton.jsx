import { motion } from "framer-motion"

export function Skeleton({ className = "" }) {
  return (
    <motion.div
      className={`rounded-2xl bg-gray-200 ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

export function StatSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-12 w-12" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

export function DeviceSkeleton() {
  return (
    <div className="flex gap-4 p-5">
      <Skeleton className="h-14 w-14 shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  )
}
