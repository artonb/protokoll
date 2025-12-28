export const formStyles = {
  page: { width: "100%", py: 2 },
  container: {
    width: "100%",
    maxWidth: 1500,
    mx: "auto",
    px: { xs: 1.5, sm: 2, md: 3 },
  },

  sectionStack: { spacing: 2 },

  vehicleGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
    gap: 1.5,
  },

  vehicleFieldProps: {
    fullWidth: true,
    size: "small" as const,
    variant: "outlined" as const,

    InputProps: {
      sx: {
        textTransform: "uppercase",
      },
    },
  },
} as const;
