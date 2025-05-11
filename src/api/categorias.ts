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

// export const createCategoria = async (categoria: { nome: string; }) => {
//   const response = await axios.post(API_URL, categoria);
//   return response.data;
// };

// export const updateCategoria = async (id: number, categoria: { nome: string }) => {
//   const response = await axios.put(`${API_URL}/${id}`, categoria);
//   return response.data;
// };

// export const deleteCategoria = async (id: number) => {
//   await axios.delete(`${API_URL}/${id}`);
// };
