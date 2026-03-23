import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 🔥 Interceptor automatique
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Utils
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('utilisateur');
};

export const setUser = (user) => {
  localStorage.setItem('utilisateur', JSON.stringify(user));
};

export default api;