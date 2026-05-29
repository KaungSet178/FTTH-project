import { createContext, useContext, useState, useCallback } from "react"
import * as api from "@/lib/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("auth_user")
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => sessionStorage.getItem("auth_token") || "")

  const login = useCallback(async (phone, password) => {
    const data = await api.login({ phone: phone.trim(), password })

    sessionStorage.setItem("auth_token", data.access_token)
    sessionStorage.setItem("auth_user", JSON.stringify(data.user))
    setToken(data.access_token)
    setUser(data.user)

    return data.user
  }, [])

  const logout = useCallback(async () => {
    if (token) {
      await api.logout(token).catch(() => null)
    }

    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_user")
    setToken("")
    setUser(null)
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token && !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
