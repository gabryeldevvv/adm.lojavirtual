import axios from "axios";

const auth = {
  username: "admin",
  password: "admin123",
};

const api = axios.create({
  baseURL: "https://webservice-pw0xla.fly.dev/api",
  auth,
});

interface Variacao {
  id: string;
  nome: string;
  produto: { id: string; nome: string } | null;
  cor: { id: string; nome: string } | null;
}

export const fetchVariacoes = async (): Promise<Variacao[]> => {
  const response = await api.get('/variacoes');
  return response.data;
};

export const fetchVariacaoById = async (id: string): Promise<Variacao> => {
  const response = await api.get(`/variacoes/${id}`);
  return response.data;
};

export const createVariacao = async (data: Omit<Variacao, 'id'>): Promise<Variacao> => {
  console.log(data);
  const response = await api.post('/variacoes', data);
  return response.data;
};

export const updateVariacao = async (id: string, data: Partial<Variacao>): Promise<Variacao> => {
  
  const response = await api.put(`/variacoes/${id}`, data);
  console.log(response);
  return response.data;
};