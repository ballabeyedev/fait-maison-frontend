import { useEffect, useState, useCallback } from "react";
import Card from "../common/Card";
import { statusBadge } from "../../helpers/statusBadge";
import { fetchAcheteurData } from "../../data/dashboardData";

export default function AcheteursPanel({ onModal, showToast }) {
  const [acheteurs, setAcheteurs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAcheteur, setSelectedAcheteur] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadAcheteurs = useCallback(async () => {
    try {
      const data = await fetchAcheteurData();
      setAcheteurs(data);
    } catch {
      showToast("Impossible de charger les acheteurs");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadAcheteurs();
  }, [loadAcheteurs]);

  const filtered = acheteurs.filter((a) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    const nomComplet = `${a.prenom ?? ""} ${a.nom ?? ""}`.toLowerCase();
    const email = (a.email ?? "").toLowerCase();
    const tel = (a.telephone ?? "").toLowerCase();
    return nomComplet.includes(q) || email.includes(q) || tel.includes(q);
  });

  const openModal = (a) => {
    setSelectedAcheteur(a);
    setTimeout(() => setModalVisible(true), 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedAcheteur(null), 300);
  };

  const toggleStatus = (acheteur) => {
    setAcheteurs((prev) =>
      prev.map((a) => (a.id === acheteur.id ? { ...a, actif: !a.actif } : a))
    );
    showToast(`Statut changé pour ${acheteur.prenom} ${acheteur.nom}`);
  };

  const deleteAcheteur = (id) => {
    setAcheteurs((prev) => prev.filter((a) => a.id !== id));
    showToast("Acheteur supprimé");
  };

  return (
    <>
      <Card
        title="Acheteurs"
        right={
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* ✅ Barre de recherche dans le header à droite */}
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

            <span style={{ fontSize: ".8rem", color: "var(--text3)", whiteSpace: "nowrap" }}>
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
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        padding: "24px",
                        color: "var(--text3, #aaa)",
                        fontSize: ".9rem",
                      }}
                    >
                      Aucun acheteur trouvé
                    </td>
                  </tr>
                ) : (
                  filtered.map((a) => (
                    <tr key={a.id}>
                      <td>
                        {a.photoProfil ? (
                          <img
                            src={a.photoProfil}
                            alt={a.nom}
                            className="db-avatar"
                          />
                        ) : (
                          <div className="db-avatar-placeholder">
                            {(a.prenom?.[0] || "") + (a.nom?.[0] || "")}
                          </div>
                        )}
                      </td>
                      <td className="db-td-bold">
                        {a.prenom} {a.nom}
                      </td>
                      <td>{a.email || "—"}</td>
                      <td>{a.telephone || "—"}</td>
                      <td>
                        <span className={statusBadge(a.actif ? "Actif" : "Inactif")}>
                          {a.actif ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td>
                        <div className="db-actions">
                          <button
                            className="db-btn-ghost"
                            onClick={() => openModal(a)}
                          >
                            Voir
                          </button>
                          <button
                            className="db-btn-danger"
                            onClick={() => deleteAcheteur(a.id)}
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

      {/* ── Modal acheteur ─────────────────────────────────────── */}
      {selectedAcheteur && (
        <div
          className={`db-modal-overlay ${modalVisible ? "db-modal-overlay--visible" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`db-modal ${modalVisible ? "db-modal--visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bannière avatar */}
            <div className="db-modal-banner db-modal-banner--seller">
              <div className="db-modal-banner-overlay" />
              <button className="db-modal-close" onClick={closeModal}>✕</button>

              <div className="db-modal-seller-avatar-wrap">
                {selectedAcheteur.photoProfil ? (
                  <img
                    src={selectedAcheteur.photoProfil}
                    alt={selectedAcheteur.nom}
                    className="db-modal-seller-avatar"
                  />
                ) : (
                  <div className="db-modal-seller-avatar db-modal-seller-avatar--placeholder">
                    {(selectedAcheteur.prenom?.[0] || "") + (selectedAcheteur.nom?.[0] || "")}
                  </div>
                )}
              </div>

              <div className="db-modal-banner-title db-modal-banner-title--centered">
                <h3>{selectedAcheteur.prenom} {selectedAcheteur.nom}</h3>
                <span
                  className={`db-modal-seller-status ${
                    selectedAcheteur.actif
                      ? "db-modal-seller-status--actif"
                      : "db-modal-seller-status--inactif"
                  }`}
                >
                  {selectedAcheteur.actif ? "● Actif" : "● Inactif"}
                </span>
              </div>
            </div>

            {/* Corps */}
            <div className="db-modal-body">
              <div className="db-modal-section">
                <p className="db-modal-section-label">Informations de contact</p>
                <div className="db-modal-contact-grid">
                  <div className="db-modal-contact-item">
                    <span className="db-modal-meta-icon">📧</span>
                    <div>
                      <p className="db-modal-meta-label">Email</p>
                      <p className="db-modal-meta-value">{selectedAcheteur.email || "—"}</p>
                    </div>
                  </div>
                  <div className="db-modal-contact-item">
                    <span className="db-modal-meta-icon">📞</span>
                    <div>
                      <p className="db-modal-meta-label">Téléphone</p>
                      <p className="db-modal-meta-value">{selectedAcheteur.telephone || "—"}</p>
                    </div>
                  </div>
                  {selectedAcheteur.adresse && (
                    <div className="db-modal-contact-item db-modal-contact-item--full">
                      <span className="db-modal-meta-icon">📍</span>
                      <div>
                        <p className="db-modal-meta-label">Adresse</p>
                        <p className="db-modal-meta-value">{selectedAcheteur.adresse}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="db-modal-stats">
                <div className="db-modal-stat">
                  <span className="db-modal-stat-label">Produits</span>
                  <span className="db-modal-stat-value">
                    {selectedAcheteur.produits?.length ?? "—"}
                  </span>
                </div>
                <div className="db-modal-stat-divider" />
                <div className="db-modal-stat">
                  <span className="db-modal-stat-label">Boutique</span>
                  <span className="db-modal-stat-value">
                    {selectedAcheteur.boutiques?.nom ?? "—"}
                  </span>
                </div>
                <div className="db-modal-stat-divider" />
                <div className="db-modal-stat">
                  <span className="db-modal-stat-label">Membre depuis</span>
                  <span className="db-modal-stat-value" style={{ fontSize: ".82rem" }}>
                    {selectedAcheteur.createdAt
                      ? new Date(selectedAcheteur.createdAt).toLocaleDateString("fr-FR", {
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="db-modal-footer">
              <button
                className="db-modal-btn db-modal-btn--secondary"
                onClick={closeModal}
              >
                Fermer
              </button>
              <button
                className={`db-modal-btn ${
                  selectedAcheteur.actif
                    ? "db-modal-btn--warning"
                    : "db-modal-btn--success"
                }`}
                onClick={() => {
                  toggleStatus(selectedAcheteur);
                  closeModal();
                }}
              >
                {selectedAcheteur.actif ? "Désactiver" : "Activer"}
              </button>
              <button
                className="db-modal-btn db-modal-btn--danger"
                onClick={() => {
                  deleteAcheteur(selectedAcheteur.id);
                  closeModal();
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}