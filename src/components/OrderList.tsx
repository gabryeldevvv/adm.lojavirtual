import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const listItems = [
  {
    id: "1",
    sku: "INV-1234",
    nome: "Tênis esportivo",
    date: "Feb 3, 2023",
    status: "Refunded",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "N", nome: "Nike" },
  },
  {
    id: "2",
    sku: "INV-1235",
    nome: "Tênis casual",
    date: "Mar 12, 2023",
    status: "Paid",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "A", nome: "Adidas" },
  },
  {
    id: "3",
    sku: "INV-1236",
    nome: "Tênis de corrida",
    date: "Jan 22, 2023",
    status: "Pending",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "M", nome: "Mizuno" },
  },
  {
    id: "4",
    sku: "INV-1237",
    nome: "Tênis retrô",
    date: "Apr 15, 2023",
    status: "Delivered",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "R", nome: "Reebok" },
  },
  {
    id: "5",
    sku: "INV-1238",
    nome: "Tênis urbano",
    date: "May 8, 2023",
    status: "Refunded",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "N", nome: "New Balance" },
  },
  {
    id: "6",
    sku: "INV-1239",
    nome: "Tênis fitness",
    date: "Jun 18, 2023",
    status: "Shipped",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "F", nome: "Fila" },
  },
  {
    id: "7",
    sku: "INV-1240",
    nome: "Tênis alto",
    date: "Jul 4, 2023",
    status: "Paid",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "C", nome: "Converse" },
  },
  {
    id: "8",
    sku: "INV-1241",
    nome: "Tênis leve",
    date: "Aug 1, 2023",
    status: "Pending",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "A", nome: "Asics" },
  },
  {
    id: "9",
    sku: "INV-1242",
    nome: "Tênis impermeável",
    date: "Sep 10, 2023",
    status: "Delivered",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "U", nome: "Under Armour" },
  },
  {
    id: "10",
    sku: "INV-1243",
    nome: "Tênis flexível",
    date: "Oct 5, 2023",
    status: "Refunded",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "L", nome: "Lacoste" },
  },
  {
    id: "11",
    sku: "INV-1244",
    nome: "Tênis retrô 90s",
    date: "Nov 15, 2023",
    status: "Shipped",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "D", nome: "Diesel" },
  },
  {
    id: "12",
    sku: "INV-1245",
    nome: "Tênis chunky",
    date: "Dec 25, 2023",
    status: "Paid",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "B", nome: "Balenciaga" },
  },
  {
    id: "13",
    sku: "INV-1246",
    nome: "Tênis moderno",
    date: "Jan 5, 2024",
    status: "Pending",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "S", nome: "Supra" },
  },
  {
    id: "14",
    sku: "INV-1247",
    nome: "Tênis casual básico",
    date: "Feb 14, 2024",
    status: "Delivered",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "H", nome: "Havaianas" },
  },
  {
    id: "15",
    sku: "INV-1248",
    nome: "Tênis minimalista",
    date: "Mar 20, 2024",
    status: "Shipped",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "Z", nome: "Zara" },
  },
  {
    id: "16",
    sku: "INV-1249",
    nome: "Tênis de trilha",
    date: "Apr 2, 2024",
    status: "Refunded",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "T", nome: "Timberland" },
  },
  {
    id: "17",
    sku: "INV-1250",
    nome: "Tênis branco",
    date: "May 11, 2024",
    status: "Paid",
    categoria: { inicial: "I", nome: "Inverno" },
    marca: { inicial: "O", nome: "Olympikus" },
  },
  {
    id: "18",
    sku: "INV-1251",
    nome: "Tênis esportivo leve",
    date: "Jun 9, 2024",
    status: "Pending",
    categoria: { inicial: "O", nome: "Outono" },
    marca: { inicial: "K", nome: "Kappa" },
  },
  {
    id: "19",
    sku: "INV-1252",
    nome: "Tênis cano alto",
    date: "Jul 7, 2024",
    status: "Delivered",
    categoria: { inicial: "P", nome: "Primavera" },
    marca: { inicial: "L", nome: "Lost" },
  },
  {
    id: "20",
    sku: "INV-1253",
    nome: "Tênis respirável",
    date: "Aug 3, 2024",
    status: "Shipped",
    categoria: { inicial: "V", nome: "Verão" },
    marca: { inicial: "S", nome: "Skechers" },
  },
];

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

export default function OrderList() {
  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {listItems.map((listItem) => (
        <List key={listItem.id} size="sm" sx={{ "--ListItem-paddingX": 0 }}>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <ListItemContent
              sx={{ display: "flex", gap: 2, alignItems: "start" }}
            >
              <ListItemDecorator>
                <Avatar size="sm">X</Avatar>
              </ListItemDecorator>
              <div>
                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                  {listItem.sku}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  {listItem.nome}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">
                    {listItem.categoria.nome}
                  </Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{listItem.marca.nome}</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Link level="body-sm" component="button">
                    Download
                  </Link>
                  <RowMenu />
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  Paid: <CheckRoundedIcon />,
                  Refunded: <AutorenewRoundedIcon />,
                  Cancelled: <BlockIcon />,
                }[listItem.status]
              }
              color={
                {
                  Paid: "success",
                  Refunded: "neutral",
                  Cancelled: "danger",
                }[listItem.status] as ColorPaletteProp
              }
            >
              {listItem.status}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          py: 2,
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" sx={{ mx: "auto" }}>
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
