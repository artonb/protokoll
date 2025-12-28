import { Box, TextField } from "@mui/material";
import type { HeaderState } from "../service/types";
import { formStyles as s } from "../service/formStyles";

type Props = {
  value: HeaderState;
  onChange: (next: HeaderState) => void;
};

export default function VehicleInfoForm({ value, onChange }: Props) {
  const handleUpper =
    (key: keyof HeaderState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({
        ...value,
        [key]: e.target.value.toUpperCase(),
      });
  return (
    <Box sx={s.vehicleGrid}>
      <TextField
        {...s.vehicleFieldProps}
        label="Ordernr"
        value={value.orderNr ?? ""}
        onChange={(e) => onChange({ ...value, orderNr: e.target.value })}
      />

      <TextField
        {...s.vehicleFieldProps}
        label="F-typ"
        value={value.modellKod ?? ""}
        onChange={handleUpper("modellKod")}
        placeholder="t.ex. 5G146Y"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Registreringsnr"
        value={value.regNr ?? ""}
        onChange={handleUpper("regNr")}
        placeholder="t.ex. OKR463"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Leveransdatum"
        value={value.registrering ?? ""}
        onChange={(e) => onChange({ ...value, registrering: e.target.value })}
        placeholder="t.ex. 2017-01-03"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Chassinummer"
        value={value.chassiNr ?? ""}
        onChange={handleUpper("chassiNr")}
        placeholder="t.ex. WVWZZZAUZHW157321"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Motorkod"
        value={value.mmb ?? ""}
        onChange={handleUpper("mmb")}
        placeholder="t.ex. CRLB"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Mätarställning"
        value={value.matarstallning ?? ""}
        onChange={(e) => onChange({ ...value, matarstallning: e.target.value })}
        placeholder="t.ex. 160000"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Servicerådgivare"
        value={value.serviceRadgivare ?? ""}
        onChange={(e) =>
          onChange({ ...value, serviceRadgivare: e.target.value })
        }
        placeholder="t.ex. Arton/Arber"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Modell"
        value={value.modell ?? ""}
        onChange={(e) => onChange({ ...value, modell: e.target.value })}
        placeholder="t.ex. Golf 2.0TDI"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Växellådskod"
        value={value.vmb ?? ""}
        onChange={handleUpper("vmb")}
        placeholder="t.ex. SGG"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Årsmodell"
        value={value.arsmodell ?? ""}
        onChange={(e) => onChange({ ...value, arsmodell: e.target.value })}
        placeholder="t.ex. 2017"
      />

      <TextField
        {...s.vehicleFieldProps}
        label="Datum"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={value.datum ?? ""}
        onChange={(e) => onChange({ ...value, datum: e.target.value })}
      />
    </Box>
  );
}
