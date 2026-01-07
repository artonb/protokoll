import React from "react";
import { Box } from "@mui/material";
import AppNavbar from "../navbar/AppNavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppNavbar />
      {children}
    </Box>
  );
}
