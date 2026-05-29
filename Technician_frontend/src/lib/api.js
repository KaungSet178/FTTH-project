const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://ftth-ticketing-system.test/api"

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.errors = errors
  }
}

async function parseResponse(response) {
  if (response.status === 204) return null

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new ApiError(data.message || "Request failed", response.status, data.errors || {})
  }

  return data
}

async function apiRequest(path, { method = "GET", token, body, headers = {} } = {}) {
  const isFormData = body instanceof FormData
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(!isFormData && body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  })

  return parseResponse(response)
}

export function login({ phone, password }) {
  return apiRequest("/login", {
    method: "POST",
    body: {
      phone,
      password,
      device_name: "technician-portal",
    },
  })
}

export function logout(token) {
  return apiRequest("/logout", { method: "POST", token })
}

export function getJobs(token) {
  return apiRequest("/technician/jobs", { token })
}

export function startJob(token, jobId, estimatedArrivalAt) {
  return apiRequest(`/technician/jobs/${jobId}/start`, {
    method: "POST",
    token,
    body: {
      estimated_arrival_at: estimatedArrivalAt,
    },
  })
}

export function uploadJobPhoto(token, jobId, photo) {
  const formData = new FormData()
  formData.append("photo", photo)

  return apiRequest(`/technician/jobs/${jobId}/photos`, {
    method: "POST",
    token,
    body: formData,
  })
}

export function completeJob(token, jobId, comment = "") {
  return apiRequest(`/technician/jobs/${jobId}/complete`, {
    method: "POST",
    token,
    body: comment ? { comment } : undefined,
  })
}
