import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { PdfData } from "./ServicePdfDocument";
import on from "../assets/tillagg.png";
import { getBrandFontFamily } from "../service/pdf";

const BRAND_LABELS: Record<PdfData["brand"], string> = {
  volkswagen: "Volkswagen",
  audi: "Audi",
  seat: "Seat",
  skoda: "ŠKODA",
};

function formatIsoDate(value?: string) {
  if (!value) return "";
  return value.slice(0, 10);
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 53,
    paddingHorizontal: 62,
    fontSize: 10,
    fontFamily: "VW Headline OT",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { flexDirection: "column", gap: 2 },
  brandLine: { fontSize: 14, fontWeight: "900" },
  title: { fontSize: 13 },
  subTitle: { marginTop: 44, fontSize: 12, fontWeight: "600" },

  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    paddingTop: 2,
    marginBottom: 3,
    paddingLeft: 3,
  },

  sectionTitleWrapper: {
    width: "45%",
    borderTopWidth: 2.2,
    borderTopColor: "#111",
    marginTop: 3,
  },

  table: { borderTopWidth: 0.15, borderTopColor: "#111" },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.15,
    borderBottomColor: "#111",
    paddingVertical: 3,
  },
  cellLabel: { width: 140, paddingLeft: 11, fontSize: 8 },
  cellValue: { flex: 1, fontSize: 8, paddingLeft: 84 },

  extrasRow: {
    flexDirection: "row",
    borderBottomWidth: 0.15,
    borderBottomColor: "#111",
    paddingVertical: 3,
  },
  extrasLabel: { width: 140, paddingLeft: 11, fontSize: 8 },
  extrasList: { flex: 1, gap: 7, paddingRight: 6, paddingLeft: 84 },
  extraItem: {
    flexDirection: "row",
    gap: 4,
    fontSize: 8,
  },
  checkIcon: { width: 8, height: 8 },

  footerRow: {
    flexDirection: "row",
    paddingVertical: 3,
  },
});

export default function ServiceCertificatePdfDocument({
  data,
}: {
  data: PdfData;
}) {
  const h = data.header;
  const brandFont = getBrandFontFamily(data.brand);
  const extraLabels = data.extraWorkLabels ?? [];

  return (
    <Document>
      <Page size="A4" style={[styles.page, { fontFamily: brandFont }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.brandLine}>
              Er{"\u00A0\u00A0"}
              {BRAND_LABELS[data.brand]}
            </Text>
            <Text style={styles.title}>Servicebevis</Text>
            <Text style={styles.subTitle}>Separatbevis</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.section}>
            <View style={styles.sectionTitleWrapper}>
              <Text style={styles.sectionTitle}>Fordonsdata</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cellLabel}>Chassinummer</Text>
              <Text style={styles.cellValue}>{h.chassiNr ?? ""}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellLabel}>Typbeteckning</Text>
              <Text style={styles.cellValue}>{h.modell ?? ""}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellLabel}>Leveransdatum</Text>
              <Text style={styles.cellValue}>{h.registrering ?? ""}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionTitleWrapper}>
            <Text style={styles.sectionTitle}>{data.serviceTitle}</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cellLabel}>Datum</Text>
              <Text style={styles.cellValue}>{formatIsoDate(h.datum)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellLabel}>Körsträcka</Text>
              <Text style={styles.cellValue}>
                {h.matarstallning ? `${h.matarstallning}\u00A0km` : ""}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellLabel}>Ordernummer</Text>
              <Text style={styles.cellValue}>{h.orderNr ?? ""}</Text>
            </View>

            <View style={styles.extrasRow}>
              <Text style={styles.extrasLabel}>Utförda tilläggsarbeten</Text>
              <View style={styles.extrasList}>
                {extraLabels.length === 0 ? (
                  <Text> </Text>
                ) : (
                  extraLabels.map((label, idx) => (
                    <View key={`${idx}-${label}`} style={styles.extraItem}>
                      <Image src={on} style={styles.checkIcon} />
                      <Text>{label}</Text>
                    </View>
                  ))
                )}
              </View>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.cellLabel}>Utfört av</Text>
              <View style={styles.cellValue}>
                <Text>Malmoretrofit AB</Text>
                <Text style={{ marginTop: 6 }}>Murmansgatan 122</Text>
                <Text style={{ marginTop: 6 }}>212 25 Malmö</Text>
              </View>
            </View>

            <View
              style={{
                ...styles.footerRow,
                borderBottomWidth: 0.15,
                borderBottomColor: "#111",
              }}
            >
              <Text
                style={{
                  ...styles.cellLabel,
                  width: 240,
                }}
                wrap={false}
              >
                Auktoriserad {BRAND_LABELS[data.brand]} servicepartner
              </Text>
              <Text style={{ flex: 1, fontSize: 8, paddingLeft: -16 }}>
                Nej
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
