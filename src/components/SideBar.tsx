import * as React from "react";
import { Link } from "react-router-dom";
import { GlobalStyles, Avatar, Box, Button, Card, Divider, IconButton, Input, LinearProgress, List, ListItem, ListItemButton, listItemButtonClasses, ListItemContent, Typography, Sheet, Stack,      } from "@mui/joy";
import { SearchRounded, HomeRounded, AssignmentRounded, SupportRounded, SettingsRounded, CloseRounded, LogoutRounded, BrightnessAutoRounded, KeyboardArrowDown  } from "@mui/icons-material";

import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../../utils";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRounded />
        </IconButton>
        <Typography level="title-lg">Shoes Imports</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Input
        size="sm"
        startDecorator={<SearchRounded />}
        placeholder="Buscar"
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton>
              <HomeRounded />
              <ListItemContent>
                <Typography level="title-sm">Inicio</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* <ListItem>
            <ListItemButton>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

          {/* <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/messages/"
            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Mensagens</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem> */}

          {/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRounded />
                  <ListItemContent>
                    <Typography level="title-sm">Atendimento</Typography>
                  </ListItemContent>
                  <KeyboardArrowDown
                    sx={[
                      open
                        ? {
                            transform: "rotate(180deg)",
                          }
                        : {
                            transform: "none",
                          },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>em construção...</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}

          {/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ShoppingCartRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Pedidos</Typography>
                  </ListItemContent>
                  <KeyboardArrowDown
                    sx={[
                      open
                        ? {
                            transform: "rotate(180deg)",
                          }
                        : {
                            transform: "none",
                          },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/profile-dashboard/"
                  >
                    My profile
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Create a new user</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Roles & permission</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRounded />
                  <ListItemContent>
                    <Typography level="title-sm">Catálogo</Typography>
                  </ListItemContent>
                  <KeyboardArrowDown
                    sx={[
                      open
                        ? {
                            transform: "rotate(180deg)",
                          }
                        : {
                            transform: "none",
                          },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton component={Link} to="/produtos">
                    Produtos
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} to="/variacoes">
                    Variações de produtos
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} to="/marcas">
                    Marcas
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} to="/categorias">
                    Categorias
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} to="/cores">
                    Cores
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} to="/tamanhos">
                    Tamanhos
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} to="/tamanhos">
                    Estoque
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} to="/clientes">
                    Clientes
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          {/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Usuários</Typography>
                  </ListItemContent>
                  <KeyboardArrowDown
                    sx={[
                      open
                        ? {
                            transform: "rotate(180deg)",
                          }
                        : {
                            transform: "none",
                          },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/profile-dashboard/"
                  >
                    My profile
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Create a new user</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Roles & permission</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}
        </List>
        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRounded />
              Ajuda
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRounded />
              Configurações
            </ListItemButton>
          </ListItem>
        </List>
        <Card
          invertedColors
          variant="soft"
          color="warning"
          size="sm"
          sx={{ boxShadow: "none" }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography level="title-sm">Used space</Typography>
            <IconButton size="sm">
              <CloseRounded />
            </IconButton>
          </Stack>
          <Typography level="body-xs">
            Your team has used 80% of your available space. Need more?
          </Typography>
          <LinearProgress
            variant="outlined"
            value={80}
            determinate
            sx={{ my: 1 }}
          />
          <Button size="sm" variant="solid">
            Upgrade plan
          </Button>
        </Card>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Usuário teste</Typography>
          <Typography level="body-xs">usuario@test.com</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRounded />
        </IconButton>
      </Box>
    </Sheet>
  );
}
