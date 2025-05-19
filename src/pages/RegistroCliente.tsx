import { 
  Box, Button, Divider, FormControl, FormLabel, Input, Stack, 
  Typography, Tabs, TabList, Tab, Breadcrumbs, Link, Card, 
  CardActions, CardOverflow, CircularProgress, Checkbox 
} from "@mui/joy";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HomeRounded, ChevronRightRounded } from "@mui/icons-material";
import { useClienteById, useCreateCliente, useUpdateCliente } from "../hooks/useClientes";
import { useEffect } from "react";

type ClienteFormData = {
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
};

// Utility function to format CPF
const formatCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export default function RegistroCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditando = !!id;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ClienteFormData>();

  const { data, isLoading, isError } = useClienteById(id || "", isEditando);
  const createMutation = useCreateCliente();
  const updateMutation = useUpdateCliente();

  useEffect(() => {
    if (data) {
      const formattedData = {
        ...data,
        cpf: formatCPF(data.cpf)
      };
      reset(formattedData);
    }
  }, [data, reset]);

  const onSubmit = (formData: ClienteFormData) => {
    const payload = {
      ...formData,
    };

    if (isEditando) {
      updateMutation.mutate({ id: id!, data: payload }, {
        onSuccess: () => navigate("/clientes")
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => navigate("/clientes")
      });
    }
  };

  if (isLoading) return <CircularProgress sx={{ mx: 'auto', mt: 5 }} />;
  if (isError) return <Typography color="danger">Erro ao carregar cliente</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="neutral">
          <HomeRounded />
        </Link>
        <Link component={RouterLink} to="/clientes" color="neutral">
          Clientes
        </Link>
        <Typography>
          {isEditando ? "Editar Cliente" : "Novo Cliente"}
        </Typography>
      </Breadcrumbs>

      <Card component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              {...register("nome", { required: "Campo obrigatório" })}
              error={!!errors.nome}
            />
            {errors.nome && <Typography color="danger" level="body-xs">{errors.nome.message}</Typography>}
          </FormControl>

          <FormControl>
            <FormLabel>CPF</FormLabel>
            <Input
              {...register("cpf", {
                required: "Campo obrigatório",
                onChange: (e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                  e.target.value = value
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                },
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                  message: "Formato inválido",
                }
              })}
              placeholder="000.000.000-00"
              error={!!errors.cpf}
            />
            {errors.cpf && (
              <Typography color="danger" level="body-xs">
                {errors.cpf.message}
              </Typography>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Campo obrigatório" })}
              error={!!errors.email}
            />
            {errors.email && <Typography color="danger" level="body-xs">{errors.email.message}</Typography>}
          </FormControl>

          <FormControl>
            <FormLabel>Telefone</FormLabel>
            <Input
              {...register("telefone")}
              placeholder="(00) 00000-0000"
            />
          </FormControl>
        </Stack>

        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 3 }}>
          <CardActions sx={{ justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/clientes")}>
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