import { Box, TextField } from "@mui/material";
import type { HeaderState } from "../service/types";
import { formStyles as s } from "../service/formStyles";

type Props = {
  value: HeaderState;
  onChange: (next: HeaderState) => void;
};

export default function VehicleInfoForm({ value, onChange }: Props) {
  return (
    <>
      <Box sx={s.vehicleGrid}>
        <TextField
          {...s.vehicleFieldProps}
          label="Ordernr"
          value={value.orderNr}
          onChange={(e) => onChange({ ...value, orderNr: e.target.value })}
        />
        <TextField
          {...s.vehicleFieldProps}
          label="F-typ"
          value={value.modellKod}
          onChange={(e) => onChange({ ...value, modellKod: e.target.value })}
        />
        <TextField
          {...s.vehicleFieldProps}
          label="Registreringsnr"
          value={value.regNr}
          onChange={(e) => onChange({ ...value, regNr: e.target.value })}
        />
        <TextField
          {...s.vehicleFieldProps}
          label="Leveransdatum"
          value={value.registrering}
          onChange={(e) => onChange({ ...value, registrering: e.target.value })}
        />

        <TextField
          {...s.vehicleFieldProps}
          label="Chassinummer"
          value={value.chassiNr}
          onChange={(e) => onChange({ ...value, chassiNr: e.target.value })}
        />
        <TextField
          {...s.vehicleFieldProps}
          label="Motorkod"
          value={value.mmb}
          onChange={(e) => onChange({ ...value, mmb: e.target.value })}
        />
        <TextField
          {...s.vehicleFieldProps}
          label="Mätarställning"
          value={value.matarstallning}
          onChange={(e) =>
            onChange({ ...value, matarstallning: e.target.value })
          }
        />
        <TextField
          {...s.vehicleFieldProps}
          label="Servicerådgivare"
          value={value.serviceRadgivare}
          onChange={(e) =>
            onChange({ ...value, serviceRadgivare: e.target.value })
          }
        />

        <TextField
          {...s.vehicleFieldProps}
          label="Modell"
          value={value.modell}
          onChange={(e) => onChange({ ...value, modell: e.target.value })}
        />
        <TextField
          {...s.vehicleFieldProps}
          label="Växellådskod"
          value={value.vmb}
          onChange={(e) => onChange({ ...value, vmb: e.target.value })}
        />
        <TextField
          {...s.vehicleFieldProps}
          label="Årsmodell"
          value={value.arsmodell}
          onChange={(e) => onChange({ ...value, arsmodell: e.target.value })}
        />
        <TextField
          {...s.vehicleFieldProps}
          label="Datum"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={value.datum}
          onChange={(e) => onChange({ ...value, datum: e.target.value })}
        />
      </Box>
    </>
  );
}
