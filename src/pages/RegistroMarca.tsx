import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
  Tabs,
  TabList,
  Tab,
  tabClasses,
  Breadcrumbs,
  Link,
  Card,
  CardActions,
  CardOverflow,
  CircularProgress,
} from "@mui/joy";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HomeRounded, ChevronRightRounded } from "@mui/icons-material";
import {
  useMarcaById,
  useCreateMarca,
  useUpdateMarca,
} from "../hooks/useMarcas";
import { useEffect } from "react";

export default function RegistroMarca() {
  type MarcaFormData = {
    nome: string;
    descricao?: string;
  };

  const { id } = useParams(); // Pegando o id da URL
  const navigate = useNavigate();
  const isEditando = !!id;

  console.log("ID da URL:", id); // Log para verificar o ID

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm<MarcaFormData>();

  const { data, isLoading, isError } = useMarcaById(id || "", isEditando); // Buscando o registro pelo id da URL

  console.log("Dados da marca:", data); // Log para verificar os dados carregados

  const createMarcaMutation = useCreateMarca();
  const updateMarcaMutation = useUpdateMarca();

  useEffect(() => {
    if (data) {
      console.log("Resetando formulário com dados:", data); // Log para verificar os dados antes de resetar o formulário
      reset({
        nome: data.nome,
        descricao: data.descricao || "",
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: MarcaFormData) => {
    console.log("Dados enviados:", formData); // Log para verificar os dados antes de submeter
    if (isEditando) {
      console.log("Editando marca com id:", id);
      updateMarcaMutation.mutate(
        { id: id!, data: formData },
        {
          onSuccess: () => {
            console.log("Marca atualizada com sucesso!");
            alert("Marca atualizada com sucesso!");
            navigate("/marcas");
          },
        }
      );
    } else {
      console.log("Criando nova marca");
      createMarcaMutation.mutate(formData, {
        onSuccess: () => {
          console.log("Marca criada com sucesso!");
          alert("Marca criada com sucesso!");
          reset();
          navigate("/marcas");
        },
      });
    }
  };

  // Caso esteja carregando ou ocorreu erro
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    console.error("Erro ao carregar marca."); // Log de erro
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography color="danger">Erro ao carregar a marca.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      {/* Topo com navegação */}
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRounded fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              component={RouterLink}
              to="/"
              aria-label="Home"
            >
              <HomeRounded />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              component={RouterLink}
              to="/"
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Catálogo
            </Link>
            <Link
              underline="hover"
              color="neutral"
              component={RouterLink}
              to="/marcas"
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Marcas
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              {isEditando ? "Editar marca" : "Nova marca"}
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            {isEditando ? "Editar Marca" : "Nova Marca"}
          </Typography>
        </Box>
        <Tabs defaultValue={0} sx={{ bgcolor: "transparent" }}>
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: "left",
              [`&& .${tabClasses.root}`]: {
                fontWeight: "600",
                flex: "initial",
                color: "text.tertiary",
                [`&.${tabClasses.selected}`]: {
                  bgcolor: "transparent",
                  color: "text.primary",
                  "&::after": {
                    height: "2px",
                    bgcolor: "primary.500",
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              Informações
            </Tab>
          </TabList>
        </Tabs>
      </Box>

      {/* Formulário */}
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Informações da marca</Typography>
            <Typography level="body-sm">
              Customize a apresentação da marca para venda.
            </Typography>
          </Box>
          <Divider />

          <Stack spacing={2} sx={{ my: 2 }}>
            <FormControl>
              <FormLabel>Nome da marca</FormLabel>
              <Input
                {...register("nome", { required: "Nome é obrigatório" })}
                placeholder="Ex: Verão"
                error={!!errors.nome}
              />
              {errors.nome && (
                <Typography level="body-xs" color="danger">
                  {errors.nome.message}
                </Typography>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Descrição (opcional)</FormLabel>
              <Input
                {...register("descricao")}
                placeholder="Descreva a marca"
              />
            </FormControl>
          </Stack>

          <CardOverflow
            sx={{ borderTop: "1px solid", borderColor: "divider" }}
          >
            <CardActions sx={{ justifyContent: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => reset()}
              >
                Cancelar
              </Button>
              <Button size="sm" variant="solid" type="submit">
                Salvar
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
