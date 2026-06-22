// pdf-parse v2 API: PDFParse class with { data: buffer } option
const { PDFParse } = require("pdf-parse") as {
  PDFParse: new (options: { data: Buffer }) => { getText(): Promise<{ text: string }> };
};

/**
 * Extract plain text from a PDF buffer (server-side only).
 * @param buffer - Raw PDF file bytes
 * @returns Cleaned plain-text content
 */
export async function parsePDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  // Normalise whitespace: collapse multiple blank lines, trim leading/trailing spaces
  return result.text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
