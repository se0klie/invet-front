// src/App.jsx
import { useLocation, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import InitialState from './pages/Login/Login'
import Dashboard from "./pages/Dashboard"
import WelcomePage from "./pages/WelcomePage"
import Layout from "./pages/shared components/Layout"
import ProtectedRoute from "./pages/router/ProtectedRoute"
import PublicRoute from "./pages/router/PublicRoute"
import Settings from "./pages/Settings/Settings"
import LogoutPage from "./pages/LogoutPage"
import MainPage from "./pages/Main flow/MainPage"
import MainflowLayout from "./pages/shared components/MainFlowLayout"
import { WhatsAppButton } from "./pages/shared components/WhatsappButton"
import GalleryPage from "./pages/Main flow/Gallery"
import AboutPage from "./pages/Main flow/AboutPage"
import ContactPage from "./pages/Main flow/ContactPage"
import ServicePage from "./pages/Main flow/ServicePage"
import PaymentPage from "./pages/PaymentFlow/PaymentFlow"
import PetPlanAssociation from "./pages/PlanAssocPage"
import TermsAndConds from "./pages/TermsConds"
import GoodEnd from "./pages/PaymentFlow/GoodEnd"

function App() {
  const location = useLocation()
  const isMobile = window.innerWidth <= 1024

  const showInDesktopRoutes = ['/', '/galeria', '/nosotros']
  const shouldShowWhatsAppButton =
    isMobile || showInDesktopRoutes.includes(location.pathname)

  return (
    <>
      {shouldShowWhatsAppButton && <WhatsAppButton />}

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<InitialState />} />
          <Route path='/pago' element={<PaymentPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/identificar-mascota' element={<PetPlanAssociation />} />
          <Route path='/terms-conds' element={<TermsAndConds />} />
          <Route path='/pago-existoso' element={<GoodEnd />} />
        </Route>
        
        <Route path="/bienvenido-invet" element={<WelcomePage />} />
        <Route path="/logout" element={<LogoutPage />} />

        <Route element={<MainflowLayout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/galeria' element={<GalleryPage />} />
          <Route path='/nosotros' element={<AboutPage />} />
          <Route path='/contacto' element={<ContactPage />} />
          <Route path='/servicios' element={<ServicePage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
