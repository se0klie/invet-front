import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './style.css'
import { SnackbarProvider } from 'notistack';
import { WhatsAppButton } from './pages/shared components/WhatsappButton.jsx'

const isMobile = window.innerWidth <= 600;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <AuthProvider>
        {isMobile && <WhatsAppButton />}
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </StrictMode>,
)
