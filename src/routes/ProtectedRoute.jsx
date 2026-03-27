import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute — garde de route côté front
 * 
 * Vérifie :
 * 1. Présence du token dans le localStorage
 * 2. Présence de l'objet utilisateur
 * 3. Rôle === "Admin"
 * 
 * Si l'une des conditions échoue → redirect /login
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // ✅ Parse sécurisé : évite un crash si la valeur est corrompue
  let user = null;
  try {
    const raw = localStorage.getItem("utilisateur");
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }

  // Pas de token → login
  if (!token) {
    return <Navigate to="/faitMaison/auth/login" replace />;
  }

  // Pas d'utilisateur ou mauvais rôle → login
  if (!user || user?.role !== "Admin") {
    return <Navigate to="/faitMaison/auth/login" replace />;
  }

  return children;
}