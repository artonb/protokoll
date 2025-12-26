import { Box, Checkbox, TableCell, TableRow, TextField } from "@mui/material";
import type { CheckState, ServiceRow } from "../service/types";

type Props = {
  row: ServiceRow;
  value: CheckState;
  onChange: (next: CheckState) => void;

  rowValue: string;
  onRowValueChange: (next: string) => void;
};

export default function ChecklistRow({
  row,
  value,
  onChange,
  rowValue,
  onRowValueChange,
}: Props) {
  return (
    <TableRow sx={{ borderBottom: "1px solid #0075AD" }}>
      <TableCell
        sx={{
          p: 1,
          fontWeight: 600,
          whiteSpace: "normal",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Box component="span" sx={{ flex: 1 }}>
            {row.text}
          </Box>

          {row.valueBox && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <TextField
                size="small"
                value={rowValue}
                onChange={(e) => onRowValueChange(e.target.value)}
                inputProps={{ inputMode: "decimal" }}
                sx={{ width: row.valueBox.width ?? 70 }}
                slotProps={{
                  input: {
                    sx: {
                      height: row.valueBox.height ?? 28,
                      padding: "0 6px",
                      boxSizing: "border-box",
                    },
                  },
                }}
              />

              {row.valueBox.placeholder && (
                <Box component="span" sx={{ fontSize: 12, opacity: 0.8 }}>
                  {row.valueBox.placeholder}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </TableCell>

      {(["ok", "inte_ok", "atgardad"] as const).map((state) => (
        <TableCell key={state} align="center" sx={{ width: 52, p: 0 }}>
          <Checkbox
            size="small"
            checked={value === state}
            onChange={() => onChange(value === state ? null : state)}
          />
        </TableCell>
      ))}
    </TableRow>
  );
}
