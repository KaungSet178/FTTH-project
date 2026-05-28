import { motion } from "framer-motion"

export function Card({ children, className = "", hover = false, ...props }) {
  const base = "bg-white rounded-2xl shadow-card border border-gray-100/60"
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      className={`${base} ${hover ? "hover:shadow-card-hover transition-shadow duration-200" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
