import { createContext, useContext, useState, useCallback } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("auth_user")
    return stored ? JSON.parse(stored) : null
  })

  const login = useCallback((phone, password) => {
    const userData = { phone, password }
    sessionStorage.setItem("auth_user", JSON.stringify(userData))
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem("auth_user")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
