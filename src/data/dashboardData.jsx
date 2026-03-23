import LOGO from "../assets/images/logo.jpeg";
export { LOGO };

export const PAGES = {
  overview:      { t: "Vue d'ensemble",   s: "Tableau de bord" },
  users:         { t: "Acheteurs",      s: "Gestion des acheteurs" },
  sellers:       { t: "Vendeurs",          s: "Gestion des vendeurs" },
  products:      { t: "Produits",          s: "Gestion des produits" },
  subscriptions: { t: "Abonnements",       s: "Plans et revenus" },
  moderation:    { t: "Modération",        s: "Signalements en attente" },
  stats:         { t: "Statistiques",      s: "Indicateurs de performance" },
  admins:        { t: "Administrateurs",   s: "Gestion des accès" },
  
};

export const USERS = [
  { name: "Fatou Diallo",    email: "fatou@email.sn",       city: "Dakar",       date: "12 Jan 2025", status: "Actif" },
  { name: "Mamadou Ba",      email: "mba@gmail.com",        city: "Thiès",       date: "18 Jan 2025", status: "Inactif" },
  { name: "Aïssatou Ndiaye", email: "aissatou@email.sn",    city: "Saint-Louis", date: "25 Jan 2025", status: "Actif" },
  { name: "Omar Diagne",     email: "omar.d@gmail.com",     city: "Dakar",       date: "2 Fév 2025",  status: "Banni" },
  { name: "Rokhaya Seck",    email: "rokhaya@email.sn",     city: "Ziguinchor",  date: "10 Fév 2025", status: "Actif" },
  { name: "Ibrahima Fall",   email: "ib.fall@gmail.com",    city: "Dakar",       date: "14 Fév 2025", status: "Actif" },
  { name: "Mariama Diallo",  email: "mariama@email.sn",     city: "Kaolack",     date: "20 Fév 2025", status: "Inactif" },
];

export const SELLERS = [
  { name: "Khadija Cuisine", type: "Cuisinière",  products: 24, plan: "Premium", contacts: 156, status: "Actif" },
  { name: "Ferme Ndiaye",    type: "Agriculteur", products: 48, plan: "Gratuit", contacts: 89,  status: "Actif" },
  { name: "Chez Adja",       type: "Cuisinière",  products: 18, plan: "Premium", contacts: 203, status: "En attente" },
  { name: "Bio Casamance",   type: "Agriculteur", products: 31, plan: "Gratuit", contacts: 44,  status: "Actif" },
  { name: "Cuisine de Nafi", type: "Cuisinière",  products: 9,  plan: "Gratuit", contacts: 22,  status: "En attente" },
];

export const PRODUCTS = [
  { name: "Thiéboudienne", seller: "Khadija Cuisine", cat: "Plat cuisiné", price: "3 500 FCFA", date: "14 Mar", status: "Publié" },
  { name: "Mangues Kent",  seller: "Ferme Ndiaye",    cat: "Fruit",        price: "800 FCFA/kg", date: "13 Mar", status: "Publié" },
  { name: "Yassa Poulet",  seller: "Chez Adja",       cat: "Plat cuisiné", price: "4 000 FCFA", date: "12 Mar", status: "En attente" },
  { name: "Patates douces",seller: "Bio Casamance",   cat: "Légume",       price: "500 FCFA/kg", date: "11 Mar", status: "Signalé" },
  { name: "Mafé Bœuf",     seller: "Cuisine de Nafi", cat: "Plat cuisiné", price: "3 000 FCFA", date: "10 Mar", status: "En attente" },
  { name: "Bissap frais",  seller: "Bio Casamance",   cat: "Boisson",      price: "600 FCFA/L", date: "9 Mar",  status: "Publié" },
];

export const SUBS = [
  { name: "Khadija Cuisine", plan: "Premium", amount: "5 000 FCFA", start: "1 Mar 2025", end: "1 Avr 2025",   status: "Actif" },
  { name: "Chez Adja",       plan: "Premium", amount: "5 000 FCFA", start: "1 Mar 2025", end: "1 Avr 2025",   status: "Actif" },
  { name: "Bistrot Laye",    plan: "Premium", amount: "5 000 FCFA", start: "1 Fév 2025", end: "1 Mar 2025",   status: "Expiré" },
  { name: "Maison Coura",    plan: "Premium", amount: "5 000 FCFA", start: "15 Fév 2025",end: "15 Mar 2025",  status: "Expire bientôt" },
];

export const MODS = [
  { content: "Patates douces",   type: "Produit",    by: "3 utilisateurs", reason: "Photo trompeuse",     date: "14 Mar" },
  { content: "Compte Bakary D.", type: "Utilisateur",by: "2 utilisateurs", reason: "Comportement suspect",date: "13 Mar" },
  { content: "Avis Chez Mame",   type: "Commentaire",by: "1 utilisateur",  reason: "Spam / faux avis",    date: "13 Mar" },
  { content: "Photo produit X",  type: "Image",      by: "4 utilisateurs", reason: "Contenu inapproprié", date: "12 Mar" },
  { content: "Profil VendeurX",  type: "Vendeur",    by: "5 utilisateurs", reason: "Arnaque signalée",    date: "11 Mar" },
];

export const ACTIVITIES = [
  { dot: "#40916c", name: "Fatou Diallo",    message: "Nouveau vendeur inscrit",                       time: "il y a 2h"  },
  { dot: "#b8860b", name: "Mamadou Ba",      message: "Produit en attente de validation",               time: "il y a 3h"  },
  { dot: "#2a7fac", name: "Aïssatou Ndiaye", message: "Abonnement Premium activé",                     time: "il y a 5h"  },
  { dot: "#c94030", name: "Omar Diagne",     message: "Contenu signalé par 3 utilisateurs",             time: "il y a 6h"  },
  { dot: "#40916c", name: "Rokhaya Seck",    message: "Compte créé",                                   time: "Hier 18h"   },
  { dot: "#2a7fac", name: "Ferme Bio Diop",  message: "12 nouveaux produits publiés",                  time: "Hier 14h"   },
];

export const BAR_DATA = { labels: ["Oct","Nov","Déc","Jan","Fév","Mar"], values: [40,58,52,75,92,118] };

export const KPI_DATA = [
  { label: "Vendeurs inscrits",    val: "248 / 500",    pct: 50 },
  { label: "Produits publiés",     val: "3 891 / 5 000",pct: 78 },
  { label: "Clients actifs",       val: "1 248 / 2 000",pct: 62 },
  { label: "Contacts générés",     val: "4 210 / 8 000",pct: 53 },
  { label: "Revenus abonnements",  val: "2.34M / 5M FCFA",pct: 47 },
];

export const CITIES = [
  ["Dakar","142","780","2 450"],
  ["Thiès","38","210","680"],
  ["Saint-Louis","24","130","420"],
  ["Ziguinchor","22","88","310"],
  ["Kaolack","12","40","180"],
];

export const INIT_ADMINS = [
  { ini: "AS", name: "Amadou Sow",  email: "amadou@faitmaison.sn",  date: "1 Jan 2025",  role: "super" },
  { ini: "FD", name: "Fatima Diop", email: "fatima@faitmaison.sn",  date: "15 Jan 2025", role: "admin" },
  { ini: "MB", name: "Moussa Ba",   email: "moussa@faitmaison.sn",  date: "20 Fév 2025", role: "admin" },
];