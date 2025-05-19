import { 
  Box, Button, Divider, FormControl, FormLabel, Input, Stack, 
  Typography, Tabs, TabList, Tab, Breadcrumbs, Link, Card, 
  CardActions, CardOverflow, CircularProgress, Checkbox 
} from "@mui/joy";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HomeRounded, ChevronRightRounded } from "@mui/icons-material";
import { useVariacaoById, useCreateVariacao, useUpdateVariacao } from "../hooks/useVariacoes";
import { useEffect } from "react";
import SeletorRegistro from "../components/SeletorRegistro";

type VariacaoFormData = {
  id?: string;
  nome: string;
  produto: { id: string; nome: string } | null;
  cor: { id: string; nome: string } | null;
};

export default function RegistroVariacao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditando = !!id;

  const { register, handleSubmit, reset, setValue, watch } = useForm<VariacaoFormData>({
    defaultValues: {
      nome: '',
      produto: null,
      cor: null
    }
  });

  const { data, isLoading, isError } = useVariacaoById(id || "", isEditando);
  const createMutation = useCreateVariacao();
  const updateMutation = useUpdateVariacao();

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        produto: data.produto || null,
        cor: data.cor || null
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: VariacaoFormData) => {
    const payload = {
      nome: formData.nome,
      produto: formData.produto?.id ? { id: formData.produto.id } : null,
      cor: formData.cor?.id ? { id: formData.cor.id } : null
    };

    if (isEditando && id) {
      updateMutation.mutate({ id, data: payload }, {
        onSuccess: () => navigate("/variacoes")
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => navigate("/variacoes")
      });
    }
  };

  if (isLoading) return <CircularProgress sx={{ mx: 'auto', mt: 5 }} />;
  if (isError) return <Typography color="danger">Erro ao carregar variacao</Typography>;

  // Observa os valores atuais para debug (pode remover depois)
  const formValues = watch();
  console.log('Form values:', formValues);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="neutral">
          <HomeRounded />
        </Link>
        <Link component={RouterLink} to="/variacoes" color="neutral">
          Variacoes
        </Link>
        <Typography>
          {isEditando ? "Editar Variacao" : "Novo Variacao"}
        </Typography>
      </Breadcrumbs>

      <Card component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Nome da variação</FormLabel>
            <Input
              {...register("nome", { required: "Nome é obrigatório" })}
              placeholder="Ex: Verão"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Produto</FormLabel>
            <SeletorRegistro<{id: string; nome: string}>
              value={watch("produto")}
              onSelect={(produto) => {
                setValue("produto", produto);
              }}
              objeto="produtos"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Cor</FormLabel>
            <SeletorRegistro<{id: string; nome: string}>
              value={watch("cor")}
              onSelect={(cor) => {
                setValue("cor", cor);
              }}
              objeto="cores"
            />
          </FormControl>
        </Stack>

        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 3 }}>
          <CardActions sx={{ justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/variacoes")}>
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