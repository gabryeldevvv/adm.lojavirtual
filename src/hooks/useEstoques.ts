import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchEstoques, 
  fetchEstoqueById, 
  createEstoque, 
  updateEstoque 
} from "../api/estoques";

interface EstoqueUpdateData {
  id: string;
  variacaoId?: string;
  estoqueId?: string;
}

export const useEstoques = () => useQuery({
  queryKey: ['estoques'],
  queryFn: fetchEstoques
});

export const useEstoqueById = (id: string, enabled = true) => useQuery({
  queryKey: ['estoque', id],
  queryFn: () => fetchEstoqueById(id),
  enabled
});

export const useCreateEstoque = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEstoque,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['estoques'],
        exact: true
      });
    }
  });
};

export const useUpdateEstoque = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EstoqueUpdateData }) => 
      updateEstoque(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['estoques'],
        exact: true
      });
    }
  });
};