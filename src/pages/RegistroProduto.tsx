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
  useProdutoById,
  useCreateProduto,
  useUpdateProduto,
} from "../hooks/useProdutos";
import { useEffect } from "react";
import SeletorRegistro from "../components/SeletorRegistro";

export default function MyProfile() {

type ProdutoFormData = {
  id: string;
  nome: string;
  descricao?: string;
  sku: string;
  preco: number;
  categoria: { id: string; nome: string } | null;
  marca: { id: string; nome: string } | null;
};

  const { id } = useParams(); // Pegando o id da URL
  const navigate = useNavigate();
  const isEditando = !!id;

  console.log("ID da URL:", id); // Log para verificar o ID

  const {
    register,
    handleSubmit,
    reset, 
    setValue, 
    watch,
    formState: { errors },
  } = useForm<ProdutoFormData>({
    defaultValues: {
      nome: '',
      categoria: null,
      marca: null,
    },
  });


  const { data, isLoading, isError } = useProdutoById(id || "", isEditando); // Buscando o registro pelo id da URL

  console.log("Dados da produto:", data); // Log para verificar os dados carregados

  const createProdutoMutation = useCreateProduto();
  const updateProdutoMutation = useUpdateProduto();

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        categoria: data.categoria || null,
        marca: data.marca || null
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: ProdutoFormData) => {
    const payload = {
      nome: formData.nome,
      descricao: formData.descricao,
      preco: formData.preco,  // pode ser número ou string, conforme seu tipo
      sku: formData.sku,
      categoria: formData.categoria?.id ? { id: formData.categoria.id } : null,
      marca: formData.marca?.id ? { id: formData.marca.id } : null
    };

    console.log("Payload sendo enviado:", payload);

    if (isEditando) {
      updateProdutoMutation.mutate(
        { id: id!, data: payload },
        {
          onSuccess: () => {
            alert("Produto atualizado com sucesso!");
            navigate("/produtos");
          },
        }
      );
    } else {
      createProdutoMutation.mutate(payload, {
        onSuccess: () => {
          alert("Produto criado com sucesso!");
          reset();
          navigate("/produtos");
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
    console.error("Erro ao carregar produto."); // Log de erro
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography color="danger">Erro ao carregar a produto.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
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
              to="/produtos"
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Produtos
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              {isEditando ? "Editar produto" : "Novo produto"}
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            {isEditando ? "Editar Produto" : "Novo Produto"}
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
            <Typography level="title-md">Informações do produto</Typography>
            <Typography level="body-sm">
              Customize a apresentação do produto para venda.
            </Typography>
          </Box>
          <Divider />

          <Stack spacing={2} sx={{ my: 2 }}>
            <FormControl>
              <FormLabel>SKU</FormLabel>
              <Input
                {...register("sku", { required: "SKU é obrigatório" })}
                placeholder="Ex: SKU12345"
                error={!!errors.sku}
              />
              {errors.sku && (
                <Typography level="body-xs" color="danger">
                  {errors.sku.message}
                </Typography>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Nome do produto</FormLabel>
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
                placeholder="Descreva o produto"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Categoria</FormLabel>
              <SeletorRegistro<{id: string; nome: string}>
                value={watch("categoria")}
                onSelect={(produto) => {
                  setValue("categoria", produto);
                }}
                objeto="categorias"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Marca</FormLabel>
              <SeletorRegistro<{id: string; nome: string}>
                value={watch("marca")}
                onSelect={(produto) => {
                  setValue("marca", produto);
                }}
                objeto="marcas"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Preço</FormLabel>
              <Input
                type="number"
                {...register("preco", { required: "Preço é obrigatório" })}
                placeholder="Ex: 499.90"
                error={!!errors.preco}
              />
              {errors.preco && (
                <Typography level="body-xs" color="danger">
                  {errors.preco.message}
                </Typography>
              )}
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
