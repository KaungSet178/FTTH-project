import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/auth-context"
import { CustomerProvider } from "@/context/customer-context"
import { Layout } from "@/components/layout/layout"
import HomeDashboard from "@/pages/home-dashboard"
import ComplaintStatus from "@/pages/complaint-status"
import Promotions from "@/pages/promotions"
import LoginPage from "@/pages/login-page"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomerProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomeDashboard />} />
              <Route path="/complaints" element={<ComplaintStatus />} />
              <Route path="/promotions" element={<Promotions />} />
            </Route>
          </Routes>
        </CustomerProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
