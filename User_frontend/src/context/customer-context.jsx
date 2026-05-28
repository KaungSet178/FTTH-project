import { createContext, useContext, useState } from "react"
import { customer as customerData, devices as initialDevices, tickets as initialTickets, promotions as promotionsData } from "@/lib/mock-data"

const CustomerContext = createContext(null)

export function CustomerProvider({ children }) {
  const [customer] = useState(customerData)
  const [devices] = useState(initialDevices)
  const [tickets, setTickets] = useState(initialTickets)
  const [promotions] = useState(promotionsData)

  const addTicket = (ticket) => {
    const newTicket = {
      ...ticket,
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      status: "open",
      createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      updatedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    }
    setTickets((prev) => [newTicket, ...prev])
  }

  return (
    <CustomerContext.Provider value={{ customer, devices, tickets, promotions, addTicket }}>
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer() {
  const ctx = useContext(CustomerContext)
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider")
  return ctx
}
