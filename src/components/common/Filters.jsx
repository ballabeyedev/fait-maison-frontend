import { useState } from "react";

export default function Filters({ options }) {
  const [active, setActive] = useState(0);
  return (
    <div className="db-filters">
      {options.map((o, i) => (
        <button key={o} className={`db-chip${active === i ? " active" : ""}`} onClick={() => setActive(i)}>{o}</button>
      ))}
    </div>
  );
}