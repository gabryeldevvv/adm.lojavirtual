import axios from "axios";

const auth = {
  username: "admin",
  password: "admin123",
};

const api = axios.create({
  baseURL: "https://webservice-pw0xla.fly.dev/api",
  auth,
});

interface Cor {
  id: string;
  nome: string;
  codigoHex?: string;
}

export const fetchCores = async (): Promise<Cor[]> => {
  const response = await api.get('/cores');
  return response.data;
};

export const fetchCorById = async (id: string): Promise<Cor> => {
  const response = await api.get(`/cores/${id}`);
  return response.data;
};

export const createCor = async (data: Omit<Cor, 'id'>): Promise<Cor> => {
  const response = await api.post('/cores', data);
  return response.data;
};

export const updateCor = async (id: string, data: Partial<Cor>): Promise<Cor> => {
  const response = await api.put(`/cores/${id}`, data);
  return response.data;
};