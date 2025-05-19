import { 
  Box, Button, Divider, FormControl, FormLabel, Input, Stack, 
  Typography, Tabs, TabList, Tab, Breadcrumbs, Link, Card, 
  CardActions, CardOverflow, CircularProgress, Checkbox 
} from "@mui/joy";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HomeRounded, ChevronRightRounded } from "@mui/icons-material";
import { useEstoqueById, useCreateEstoque, useUpdateEstoque } from "../hooks/useEstoques";
import { useEffect } from "react";

type EstoqueFormData = {
  id: string;
  etiqueta: string;
  tipo: string;
};


export default function RegistroEstoque() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditando = !!id;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EstoqueFormData>();

  const { data, isLoading, isError } = useEstoqueById(id || "", isEditando);
  const createMutation = useCreateEstoque();
  const updateMutation = useUpdateEstoque();

  useEffect(() => {
    if (data) {
      const formattedData = {
        ...data
      };
      reset(formattedData);
    }
  }, [data, reset]);

  const onSubmit = (formData: EstoqueFormData) => {
    const payload = {
      ...formData,
    };

    if (isEditando) {
      updateMutation.mutate({ id: id!, data: payload }, {
        onSuccess: () => navigate("/estoques")
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => navigate("/estoques")
      });
    }
  };

  if (isLoading) return <CircularProgress sx={{ mx: 'auto', mt: 5 }} />;
  if (isError) return <Typography color="danger">Erro ao carregar estoque</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="neutral">
          <HomeRounded />
        </Link>
        <Link component={RouterLink} to="/estoques" color="neutral">
          Estoques
        </Link>
        <Typography>
          {isEditando ? "Editar Estoque" : "Novo Estoque"}
        </Typography>
      </Breadcrumbs>

      <Card component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Etiqueta</FormLabel>
            <Input
              {...register("etiqueta")}
            />
            
          </FormControl>
          
          <FormControl>
            <FormLabel>Tipo</FormLabel>
            <Input
              {...register("tipo")}
            />
            
            
          </FormControl>
        </Stack>

        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 3 }}>
          <CardActions sx={{ justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/estoques")}>
              Cancelar
            </Button>
            <Button type="submit" variant="solid">
              Salvar
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </Box>
  );
}