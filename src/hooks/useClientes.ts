import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchClientes, 
  fetchClienteById, 
  createCliente, 
  updateCliente 
} from "../api/clientes";

interface ClienteUpdateData {
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
}

export const useClientes = () => useQuery({
  queryKey: ['clientes'],
  queryFn: fetchClientes
});

export const useClienteById = (id: string, enabled = true) => useQuery({
  queryKey: ['cliente', id],
  queryFn: () => fetchClienteById(id),
  enabled
});

export const useCreateCliente = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['clientes'],
        exact: true
      });
    }
  });
};

export const useUpdateCliente = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ClienteUpdateData }) => 
      updateCliente(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['clientes'],
        exact: true
      });
    }
  });
};