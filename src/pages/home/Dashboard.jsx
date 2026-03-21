import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Dashboard.css";

import Sidebar from "../../components/layout/Sidebar.jsx";
import Topbar from "../../components/layout/Topbar.jsx";

import OverviewPanel from "../../components/panels/OverviewPanel.jsx";
import UsersPanel from "../../components/panels/UsersPanel.jsx";
import SellersPanel from "../../components/panels/SellersPanel.jsx";
import ProductsPanel from "../../components/panels/ProductsPanel.jsx";
import SubscriptionsPanel from "../../components/panels/SubscriptionsPanel.jsx";
import AdminsPanel from "../../components/panels/AdminsPanel.jsx";

import Modal from "../../components/common/Modal.jsx";
import FormInput from "../../components/common/FormInput.jsx";
import FormSelect from "../../components/common/FormSelect.jsx";

import { PAGES } from "../../data/dashboardData.jsx";
import { getUser } from "../../service/auth/authService.js";

export default function Dashboard() {
  const [page,    setPage]    = useState("overview");
  const [sbOpen,  setSbOpen]  = useState(true);
  const [modal,   setModal]   = useState(null);
  const [toast,   setToast]   = useState({ msg: "", show: false });
  const [user,    setUser]    = useState(null); // <-- état pour l'utilisateur
  const toastTimer            = useRef(null);
  const navigate              = useNavigate();

  // Récupérer info user connecté au montage du composant
  useEffect(() => {
    const u = getUser();
    if (!u) {
      // Si pas connecté, rediriger vers login
      navigate("/");
    } else {
      setUser(u);
    }
  }, []);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 2500);
  };

  const openModal  = (id) => setModal(id);
  const closeModal = ()   => setModal(null);
  const handleNav  = (id) => setPage(id);

  // Modal content for addUser / addSeller / editUser
  const UserModal = () => (
    <Modal id="addUser" title="Ajouter un utilisateur" openId={modal} onClose={closeModal}>
      <FormInput label="Nom complet" placeholder="Ex : Mariama Balde" />
      <FormInput label="Email" type="email" placeholder="mariama@email.sn" />
      <FormInput label="Téléphone" placeholder="+221 7X XXX XX XX" />
      <FormInput label="Ville" placeholder="Ex : Dakar" />
      <div className="db-modal-footer">
        <button className="db-btn secondary" onClick={closeModal}>Annuler</button>
        <button className="db-btn primary" onClick={()=>{closeModal();showToast("Utilisateur ajouté")}}>Ajouter</button>
      </div>
    </Modal>
  );

  // … même pour SellerModal et EditUserModal

  return (
    <div className="db-app">
      <Sidebar 
        sbOpen={sbOpen} 
        setSbOpen={setSbOpen} 
        page={page} 
        handleNav={handleNav} 
        navigate={navigate} 
        user={user}  // <-- ajoute ça
      />
      <div className={`db-main${sbOpen ? "" : " wide"}`}>
        {/* Passer le user au Topbar pour afficher nom/email si besoin */}
        <Topbar pageTitle={PAGES[page]?.t} pageSub={PAGES[page]?.s} user={user} />
        <div className="db-content">
          <div className={`db-panel${page === "overview"      ? " active" : ""}`}><OverviewPanel onNavTo={handleNav} showToast={showToast} user={user}/></div>
          <div className={`db-panel${page === "users"         ? " active" : ""}`}><UsersPanel    onModal={openModal} showToast={showToast} user={user}/></div>
          <div className={`db-panel${page === "sellers"       ? " active" : ""}`}><SellersPanel  onModal={openModal} showToast={showToast} user={user}/></div>
          <div className={`db-panel${page === "products"      ? " active" : ""}`}><ProductsPanel showToast={showToast} user={user}/></div>
          <div className={`db-panel${page === "subscriptions" ? " active" : ""}`}><SubscriptionsPanel showToast={showToast} user={user}/></div>
          <div className={`db-panel${page === "admins"        ? " active" : ""}`}><AdminsPanel showToast={showToast} user={user}/></div>
        </div>
      </div>

      {/* Toast */}
      <div className={`db-toast${toast.show ? " show" : ""}`}>
        <div className="db-toast-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        {toast.msg}
      </div>
    </div>
  );
}