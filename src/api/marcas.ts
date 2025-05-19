import axios from "axios";

const auth = {
  username: "admin",
  password: "admin123",
};

const api = axios.create({
  baseURL: "https://webservice-pw0xla.fly.dev/api",
  auth,
});

export const fetchMarcas = async () => {
  const response = await api.get("/marcas");
  return response.data;
};

export const createMarca = async (marca: {
  nome: string;
  descricao?: string;
  idPai?: string | null;
}) => {
  const response = await api.post("/marcas", marca);
  return response.data;
};

export const updateMarca = async (
  id: string,
  marca: { nome: string; descricao?: string }
) => {
  const response = await api.put(`/marcas/${id}`, marca);
  return response.data;
};

export const fetchMarcaById = async (id: string) => {
  const response = await api.get(`/marcas/${id}`);
  return response.data;
};
