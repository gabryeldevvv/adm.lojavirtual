import { Box, Button, Divider, FormControl, FormLabel, Input, Stack, Typography, Tabs, TabList, Tab, tabClasses, Breadcrumbs, Link, Card, CardActions, CardOverflow } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { HomeRounded, ChevronRightRounded } from "@mui/icons-material";

import { useCreateCategoria } from "../hooks/useCategorias";

export default function RegistroCategoria( ) {
    type CategoriaFormData = {
      nome: string;
      descricao?: string;
    };

    const { register, handleSubmit, reset } = useForm<CategoriaFormData>();
    const createCategoriaMutation = useCreateCategoria();

    const onSubmit = (data: CategoriaFormData) => {
    createCategoriaMutation.mutate(data, {
      onSuccess: () => {
        reset(); // limpa o formulário após sucesso
      },
    });
  };


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
              to={'/'}
              aria-label="Home"
            >
              <HomeRounded />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              component={RouterLink}
              to={'/'}
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Catálogo
            </Link>
            <Link
              underline="hover"
              color="neutral"
              component={RouterLink}
              to={'/categorias'}
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Categorias
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              Nome da categoria
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            NOME DA CATEGORIA
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
        <Card component='form' onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Informações da categoria</Typography>
            <Typography level="body-sm">
              Customize a apresentação da categoria para venda.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Nome da categoria</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input {...register("nome", { required: "Nome é obrigatório" })} size="sm" placeholder="Ex: Verão" />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row",
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="Ex: Tênis" />
                </FormControl>
              </Stack>
            </Stack>
            {/* <div>
              <CountrySelector />
            </div> */}
            {/* <div>
              <FormControl sx={{ display: { sm: "contents" } }}>
                <FormLabel>Timezone</FormLabel>
                <Select
                  size="sm"
                  startDecorator={<AccessTimeFilledRoundedIcon />}
                  defaultValue="1"
                >
                  <Option value="1">
                    Indochina Time (Bangkok){" "}
                    <Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>
                      — GMT+07:00
                    </Typography>
                  </Option>
                  <Option value="2">
                    Indochina Time (Ho Chi Minh City){" "}
                    <Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>
                      — GMT+07:00
                    </Typography>
                  </Option>
                </Select>
              </FormControl>
            </div> */}
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
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
