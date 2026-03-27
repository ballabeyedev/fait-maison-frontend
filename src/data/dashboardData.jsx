/* eslint-disable react-refresh/only-export-components */
import { listerVendeurs, listerClients } from "../service/admin/adminService";
import LOGO from "../assets/images/logo.jpeg";

export { LOGO };

export const PAGES = {
  overview:      { t: "Vue d'ensemble", s: "Tableau de bord" },
  users:         { t: "Acheteurs", s: "Gestion des acheteurs" },
  sellers:       { t: "Vendeurs", s: "Gestion des vendeurs" },
  products:      { t: "Produits", s: "Gestion des produits" },
  subscriptions: { t: "Abonnements", s: "Plans et revenus" },
  moderation:    { t: "Modération", s: "Signalements en attente" },
  stats:         { t: "Statistiques", s: "Indicateurs de performance" },
  admins:        { t: "Administrateurs", s: "Gestion des accès" },
};

// Récupérer tous les vendeurs
export const fetchVendeurData = async () => {
    const response = await listerVendeurs();
    return response.vendeurs || [];
};

// Filtrer les vendeurs
export const filterVendeur = (vendeurs, searchTerm) => {
  const search = searchTerm.toLowerCase().trim();
  if (!search) return vendeurs;
  return vendeurs.filter(vendeur =>
    vendeur.nom?.toLowerCase().includes(search) ||
    vendeur.prenom?.toLowerCase().includes(search) ||
    vendeur.email?.toLowerCase().includes(search)
  );
};
// Récupérer tous les acheteurs
export const fetchAcheteurData = async () => {
    const response = await listerClients();
    // ✅ Le backend retourne { message, clients: [...] }
    return response.clients || [];
};

// Filtrer les acheteurs
export const filterAcheteur = (acheteurs, searchTerm) => {
  const search = searchTerm.toLowerCase().trim();
  if (!search) return acheteurs;
  return acheteurs.filter(acheteur =>
    acheteur.nom?.toLowerCase().includes(search) ||
    acheteur.prenom?.toLowerCase().includes(search) ||
    acheteur.email?.toLowerCase().includes(search)
  );
};