import api from '../api';

/* ============================================================
   🛡️ CACHE LOCAL — évite les appels API répétés en rafale
   TTL = durée de vie du cache en millisecondes (60 sec par défaut)
   → Si fetchStats est appelé 2x en moins de 60s, la 2ème fois
     retourne les données en cache sans toucher au serveur.
============================================================ */
const cache = {};
const CACHE_TTL = 60 * 1000; // 60 secondes

async function cachedGet(key, url) {
  const now = Date.now();
  const entry = cache[key];

  // ✅ Retourne le cache si encore valide
  if (entry && now - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }

  // Sinon appel API + mise en cache
  const response = await api.get(url);
  cache[key] = { data: response.data, timestamp: now };
  return response.data;
}

/* Vider le cache manuellement (ex: après une action admin) */
export const clearAdminCache = () => {
  Object.keys(cache).forEach((k) => delete cache[k]);
};


/* ===========================
   👥 VENDEURS
=========================== */

export const listerVendeurs = async () => {
  const response = await api.get('/admin/liste-vendeurs');
  return response.data;
};

export const nombreVendeursActifs = async () => {
  return cachedGet('vendeurs-actifs', '/admin/nombre-vendeurs-actif');
};

export const nombreVendeursInactifs = async () => {
  return cachedGet('vendeurs-inactifs', '/admin/nombre-vendeurs-inactif');
};


/* ===========================
   📦 PRODUITS
=========================== */

export const listerProduitsActifs = async () => {
  const response = await api.get('/admin/liste-produits-actifs');
  return response.data;
};

export const nombreProduitsActifs = async () => {
  return cachedGet('produits-actifs', '/admin/nombre-produits-actifs');
};


/* ===========================
   👤 CLIENTS
=========================== */

export const listerClients = async () => {
  const response = await api.get('/admin/liste-clients');
  return response.data;
};

export const nombreClientsActifs = async () => {
  return cachedGet('clients-actifs', '/admin/nombre-clients-actifs');
};

export const nombreClientsInactifs = async () => {
  return cachedGet('clients-inactifs', '/admin/nombre-clients-inactifs');
};


/* ===========================
   🗂️ CATEGORIES
=========================== */

export const creerCategorie = async (data) => {
  const response = await api.post('/admin/creer-categorie', data);
  return response.data;
};