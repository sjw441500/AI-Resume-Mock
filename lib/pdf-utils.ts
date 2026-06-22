/**
 * Extract text from PDF file using pdfjs-dist (client-side only)
 * @param file - PDF file to extract text from
 * @returns Extracted text content
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Only import pdfjs-dist on client side
    if (typeof window === "undefined") {
      throw new Error("PDF extraction is only available on the client side");
    }

    // Dynamic import to prevent server-side issues
    const pdfjsLib = await import("pdfjs-dist");
    const pdfjs = pdfjsLib;

    // Use CDN worker to avoid canvas requirement
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => {
          return typeof item.str === "string" ? item.str : "";
        })
        .join(" ");
      fullText += pageText + " ";
    }

    return fullText.trim();
  } catch (error) {
    throw new Error(
      `Failed to extract text from PDF: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Validate file is a PDF
 * @param file - File to validate
 * @returns True if file is valid PDF
 */
export function isValidPDFFile(file: File): boolean {
  return (
    file.type === "application/pdf" &&
    file.size > 0 &&
    file.size <= 10 * 1024 * 1024
  ); // 10MB limit
}

/**
 * Format bytes to readable size
 * @param bytes - Number of bytes
 * @returns Formatted size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
