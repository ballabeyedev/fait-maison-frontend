import Card from "../common/Card";
import Filters from "../common/Filters";
import { statusBadge } from "../../helpers/statusBadge";
import { USERS } from "../../data/dashboardData";

export default function UsersPanel({ onModal, showToast }) {
  return (
    <>
      <Card title="Acheteurs" right={<span style={{ fontSize: ".8rem", color: "var(--text3)" }}>1 248 au total</span>}>
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr><th>Nom</th><th>Email</th><th>Ville</th><th>Inscription</th><th>Statut</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {USERS.map((u, i) => (
                <tr key={i}>
                  <td className="db-td-bold">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.city}</td>
                  <td>{u.date}</td>
                  <td><span className={statusBadge(u.status)}>{u.status}</span></td>
                  <td><div className="db-actions">
                    <button className="db-btn-ghost">Voir</button>
                    <button className="db-btn-ghost" onClick={() => onModal("editUser")}>Modifier</button>
                    <button className="db-btn-danger" onClick={() => showToast("Utilisateur supprimé")}>Suppr.</button>
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