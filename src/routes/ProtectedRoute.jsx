import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("utilisateur"));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}