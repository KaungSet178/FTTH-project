import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/auth-context"
import { TopNavbar } from "./top-navbar"
import { BottomNavbar } from "./bottom-navbar"

export function Layout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-surface">
      <TopNavbar />
      <main className="mx-auto max-w-lg px-4 py-5 pb-24">
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  )
}
