import api, { setUser, clearAuth } from '../api';

/* Validation email */
export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
};

/* Login */
export const login = async (email, mot_de_passe) => {
  try {
    const response = await api.post('/auth/login', { email, mot_de_passe });

    const { token, utilisateur } = response.data;

    // 🔥 Stockage uniquement
    localStorage.setItem("token", token);
    setUser(utilisateur);

    return utilisateur;
  } catch (error) {
    throw handleApiError(error);
  }
};

/* Logout */
export const logout = () => clearAuth();

/* Error handler */
export const handleApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401: return 'Email ou mot de passe incorrect';
      case 400: return 'Email ou mot de passe incorrect';
      case 404: return 'Service d\'authentification introuvable';
      case 500: return 'Erreur interne du serveur';
      default: return error.response.data?.message || 'Erreur serveur, veuillez réessayer';
    }
  }
  if (error.request) return 'Erreur réseau, vérifiez votre connexion internet';
  return 'Email ou mot de passe incorrect';
};

/* Form validation */
export const validateLoginForm = (email, password) => {
  const errors = {};
  if (!email.trim()) errors.email = "L'email est requis";
  else if (!validateEmail(email)) errors.email = "Email invalide";
  if (!password) errors.password = "Le mot de passe est requis";
  else if (password.length < 6) errors.password = "Minimum 6 caractères";
  return errors;
};

/* Récupérer utilisateur connecté */
export const getUser = () => {
  const user = localStorage.getItem('utilisateur');
  return user ? JSON.parse(user) : null;
};