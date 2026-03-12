import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;

// Auth
export const login = (email: string, senha: string) =>
  api.post('/auth/login', { email, senha });

export const logout = () => api.post('/auth/logout');

export const registrar = (nome: string, email: string, senha: string) =>
  api.post('/auth/registrar', { nome, email, senha });

// Documentos
export const listarDocumentosPublicos = () => api.get('/documentos/publicos');

export const listarDocumentosAdmin = (params?: {
  pagina?: number;
  limite?: number;
  categoria?: string;
  busca?: string;
}) => api.get('/documentos', { params });

export const criarDocumento = (formData: FormData) =>
  api.post('/documentos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const atualizarDocumento = (id: string, data: object) =>
  api.put(`/documentos/${id}`, data);

export const deletarDocumento = (id: string) => api.delete(`/documentos/${id}`);

export const downloadDocumento = (id: string) =>
  `${API_URL}/api/documentos/publicos/${id}/download`;

// Galeria
export const listarGaleria = (pagina?: string) =>
  api.get('/galeria', { params: pagina ? { pagina } : {} });

export const listarGaleriaAdmin = () => api.get('/galeria/admin');

export const uploadImagem = (formData: FormData) =>
  api.post('/galeria', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deletarImagem = (id: string) => api.delete(`/galeria/${id}`);
