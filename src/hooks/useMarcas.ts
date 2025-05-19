import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMarcas,
  fetchMarcaById,
  createMarca,
  updateMarca,
} from "../api/marcas";

export type MarcaFormData = {
  nome: string;
  descricao?: string;
  idPai?: string | null;
};

// Lista todas
export const useMarcas = () => {
  return useQuery({
    queryKey: ["marcas"],
    queryFn: fetchMarcas,
  });
};

// Cria nova
export const useCreateMarca = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MarcaFormData) => createMarca(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marcas"] });
    },
  });
};

// Atualiza existente
export const useUpdateMarca = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { nome: string; descricao?: string };
    }) => updateMarca(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marcas"] });
    },
  });
};

// Busca por ID
export const useMarcaById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["marca", id],
    queryFn: () => fetchMarcaById(id),
    enabled,
  });
};
