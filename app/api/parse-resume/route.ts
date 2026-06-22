import { NextRequest, NextResponse } from "next/server";
import { parsePDF } from "@/src/lib/parsers/pdfParser";
import { parseDOCX } from "@/src/lib/parsers/docxParser";

// Supported MIME types
const PDF_TYPES = new Set(["application/pdf"]);
const DOCX_TYPES = new Set([
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds the 10 MB size limit." },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type;
    const fileName = file.name.toLowerCase();

    let text: string;

    if (PDF_TYPES.has(mimeType) || fileName.endsWith(".pdf")) {
      text = await parsePDF(buffer);
    } else if (
      DOCX_TYPES.has(mimeType) ||
      fileName.endsWith(".docx") ||
      fileName.endsWith(".doc")
    ) {
      text = await parseDOCX(buffer);
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or DOCX file." },
        { status: 415 }
      );
    }

    if (!text.trim()) {
      return NextResponse.json(
        {
          error:
            "Could not extract text from this file. It may be image-based or password-protected.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ text, charCount: text.length });
  } catch (error) {
    console.error("[api/parse-resume]", error);
    return NextResponse.json(
      { error: "Failed to parse the file. Please try a different file." },
      { status: 500 }
    );
  }
}
