import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/home/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route de la page de connexion */}
        <Route path="/" element={<Login />} />

        {/* Route du dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirection vers la page de login si route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
