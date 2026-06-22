/**
 * PDF validation and formatting utilities
 * These functions don't require pdfjs-dist
 */

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
