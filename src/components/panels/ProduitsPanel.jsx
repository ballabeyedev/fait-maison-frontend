import { useEffect, useState, useCallback } from "react";
import Card from "../common/Card";
import { statusBadge } from "../../helpers/statusBadge";
import { listerProduitsActifs } from "../../service/admin/adminService";

export default function ProduitsPanel({ showToast }) {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProduits = useCallback(async () => {
    try {
      const data = await listerProduitsActifs();
      setProduits(data.produits);
    } catch (error) {
      console.error(error);
      showToast("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchProduits();
  }, [fetchProduits]);

  const openModal = (p) => {
    setSelectedProduit(p);
    setTimeout(() => setModalVisible(true), 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedProduit(null), 300);
  };

  // 🔍 Filtre recherche nom / catégorie / vendeur
  const filtered = produits.filter((p) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;

    const nom = (p.nom ?? "").toLowerCase();
    const categorie = (p.categorie?.nom ?? "").toLowerCase();
    const vendeur = `${p.vendeur?.prenom ?? ""} ${p.vendeur?.nom ?? ""}`.toLowerCase();

    return nom.includes(q) || categorie.includes(q) || vendeur.includes(q);
  });

  return (
    <>
      <Card
        title="Produits"
        right={
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher produit, catégorie ou vendeur"
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "24px" }}>
                      Aucun produit trouvé
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id}>
                      <td className="db-td-bold">{p.nom}</td>
                      <td>{p.vendeur?.prenom} {p.vendeur?.nom}</td>
                      <td>
                        <span className={statusBadge(p.categorie?.nom)}>
                          {p.categorie?.nom}
                        </span>
                      </td>
                      <td>{Number(p.prix).toLocaleString("fr-FR")} FCFA</td>
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
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Modal inchangée */}
      {selectedProduit && (
        <div
          className={`db-modal-overlay ${modalVisible ? "db-modal-overlay--visible" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`db-modal ${modalVisible ? "db-modal--visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Contenu modal identique à ton code précédent */}
          </div>
        </div>
      )}
    </>
  );
}