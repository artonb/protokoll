import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { getBrandLogoConfig } from "../service/logoUtils";
import off from "../assets/checkbox_off.png";
import on from "../assets/checkbox_on.png";
import type { ServiceRow } from "../service/types";
import "../service/fonts";

const COL_LEFT = 39;
const COL_OK = 73;
const COL_INTE = 28;
const COL_ATG = 44;
const BLUE = "#0075AD";

const OUTER_BORDER = 1.2;
const OUTER_COLOR = "#111";

const OUTER_LR = {
  borderLeftWidth: OUTER_BORDER,
  borderLeftColor: OUTER_COLOR,
  borderRightWidth: OUTER_BORDER,
  borderRightColor: OUTER_COLOR,
};

const OUTER_TOP = {
  borderTopWidth: OUTER_BORDER,
  borderTopColor: OUTER_COLOR,
};

const OUTER_BOTTOM = {
  borderBottomWidth: OUTER_BORDER,
  borderBottomColor: OUTER_COLOR,
};

const ROW_DIVIDER_TOP = { height: 0.125, backgroundColor: BLUE };
const ROW_DIVIDER_BOTTOM = { height: 0.125, backgroundColor: BLUE };

export type CheckState = "ok" | "inte_ok" | "atgardad" | null;

export type HeaderData = {
  orderNr?: string;
  modellKod?: string;
  regNr: string;
  registrering?: string;
  chassiNr?: string;
  mmb?: string;
  matarstallning: string;
  serviceRadgivare?: string;
  modell?: string;
  vmb?: string;
  arsmodell?: string;
  datum: string;
};

export type ServiceSection = { id: string; title: string; rows: ServiceRow[] };

export type Brand = "volkswagen" | "audi" | "seat" | "skoda";

export type PdfData = {
  title: string;
  serviceTitle: string;
  brand: Brand;
  header: HeaderData;
  sections: ServiceSection[];
  extraWorkLabels?: string[];
  checks: Record<string, CheckState>;
  rowValues: Record<string, string>;
  note?: string;
};

const styles = StyleSheet.create({
  col: { gap: 6 },
  colCol1: { flexBasis: "32%" },
  colCol2: { flexBasis: "18%" },
  colCol3: { flexBasis: "23%" },
  colCol4: { flexBasis: "20%" },
  field: { flexDirection: "column", alignItems: "flex-start", gap: 2 },
  label: {
    marginLeft: 2,
    width: "100%",
    fontSize: 9.5,
    fontWeight: "bold",
  },
  valueBox: {
    width: "100%",
    borderWidth: 0.35,
    borderColor: "#111",
    padding: 1,
    minHeight: 15,
  },
  value: { fontSize: 9.5 },
  extraBox: {
    borderWidth: 1.2,
    borderColor: "#111",
    marginHorizontal: 4,
    marginBottom: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 6,
  },
  extraTitle: {
    fontSize: 11.4,
    fontWeight: "bold",
    marginBottom: 4,
  },
  extraRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  valueBox2: {
    borderWidth: 0.6,
    borderColor: "#111",
    minHeight: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  valueBoxText: {
    fontSize: 9.5,
  },
  valueUnit: {
    fontSize: 9,
    marginLeft: 4,
  },
});

function isChecked(value: CheckState, target: Exclude<CheckState, null>) {
  return value === target;
}

function CheckCell({ checked }: { checked: boolean }) {
  return (
    <View>
      <Image src={checked ? on : off} style={{ width: 10, height: 10 }} />
    </View>
  );
}

function centerInWidth(s: string, width: number) {
  const raw = s.trim().slice(0, width);
  const len = raw.length;
  if (len >= width) return raw;

  const totalPad = width - len;
  const left = Math.floor(totalPad / 2);
  const right = totalPad - left;

  return " ".repeat(left) + raw + " ".repeat(right);
}

function InlineBox({ value, width = 8 }: { value?: string; width?: number }) {
  const v = value?.trim() ?? "";
  const content = v ? centerInWidth(v, width) : " ".repeat(width);
  return <Text style={{ fontSize: 11.4 }}>[{content}]</Text>;
}

export default function ServicePdfDocument({ data }: { data: PdfData }) {
  const h = data.header;
  const logo = getBrandLogoConfig(data.brand);

  return (
    <Document>
      <Page
        size="A4"
        style={{ padding: 24, fontSize: 9.5, fontFamily: "VW Headline OT" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            borderWidth: 1.2,
            borderColor: "#111",
            paddingTop: 4,
            paddingBottom: 6,
            paddingHorizontal: 8,
            marginTop: 46,
            marginHorizontal: 4,
            marginBottom: 12,
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              flex: 1,
              marginLeft: -135,
              marginTop: 7,
              marginBottom: 7,
            }}
          >
            {data.title}
          </Text>

          <View
            style={{
              position: "absolute",
              right: 8,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "flex-end",
              paddingBottom: 3,
            }}
          >
            <Image src={logo.src} style={logo.style} />
          </View>
        </View>

        <View
          style={{
            borderWidth: 1.2,
            borderColor: "#111",
            paddingTop: 8,
            paddingBottom: 6,
            paddingHorizontal: 3,
            marginHorizontal: 4,
            marginBottom: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              rowGap: 14,
            }}
          >
            <View style={[styles.col, styles.colCol1]}>
              <View style={styles.field}>
                <Text style={styles.label}>Ordernr</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.orderNr ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol2]}>
              <View style={styles.field}>
                <Text style={styles.label}>Modellkod</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.modellKod ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol3]}>
              <View style={styles.field}>
                <Text style={styles.label}>Registreringsnr</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.regNr ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol4]}>
              <View style={styles.field}>
                <Text style={styles.label}>Registrering</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.registrering ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol1]}>
              <View style={styles.field}>
                <Text style={styles.label}>Chassinummer</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.chassiNr ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol2]}>
              <View style={styles.field}>
                <Text style={styles.label}>MMB</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.mmb ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol3]}>
              <View style={styles.field}>
                <Text style={styles.label}>Mätarställning</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.matarstallning ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol4]}>
              <View style={styles.field}>
                <Text style={styles.label}>Servicerådgivare</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.serviceRadgivare ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol1]}>
              <View style={styles.field}>
                <Text style={styles.label}>Modellkod</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.modell ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol2]}>
              <View style={styles.field}>
                <Text style={styles.label}>VMB</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.vmb ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol3]}>
              <View style={styles.field}>
                <Text style={styles.label}>Årsmodell</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.arsmodell ?? ""}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.col, styles.colCol4]}>
              <View style={styles.field}>
                <Text style={styles.label}>Datum</Text>
                <View style={styles.valueBox}>
                  <Text style={styles.value}>{h.datum ?? ""}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={{
            borderWidth: 1.2,
            borderColor: "#111",
            textAlign: "center",
            fontSize: 11.4,
            fontWeight: "bold",
            marginHorizontal: 4,
            marginBottom: 7,
          }}
        >
          {data.serviceTitle}
        </Text>

        {(data.extraWorkLabels?.length ?? 0) > 0 && (
          <View style={styles.extraBox}>
            <Text style={styles.extraTitle}>Tilläggsarbeten</Text>

            {data.extraWorkLabels!.map((label, idx) => (
              <View key={`${idx}-${label}`} style={styles.extraRow}>
                <Image
                  src={on}
                  style={{
                    width: 10,
                    height: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10.5,
                  }}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.sections.map((section) => (
          <View
            key={section.id}
            style={{
              marginHorizontal: 4,
              marginBottom: 12,
            }}
          >
            <View wrap={false}>
              <View
                wrap={false}
                style={{
                  flexDirection: "row",
                  ...OUTER_LR,
                  ...OUTER_TOP,
                  borderBottomWidth: 1.8,
                  borderBottomColor: BLUE,
                  paddingTop: 2,
                }}
              >
                <View
                  style={{
                    width: COL_LEFT,
                    padding: 0,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    paddingTop: 3,
                    paddingBottom: 6,
                    paddingLeft: 4,
                    paddingRight: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "#6F6F6F",
                    }}
                  >
                    {section.title}
                  </Text>
                </View>

                <View
                  style={{
                    width: COL_OK,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 8,
                      color: "#6F6F6F",
                    }}
                  >
                    Ok/genomförd
                  </Text>
                </View>
                <View
                  style={{
                    width: COL_INTE,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 2,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 8,
                      color: "#6F6F6F",
                    }}
                  >
                    Inte{"\n"}ok
                  </Text>
                </View>
                <View
                  style={{
                    width: COL_ATG,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 2,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 8,
                      color: "#6F6F6F",
                    }}
                  >
                    åtgärdat
                  </Text>
                </View>
              </View>

              {section.rows.slice(0, 1).map((r) => {
                const v = data.checks[r.id] ?? null;
                const isLastRowInSection = section.rows.length === 1;
                return (
                  <View key={r.id} wrap={false} minPresenceAhead={18}>
                    <View
                      style={{
                        flexDirection: "row",
                        ...OUTER_LR,
                        ...(isLastRowInSection ? OUTER_BOTTOM : null),
                      }}
                    >
                      <View
                        style={{
                          width: COL_LEFT,
                          padding: 0,
                          borderRightWidth: 0.25,
                          borderRightColor: BLUE,
                        }}
                      />

                      <View
                        style={{
                          flex: 1,
                          padding: 1.5,
                          fontSize: 11.4,
                          borderRightWidth: 0.25,
                          borderRightColor: BLUE,
                        }}
                      >
                        <Text>
                          {r.text}{" "}
                          {r.valueBox ? (
                            <InlineBox value={data.rowValues?.[r.id]} />
                          ) : null}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: COL_OK,
                          padding: 2,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRightWidth: 0.25,
                          borderRightColor: BLUE,
                        }}
                      >
                        <CheckCell checked={isChecked(v, "ok")} />
                      </View>

                      <View
                        style={{
                          width: COL_INTE,
                          padding: 2,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRightWidth: 0.25,
                          borderRightColor: BLUE,
                        }}
                      >
                        <CheckCell checked={isChecked(v, "inte_ok")} />
                      </View>

                      <View
                        style={{
                          width: COL_ATG,
                          padding: 2,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CheckCell checked={isChecked(v, "atgardad")} />
                      </View>
                    </View>
                    {!isLastRowInSection ? (
                      <View style={[ROW_DIVIDER_BOTTOM, OUTER_LR]} />
                    ) : null}
                  </View>
                );
              })}
            </View>
            {section.rows.slice(1).map((r, idx) => {
              const v = data.checks[r.id] ?? null;
              const isLastRowInSection =
                idx === section.rows.slice(1).length - 1;
              return (
                <View key={r.id} wrap={false} minPresenceAhead={18}>
                  <View style={[ROW_DIVIDER_TOP, OUTER_LR]} />

                  <View
                    style={{
                      flexDirection: "row",
                      ...OUTER_LR,
                      ...(isLastRowInSection ? OUTER_BOTTOM : null),
                    }}
                  >
                    <View
                      style={{
                        width: COL_LEFT,
                        borderRightWidth: 0.25,
                        borderRightColor: BLUE,
                      }}
                    />

                    <View
                      style={{
                        flex: 1,
                        padding: 1.5,
                        fontSize: 11.4,
                        borderRightWidth: 0.25,
                        borderRightColor: BLUE,
                      }}
                    >
                      <Text>
                        {r.text}{" "}
                        {r.valueBox ? (
                          <InlineBox value={data.rowValues?.[r.id]} />
                        ) : null}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: COL_OK,
                        padding: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRightWidth: 0.25,
                        borderRightColor: BLUE,
                      }}
                    >
                      <CheckCell checked={isChecked(v, "ok")} />
                    </View>

                    <View
                      style={{
                        width: COL_INTE,
                        padding: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRightWidth: 0.25,
                        borderRightColor: BLUE,
                      }}
                    >
                      <CheckCell checked={isChecked(v, "inte_ok")} />
                    </View>

                    <View
                      style={{
                        width: COL_ATG,
                        padding: 2,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckCell checked={isChecked(v, "atgardad")} />
                    </View>
                  </View>
                  {!isLastRowInSection ? (
                    <View style={[ROW_DIVIDER_BOTTOM, OUTER_LR]} />
                  ) : null}
                </View>
              );
            })}
          </View>
        ))}

        <View wrap={false} style={{ marginTop: 10, marginHorizontal: 4 }}>
          <Text style={{ fontSize: 10, textAlign: "center" }}>
            Ok/genomförd = Ok Inte ok = Inte ok, se underhållsanvisningarna
            åtgärdat = Felet har åtgärdats
          </Text>

          <View
            style={{
              marginTop: 6,
              marginBottom: 30,
              alignItems: "center",
              padding: 6,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: "bold", marginBottom: 3 }}>
              Underhållskommentar
            </Text>

            <Text style={{ fontSize: 10, minHeight: 60 }}>
              {data.note?.trim() || " "}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                width: "60%",
                borderBottomWidth: 0.3,
                borderBottomColor: "#111",
                marginBottom: 4,
              }}
            />
            <Text style={{ fontSize: 10, fontWeight: "bold", paddingTop: 10 }}>
              Datum/underskrift (ansvarig)
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                width: "60%",
                borderBottomWidth: 0.3,
                borderBottomColor: "#111",
                marginBottom: 4,
              }}
            />
            <Text style={{ fontSize: 10, fontWeight: "bold", paddingTop: 10 }}>
              Datum/underskrift (slutkontroll)
            </Text>
          </View>
        </View>
        <View
          fixed
          style={{
            position: "absolute",
            left: 28,
            right: 28,
            bottom: 18,
            borderTopWidth: 0.6,
            borderTopColor: "#999",
          }}
        />
        <Text
          fixed
          style={{
            position: "absolute",
            right: 28,
            bottom: 4,
            fontSize: 10,
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
