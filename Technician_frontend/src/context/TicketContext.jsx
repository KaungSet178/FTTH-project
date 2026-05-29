import { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react'
import * as api from '../lib/api'

/* eslint-disable react-refresh/only-export-components */

const TicketContext = createContext(null)

const storedTechnician = sessionStorage.getItem('technician_user')
const storedToken = sessionStorage.getItem('technician_token')
const JOB_REFRESH_INTERVAL_MS = 10000

const initialState = {
  tickets: [],
  technician: storedTechnician ? JSON.parse(storedTechnician) : null,
  token: storedToken || '',
  activeTab: 'pending',
  toasts: [],
  loading: false,
  error: ''
}

function mapJob(job) {
  const status = {
    assigned: 'pending',
    in_progress: 'in-progress',
    completed: 'completed',
    cancelled: 'completed'
  }[job.status] || 'pending'
  const completionPhoto = job.photos?.[0]?.photo_url || null
  const workNote = job.ticket?.completion_note || null

  return {
    id: job.id,
    jobNo: job.job_no,
    customer: job.customer?.name || 'Customer',
    address: job.customer?.address || 'No address provided',
    reportedIssue: job.ticket?.description || job.ticket?.subject || 'No issue description',
    reportedTime: job.ticket?.reported_at || job.scheduled_date || new Date().toISOString(),
    status,
    apiStatus: job.status,
    arrivalTime: job.estimated_arrival_at || null,
    completionPhoto,
    workNote
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, technician: action.payload.user, token: action.payload.token, error: '' }
    case 'LOGOUT':
      return { ...state, technician: null, token: '', tickets: [], activeTab: 'pending', error: '' }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_TICKETS':
      return { ...state, tickets: action.payload }
    case 'UPSERT_TICKET': {
      const tickets = state.tickets.some(t => t.id === action.payload.id)
        ? state.tickets.map(t => t.id === action.payload.id ? action.payload : t)
        : [action.payload, ...state.tickets]

      return { ...state, tickets }
    }
    case 'SET_TAB':
      return { ...state, activeTab: action.payload }
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
  const isRefreshing = useRef(false)

  const addToast = useCallback((message, isError = false) => {
    toastCounter.current += 1
    const toast = { id: toastCounter.current, message, isError }
    dispatch({ type: 'ADD_TOAST', payload: toast })
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: toast.id }), 2800)
  }, [])

  const refreshTickets = useCallback(async (tokenOverride = state.token, options = {}) => {
    if (!tokenOverride || isRefreshing.current) return

    const silent = options.silent === true

    isRefreshing.current = true

    if (!silent) {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: '' })
    }

    try {
      const data = await api.getJobs(tokenOverride)
      dispatch({ type: 'SET_TICKETS', payload: (data.data || []).map(mapJob) })
      dispatch({ type: 'SET_ERROR', payload: '' })
    } catch (exception) {
      const message = exception.message || 'Could not load technician jobs'
      if (!silent) {
        dispatch({ type: 'SET_ERROR', payload: message })
        addToast(message, true)
      }
    } finally {
      isRefreshing.current = false

      if (!silent) {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
  }, [addToast, state.token])

  useEffect(() => {
    if (state.token && state.technician) {
      refreshTickets(state.token)
    }
  }, [refreshTickets, state.technician, state.token])

  useEffect(() => {
    if (!state.token || !state.technician) {
      return undefined
    }

    const refreshVisibleJobs = () => {
      if (document.visibilityState === 'visible') {
        refreshTickets(state.token, { silent: true })
      }
    }

    const intervalId = window.setInterval(refreshVisibleJobs, JOB_REFRESH_INTERVAL_MS)

    window.addEventListener('focus', refreshVisibleJobs)
    document.addEventListener('visibilitychange', refreshVisibleJobs)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', refreshVisibleJobs)
      document.removeEventListener('visibilitychange', refreshVisibleJobs)
    }
  }, [refreshTickets, state.technician, state.token])

  const login = useCallback(async (phone, password) => {
    const data = await api.login({ phone: phone.trim(), password })

    if (data.user?.role !== 'technician') {
      throw new Error('This account is not a technician account.')
    }

    sessionStorage.setItem('technician_token', data.access_token)
    sessionStorage.setItem('technician_user', JSON.stringify(data.user))
    dispatch({ type: 'LOGIN', payload: { user: data.user, token: data.access_token } })
    await refreshTickets(data.access_token)

    return data.user
  }, [refreshTickets])

  const logout = useCallback(async () => {
    if (state.token) {
      await api.logout(state.token).catch(() => null)
    }

    sessionStorage.removeItem('technician_token')
    sessionStorage.removeItem('technician_user')
    dispatch({ type: 'LOGOUT' })
  }, [state.token])

  const setTab = useCallback((tab) => dispatch({ type: 'SET_TAB', payload: tab }), [])

  const acceptTicket = useCallback(async (id, arrivalTime) => {
    const response = await api.startJob(state.token, id, arrivalTime)
    dispatch({
      type: 'UPSERT_TICKET',
      payload: mapJob(response.data)
    })
  }, [state.token])

  const completeTicket = useCallback(async (id, photo, workNote = '') => {
    await api.uploadJobPhoto(state.token, id, photo)
    const response = await api.completeJob(state.token, id, workNote.trim())

    dispatch({ type: 'UPSERT_TICKET', payload: mapJob(response.data) })
  }, [state.token])

  const value = {
    tickets: state.tickets,
    technician: state.technician,
    activeTab: state.activeTab,
    toasts: state.toasts,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    setTab,
    acceptTicket,
    completeTicket,
    refreshTickets,
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
