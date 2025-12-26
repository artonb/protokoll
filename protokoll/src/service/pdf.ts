import { pdf, Document } from "@react-pdf/renderer";

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
