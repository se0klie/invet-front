// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import InitialState from './pages/Login/Login'
import Dashboard from "./pages/Dashboard";
import WelcomePage from "./pages/WelcomePage";
import Layout from "./pages/shared components/Layout";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <InitialState /> : <Navigate to="/dashboard" />}
        />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/welcomePage"
          element={<WelcomePage />}
        />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
