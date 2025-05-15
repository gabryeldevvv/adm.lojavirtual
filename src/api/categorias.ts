import axios from "axios";

const auth = {
  username: "admin",
  password: "admin123",
};

const api = axios.create({
  baseURL: "https://webservice-pw0xla.fly.dev/api",
  auth,
});

export const fetchCategorias = async () => {
  const response = await api.get("/categorias");
  return response.data;
};

export const createCategoria = async (categoria: {
  nome: string;
  descricao?: string;
  idPai?: string | null;
}) => {
  const response = await api.post("/categorias", categoria);
  return response.data;
};

export const updateCategoria = async (
  id: string,
  categoria: { nome: string; descricao?: string }
) => {
  const response = await api.put(`/categorias/${id}`, categoria);
  return response.data;
};

export const fetchCategoriaById = async (id: string) => {
  const response = await api.get(`/categorias/${id}`);
  return response.data;
};
