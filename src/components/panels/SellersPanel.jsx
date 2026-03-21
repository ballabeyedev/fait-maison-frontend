import Card from "../common/Card";
import Filters from "../common/Filters";
import { statusBadge } from "../../helpers/statusBadge";
import { SELLERS } from "../../data/dashboardData";

export default function SellersPanel({ onModal, showToast }) {
  return (
    <>
      <div className="db-filters">
        <Filters options={["Tous","Cuisiniers","Agriculteurs","En attente"]} />
        <button className="db-btn primary" style={{ marginLeft: "auto" }} onClick={() => onModal("addSeller")}>+ Ajouter</button>
      </div>
      <Card title="Vendeurs" right={<span style={{ fontSize: ".8rem", color: "var(--text3)" }}>248 au total</span>}>
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr><th>Vendeur</th><th>Type</th><th>Produits</th><th>Abonnement</th><th>Contacts</th><th>Statut</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {SELLERS.map((s, i) => (
                <tr key={i}>
                  <td className="db-td-bold">{s.name}</td>
                  <td><span className={statusBadge(s.type)}>{s.type}</span></td>
                  <td>{s.products}</td>
                  <td><span className={statusBadge(s.plan)}>{s.plan}</span></td>
                  <td>{s.contacts}</td>
                  <td><span className={statusBadge(s.status)}>{s.status}</span></td>
                  <td><div className="db-actions">
                    <button className="db-btn-ghost">Voir</button>
                    {s.status === "En attente"
                      ? <button className="db-btn-ghost" onClick={() => showToast("Approuvé !")}>Approuver</button>
                      : <button className="db-btn-danger" onClick={() => showToast("Désactivé")}>Désact.</button>
                    }
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