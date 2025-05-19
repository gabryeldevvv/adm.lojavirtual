import { Box, Breadcrumbs, Link, Typography, Button } from "@mui/joy";

import { Add, HomeRounded, ChevronRightRounded } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import MarcaTable from "../components/MarcaTable";

export default function PageMarca() {
  const navigate = useNavigate();
  
  const handleCreateBrand = () => {
    navigate('/marca/');
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
            Marcas
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
          Marcas
        </Typography>
        <Button
          color="primary"
          startDecorator={<Add />}
          size="sm"
          onClick={handleCreateBrand}
        >
          Criar marca
        </Button>
      </Box>
      <MarcaTable />
    </>
  );
}
