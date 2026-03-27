import { useEffect, useState } from "react";
import Card from "../common/Card";
import Filters from "../common/Filters";
import { statusBadge } from "../../helpers/statusBadge";
import { listerProduitsActifs } from "../../service/admin/adminService";

export default function ProduitsPanel({ showToast }) {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
  const fetchProduits = async () => {
    try {
      const data = await listerProduitsActifs();
      setProduits(data.produits);
    } catch (error) {
      console.error(error);
      showToast("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  fetchProduits();
}, [showToast]);

  const openModal = (p) => {
    setSelectedProduit(p);
    setTimeout(() => setModalVisible(true), 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedProduit(null), 300);
  };

  return (
    <>

      <Card
        title="Produits"
        right={
          <span style={{ fontSize: ".8rem", color: "var(--text3)" }}>
            {produits.length} au total
          </span>
        }
      >
        <div className="db-table-wrap">
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Vendeur</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {produits.map((p) => (
                  <tr key={p.id}>
                    <td className="db-td-bold">{p.nom}</td>
                    <td>{p.vendeur?.prenom} {p.vendeur?.nom}</td>
                    <td>
                      <span className={statusBadge(p.categorie?.nom)}>
                        {p.categorie?.nom}
                      </span>
                    </td>
                    <td>{p.prix} FCFA</td>
                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={statusBadge("Actif")}>Actif</span>
                    </td>
                    <td>
                      <div className="db-actions">
                        <button
                          className="db-btn-ghost"
                          onClick={() => openModal(p)}
                        >
                          Voir
                        </button>
                        <button
                          className="db-btn-danger"
                          onClick={() => showToast("Supprimé")}
                        >
                          Suppr.
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {selectedProduit && (
        <div
          className={`db-modal-overlay ${modalVisible ? "db-modal-overlay--visible" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`db-modal ${modalVisible ? "db-modal--visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image en bannière */}
            <div className="db-modal-banner">
              {selectedProduit.image ? (
                <img
                  src={selectedProduit.image}
                  alt={selectedProduit.nom}
                  className="db-modal-banner-img"
                />
              ) : (
                <div className="db-modal-banner-placeholder">
                  <span>🛍️</span>
                </div>
              )}
              <div className="db-modal-banner-overlay" />
              <button className="db-modal-close" onClick={closeModal}>✕</button>
              <div className="db-modal-banner-title">
                <span className="db-modal-category-pill">
                  {selectedProduit.categorie?.nom}
                </span>
                <h3>{selectedProduit.nom}</h3>
              </div>
            </div>

            {/* Corps */}
            <div className="db-modal-body">

              {/* Prix + stock */}
              <div className="db-modal-stats">
                <div className="db-modal-stat">
                  <span className="db-modal-stat-label">Prix</span>
                  <span className="db-modal-stat-value db-modal-stat-value--price">
                    {Number(selectedProduit.prix).toLocaleString("fr-FR")} <small>FCFA</small>
                  </span>
                </div>
                <div className="db-modal-stat-divider" />
                <div className="db-modal-stat">
                  <span className="db-modal-stat-label">Stock</span>
                  <span className="db-modal-stat-value">{selectedProduit.quantite} unités</span>
                </div>
                <div className="db-modal-stat-divider" />
                <div className="db-modal-stat">
                  <span className="db-modal-stat-label">Statut</span>
                  <span className="db-modal-stat-badge db-modal-stat-badge--actif">Actif</span>
                </div>
              </div>

              {/* Description */}
              {selectedProduit.description && (
                <div className="db-modal-section">
                  <p className="db-modal-section-label">Description</p>
                  <p className="db-modal-section-text">{selectedProduit.description}</p>
                </div>
              )}

              {/* Vendeur + Date */}
              <div className="db-modal-meta">
                <div className="db-modal-meta-item">
                  <span className="db-modal-meta-icon">👤</span>
                  <div>
                    <p className="db-modal-meta-label">Vendeur</p>
                    <p className="db-modal-meta-value">
                      {selectedProduit.vendeur?.prenom} {selectedProduit.vendeur?.nom}
                    </p>
                  </div>
                </div>
                <div className="db-modal-meta-item">
                  <span className="db-modal-meta-icon">📅</span>
                  <div>
                    <p className="db-modal-meta-label">Ajouté le</p>
                    <p className="db-modal-meta-value">
                      {new Date(selectedProduit.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="db-modal-footer">
              <button className="db-modal-btn db-modal-btn--secondary" onClick={closeModal}>
                Fermer
              </button>
              <button className="db-modal-btn db-modal-btn--danger" onClick={() => { showToast("Supprimé"); closeModal(); }}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}