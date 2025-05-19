import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Chip, Divider, FormControl, FormLabel, Link, Input, Modal, ModalDialog, ModalClose, Select, Option, Table, Sheet, Checkbox, IconButton, Typography, Menu, MenuButton, MenuItem, Dropdown, iconButtonClasses } from "@mui/joy";
import { FilterAlt, Search,  ArrowDropDown,  CheckRounded,  Block,  AutorenewRounded,  KeyboardArrowRight,  KeyboardArrowLeft,  MoreHorizRounded } from "@mui/icons-material";
import { type ColorPaletteProp } from '@mui/joy/styles';

import { useEstoques } from "../hooks/useEstoques";

type Ordem = "asc" | "desc";

function getComparator<Key extends string>(
  ordem: Ordem,
  ordenarPor: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return ordem === "desc"
    ? (a, b) => descendingComparator(a, b, ordenarPor)
    : (a, b) => -descendingComparator(a, b, ordenarPor);
}

function descendingComparator<T>(a: T, b: T, ordenarPor: keyof T) {
  if (b[ordenarPor] < a[ordenarPor]) {
    return -1;
  }
  if (b[ordenarPor] > a[ordenarPor]) {
    return 1;
  }
  return 0;
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRounded />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Editar</MenuItem>
        <Divider />
        <MenuItem color="danger">Excluir</MenuItem>
      </Menu>
    </Dropdown>
  );
}

type Status = "Paid" | "Refunded" | "Cancelled";

interface EstoqueRow {
  id: string; 
  nome: string;
  status: Status;
}

const statusDecorators: Record<Status, React.ReactNode> = {
Paid: <CheckRounded />,
Refunded: <AutorenewRounded />,
Cancelled: <Block />
};

const statusColors: Record<Status, ColorPaletteProp> = {
Paid: "success",
Refunded: "neutral",
Cancelled: "danger"
};

export default function EstoqueTable() {
  const { data: estoque = [], isLoading } = useEstoques();
  
    console.log("Estoque:", estoque);
    console.table(estoque);
    console.log(typeof estoque);
    const rows = estoque || []; 
  
    const [ordem, setOrdem] = React.useState<Ordem>("desc");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);
  
    const [currentPage, setCurrentPage] = React.useState(1);
    const rowsPerPage = 5;
  
    const paginatedRows = rows.length > 0 
      ? rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];
  
    const totalPages = Math.max(Math.ceil(rows.length / rowsPerPage), 1); 

  const getPagination = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Mostra tudo se tiver até 7 páginas
      for (let i = 1; i <= totalPages; i++) pages.push(String(i));
    } else {
      if (currentPage <= 4) {
        pages.push("1", "2", "3", "4", "5", "…", String(totalPages));
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          "1",
          "…",
          String(totalPages - 4),
          String(totalPages - 3),
          String(totalPages - 2),
          String(totalPages - 1),
          String(totalPages)
        );
      } else {
        pages.push(
          "1",
          "…",
          String(currentPage - 1),
          String(currentPage),
          String(currentPage + 1),
          "…",
          String(totalPages)
        );
      }
    }

    return pages;
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrar por status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="A">Ativo</Option>
          <Option value="S">Suspenso</Option>
          <Option value="D">Desativado</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Preenchimento</FormLabel>
        <Select size="sm" placeholder="Filtrar por preenchimento">
          <Option value="C">Completo</Option>
          <Option value="P">Pendente</Option>
          <Option value="I">Impedimento</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Filtrar por nome"
          startDecorator={<Search />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAlt />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              teste
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Filtrar
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Nome</FormLabel>
          <Input
            size="sm"
            placeholder="Filtrar por nome"
            startDecorator={<Search />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="EstoqueTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked
                        ? paginatedRows.map((row: EstoqueRow) => row.id)
                        : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrdem(ordem === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDown />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          ordem === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                    ordem === "desc"
                      ? { "& svg": { transform: "rotate(0deg)" } }
                      : { "& svg": { transform: "rotate(180deg)" } },
                  ]}
                >
                  Id
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Nome</th>
              <th style={{ width: 140, padding: "12px 6px" }}> </th>
            </tr>
          </thead>
          <tbody>
            {[...paginatedRows].sort(getComparator(ordem, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "primary" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Link level="body-xs" component={RouterLink} to={`/estoque/${row.id}`}  color="neutral" >
                    <Typography level="body-xs" >{row.id}</Typography>
                  </Link>
                </td>
                <td>
                  <Typography level="body-xs">{row.nome}</Typography>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Link level="body-xs" component="button">
                      Download
                    </Link>
                    <RowMenu />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          startDecorator={<KeyboardArrowLeft />}
        >
          Anterior
        </Button>

        <Box sx={{ flex: 1 }} />
        {getPagination().map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={
              page === String(currentPage)
                ? "solid" // Página atual
                : Number(page)
                ? "outlined" // Outras páginas numéricas
                : "plain" // Elipses "…"
            }
            color="neutral"
            disabled={page === "…"} // Evita clique no "…"
            onClick={() => {
              if (Number(page)) {
                setCurrentPage(Number(page));
              }
            }}
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          endDecorator={<KeyboardArrowRight />}
        >
          Próximo
        </Button>
      </Box>
    </React.Fragment>
  );
}
