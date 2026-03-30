import { useEffect, useState, useCallback, useRef } from "react";
import {
  nombreClientsActifs,
  nombreClientsInactifs,
  nombreVendeursActifs,
  nombreVendeursInactifs,
  nombreProduitsActifs,
} from "../../service/admin/adminService";

export default function VueEnsemblePanel({ showToast }) {
  const [stats, setStats] = useState({
    clientsActifs: 0,
    clientsInactifs: 0,
    vendeursActifs: 0,
    vendeursInactifs: 0,
    produits: 0,
    revenus: 2340000,
  });

  const [loading, setLoading] = useState(false);

  // ✅ FIX 1 : Stabiliser showToast avec une ref
  // → si le parent recrée showToast à chaque render, fetchStats ne se recrée plus
  const showToastRef = useRef(showToast);
  useEffect(() => {
    showToastRef.current = showToast;
  }, [showToast]);

  // ✅ FIX 2 : Guard contre les appels simultanés / en boucle
  const isFetchingRef = useRef(false);

  const fetchStats = useCallback(async () => {
    // Bloque si un appel est déjà en cours
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      setLoading(true);

      const [ca, ci, va, vi, p] = await Promise.all([
        nombreClientsActifs(),
        nombreClientsInactifs(),
        nombreVendeursActifs(),
        nombreVendeursInactifs(),
        nombreProduitsActifs(),
      ]);

      setStats({
        clientsActifs: ca.totalClients || 0,
        clientsInactifs: ci.totalClients || 0,
        vendeursActifs: va.totalVendeurs || 0,
        vendeursInactifs: vi.totalVendeurs || 0,
        produits: p.totalProduits || 0,
        revenus: 2340000,
      });

      showToastRef.current("Statistiques mises à jour ✅");
    } catch (err) {
      console.error("ERREUR API :", err);
      showToastRef.current("Erreur lors de la récupération des statistiques");
    } finally {
      setLoading(false);
      isFetchingRef.current = false; // libère le verrou
    }
  }, []); // ✅ dépendances vides → fetchStats jamais recréé → useEffect stable

  useEffect(() => {
    fetchStats();
  }, [fetchStats]); // fetchStats stable → se lance UNE SEULE fois au montage

  const cards = [
    {
      label: "Clients actifs",
      val: stats.clientsActifs,
      color: "green",
      icon: (
        <>
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </>
      ),
    },
    {
      label: "Clients inactifs",
      val: stats.clientsInactifs,
      color: "gray",
      icon: (
        <>
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          <line x1="17" y1="7" x2="23" y2="13" strokeWidth={2} />
          <line x1="23" y1="7" x2="17" y2="13" strokeWidth={2} />
        </>
      ),
    },
    {
      label: "Vendeurs actifs",
      val: stats.vendeursActifs,
      color: "gold",
      icon: (
        <>
          <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="12" strokeWidth={3} />
        </>
      ),
    },
    {
      label: "Vendeurs inactifs",
      val: stats.vendeursInactifs,
      color: "orange",
      icon: (
        <>
          <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="10" y1="10" x2="14" y2="14" strokeWidth={2} />
          <line x1="14" y1="10" x2="10" y2="14" strokeWidth={2} />
        </>
      ),
    },
    {
      label: "Produits publiés",
      val: stats.produits,
      color: "blue",
      icon: (
        <>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </>
      ),
    },
    {
      label: "Revenus FCFA",
      val: stats.revenus.toLocaleString(),
      color: "red",
      icon: (
        <>
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </>
      ),
    },
  ];
  return (
    <div>
      {/* Bouton Actualiser */}
      <div style={{ marginBottom: "15px", textAlign: "right" }}>
        <button
          onClick={fetchStats}
          disabled={loading}
       style={{
        padding: "8px 16px",
        background: "#fff",
        color: "#22c55e",
        border: "1.5px solid #22c55e",
        borderRadius: "5px",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
}}
        >
          {loading ? "Chargement..." : "↻ Actualiser"}
        </button>
      </div>

      <div className="db-stats-grid">
        {cards.map((c, i) => (
          <div className="db-stat-card" key={i}>
            <div className={`db-stat-icon ${c.color}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                {c.icon}
              </svg>
            </div>
            <div className="db-stat-value">{c.val}</div>
            <div className="db-stat-label">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}