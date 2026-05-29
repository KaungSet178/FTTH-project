import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react"
import { customer as customerData, devices as initialDevices, tickets as mockTickets, promotions as promotionsData, complaintCategories } from "@/lib/mock-data"
import { useAuth } from "@/context/auth-context"
import * as api from "@/lib/api"

const CustomerContext = createContext(null)

function formatDate(value) {
  if (!value) return ""

  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatEta(value) {
  if (!value) return null

  return new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function mapTicket(ticket) {
  return {
    id: ticket.ticket_no || `TKT-${ticket.id}`,
    backendId: ticket.id,
    deviceId: ticket.active_job?.id || "FTTH-SERVICE",
    deviceName: ticket.technician?.name ? `Technician: ${ticket.technician.name}` : "FTTH Service",
    category: ticket.category?.name || ticket.subject,
    description: ticket.description,
    status: ticket.status,
    eta: ticket.status === "closed" ? null : formatEta(ticket.active_job?.estimated_arrival_at),
    createdAt: formatDate(ticket.reported_at),
    updatedAt: formatDate(ticket.closed_at || ticket.completed_at || ticket.assigned_at || ticket.reported_at),
  }
}

const USE_MOCK = true

export function CustomerProvider({ children }) {
  const { user, token, isAuthenticated } = useAuth()
  const [devices] = useState(initialDevices)
  const [promotions] = useState(promotionsData)
  const [tickets, setTickets] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const customer = useMemo(() => {
    const profile = user?.customer

    if (!profile) return customerData

    return {
      ...customerData,
      name: profile.name,
      email: user.email,
      package: profile.package_id || customerData.package,
      phone: profile.phone,
    }
  }, [user])

  const loadPortalData = useCallback(async () => {
    if (USE_MOCK) {
      setTickets(mockTickets)
      setCategories(complaintCategories.map((name, i) => ({ id: i + 1, name })))
      return
    }

    if (!isAuthenticated || !token || user?.role !== "customer") {
      setTickets([])
      setCategories([])
      return
    }

    setLoading(true)
    setError("")

    try {
      const [categoryData, ticketData] = await Promise.all([
        api.getTicketCategories(token),
        api.getTickets(token),
      ])

      setCategories(categoryData.data || [])
      setTickets((ticketData.data || []).map(mapTicket))
    } catch (exception) {
      setError(exception.message || "Could not load customer portal data.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPortalData()
  }, [loadPortalData])

  const addTicket = useCallback(async (ticket) => {
    const response = await api.createTicket(token, {
      ticket_category_id: ticket.categoryId,
      subject: `${ticket.categoryName} - ${ticket.deviceName}`,
      description: ticket.description,
      priority: "medium",
    })

    const newTicket = mapTicket(response.data)
    setTickets((prev) => [newTicket, ...prev])

    return newTicket
  }, [token])

  return (
    <CustomerContext.Provider value={{
      customer,
      devices,
      tickets,
      categories,
      promotions,
      loading,
      error,
      addTicket,
      refreshTickets: loadPortalData,
    }}>
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer() {
  const ctx = useContext(CustomerContext)
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider")
  return ctx
}
