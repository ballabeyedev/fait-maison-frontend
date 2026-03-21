export default function Topbar({ pageTitle, pageSub }) {
  return (
    <header className="db-topbar">
      <div>
        <div className="db-page-title">{pageTitle}</div>
        <div className="db-page-sub">{pageSub}</div>
      </div>
      <div className="db-topbar-right">
        <div className="db-search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="db-search-input" type="text" placeholder="Rechercher…" />
        </div>
        <div className="db-icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <div className="db-notif-dot" />
        </div>
      </div>
    </header>
  );
}