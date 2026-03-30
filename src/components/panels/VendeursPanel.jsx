import { useEffect, useState, useCallback } from "react";
import Card from "../common/Card";
import { statusBadge } from "../../helpers/statusBadge";
import { fetchVendeurData } from "../../data/dashboardData";

export default function VendeursPanel({ onModal, showToast }) {
  const [vendeurs, setVendeurs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedVendeur, setSelectedVendeur] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadVendeurs = useCallback(async () => {
    try {
      const data = await fetchVendeurData();
      setVendeurs(data);
    } catch {
      showToast("Impossible de charger les vendeurs");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadVendeurs();
  }, [loadVendeurs]);

  // ✅ Filtre recherche (nom + email + téléphone)
  const filtered = vendeurs.filter((v) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;

    const nomComplet = `${v.prenom ?? ""} ${v.nom ?? ""}`.toLowerCase();
    const email = (v.email ?? "").toLowerCase();
    const tel = (v.telephone ?? "").toLowerCase();

    return (
      nomComplet.includes(q) ||
      email.includes(q) ||
      tel.includes(q)
    );
  });

  const openModal = (v) => {
    setSelectedVendeur(v);
    setTimeout(() => setModalVisible(true), 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedVendeur(null), 300);
  };

  const toggleStatus = (vendeur) => {
    setVendeurs((prev) =>
      prev.map((v) =>
        v.id === vendeur.id ? { ...v, actif: !v.actif } : v
      )
    );
    showToast(`Statut changé pour ${vendeur.prenom} ${vendeur.nom}`);
  };

  const deleteVendeur = (id) => {
    setVendeurs((prev) => prev.filter((v) => v.id !== id));
    showToast("Vendeur supprimé");
  };

  return (
    <>
      <Card
        title="Vendeurs"
        right={
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            
            {/* 🔍 Barre de recherche */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                background: "transparent",
                width: "260px",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#999"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher par nom, email, tél…"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: ".82rem",
                  color: "var(--text1, #333)",
                  width: "100%",
                }}
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#999",
                    fontSize: "1rem",
                    padding: 0,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <span style={{ fontSize: ".8rem", color: "var(--text3)" }}>
              {filtered.length} au total
            </span>
          </div>
        }
      >
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="db-table-wrap">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Nom Complet</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "24px" }}>
                      Aucun vendeur trouvé
                    </td>
                  </tr>
                ) : (
                  filtered.map((v) => (
                    <tr key={v.id}>
                      <td>
                        {v.photoProfil ? (
                          <img src={v.photoProfil} alt={v.nom} className="db-avatar" />
                        ) : (
                          <div className="db-avatar-placeholder">
                            {(v.prenom?.[0] || "") + (v.nom?.[0] || "")}
                          </div>
                        )}
                      </td>

                      <td className="db-td-bold">
                        {v.prenom} {v.nom}
                      </td>

                      <td>{v.email || "—"}</td>
                      <td>{v.telephone || "—"}</td>

                      <td>
                        <span className={statusBadge(v.actif ? "Actif" : "Inactif")}>
                          {v.actif ? "Actif" : "Inactif"}
                        </span>
                      </td>

                      <td>
                        <div className="db-actions">
                          <button className="db-btn-ghost" onClick={() => openModal(v)}>
                            Voir
                          </button>

                          <button
                            className="db-btn-warning"
                            onClick={() => toggleStatus(v)}
                          >
                            {v.actif ? "Désactiver" : "Activer"}
                          </button>

                          <button
                            className="db-btn-danger"
                            onClick={() => deleteVendeur(v.id)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* MODAL inchangée (tu peux garder la tienne telle quelle) */}
    </>
  );
}