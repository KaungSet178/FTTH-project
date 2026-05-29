import { Outlet } from "react-router-dom"
import { TopNavbar } from "./top-navbar"
import { BottomNavbar } from "./bottom-navbar"

export function Layout() {
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
