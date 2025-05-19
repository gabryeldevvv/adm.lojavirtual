import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProdutos,
  fetchProdutoById,
  createProduto,
  updateProduto,
} from "../api/produtos";

type ProdutoFormData = {
  id: string;
  nome: string;
  descricao?: string;
  sku: string;
  preco: number;
  categoria: { id: string; nome: string } | null;
  marca: { id: string; nome: string } | null;
};

export const useProdutos = () => {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: fetchProdutos,
  });
};

export const useProdutoById = (id: string, enabled = true) => useQuery({
  queryKey: ['tamanho', id],
  queryFn: () => fetchProdutoById(id),
  enabled
});

export const useCreateProduto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduto,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['produtos'],
        exact: true
      });
    }
  });
};

export const useUpdateProduto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProdutoFormData }) => 
      updateProduto(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['variacoes'],
        exact: true
      });
    }
  });
};
