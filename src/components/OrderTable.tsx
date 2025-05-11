import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import { Link as RouterLink } from "react-router-dom";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const rows = [
  {
    id: "1",
    sku: "INV-1234",
    nome: "Nike Air Zoom Pegasus 39",
    descricao:
      "Tênis de corrida leve e responsivo, ideal para treinos diários e longas distâncias.",
    date: "Feb 3, 2023",
    status: "Refunded",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "N", nome: "Nike" },
  },
  {
    id: "2",
    sku: "INV-1235",
    nome: "Adidas VL Court 2.0",
    descricao:
      "Tênis casual com visual retrô e confortável, perfeito para o dia a dia urbano.",
    date: "Mar 12, 2023",
    status: "Paid",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "A", nome: "Adidas" },
  },
  {
    id: "3",
    sku: "INV-1236",
    nome: "Mizuno Wave Rider 27",
    descricao:
      "Tênis de corrida com excelente amortecimento e estabilidade para alta performance.",
    date: "Jan 22, 2023",
    status: "Pending",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "M", nome: "Mizuno" },
  },
  {
    id: "4",
    sku: "INV-1237",
    nome: "Reebok Classic Leather",
    descricao:
      "Clássico retrô com cabedal em couro e solado em EVA para conforto e estilo nostálgico.",
    date: "Apr 15, 2023",
    status: "Delivered",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "R", nome: "Reebok" },
  },
  {
    id: "5",
    sku: "INV-1238",
    nome: "New Balance 574 Core",
    descricao:
      "Tênis urbano com pegada esportiva, ideal para looks casuais com um toque retrô.",
    date: "May 8, 2023",
    status: "Refunded",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "N", nome: "New Balance" },
  },
  {
    id: "6",
    sku: "INV-1239",
    nome: "Fila Axilus Energized",
    descricao:
      "Modelo para treinos indoor, com solado emborrachado e boa ventilação.",
    date: "Jun 18, 2023",
    status: "Shipped",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "F", nome: "Fila" },
  },
  {
    id: "7",
    sku: "INV-1240",
    nome: "Converse Chuck Taylor All Star High",
    descricao:
      "O clássico cano alto em lona, símbolo de autenticidade e estilo atemporal.",
    date: "Jul 4, 2023",
    status: "Paid",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "C", nome: "Converse" },
  },
  {
    id: "8",
    sku: "INV-1241",
    nome: "Asics Gel-Nimbus 25",
    descricao:
      "Tênis extremamente leve com tecnologia de amortecimento em gel, ideal para longas corridas.",
    date: "Aug 1, 2023",
    status: "Pending",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "A", nome: "Asics" },
  },
  {
    id: "9",
    sku: "INV-1242",
    nome: "Under Armour HOVR Phantom 3",
    descricao:
      "Tênis impermeável com conforto térmico, ideal para treinos em dias frios e úmidos.",
    date: "Sep 10, 2023",
    status: "Delivered",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "U", nome: "Under Armour" },
  },
  {
    id: "10",
    sku: "INV-1243",
    nome: "Lacoste Gripshot",
    descricao:
      "Tênis casual com design clean e cabedal em couro, perfeito para dias de verão.",
    date: "Oct 5, 2023",
    status: "Refunded",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "L", nome: "Lacoste" },
  },
  {
    id: "11",
    sku: "INV-1244",
    nome: "Diesel S-Astico Mid Lace",
    descricao: "Tênis retrô dos anos 90 com acabamento moderno e sola robusta.",
    date: "Nov 15, 2023",
    status: "Shipped",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "D", nome: "Diesel" },
  },
  {
    id: "12",
    sku: "INV-1245",
    nome: "Balenciaga Triple S",
    descricao:
      "Tênis chunky de luxo com design marcante, referência no streetwear internacional.",
    date: "Dec 25, 2023",
    status: "Paid",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "B", nome: "Balenciaga" },
  },
  {
    id: "13",
    sku: "INV-1246",
    nome: "Supra Vaider",
    descricao:
      "Tênis moderno e urbano, com cano médio e visual arrojado para skaters e streetwear.",
    date: "Jan 5, 2024",
    status: "Pending",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "S", nome: "Supra" },
  },
  {
    id: "14",
    sku: "INV-1247",
    nome: "Havaianas TNS Clean",
    descricao:
      "Tênis casual leve com sola de borracha reciclada, ideal para dias quentes.",
    date: "Feb 14, 2024",
    status: "Delivered",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "H", nome: "Havaianas" },
  },
  {
    id: "15",
    sku: "INV-1248",
    nome: "Zara Minimal Runner",
    descricao:
      "Tênis com visual minimalista e sola discreta, combina com looks clean e modernos.",
    date: "Mar 20, 2024",
    status: "Shipped",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "Z", nome: "Zara" },
  },
  {
    id: "16",
    sku: "INV-1249",
    nome: "Timberland Trail Trekker",
    descricao:
      "Tênis de trilha robusto com sola tratorada e cabedal resistente à água.",
    date: "Apr 2, 2024",
    status: "Refunded",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "T", nome: "Timberland" },
  },
  {
    id: "17",
    sku: "INV-1250",
    nome: "Olympikus Veloz",
    descricao:
      "Modelo branco, versátil e leve, ótimo para treinos funcionais ou uso casual.",
    date: "May 11, 2024",
    status: "Paid",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "O", nome: "Olympikus" },
  },
  {
    id: "18",
    sku: "INV-1251",
    nome: "Kappa Running Lite",
    descricao:
      "Tênis esportivo superleve com cabedal respirável e solado ergonômico.",
    date: "Jun 9, 2024",
    status: "Pending",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "K", nome: "Kappa" },
  },
  {
    id: "19",
    sku: "INV-1252",
    nome: "Lost Skater High",
    descricao:
      "Tênis cano alto com solado reforçado e design voltado ao público jovem e urbano.",
    date: "Jul 7, 2024",
    status: "Delivered",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "L", nome: "Lost" },
  },
  {
    id: "20",
    sku: "INV-1253",
    nome: "Skechers Go Run Max",
    descricao:
      "Tênis respirável com espuma leve, ideal para caminhadas e corridas leves no verão.",
    date: "Aug 3, 2024",
    status: "Shipped",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "S", nome: "Skechers" },
  },
];

type Order = "asc" | "desc";
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
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
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Editar</MenuItem>
        <Divider />
        <MenuItem color="danger">Excluir</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 5;

  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(rows.length / rowsPerPage);

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

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Filtrar por nome"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
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
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
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
                        ? paginatedRows.map((row) => row.id)
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
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                    order === "desc"
                      ? { "& svg": { transform: "rotate(0deg)" } }
                      : { "& svg": { transform: "rotate(180deg)" } },
                  ]}
                >
                  SKU
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Nome</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 190, padding: "12px 6px" }}>Marca</th>
              <th style={{ width: 190, padding: "12px 6px" }}>Categoria</th>
              <th style={{ width: 140, padding: "12px 6px" }}> </th>
            </tr>
          </thead>
          <tbody>
            {[...paginatedRows].sort(getComparator(order, "id")).map((row) => (
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
                  <Link level="body-xs" component={RouterLink} to={`/produto/${row.sku}`}  color="neutral" >
                    <Typography level="body-xs" >{row.sku}</Typography>
                  </Link>
                </td>
                <td>
                  <Typography level="body-xs">{row.nome}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: "success",
                        Refunded: "neutral",
                        Cancelled: "danger",
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm">{row.marca.inicial}</Avatar>
                    <div>
                      <Typography level="body-xs">{row.marca.nome}</Typography>
                      {/* <Typography level="body-xs">
                        {row.categoria.email}
                      </Typography> */}
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm">{row.categoria.inicial}</Avatar>
                    <div>
                      <Typography level="body-xs">
                        {row.categoria.nome}
                      </Typography>
                      {/* <Typography level="body-xs">
                        {row.categoria.email}
                      </Typography> */}
                    </div>
                  </Box>
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
          startDecorator={<KeyboardArrowLeftIcon />}
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
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Próximo
        </Button>
      </Box>
    </React.Fragment>
  );
}
