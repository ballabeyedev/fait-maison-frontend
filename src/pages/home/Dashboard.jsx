import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../../assets/css/Dashboard.css";

import Sidebar from "../../components/layout/Sidebar.jsx";
import Topbar from "../../components/layout/Topbar.jsx";

import VueEnsemblePanel from "../../components/panels/VueEnsemblePanel.jsx";
import AcheteursPanel from "../../components/panels/AcheteursPanel.jsx";
import VendeursPanel from "../../components/panels/VendeursPanel.jsx";
import ProduitsPanel from "../../components/panels/ProduitsPanel.jsx";
import AbonnementsPanel from "../../components/panels/AbonnementsPanel.jsx";
import AdminsPanel from "../../components/panels/AdminsPanel.jsx";

import { PAGES } from "../../data/dashboardData.jsx";
import LOGO from "../../assets/images/logo.jpeg";

export default function Dashboard() {
  const [page,   setPage]   = useState("overview");
  const [sbOpen, setSbOpen] = useState(true);
  const [toast,  setToast]  = useState({ msg: "", show: false });
  const toastTimer          = useRef(null);
  const navigate            = useNavigate();

  // ✅ L'auth est déjà gérée par ProtectedRoute — plus besoin de vérifier ici.
  // On lit juste l'utilisateur depuis le localStorage pour l'afficher dans l'UI.
  const user = (() => {
    try {
      const raw = localStorage.getItem("utilisateur");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  // ✅ showToast stable grâce à useRef — évite les re-renders en cascade
  const showToastRef = useRef(null);
  showToastRef.current = (msg) => {
    setToast({ msg, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      2500
    );
  };

  // Wrapper stable passé aux panels enfants (référence fixe)
  const showToast = useRef((msg) => showToastRef.current(msg)).current;

  const handleNav = (id) => setPage(id);

  return (
    <div className="db-app">
      <Helmet>
        <title>Fait Maison | DASHBOARD</title>
        <link rel="icon" type="image/png" href={LOGO} />
      </Helmet>

      <Sidebar
        sbOpen={sbOpen}
        setSbOpen={setSbOpen}
        page={page}
        handleNav={handleNav}
        navigate={navigate}
        user={user}
      />

      <div className={`db-main${sbOpen ? "" : " wide"}`}>
        <Topbar
          pageTitle={PAGES[page]?.t}
          pageSub={PAGES[page]?.s}
          user={user}
        />

        <div className="db-content">
          <div className={`db-panel${page === "overview" ? " active" : ""}`}>
            <VueEnsemblePanel onNavTo={handleNav} showToast={showToast} user={user} />
          </div>
          <div className={`db-panel${page === "users" ? " active" : ""}`}>
            <AcheteursPanel showToast={showToast} user={user} />
          </div>
          <div className={`db-panel${page === "sellers" ? " active" : ""}`}>
            <VendeursPanel showToast={showToast} user={user} />
          </div>
          <div className={`db-panel${page === "products" ? " active" : ""}`}>
            <ProduitsPanel showToast={showToast} user={user} />
          </div>
          <div className={`db-panel${page === "subscriptions" ? " active" : ""}`}>
            <AbonnementsPanel showToast={showToast} user={user} />
          </div>
          <div className={`db-panel${page === "admins" ? " active" : ""}`}>
            <AdminsPanel showToast={showToast} user={user} />
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <div className={`db-toast${toast.show ? " show" : ""}`}>
        <div className="db-toast-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {toast.msg}
      </div>
    </div>
  );
}