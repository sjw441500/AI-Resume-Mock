import mammoth from "mammoth";

/**
 * Extract plain text from a DOCX buffer (server-side only).
 * @param buffer - Raw DOCX file bytes
 * @returns Cleaned plain-text content
 */
export async function parseDOCX(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });

  if (result.messages.length > 0) {
    const warnings = result.messages
      .filter((m) => m.type === "warning")
      .map((m) => m.message);
    if (warnings.length > 0) {
      console.warn("[docxParser] Extraction warnings:", warnings.join("; "));
    }
  }

  return result.value
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
