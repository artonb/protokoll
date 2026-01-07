import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useAuth } from "../auth/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import {
  normalizeRegNr,
  subscribeMyDocuments,
  type ServiceEventDocumentWithId,
  deleteDocumentById,
} from "../service/documentsStore";
import { TEMPLATES } from "../service/templates";
import { buildEffectiveSections } from "../service/sectionUtils";
import { downloadPdf } from "../service/pdf";

import ServicePdfDocument from "./ServicePdfDocument";
import ServiceCertificatePdfDocument from "./ServiceCertificatePdfDocument";

type DocType = "protocol" | "certificate";

type ServiceEventGroup = {
  key: string;
  regNr: string;
  regNrNorm: string;
  modell?: string;
  templateId: string;
  serviceTitle: string;
  brand: ServiceEventDocumentWithId["brand"];
  date: string;
  header: ServiceEventDocumentWithId["header"];
  checks: ServiceEventDocumentWithId["checks"];
  rowValues: ServiceEventDocumentWithId["rowValues"];
  maintenanceComment: string;
  selectedExtraWorkIds: string[];
  performedBy?: ServiceEventDocumentWithId["performedBy"];
  createdAtSort: number;
  docs: Partial<Record<DocType, ServiceEventDocumentWithId>>;
};

function groupKey(d: ServiceEventDocumentWithId) {
  return `${d.regNrNorm}__${d.templateId}__${d.date}`;
}

export default function ProtocolsListPage() {
  const { user } = useAuth();
  const [docs, setDocs] = useState<ServiceEventDocumentWithId[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const initialQ = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") ?? "";
  }, [location.search]);

  const [regFilter, setRegFilter] = useState(initialQ);

  useEffect(() => {
    if (!initialQ.trim()) return;
    setRegFilter(initialQ);
    navigate("/protocols", { replace: true });
  }, [initialQ, navigate]);

  useEffect(() => {
    if (!user) return;
    return subscribeMyDocuments(user.uid, setDocs);
  }, [user]);

  const filtered = useMemo(() => {
    const f = normalizeRegNr(regFilter);
    if (!f) return docs;

    return docs.filter((d) => {
      const norm = d.regNrNorm?.trim()
        ? d.regNrNorm
        : normalizeRegNr(d.regNr ?? "");
      return norm.includes(f);
    });
  }, [docs, regFilter]);

  const groups = useMemo(() => {
    const map = new Map<string, ServiceEventGroup>();

    for (const d of filtered) {
      const key = groupKey(d);

      const template =
        TEMPLATES.find((t) => t.id === d.templateId) ?? TEMPLATES[0]!;
      const createdAtSort =
        typeof (d.createdAt as any)?.toMillis === "function"
          ? (d.createdAt as any).toMillis()
          : Date.now();

      const existing = map.get(key);
      if (!existing) {
        map.set(key, {
          key,
          regNr: d.regNr,
          regNrNorm: d.regNrNorm,
          modell: d.header?.modell,
          templateId: d.templateId,
          serviceTitle: template.serviceTitle,
          brand: d.brand,
          date: d.date,
          header: d.header,
          checks: d.checks,
          rowValues: d.rowValues,
          maintenanceComment: d.maintenanceComment,
          selectedExtraWorkIds: d.selectedExtraWorkIds,
          performedBy: d.performedBy,
          createdAtSort,
          docs: { [d.docType]: d },
        });
      } else {
        existing.createdAtSort = Math.max(
          existing.createdAtSort,
          createdAtSort
        );
        existing.docs[d.docType] = d;

        if (!existing.modell?.trim() && d.header?.modell?.trim())
          existing.modell = d.header.modell;
        if (!existing.performedBy && d.performedBy) {
          existing.performedBy = d.performedBy;
        }
      }
    }

    return Array.from(map.values()).sort(
      (a, b) => b.createdAtSort - a.createdAtSort
    );
  }, [filtered]);

  return (
    <Box sx={{ width: "100%", py: { xs: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1250, mx: "auto", px: { xs: 1.5, sm: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={800}>
            Historik
          </Typography>

          <TextField
            label="Filtrera på registreringsnr"
            value={regFilter}
            onChange={(e) => setRegFilter(e.target.value)}
            fullWidth
          />

          <Typography variant="caption" color="text.secondary">
            Totalt: {docs.length} / Visas: {filtered.length} / Händelser:{" "}
            {groups.length}
          </Typography>

          {groups.length === 0 ? (
            <Typography color="text.secondary">
              Inga dokument hittades.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {groups.map((g) => (
                <EventCard key={g.key} g={g} />
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

function EventCard({ g }: { g: ServiceEventGroup }) {
  const template = useMemo(
    () => TEMPLATES.find((t) => t.id === g.templateId) ?? TEMPLATES[0]!,
    [g.templateId]
  );

  const effectiveSections = useMemo(
    () =>
      buildEffectiveSections(
        template.sections,
        template.extraWorks,
        g.selectedExtraWorkIds
      ),
    [template, g.selectedExtraWorkIds]
  );

  const extraLabels = useMemo(() => {
    return (
      template.extraWorks
        ?.filter((x) => g.selectedExtraWorkIds.includes(x.id))
        .map((x) => x.label ?? "")
        .filter(Boolean) ?? []
    );
  }, [template.extraWorks, g.selectedExtraWorkIds]);

  const certificateLabels = useMemo(() => {
    return (
      template.extraWorks
        ?.filter((x) => g.selectedExtraWorkIds.includes(x.id))
        .filter((x) => x.showOnCertificate !== false)
        .map((x) => x.label ?? "")
        .filter(Boolean) ?? []
    );
  }, [template.extraWorks, g.selectedExtraWorkIds]);

  const basePdfData = useMemo(() => {
    return {
      title: "Serviceprotokoll",
      serviceTitle: template.serviceTitle,
      brand: g.brand,
      header: { ...g.header, datum: g.header.datum ?? "" },
      sections: effectiveSections.map((s) => ({ ...s, title: s.title ?? "" })),
      extraWorkLabels: extraLabels,
      checks: g.checks,
      rowValues: g.rowValues,
      note: g.maintenanceComment,
      performedBy: g.performedBy,
    };
  }, [template.serviceTitle, g, effectiveSections, extraLabels]);

  async function download(docType: DocType) {
    const safeReg = g.regNrNorm || "SERVICE";
    const filename =
      docType === "protocol"
        ? `${safeReg}_${g.templateId}_${g.date}.pdf`
        : `${safeReg}_${g.templateId}_${g.date}_servicebevis.pdf`;

    if (docType === "protocol") {
      await downloadPdf(<ServicePdfDocument data={basePdfData} />, filename);
    } else {
      await downloadPdf(
        <ServiceCertificatePdfDocument
          data={{ ...basePdfData, extraWorkLabels: certificateLabels }}
        />,
        filename
      );
    }
  }

  async function remove(docType: DocType) {
    const doc = g.docs[docType];
    if (!doc) return;

    const ok = window.confirm(
      `Ta bort ${
        docType === "protocol" ? "serviceprotokoll" : "servicebevis"
      } för ${g.regNr}?`
    );
    if (!ok) return;

    await deleteDocumentById(doc.id);
  }

  return (
    <Card
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack spacing={1.25}>
          {/* Header row: car info */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={0.5}
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight={800}>
              {g.regNr}
              {g.modell?.trim() ? ` - ${g.modell}` : ""}
              {" - "}
              {template.serviceTitle}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {g.date}
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <DocRow
              title="Serviceprotokoll"
              exists={Boolean(g.docs.protocol)}
              onDownload={() => download("protocol")}
              onDelete={() => remove("protocol")}
            />

            <DocRow
              title="Servicebevis"
              exists={Boolean(g.docs.certificate)}
              onDownload={() => download("certificate")}
              onDelete={() => remove("certificate")}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function DocRow({
  title,
  exists,
  onDownload,
  onDelete,
}: {
  title: string;
  exists: boolean;
  onDownload: () => void | Promise<void>;
  onDelete: () => void | Promise<void>;
}) {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 1,
        borderRadius: 2,
        bgcolor: exists ? "grey.50" : "action.disabledBackground",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={0}>
        <Typography fontWeight={700}>{title}</Typography>
        {!exists && (
          <Typography variant="caption" color="text.secondary">
            Ej skapad
          </Typography>
        )}
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          variant="contained"
          startIcon={<DownloadRoundedIcon />}
          onClick={onDownload}
          disabled={!exists}
          sx={{ borderRadius: 2 }}
        >
          Ladda ner
        </Button>

        <Button
          size="small"
          color="error"
          variant="outlined"
          startIcon={<DeleteRoundedIcon />}
          onClick={onDelete}
          disabled={!exists}
          sx={{ borderRadius: 2 }}
        >
          Ta bort
        </Button>
      </Stack>
    </Box>
  );
}
