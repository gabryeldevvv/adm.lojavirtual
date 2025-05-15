import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import PageProduto from "./pages/PageProduto";
import PageMarca from "./pages/PageMarca";
import PageCategoria from "./pages/PageCategoria";
import RegistroProduto from "./pages/RegistroProduto"; // pode ser genérico depois
import RegistroCategoria from "./pages/RegistroCategoria";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box sx={{ display: "flex", minHeight: "100dvh", border: "3px solid blue" }}>
            <Header />
            <Sidebar />
            <Box
              component="main"
              className="MainContent"
              sx={{
                px: { xs: 2, md: 6 },
                pt: {
                  xs: "calc(12px + var(--Header-height))",
                  sm: "calc(12px + var(--Header-height))",
                  md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                height: "100dvh",
                gap: 1,
              }}
            >
              <Routes>
                <Route path="/" element={<></>} />
                <Route path="/produtos" element={<PageProduto />} />
                <Route path="/marcas" element={<PageMarca />} />
                <Route path="/categorias" element={<PageCategoria />} />

                <Route path="/categoria/" element={<RegistroCategoria />} />

                {/* Rota dinâmica */}
                <Route path="/produto/:id" element={<RegistroProduto />} />
                <Route path="/categoria/:id" element={<RegistroCategoria />} />
                {/* Você pode adicionar /marca/:id e /categoria/:id também futuramente */}
              </Routes>
            </Box>
          </Box>
        </CssVarsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
