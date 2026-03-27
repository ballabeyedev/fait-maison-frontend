import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Dashboard from "../pages/home/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export default function RoutePage() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Racine → login */}
        <Route
          path="/"
          element={<Navigate to="/faitMaison/auth/login" replace />}
        />

        {/* Page publique */}
        <Route path="/faitMaison/auth/login" element={<Login />} />

        {/* Page protégée — ProtectedRoute vérifie token + rôle Admin */}
        <Route
          path="/faitMaison/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Toute URL inconnue → login */}
        <Route
          path="*"
          element={<Navigate to="/faitMaison/auth/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}