const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://ftth-ticketing-system.test/api"

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.errors = errors
  }
}

async function apiRequest(path, { method = "GET", token, body, headers = {} } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (response.status === 204) return null

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    if (response.status === 401) {
      sessionStorage.removeItem("auth_token")
      sessionStorage.removeItem("auth_user")
      window.location.href = "/login"
      throw new ApiError("Session expired", 401)
    }
    throw new ApiError(data.message || "Request failed", response.status, data.errors || {})
  }

  return data
}

export function login({ phone, password }) {
  return apiRequest("/login", {
    method: "POST",
    body: {
      phone,
      password,
      device_name: "customer-portal",
    },
  })
}

export function logout(token) {
  return apiRequest("/logout", { method: "POST", token })
}

export function getTicketCategories(token) {
  return apiRequest("/customer/ticket-categories", { token })
}

export function getTickets(token) {
  return apiRequest("/customer/tickets", { token })
}

export function createTicket(token, payload) {
  return apiRequest("/customer/tickets", {
    method: "POST",
    token,
    body: payload,
  })
}
