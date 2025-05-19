import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchTamanhos, 
  fetchTamanhoById, 
  createTamanho, 
  updateTamanho 
} from "../api/tamanhos";

interface TamanhoUpdateData {
  id: string;
  etiqueta?: string;
  tipo?: string;
}

export const useTamanhos = () => useQuery({
  queryKey: ['tamanhos'],
  queryFn: fetchTamanhos
});

export const useTamanhoById = (id: string, enabled = true) => useQuery({
  queryKey: ['tamanho', id],
  queryFn: () => fetchTamanhoById(id),
  enabled
});

export const useCreateTamanho = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTamanho,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['tamanhos'],
        exact: true
      });
    }
  });
};

export const useUpdateTamanho = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TamanhoUpdateData }) => 
      updateTamanho(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['tamanhos'],
        exact: true
      });
    }
  });
};