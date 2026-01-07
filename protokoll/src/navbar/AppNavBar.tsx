import { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import logo from "../assets/logo-nobk.png";

import { useAuth } from "../auth/AuthProvider";
import { signOutUser } from "../auth/auth";

const MAX_W = 1250;

function useActiveTab() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/protocols")) return "protocols";
  return "form";
}

function initials(email?: string | null) {
  if (!email) return "?";
  const name = email.split("@")[0] ?? "";
  return (name.slice(0, 2) || "?").toUpperCase();
}

export default function AppNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const active = useActiveTab();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // < 900px

  // User menu (avatar)
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const userMenuOpen = Boolean(userAnchorEl);

  // Mobile nav menu (hamburger)
  const [navAnchorEl, setNavAnchorEl] = useState<null | HTMLElement>(null);
  const navMenuOpen = Boolean(navAnchorEl);

  // Search state synced to URL
  const location = useLocation();
  const url = useMemo(() => new URL(window.location.href), [location.key]);
  const currentQ = url.searchParams.get("q") ?? "";
  const [q, setQ] = useState(currentQ);

  // Mobile: toggle search row
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    setQ(currentQ);
  }, [currentQ]);

  if (!user) return null;

  async function onLogout() {
    await signOutUser();
    navigate("/login", { replace: true });
  }

  function goToProtocolsWithQuery(nextQ: string) {
    const search = nextQ.trim() ? `?q=${encodeURIComponent(nextQ.trim())}` : "";
    navigate(`/protocols${search}`);
  }

  function closeAllMenus() {
    setUserAnchorEl(null);
    setNavAnchorEl(null);
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Container
        maxWidth={false}
        sx={{ px: { xs: 1, sm: 2 }, backgroundColor: "#eae0c0" }}
      >
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                maxWidth: MAX_W,
                mx: "auto",
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: 0,
              }}
            >
              {/* Logo (click to home) */}
              <Box
                component="button"
                onClick={() => navigate("/")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
                aria-label="Gå till skapa"
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Malmoretrofit"
                  sx={{
                    height: { xs: 32, sm: 38 },
                    width: "auto",
                    display: "block",
                  }}
                />
              </Box>

              {/* Desktop tabs */}
              {!isMobile && (
                <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
                  <Button
                    component={NavLink}
                    to="/"
                    startIcon={<DescriptionRoundedIcon />}
                    variant={active === "form" ? "contained" : "text"}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      color: "black",
                    }}
                  >
                    Skapa
                  </Button>

                  <Button
                    component={NavLink}
                    to="/protocols"
                    startIcon={<HistoryRoundedIcon />}
                    variant={active === "protocols" ? "contained" : "text"}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      color: "black",
                    }}
                  >
                    Historik
                  </Button>
                </Stack>
              )}

              <Box sx={{ flex: 1, minWidth: 0 }} />

              {/* Desktop search */}
              {!isMobile && (
                <Box sx={{ width: 320 }}>
                  <TextField
                    size="small"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") goToProtocolsWithQuery(q);
                    }}
                    placeholder="Sök regnr i historik…"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: q ? (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setQ("");
                              goToProtocolsWithQuery("");
                            }}
                            aria-label="clear"
                          >
                            <ClearRoundedIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                    }}
                  />
                </Box>
              )}

              {/* Right actions */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {/* Mobile: search toggle button */}
                {isMobile && (
                  <IconButton
                    aria-label="Sök"
                    onClick={() => setMobileSearchOpen((s) => !s)}
                  >
                    <SearchRoundedIcon />
                  </IconButton>
                )}

                {/* Mobile: hamburger */}
                {isMobile && (
                  <>
                    <IconButton
                      aria-label="Meny"
                      onClick={(e) => setNavAnchorEl(e.currentTarget)}
                    >
                      <MenuRoundedIcon />
                    </IconButton>

                    <Menu
                      anchorEl={navAnchorEl}
                      open={navMenuOpen}
                      onClose={() => setNavAnchorEl(null)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem
                        onClick={() => {
                          closeAllMenus();
                          navigate("/");
                        }}
                      >
                        <DescriptionRoundedIcon
                          fontSize="small"
                          style={{ marginRight: 10 }}
                        />
                        Skapa
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          closeAllMenus();
                          navigate("/protocols");
                        }}
                      >
                        <HistoryRoundedIcon
                          fontSize="small"
                          style={{ marginRight: 10 }}
                        />
                        Historik
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        onClick={async () => {
                          closeAllMenus();
                          await onLogout();
                        }}
                      >
                        <LogoutRoundedIcon
                          fontSize="small"
                          style={{ marginRight: 10 }}
                        />
                        Logga ut
                      </MenuItem>
                    </Menu>
                  </>
                )}

                {/* Desktop: avatar menu */}
                {!isMobile && (
                  <>
                    <Tooltip title="Konto">
                      <IconButton
                        onClick={(e) => setUserAnchorEl(e.currentTarget)}
                        sx={{ p: 0.5 }}
                      >
                        <Avatar
                          sx={{
                            width: 45,
                            height: 45,
                            fontWeight: 800,
                            color: "#eae0c0",
                            backgroundColor: "#1976d2",
                          }}
                        >
                          {initials(user.email)}
                        </Avatar>
                      </IconButton>
                    </Tooltip>

                    <Menu
                      anchorEl={userAnchorEl}
                      open={userMenuOpen}
                      onClose={() => setUserAnchorEl(null)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <Box sx={{ px: 2, py: 1.25 }}>
                        <Typography fontWeight={800}>Inloggad</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>

                      <Divider />

                      <MenuItem
                        onClick={async () => {
                          closeAllMenus();
                          await onLogout();
                        }}
                      >
                        <LogoutRoundedIcon
                          fontSize="small"
                          style={{ marginRight: 10 }}
                        />
                        Logga ut
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Box>

            {/* Mobile search row */}
            {isMobile && mobileSearchOpen && (
              <Box sx={{ maxWidth: MAX_W, mx: "auto", mt: 1, pb: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    size="small"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") goToProtocolsWithQuery(q);
                    }}
                    placeholder="Sök regnr…"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: q ? (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setQ("");
                              goToProtocolsWithQuery("");
                            }}
                            aria-label="clear"
                          >
                            <ClearRoundedIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => goToProtocolsWithQuery(q)}
                    sx={{ borderRadius: 2, whiteSpace: "nowrap" }}
                  >
                    Sök
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
