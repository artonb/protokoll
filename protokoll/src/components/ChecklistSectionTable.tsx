import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { CheckState, ServiceSection } from "../service/types";
import ChecklistRow from "./ChecklistRow";

type Props = {
  section: ServiceSection;
  checks: Record<string, CheckState>;
  onChecksChange: (next: Record<string, CheckState>) => void;
  rowValues: Record<string, string>;
  onRowValuesChange: (next: Record<string, string>) => void;
};

export default function ChecklistSectionTable({
  section,
  checks,
  onChecksChange,
  rowValues,
  onRowValuesChange,
}: Props) {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Table
        size="small"
        sx={{
          border: "1px solid #111",
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow sx={{ borderBottom: "2px solid #0075AD" }}>
            <TableCell
              sx={{
                fontWeight: 800,
                p: 1,
              }}
            >
              {section.title}
            </TableCell>

            <TableCell align="center" sx={{ width: 52, p: 0.5 }}>
              <Typography variant="caption" fontWeight={700}>
                Ok
              </Typography>
            </TableCell>

            <TableCell align="center" sx={{ width: 52, p: 0.5 }}>
              <Typography variant="caption" fontWeight={700}>
                Inte
              </Typography>
            </TableCell>

            <TableCell align="center" sx={{ width: 52, p: 0.5 }}>
              <Typography variant="caption" fontWeight={700}>
                Åtg
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {section.rows.map((row) => (
            <ChecklistRow
              key={row.id}
              row={row}
              value={checks[row.id] ?? null}
              onChange={(nextState) =>
                onChecksChange({ ...checks, [row.id]: nextState })
              }
              rowValue={rowValues[row.id] ?? ""}
              onRowValueChange={(nextText) =>
                onRowValuesChange({ ...rowValues, [row.id]: nextText })
              }
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
