import { useEffect, useState } from "react";
import LOGO from "../../assets/images/logo.jpeg";

import { 
  nombreClientsActifs,
  nombreVendeursActifs,
  nombreProduitsActifs
} from "../../service/admin/adminService";

const NAV_ITEMS_TEMPLATE = [
  { section: "Tableau de bord" },
  { id: "overview",      label: "Vue d'ensemble",  badge: null, icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></> },
  { section: "Gestion" },
  { id: "users",         label: "Acheteurs",     badge: "0", icon: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/></> },
  { id: "sellers",       label: "Vendeurs",      badge: "0", icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
  { id: "products",      label: "Produits",      badge: "0", icon: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></> },
  { id: "subscriptions", label: "Abonnements",  badge: "10", icon: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></> },
  { section: "Configuration" },
  { id: "admins",        label: "Administrateurs",  badge: null, icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
];

export default function Sidebar({ sbOpen, setSbOpen, page, handleNav, navigate, user }) {
  const [stats, setStats] = useState({
    clients: 0,
    vendeurs: 0,
    produits: 0
  });

  // 🔥 Fetch stats depuis l'API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clients, vendeurs, produits] = await Promise.all([
          nombreClientsActifs(),
          nombreVendeursActifs(),
          nombreProduitsActifs()
        ]);

        setStats({
          clients: clients.totalClients || 0,
          vendeurs: vendeurs.totalVendeurs || 0,
          produits: produits.totalProduits || 0
        });
      } catch (err) {
        console.error("Erreur stats sidebar :", err);
      }
    };
    fetchStats();
  }, []);

  // 🔹 Mettre à jour les badges dynamiquement
  const NAV_ITEMS = NAV_ITEMS_TEMPLATE.map(item => {
    switch(item.id) {
      case "users": return { ...item, badge: stats.clients.toLocaleString() };
      case "sellers": return { ...item, badge: stats.vendeurs.toLocaleString() };
      case "products": return { ...item, badge: stats.produits.toLocaleString() };
      default: return item;
    }
  });

  return (
    <>
      {/* Sidebar */}
      <aside className={`db-sb${sbOpen ? "" : " closed"}`}>
        <div className="db-sb-top">
          <img className="db-sb-logo" src={LOGO} alt="logo" />
          <div className="db-sb-brand">
            <div className="db-sb-name">Fait Maison</div>
            <div className="db-sb-sub">Administration</div>
          </div>
          <button className="db-sb-toggle" onClick={() => setSbOpen(o => !o)} title="Réduire / Agrandir">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        </div>

        <nav className="db-nav">
          {NAV_ITEMS.map((item, i) =>
            item.section ? (
              <div className="db-nav-section" key={i}>{item.section}</div>
            ) : (
              <div
                key={item.id}
                className={`db-nav-item${page === item.id ? " active" : ""}`}
                data-label={item.label}
                onClick={() => handleNav(item.id)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>{item.icon}</svg>
                <span className="db-nav-label">{item.label}</span>
                {item.badge && <span className={`db-nav-badge${item.badgeRed ? " red" : ""}`}>{item.badge}</span>}
              </div>
            )
          )}
        </nav>

        <div className="db-sb-foot">
          <div className="db-admin-pill">
            <div className="db-admin-ava">
              {user?.photo ? <img src={user.photo} alt="avatar" /> : (user ? `${user.nom[0]}${user.prenom[0]}` : "U")}
            </div>
            <div className="db-admin-info">
              <div className="db-admin-name">{user ? `${user.nom} ${user.prenom}` : "Utilisateur"}</div>
              <div className="db-admin-role">{user?.role || "Admin"}</div>
            </div>
            <button className="db-logout-btn" onClick={() => navigate("/")} title="Déconnexion">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* 🔥 Mini bouton flottant pour ouvrir la sidebar */}
      {!sbOpen && (
        <button className="db-sb-mini-toggle" onClick={() => setSbOpen(true)} title="Ouvrir le menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="20" height="20">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      )}
    </>
  );
}