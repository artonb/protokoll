import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./fonts.css";
import "./index.css";
import ServiceFormPage from "./pages/ServiceFormPage.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"VW Headline OT", Arial, sans-serif',
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServiceFormPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
