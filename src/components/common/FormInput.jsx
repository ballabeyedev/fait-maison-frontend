export default function FormInput({ label, ...props }) {
  return (
    <div className="db-form-group">
      <label className="db-form-label">{label}</label>
      <input className="db-form-input" {...props} />
    </div>
  );
}