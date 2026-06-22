"use client";

import { useCallback } from "react";
import { FileUp, File as FileIcon } from "lucide-react";
import { isValidPDFFile } from "@/lib/file-utils";

interface PDFUploadProps {
  onFileSelected: (file: File) => void;
  isLoading?: boolean;
}

export function PDFUpload({ onFileSelected, isLoading }: PDFUploadProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];
      if (file && isValidPDFFile(file)) {
        onFileSelected(file);
      } else if (file) {
        alert("Please upload a valid PDF file (max 10MB)");
      }
    },
    [onFileSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files?.[0];
      if (file && isValidPDFFile(file)) {
        onFileSelected(file);
      } else if (file) {
        alert("Please upload a valid PDF file (max 10MB)");
      }
    },
    [onFileSelected]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
    >
      <div className="mb-4">
        <FileUp className="w-10 h-10 text-primary mx-auto" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Upload Your Resume
      </h3>

      <p className="text-gray-600 text-sm mb-4">
        Drag and drop your resume PDF or click to browse
      </p>

      <label className="inline-block">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isLoading}
          className="hidden"
        />
        <span className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-medium">
          {isLoading ? "Uploading..." : "Choose File"}
        </span>
      </label>

      <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 text-sm">
        <FileIcon className="w-4 h-4" />
        <span>PDF up to 10MB</span>
      </div>
    </div>
  );
}
