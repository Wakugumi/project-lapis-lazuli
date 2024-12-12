import { useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthService from './services/AuthService';
import { AppPage } from './pages/AppPage';
import { AppHomePage } from './pages/AppHomePage';
import { AppTaskPage } from './pages/AppTaskPage';


function App() {
  const [auth, setAuth] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuth(AuthService.isAuthenticated())
    setLoading(false);
  }, [])

  if (loading) {

    return (
      <>

        <div className="container vh-100 d-flex justify-content center align-items-center">

          <div className="card card-body bg-light">
            <h4>Loading...</h4>
          </div>
        </div>

      </>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={auth}><DashboardPage /></ProtectedRoute>} />

          <Route path="/app" element={<ProtectedRoute isAuthenticated={auth}> <AppPage /> </ProtectedRoute>}>
            <Route path="/app/" element={<Navigate to="/app/home" />} />
            <Route path="home" element={<AppHomePage />} />
            <Route path="tasks" element={<AppTaskPage />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
