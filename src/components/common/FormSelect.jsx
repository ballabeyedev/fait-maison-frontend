export default function FormSelect({ label, options, ...props }) {
  return (
    <div className="db-form-group">
      <label className="db-form-label">{label}</label>
      <select className="db-form-input db-form-select" {...props}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}