import { TicketProvider, useTickets } from './context/TicketContext'
import LoginScreen from './components/LoginScreen'
import Header from './components/Header'
import TabBar from './components/TabBar'
import Dashboard from './components/Dashboard'
import ToastContainer from './components/Toast'

function AppContent() {
  const { technician } = useTickets()

  if (!technician) return <LoginScreen />

  return (
    <div className="h-dvh min-h-screen bg-surface flex flex-col overflow-hidden">
      <Header />
      <Dashboard />
      <TabBar />
      <ToastContainer />
    </div>
  )
}

function App() {
  return (
    <TicketProvider>
      <AppContent />
    </TicketProvider>
  )
}

export default App
