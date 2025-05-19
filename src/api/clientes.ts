import axios from "axios";

const auth = {
  username: "admin",
  password: "admin123",
};

const api = axios.create({
  baseURL: "https://webservice-pw0xla.fly.dev/api",
  auth,
});

interface ClienteUpdateData {
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
}


export const fetchClientes = async () => {
  const response = await api.get('/clientes');
  return response.data;
};

export const fetchClienteById = async (id: string) => {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
};

export const createCliente = async (data: {
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
}) => {
  const payload = {
    ...data,
    senha: "00000000", // valor padrão
  };
  console.log(payload);
  const response = await api.post('/clientes', payload);
  return response.data;
};

export const updateCliente = async (id: string, data: ClienteUpdateData) => {
  console.log(data);
  const payload = {
    ...data,
    senha: "00000000", // valor padrão
  };
  const response = await api.put(`/clientes/${id}`, payload);
  return response.data;
};