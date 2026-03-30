export default function Topbar({ pageTitle, pageSub }) {
  return (
    <header className="db-topbar">
      <div>
        <div className="db-page-title">{pageTitle}</div>
        <div className="db-page-sub">{pageSub}</div>
      </div>
     
    </header>
  );
}