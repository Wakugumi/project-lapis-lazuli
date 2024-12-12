import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthService from './services/AuthService';
import { AppPage } from './pages/AppPage';


function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(AuthService.isAuthenticated())
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/app" element={<ProtectedRoute isAuthenticated={auth}> <AppPage /> </ProtectedRoute>}

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
