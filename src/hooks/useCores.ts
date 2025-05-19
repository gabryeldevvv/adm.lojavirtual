import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchCores, 
  fetchCorById, 
  createCor, 
  updateCor 
} from "../api/cores";

interface CorUpdateData {
  nome?: string;
  codigoHex?: string;
}

export const useCores = () => useQuery({
  queryKey: ['cores'],
  queryFn: fetchCores
});

export const useCorById = (id: string, enabled = true) => useQuery({
  queryKey: ['cor', id],
  queryFn: () => fetchCorById(id),
  enabled
});

export const useCreateCor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCor,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['cores'],
        exact: true
      });
    }
  });
};

export const useUpdateCor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CorUpdateData }) => 
      updateCor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['cores'],
        exact: true
      });
    }
  });
};