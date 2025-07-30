// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import InitialState from './pages/Login/Login'
import Dashboard from "./pages/Dashboard";
import WelcomePage from "./pages/WelcomePage";
import Layout from "./pages/shared components/Layout";
import ProtectedRoute from "./pages/router/ProtectedRoute";
import PublicRoute from "./pages/router/PublicRoute";
import Settings from "./pages/Settings/Settings";
import LogoutPage from "./pages/LogoutPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<InitialState />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;