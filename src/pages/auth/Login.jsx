import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Login.css";
import { login, validateLoginForm, handleApiError } from "../../service/auth/authService";
import { toast } from "react-toastify";

const LOGO = "";

export default function Login() {
  const [email, setEmail] = useState("admin@faitmaison.sn");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach(err => toast.error(err));
      return;
    }

    setLoading(true);

    try {
      const utilisateur = await login(email, password);

      if (utilisateur.role === "Admin") {
        toast.success("Connexion réussie !");
        navigate("/faitMaison/admin/dashboard");
      } else {
        toast.error("Accès refusé. Admin uniquement.");
      }
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo-row">
          <img className="login-logo-img" src={LOGO} alt="Fait Maison" />
          <div>
            <div className="login-brand-name">Fait Maison</div>
            <div className="login-brand-sub">Administration</div>
          </div>
        </div>

        <div className="login-divider" />

        <div className="login-form-group">
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            placeholder="votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-form-group">
          <label className="login-label">Mot de passe</label>
          <input
            className="login-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="login-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <span>Connexion…</span> : "Se connecter"}
        </button>

        <p className="login-foot">Accès réservé aux administrateurs</p>
      </div>
    </div>
  );
}