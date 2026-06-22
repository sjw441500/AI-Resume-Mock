"use client";

/**
 * Client-side PDF extraction utilities
 * This file is marked as client-side only to prevent server-side execution
 */

/**
 * Extract text from PDF file using pdfjs-dist
 * @param file - PDF file to extract text from
 * @returns Extracted text content
 */
export async function extractTextFromPDFClient(file: File): Promise<string> {
  try {
    // Dynamically import pdfjs-dist (only on client)
    const pdfjsLib = await import("pdfjs-dist");
    const pdfjs = pdfjsLib;

    // Set worker from CDN
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
