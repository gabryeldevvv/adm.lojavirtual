import { Box, Breadcrumbs, Link, Typography, Button } from "@mui/joy";

import { Add, HomeRounded, ChevronRightRounded } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import CategoriaTable from "../components/CategoriaTable";

export default function PageCategoria() {
  const navigate = useNavigate();

  const handleCreateCategory = () => {
    navigate('/categoria/');
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
            Categorias
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Categoria
        </Typography>
        <Button
          color="primary"
          startDecorator={<Add />}
          size="sm"
          onClick={handleCreateCategory}
        >
          Criar categoria
        </Button>
      </Box>
      <CategoriaTable />
    </>
  );
}
