// PDF extraction removed — resume text is entered directly by the user.
// Validation helpers remain for any future file upload feature.

/**
 * Validate file is a PDF
 */
export function isValidPDFFile(file: File): boolean {
  return (
    file.type === "application/pdf" &&
    file.size > 0 &&
    file.size <= 10 * 1024 * 1024
  );
}

/**
 * Format bytes to readable size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

