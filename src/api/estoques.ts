import axios from "axios";

const auth = {
  username: "admin",
  password: "admin123",
};

const api = axios.create({
  baseURL: "https://webservice-pw0xla.fly.dev/api",
  auth,
});

interface Estoque {
  id: string;
  variacaoId?: string;
  estoqueId?: string;
}

export const fetchEstoques = async (): Promise<Estoque[]> => {
  const response = await api.get('/estoques');
  return response.data;
};

export const fetchEstoqueById = async (id: string): Promise<Estoque> => {
  const response = await api.get(`/estoques/${id}`);
  return response.data;
};

export const createEstoque = async (data: Omit<Estoque, 'id'>): Promise<Estoque> => {
  const response = await api.post('/estoques', data);
  return response.data;
};

export const updateEstoque = async (id: string, data: Partial<Estoque>): Promise<Estoque> => {
  const response = await api.put(`/estoques/${id}`, data);
  return response.data;
};