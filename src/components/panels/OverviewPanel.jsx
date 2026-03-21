import { useEffect, useState } from "react";
import Card from "../common/Card";
import { 
  nombreClientsActifs, 
  nombreClientsInactifs, 
  nombreVendeursActifs, 
  nombreVendeursInactifs, 
  nombreProduitsActifs 
} from "../../service/admin/adminService";

export default function OverviewPanel({ showToast }) {
  const [stats, setStats] = useState({
    clientsActifs: 0,
    clientsInactifs: 0,
    vendeursActifs: 0,
    vendeursInactifs: 0,
    produits: 0,
    revenus: 2340000, // valeur fixe pour l'instant
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ca, ci, va, vi, p] = await Promise.all([
          nombreClientsActifs(),
          nombreClientsInactifs(),
          nombreVendeursActifs(),
          nombreVendeursInactifs(),
          nombreProduitsActifs()
        ]);

        setStats({
          clientsActifs: ca.totalClients || 0,
          clientsInactifs: ci.totalClients || 0,
          vendeursActifs: va.totalVendeurs || 0,
          vendeursInactifs: vi.totalVendeurs || 0,
          produits: p.totalProduits || 0,
          revenus: 2340000,
        });
      } catch (err) {
        console.error(err);
        showToast("Erreur lors de la récupération des statistiques");
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { 
      label: "Clients actifs", val: stats.clientsActifs, color: "green",
      icon: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></>
    },
    { 
      label: "Clients inactifs", val: stats.clientsInactifs, color: "gray",
      icon: <><circle cx="12" cy="12" r="10"/></>
    },
    { 
      label: "Vendeurs actifs", val: stats.vendeursActifs, color: "gold",
      icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    },
    { 
      label: "Vendeurs inactifs", val: stats.vendeursInactifs, color: "orange",
      icon: <path d="M4 4h16v16H4z"/>
    },
    { 
      label: "Produits publiés", val: stats.produits, color: "blue",
      icon: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></>
    },
    { 
      label: "Revenus FCFA", val: stats.revenus.toLocaleString(), color: "red",
      icon: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>
    },
  ];

  return (
    <div className="db-stats-grid">
      {cards.map((c, i) => (
        <div className="db-stat-card" key={i}>
          <div className={`db-stat-icon ${c.color}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {c.icon}
            </svg>
          </div>
          <div className="db-stat-value">{c.val}</div>
          <div className="db-stat-label">{c.label}</div>
        </div>
      ))}
    </div>
  );
}