import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./fonts.css";
import "./index.css";
import "../src/service/polyfills";
import ServiceFormPage from "./pages/ServiceFormPage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"VW Headline OT", Arial, sans-serif',
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter>
      <Routes>
        <Route path="/" element={<ServiceFormPage />} />
      </Routes>
    </HashRouter>
  </ThemeProvider>
);
