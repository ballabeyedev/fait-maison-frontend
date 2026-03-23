import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Dashboard from "../pages/home/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute"; // 👈 à créer

export default function RoutePage() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/faitMaison/auth/login" replace />} />

        <Route path="/faitMaison/auth/login" element={<Login />} />

        <Route
          path="/faitMaison/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/faitMaison/auth/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}