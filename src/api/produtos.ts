import axios from "axios";

const auth = {
  username: "admin",
  password: "admin123",
};

const api = axios.create({
  baseURL: "https://webservice-pw0xla.fly.dev/api",
  auth,
});

interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  sku: string;
  preco: number;
  categoria: { id: string; nome: string } | null;
  marca: { id: string; nome: string } | null;
}

export const fetchProdutos = async (): Promise<Produto[]> => {
  const response = await api.get('/produtos');
  return response.data;
};

export const fetchProdutoById = async (id: string): Promise<Produto> => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const createProduto = async (data: Omit<Produto, 'id'>): Promise<Produto> => {
  console.log(data);
  const response = await api.post('/produtos', data);
  return response.data;
};

export const updateProduto = async (id: string, data: Partial<Produto>): Promise<Produto> => {
  
  const response = await api.put(`/produtos/${id}`, data);
  console.log(response);
  return response.data;
};