import { useEffect, useState, useCallback } from "react";import Card from "../common/Card";
import Filters from "../common/Filters";
import { statusBadge } from "../../helpers/statusBadge";
import { fetchVendeurData, filterVendeur } from "../../data/dashboardData";

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

  const filtered = filterVendeur(vendeurs, search);

  const openModal = (v) => {
    setSelectedVendeur(v);
    setTimeout(() => setModalVisible(true), 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedVendeur(null), 300);
  };

  const toggleStatus = (vendeur) => {
    setVendeurs(prev =>
      prev.map(v => v.id === vendeur.id ? { ...v, actif: !v.actif } : v)
    );
    showToast(`Statut changé pour ${vendeur.prenom} ${vendeur.nom}`);
  };

  const deleteVendeur = (id) => {
    setVendeurs(prev => prev.filter(v => v.id !== id));
    showToast("Vendeur supprimé");
  };

  return (
    <>

      <Card
        title="Vendeurs"
        right={
          <span style={{ fontSize: ".8rem", color: "var(--text3)" }}>
            {filtered.length} au total
          </span>
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
                {filtered.map((v) => (
                  <tr key={v.id}>
                    <td>
                      {v.photoProfil ? (
                        <img
                          src={v.photoProfil}
                          alt={v.nom}
                          className="db-avatar"
                        />
                      ) : (
                        <div className="db-avatar-placeholder">
                          {(v.prenom?.[0] || "") + (v.nom?.[0] || "")}
                        </div>
                      )}
                    </td>
                    <td className="db-td-bold">{v.prenom} {v.nom}</td>
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
                        <button className="db-btn-warning" onClick={() => toggleStatus(v)}>
                          {v.actif ? "Désactiver" : "Activer"}
                        </button>
                        <button className="db-btn-danger" onClick={() => deleteVendeur(v.id)}>
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ── Modal vendeur ─────────────────────────────────────── */}
      {selectedVendeur && (
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
                {selectedVendeur.photoProfil ? (
                  <img
                    src={selectedVendeur.photoProfil}
                    alt={selectedVendeur.nom}
                    className="db-modal-seller-avatar"
                  />
                ) : (
                  <div className="db-modal-seller-avatar db-modal-seller-avatar--placeholder">
                    {(selectedVendeur.prenom?.[0] || "") + (selectedVendeur.nom?.[0] || "")}
                  </div>
                )}
              </div>

              <div className="db-modal-banner-title db-modal-banner-title--centered">
                <h3>{selectedVendeur.prenom} {selectedVendeur.nom}</h3>
                <span className={`db-modal-seller-status ${selectedVendeur.actif ? "db-modal-seller-status--actif" : "db-modal-seller-status--inactif"}`}>
                  {selectedVendeur.actif ? "● Actif" : "● Inactif"}
                </span>
              </div>
            </div>

            {/* Corps */}
            <div className="db-modal-body">

              {/* Infos de contact */}
              <div className="db-modal-section">
                <p className="db-modal-section-label">Informations de contact</p>
                <div className="db-modal-contact-grid">
                  <div className="db-modal-contact-item">
                    <span className="db-modal-meta-icon">📧</span>
                    <div>
                      <p className="db-modal-meta-label">Email</p>
                      <p className="db-modal-meta-value">{selectedVendeur.email || "—"}</p>
                    </div>
                  </div>
                  <div className="db-modal-contact-item">
                    <span className="db-modal-meta-icon">📞</span>
                    <div>
                      <p className="db-modal-meta-label">Téléphone</p>
                      <p className="db-modal-meta-value">{selectedVendeur.telephone || "—"}</p>
                    </div>
                  </div>
                  {selectedVendeur.adresse && (
                    <div className="db-modal-contact-item db-modal-contact-item--full">
                      <span className="db-modal-meta-icon">📍</span>
                      <div>
                        <p className="db-modal-meta-label">Adresse</p>
                        <p className="db-modal-meta-value">{selectedVendeur.adresse}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats rapides */}
              <div className="db-modal-stats">
                <div className="db-modal-stat">
                  <span className="db-modal-stat-label">Produits</span>
                  <span className="db-modal-stat-value">
                    {selectedVendeur.produits?.length ?? "—"}
                  </span>
                </div>
                <div className="db-modal-stat-divider" />
                <div className="db-modal-stat">
                  <span className="db-modal-stat-label">Boutique</span>
                  <span className="db-modal-stat-value">
                    {selectedVendeur.boutiques?.nom ?? "—"}
                  </span>
                </div>
                <div className="db-modal-stat-divider" />
                <div className="db-modal-stat">
                  <span className="db-modal-stat-label">Membre depuis</span>
                  <span className="db-modal-stat-value" style={{ fontSize: ".82rem" }}>
                    {selectedVendeur.createdAt
                      ? new Date(selectedVendeur.createdAt).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })
                      : "—"}
                  </span>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="db-modal-footer">
              <button className="db-modal-btn db-modal-btn--secondary" onClick={closeModal}>
                Fermer
              </button>
              <button
                className={`db-modal-btn ${selectedVendeur.actif ? "db-modal-btn--warning" : "db-modal-btn--success"}`}
                onClick={() => { toggleStatus(selectedVendeur); closeModal(); }}
              >
                {selectedVendeur.actif ? "Désactiver" : "Activer"}
              </button>
              <button
                className="db-modal-btn db-modal-btn--danger"
                onClick={() => { deleteVendeur(selectedVendeur.id); closeModal(); }}
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