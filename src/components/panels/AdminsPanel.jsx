import { useState } from "react";
import Modal from "../common/Modal";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";

export default function AdminsPanel({ showToast }) {
  const [setAdmins]   = useState();
  const [openMod, setOpenMod] = useState(null);
  const [form, setForm]       = useState({ name: "", email: "", role: "admin", pass: "" });
  const [editIdx, setEditIdx] = useState(null);

  const openAdd  = () => { setForm({ name: "", email: "", role: "admin", pass: "" }); setEditIdx(null); setOpenMod("add"); };
  const close    = () => setOpenMod(null);

  const saveAdd = () => {
    const ini = form.name.split(" ").filter(Boolean).map(w=>w[0].toUpperCase()).join("").substring(0,2);
    const now  = new Date().toLocaleDateString("fr-FR",{ day:"numeric",month:"short",year:"numeric" });
    setAdmins(prev => [...prev, { ini, name: form.name || "Nouvel Admin", email: form.email || "admin@faitmaison.sn", date: now, role: form.role }]);
    showToast("Administrateur créé"); close();
  };

  const saveEdit = () => {
    const ini = form.name.split(" ").filter(Boolean).map(w=>w[0].toUpperCase()).join("").substring(0,2);
    setAdmins(prev => prev.map((a,i) => i === editIdx ? { ...a, ini, name: form.name, email: form.email, role: form.role } : a));
    showToast("Administrateur modifié"); close();
  };

  const del = (i) => { setAdmins(prev => prev.filter((_,j)=>j!==i)); showToast("Admin supprimé"); };

  const FormBody = () => (
    <>
      <FormInput label="Nom complet"            value={form.name}  onChange={e=>setForm(f=>({...f,name:e.target.value}))}  placeholder="Ex : Ibrahima Fall" />
      <FormInput label="Email" type="email"     value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="ibrahima@faitmaison.sn" />
      <FormSelect label="Rôle" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} options={["admin","super"]} />
      <FormInput label={openMod==="edit"?"Nouveau mot de passe (optionnel)":"Mot de passe temporaire"} type="password" value={form.pass} onChange={e=>setForm(f=>({...f,pass:e.target.value}))} placeholder="Min. 8 caractères" />
    </>
  );

  return (
    <>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem" }}>
        <span className="db-section-label">Administrateurs</span>
        <button className="db-btn primary" onClick={openAdd}>+ Nouvel administrateur</button>
      </div>

      <div className="db-admin-list">
       
      </div>

      <Modal id="add"  title="Nouvel administrateur"       openId={openMod} onClose={close}><FormBody /><div className="db-modal-footer"><button className="db-btn secondary" onClick={close}>Annuler</button><button className="db-btn primary" onClick={saveAdd}>Créer</button></div></Modal>
      <Modal id="edit" title="Modifier l'administrateur"  openId={openMod} onClose={close}><FormBody /><div className="db-modal-footer"><button className="db-btn secondary" onClick={close}>Annuler</button><button className="db-btn primary" onClick={saveEdit}>Enregistrer</button></div></Modal>
    </>
  );
}