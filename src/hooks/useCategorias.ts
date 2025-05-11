import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategorias } from "../api/categorias";

export const useCategorias = () => {
    return useQuery({ queryKey: ['categorias'], queryFn: fetchCategorias })
};

// export const useCreateCategoria = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createCategoria,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ['categorias'] })
//     },
//   });
// };
