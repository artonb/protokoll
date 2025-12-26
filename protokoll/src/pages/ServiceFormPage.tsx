import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import ServicePdfDocument, { type PdfData } from "./ServicePdfDocument";
import { downloadPdf } from "../service/pdf";
import ServiceChecklistTable from "../components/ServiceChecklistTable";
import type { CheckState, HeaderState } from "../service/types";
import { TEMPLATES } from "../service/templates";
import ExtraWorksSelect from "../components/ExtraWorksSelect";
import VehicleInfoForm from "../components/VehicleInfoForm";
import { buildEffectiveSections, allowedRowIds } from "../service/sectionUtils";

const initialHeader: HeaderState = {
  orderNr: "",
  modellKod: "5G146Y",
  regNr: "",
  registrering: "2017-01-03",
  chassiNr: "WVWZZZAUZHW157321",
  mmb: "CRLB",
  matarstallning: "160000",
  serviceRadgivare: "",
  modell: "Golf 2.0 HLBM 110fTDID6F",
  vmb: "SGG",
  arsmodell: "2017",
  datum: new Date().toISOString().slice(0, 10),
};

type Brand = "volkswagen" | "audi" | "seat" | "skoda";

const BRANDS: { id: Brand; label: string }[] = [
  { id: "volkswagen", label: "Volkswagen" },
  { id: "audi", label: "Audi" },
  { id: "seat", label: "Seat" },
  { id: "skoda", label: "Skoda" },
];

export default function ServiceFormPage() {
  const [templateId, setTemplateId] = useState<string>(TEMPLATES[0]!.id);
  const [selectedExtraWorkIds, setSelectedExtraWorkIds] = useState<string[]>(
    []
  );
  const [checks, setChecks] = useState<Record<string, CheckState>>({});
  const [rowValues, setRowValues] = useState<Record<string, string>>({});
  const [header, setHeader] = useState<HeaderState>(initialHeader);
  const [isDownloading, setIsDownloading] = useState(false);
  const [maintenanceComment, setMaintenanceComment] = useState<string>("");
  const [brand, setBrand] = useState<Brand>("volkswagen");

  const template = useMemo(
    () => TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0]!,
    [templateId]
  );

  const effectiveSections = useMemo(
    () =>
      buildEffectiveSections(
        template.sections,
        template.extraWorks,
        selectedExtraWorkIds
      ),
    [template.sections, template.extraWorks, selectedExtraWorkIds]
  );

  useEffect(() => {
    const allowed = allowedRowIds(effectiveSections);

    setChecks((prev) => {
      const next: Record<string, CheckState> = {};
      for (const k of Object.keys(prev)) {
        if (allowed.has(k)) next[k] = prev[k] ?? null;
      }
      return next;
    });

    setRowValues((prev) => {
      const next: Record<string, string> = {};
      for (const k of Object.keys(prev)) {
        if (allowed.has(k)) next[k] = prev[k] ?? "";
      }
      return next;
    });
  }, [effectiveSections]);

  useEffect(() => {
    setSelectedExtraWorkIds([]);
    setMaintenanceComment("");
    setChecks({});
    setRowValues({});
  }, [templateId]);

  const pdfData: PdfData = useMemo(
    () => ({
      title: "Serviceprotokoll",
      serviceTitle: template.serviceTitle,
      brand,
      header: {
        ...header,
        datum: header.datum ? formatDateSv(header.datum) : "",
      },
      sections: effectiveSections.map((s) => ({
        ...s,
        title: s.title ?? "",
      })),
      checks,
      rowValues,
      note: maintenanceComment,
    }),
    [
      template.serviceTitle,
      brand,
      header,
      effectiveSections,
      checks,
      rowValues,
      maintenanceComment,
    ]
  );

  const canDownload = Boolean(header.regNr?.trim()) && !isDownloading;

  async function onDownload() {
    try {
      setIsDownloading(true);
      const safeReg = (header.regNr || "service").replace(/\s+/g, "_");
      const safeDate = header.datum || new Date().toISOString().slice(0, 10);
      const filename = `${safeReg}_${template.id}_${safeDate}.pdf`;
      await downloadPdf(<ServicePdfDocument data={pdfData} />, filename);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <Box sx={{ width: "100%", py: { xs: 2, md: 3 }, overflowX: "hidden" }}>
      <Box
        sx={{
          maxWidth: 1250,
          width: "100%",
          mx: "auto",
          px: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        <Stack spacing={2.25}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <DescriptionRoundedIcon fontSize="large" />
            <Typography variant="h4" fontWeight={800}>
              Serviceprotokoll
            </Typography>
          </Stack>

          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
              <Stack spacing={2}>
                <SectionTitle
                  icon={<TuneRoundedIcon fontSize="large" />}
                  title="Servicetyp"
                />

                <FormControl fullWidth>
                  <InputLabel>Märke</InputLabel>
                  <Select
                    label="Märke"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value as Brand)}
                  >
                    {BRANDS.map((b) => (
                      <MenuItem key={b.id} value={b.id}>
                        {b.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Servicetyp</InputLabel>
                  <Select
                    label="Servicetyp"
                    value={templateId}
                    onChange={(e) => setTemplateId(String(e.target.value))}
                  >
                    {TEMPLATES.map((t) => (
                      <MenuItem key={t.id} value={t.id}>
                        {t.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Divider />

                <SectionTitle
                  icon={<DirectionsCarRoundedIcon fontSize="large" />}
                  title="Fordonsdata"
                />

                <VehicleInfoForm value={header} onChange={setHeader} />
              </Stack>
            </CardContent>
          </Card>

          {(template.extraWorks?.length ?? 0) > 0 && (
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                <Stack spacing={1.5}>
                  <SectionTitle title="Tilläggsarbeten" />
                  <ExtraWorksSelect
                    options={template.extraWorks!}
                    value={selectedExtraWorkIds}
                    onChange={setSelectedExtraWorkIds}
                  />
                </Stack>
              </CardContent>
            </Card>
          )}

          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
              <Stack spacing={1.75}>
                <Stack spacing={0.25}>
                  <Typography variant="h5" fontWeight={800}>
                    {template.serviceTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fyll i checklistan och ladda ner PDF när du är klar.
                  </Typography>
                </Stack>

                <ServiceChecklistTable
                  sections={effectiveSections}
                  checks={checks}
                  onChecksChange={setChecks}
                  rowValues={rowValues}
                  onRowValuesChange={setRowValues}
                />

                <TextField
                  label="Underhållskommentar"
                  value={maintenanceComment}
                  onChange={(e) => setMaintenanceComment(e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                  placeholder="Skriv en kommentar om underhåll, avvikelser, åtgärder..."
                />

                <Divider />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  justifyContent="flex-end"
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                  <Button
                    variant="contained"
                    onClick={onDownload}
                    disabled={!canDownload}
                    startIcon={<DownloadRoundedIcon />}
                    size="large"
                    sx={{ borderRadius: 2 }}
                  >
                    {isDownloading ? "Skapar PDF..." : "Ladda ner PDF"}
                  </Button>

                  {!header.regNr?.trim() && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: { sm: 1 } }}
                    >
                      Fyll i registreringsnr för att ladda ner PDF
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

function SectionTitle({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon ? (
        <Box
          sx={{
            color: "text.secondary",
            display: "grid",
            placeItems: "center",
          }}
        >
          {icon}
        </Box>
      ) : null}
      <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: 0.2 }}>
        {title}
      </Typography>
    </Stack>
  );
}

function formatDateSv(yyyyMmDd: string): string {
  const [y, m, d] = yyyyMmDd.split("-");
  if (!y || !m || !d) return yyyyMmDd;
  return `${d}.${m}.${y}`;
}
