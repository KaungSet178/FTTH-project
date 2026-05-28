import { createContext, useContext, useReducer, useCallback, useRef } from 'react'

/* eslint-disable react-refresh/only-export-components */

const TicketContext = createContext(null)

const initialTickets = [
  {
    id: "TKT-1001",
    customer: "Emily Watson",
    address: "12 Harbor Lane, Apt 4B, Brooklyn",
    reportedIssue: "WiFi disconnects every 10 minutes, especially during video calls",
    reportedTime: "2026-05-26T09:15:00",
    status: "pending",
    arrivalTime: null,
    completionPhoto: null,
    workNote: null
  },
  {
    id: "TKT-1002",
    customer: "James Rodriguez",
    address: "88 Sunset Blvd, Santa Monica",
    reportedIssue: "No internet connection at all, modem shows red light",
    reportedTime: "2026-05-26T10:30:00",
    status: "pending",
    arrivalTime: null,
    completionPhoto: null,
    workNote: null
  },
  {
    id: "TKT-1003",
    customer: "Linda Park",
    address: "45 Cedar Street, Austin",
    reportedIssue: "WiFi signal weak in home office, can't connect properly",
    reportedTime: "2026-05-26T08:45:00",
    status: "pending",
    arrivalTime: null,
    completionPhoto: null,
    workNote: null
  }
]

const initialState = {
  tickets: initialTickets,
  technician: null,
  activeTab: 'pending',
  toasts: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, technician: action.payload }
    case 'LOGOUT':
      return { ...state, technician: null, activeTab: 'pending' }
    case 'SET_TAB':
      return { ...state, activeTab: action.payload }
    case 'ACCEPT_TICKET': {
      const tickets = state.tickets.map(t =>
        t.id === action.payload.id
          ? { ...t, status: 'in-progress', arrivalTime: action.payload.arrivalTime }
          : t
      )
      return { ...state, tickets }
    }
    case 'COMPLETE_TICKET': {
      const tickets = state.tickets.map(t =>
        t.id === action.payload.id
          ? { ...t, status: 'completed', completionPhoto: action.payload.photo, workNote: action.payload.workNote }
          : t
      )
      return { ...state, tickets }
    }
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] }
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) }
    default:
      return state
  }
}

export function TicketProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const toastCounter = useRef(0)

  const login = useCallback((techId) => {
    dispatch({ type: 'LOGIN', payload: { id: techId, name: techId } })
  }, [])

  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), [])

  const setTab = useCallback((tab) => dispatch({ type: 'SET_TAB', payload: tab }), [])

  const acceptTicket = useCallback((id, arrivalTime) => {
    dispatch({ type: 'ACCEPT_TICKET', payload: { id, arrivalTime } })
  }, [])

  const completeTicket = useCallback((id, photo, workNote) => {
    dispatch({ type: 'COMPLETE_TICKET', payload: { id, photo, workNote } })
  }, [])

  const addToast = useCallback((message, isError = false) => {
    toastCounter.current += 1
    const toast = { id: toastCounter.current, message, isError }
    dispatch({ type: 'ADD_TOAST', payload: toast })
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id }), 2800)
  }, [])

  const value = {
    tickets: state.tickets,
    technician: state.technician,
    activeTab: state.activeTab,
    toasts: state.toasts,
    login,
    logout,
    setTab,
    acceptTicket,
    completeTicket,
    addToast
  }

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  )
}

export function useTickets() {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error('useTickets must be used within TicketProvider')
  return ctx
}
