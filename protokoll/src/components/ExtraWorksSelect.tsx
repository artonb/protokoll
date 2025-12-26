import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import type { ExtraWorkOption, ServiceRow } from "../service/types";

type Props = {
  options: ExtraWorkOption[];
  value: string[];
  onChange: (ids: string[]) => void;
};

function legacyRows(o: ExtraWorkOption): ServiceRow[] {
  if (Array.isArray(o.rows) && o.rows.length > 0) return o.rows;
  if (o.row) return [o.row];
  return [];
}

function getAllRows(o: ExtraWorkOption): ServiceRow[] {
  if (Array.isArray(o.add) && o.add.length > 0) {
    return o.add.flatMap((x) => x.rows ?? []);
  }
  return legacyRows(o);
}

function getPrimaryLabel(o: ExtraWorkOption) {
  if (o.label?.trim()) return o.label.trim();

  const rows = getAllRows(o);
  if (rows.length === 1) return rows[0]!.text;
  if (rows.length > 1) return `${rows[0]!.text} + ${rows.length - 1} till`;
  return o.id;
}

export default function ExtraWorksSelect({ options, value, onChange }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1.5}>
          <FormControl fullWidth>
            <InputLabel id="extra-works-label">Välj tilläggsarbeten</InputLabel>

            <Select
              labelId="extra-works-label"
              multiple
              label="Välj tilläggsarbeten"
              value={value}
              onChange={(e) => {
                const next =
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : (e.target.value as string[]);
                onChange(next);
              }}
              renderValue={(selected) =>
                options
                  .filter((o) => selected.includes(o.id))
                  .map(getPrimaryLabel)
                  .join(", ")
              }
            >
              {options.map((o) => (
                <MenuItem key={o.id} value={o.id}>
                  <Checkbox checked={value.includes(o.id)} />
                  <ListItemText primary={getPrimaryLabel(o)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  );
}
