import api from '../api';

/* ===========================
   👥 VENDEURS
=========================== */

/* Lister vendeurs */
export const listerVendeurs = async () => {
  const response = await api.get('/admin/lister-vendeurs');
  return response.data;
};

/* Nombre vendeurs actifs */
export const nombreVendeursActifs = async () => {
  const response = await api.get('/admin/nombre-vendeurs-actif');
  return response.data;
};

/* Nombre vendeurs inactifs */
export const nombreVendeursInactifs = async () => {
  const response = await api.get('/admin/nombre-vendeurs-inactif');
  return response.data;
};


/* ===========================
   📦 PRODUITS
=========================== */

/* Lister produits actifs */
export const listerProduitsActifs = async () => {
  const response = await api.get('/admin/lister-produits-actifs');
  return response.data;
};

/* Nombre produits actifs */
export const nombreProduitsActifs = async () => {
  const response = await api.get('/admin/nombre-produits-actifs');
  return response.data;
};


/* ===========================
   👤 CLIENTS
=========================== */

/* Lister clients */
export const listerClients = async () => {
  const response = await api.get('/admin/lister-clients');
  return response.data;
};

/* Nombre clients actifs */
export const nombreClientsActifs = async () => {
  const response = await api.get('/admin/nombre-clients-actifs');
  return response.data;
};

/* Nombre clients inactifs */
export const nombreClientsInactifs = async () => {
  const response = await api.get('/admin/nombre-clients-inactifs');
  return response.data;
};


/* ===========================
   🗂️ CATEGORIES
=========================== */

/* Créer catégorie */
export const creerCategorie = async (data) => {
  const response = await api.post('/admin/creer-categorie', data);
  return response.data;
};