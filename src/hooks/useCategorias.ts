import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCategorias,
  fetchCategoriaById,
  createCategoria,
  updateCategoria,
} from "../api/categorias";

export type CategoriaFormData = {
  nome: string;
  descricao?: string;
  idPai?: string | null;
};

// Lista todas
export const useCategorias = () => {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: fetchCategorias,
  });
};

// Cria nova
export const useCreateCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoriaFormData) => createCategoria(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};

// Atualiza existente
export const useUpdateCategoria = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { nome: string; descricao?: string };
    }) => updateCategoria(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
};

// Busca por ID
export const useCategoriaById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["categoria", id],
    queryFn: () => fetchCategoriaById(id),
    enabled,
  });
};
