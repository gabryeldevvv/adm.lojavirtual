import axios from "axios";

const auth = {
  username: "admin",
  password: "admin123",
};

const api = axios.create({
  baseURL: "https://webservice-pw0xla.fly.dev/api",
  auth,
});

interface Tamanho {
  id: string;
  etiqueta?: string;
  tipo?: string;
}

export const fetchTamanhos = async (): Promise<Tamanho[]> => {
  const response = await api.get('/tamanhos');
  return response.data;
};

export const fetchTamanhoById = async (id: string): Promise<Tamanho> => {
  const response = await api.get(`/tamanhos/${id}`);
  return response.data;
};

export const createTamanho = async (data: Omit<Tamanho, 'id'>): Promise<Tamanho> => {
  const response = await api.post('/tamanhos', data);
  return response.data;
};

export const updateTamanho = async (id: string, data: Partial<Tamanho>): Promise<Tamanho> => {
  const response = await api.put(`/tamanhos/${id}`, data);
  return response.data;
};