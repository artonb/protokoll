import { pdf, Document } from "@react-pdf/renderer";
import type { PdfData } from "../pages/ServicePdfDocument";

export async function downloadPdf(
  document: React.ReactElement<React.ComponentProps<typeof Document>>,
  filename: string
): Promise<void> {
  const blob = await pdf(document).toBlob();

  const url = URL.createObjectURL(blob);
  try {
    const a = window.document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function getBrandFontFamily(brand: PdfData["brand"]) {
  switch (brand) {
    case "audi":
      return "Brand-Audi";
    case "skoda":
      return "Brand-Skoda";
    case "volkswagen":
    case "seat":
    default:
      return "Brand-VW";
  }
}
