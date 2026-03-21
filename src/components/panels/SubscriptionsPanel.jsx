import Card from "../common/Card";
import { statusBadge } from "../../helpers/statusBadge";
import { SUBS } from "../../data/dashboardData";

export default function SubscriptionsPanel({ showToast }) {
  return (
    <>
      <div className="db-sub-cards">
        <div className="db-sub-card"><div className="db-sub-tag free">Plan Gratuit</div><div className="db-sub-count">182</div><div style={{ fontSize: ".75rem", color: "var(--text3)", marginTop: 3 }}>vendeurs actifs</div><div className="db-sub-desc">5 produits max · 0 FCFA / mois</div></div>
        <div className="db-sub-card premium"><div className="db-sub-tag prem">Plan Premium</div><div className="db-sub-count" style={{ color: "var(--gold)" }}>66</div><div style={{ fontSize: ".75rem", color: "var(--text3)", marginTop: 3 }}>vendeurs actifs</div><div className="db-sub-desc">Produits illimités · Mise en avant · 5 000 FCFA / mois</div></div>
      </div>
      <Card title="Abonnements récents" right={<span style={{ fontSize: ".8rem", color: "var(--text3)" }}>330 000 FCFA / mois</span>}>
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr><th>Vendeur</th><th>Plan</th><th>Montant</th><th>Début</th><th>Fin</th><th>Statut</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {SUBS.map((s, i) => (
                <tr key={i}>
                  <td className="db-td-bold">{s.name}</td>
                  <td><span className={statusBadge(s.plan)}>{s.plan}</span></td>
                  <td>{s.amount}</td>
                  <td>{s.start}</td>
                  <td>{s.end}</td>
                  <td><span className={statusBadge(s.status)}>{s.status}</span></td>
                  <td>
                    {s.status === "Expiré" || s.status === "Expire bientôt"
                      ? <button className="db-btn-ghost" onClick={() => showToast("Relance envoyée")}>Relancer</button>
                      : <button className="db-btn-ghost">Voir</button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}