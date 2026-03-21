import Card from "../common/Card";
import Filters from "../common/Filters";
import { statusBadge } from "../../helpers/statusBadge";
import { PRODUCTS } from "../../data/dashboardData";

export default function ProductsPanel({ showToast }) {
  return (
    <>
      <Filters options={["Tous","Plats cuisinés","Fruits & Légumes","Signalés","En attente"]} />
      <Card title="Produits" right={<span style={{ fontSize: ".8rem", color: "var(--text3)" }}>3 891 au total</span>}>
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr><th>Produit</th><th>Vendeur</th><th>Catégorie</th><th>Prix</th><th>Date</th><th>Statut</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p, i) => (
                <tr key={i}>
                  <td className="db-td-bold">{p.name}</td>
                  <td>{p.seller}</td>
                  <td><span className={statusBadge(p.cat)}>{p.cat}</span></td>
                  <td>{p.price}</td>
                  <td>{p.date}</td>
                  <td><span className={statusBadge(p.status)}>{p.status}</span></td>
                  <td><div className="db-actions">
                    {p.status === "En attente"
                      ? <button className="db-btn-ghost" onClick={() => showToast("Approuvé !")}>Approuver</button>
                      : <button className="db-btn-ghost">Voir</button>
                    }
                    <button className="db-btn-danger" onClick={() => showToast("Supprimé")}>Suppr.</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}