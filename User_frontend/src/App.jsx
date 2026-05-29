import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AuthProvider, useAuth } from "@/context/auth-context"
import { CustomerProvider } from "@/context/customer-context"
import { Layout } from "@/components/layout/layout"
import HomeDashboard from "@/pages/home-dashboard"
import ComplaintStatus from "@/pages/complaint-status"
import Promotions from "@/pages/promotions"
import LoginPage from "@/pages/login-page"

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export default function App() {
  const { i18n } = useTranslation()
  useEffect(() => {
    document.documentElement.lang = i18n.language
    const handle = (lng) => { document.documentElement.lang = lng }
    i18n.on("languageChanged", handle)
    return () => { i18n.off("languageChanged", handle) }
  }, [i18n])

  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomerProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<HomeDashboard />} />
                <Route path="/complaints" element={<ComplaintStatus />} />
                <Route path="/promotions" element={<Promotions />} />
              </Route>
            </Route>
          </Routes>
        </CustomerProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
