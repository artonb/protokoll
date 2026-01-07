import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./fonts.css";
import "./index.css";
import "../src/service/polyfills";
import ServiceFormPage from "./pages/ServiceFormPage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "./auth/AuthProvider";
import ProtocolsListPage from "./pages/ProtocolsListPage";
import { RequireAuth } from "./auth/RequireAuth";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/AppLayout";

const theme = createTheme({
  typography: {
    fontFamily: '"VW Headline Web", Arial, sans-serif',
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <AppLayout>
                  <ServiceFormPage />
                </AppLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/protocols"
            element={
              <RequireAuth>
                <AppLayout>
                  <ProtocolsListPage />
                </AppLayout>
              </RequireAuth>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  </ThemeProvider>
);
