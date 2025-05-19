import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchVariacoes, 
  fetchVariacaoById, 
  createVariacao, 
  updateVariacao 
} from "../api/variacoes";

interface VariacaoUpdateData {
  id: string;
  nome: string;
  produto: { id: string; nome: string } | null;
  cor: { id: string; nome: string } | null;
}

export const useVariacoes = () => useQuery({
  queryKey: ['variacoes'],
  queryFn: fetchVariacoes
});

export const useVariacaoById = (id: string, enabled = true) => useQuery({
  queryKey: ['tamanho', id],
  queryFn: () => fetchVariacaoById(id),
  enabled
});

export const useCreateVariacao = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVariacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['variacoes'],
        exact: true
      });
    }
  });
};

export const useUpdateVariacao = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: VariacaoUpdateData }) => 
      updateVariacao(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['variacoes'],
        exact: true
      });
    }
  });
};