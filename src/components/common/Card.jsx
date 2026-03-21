export default function Card({ title, right, children }) {
  return (
    <div className="db-card">
      <div className="db-card-head">
        <div className="db-card-title">{title}</div>
        {right && <div>{right}</div>}
      </div>
      {children}
    </div>
  );
}