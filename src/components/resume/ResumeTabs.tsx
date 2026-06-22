"use client";

import { useState } from "react";
import { Linkedin, Upload, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResumeUploader } from "./ResumeUploader";
import { ResumeTextarea } from "./ResumeTextarea";

type ResumeTab = "upload" | "paste" | "linkedin";

interface ResumeTabsProps {
  onChange: (text: string) => void;
  error?: string;
}

export function ResumeTabs({ onChange, error }: ResumeTabsProps) {
  const [activeTab, setActiveTab] = useState<ResumeTab>("upload");
  const [uploadedText, setUploadedText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [pastedText, setPastedText] = useState("");

  const handleTabChange = (tab: ResumeTab) => {
    setActiveTab(tab);
    if (tab === "upload") onChange(uploadedText);
    else if (tab === "paste") onChange(pastedText);
    else onChange("");
  };

  const handleUploadSuccess = (text: string, fileName: string) => {
    setUploadedText(text);
    setUploadedFileName(fileName);
    onChange(text);
  };

  const handlePasteChange = (text: string) => {
    setPastedText(text);
    onChange(text);
  };

  void uploadedFileName;

  const base =
    "flex items-center gap-2 px-4 pb-3 pt-1 text-sm -mb-px transition-colors select-none border-b-2";

  return (
    <div>
      {/* ── Tab row — underline style ─────────────────────────────────────── */}
      <div className="flex items-end border-b border-gray-100 mb-6" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "upload"}
          onClick={() => handleTabChange("upload")}
          className={
            base +
            (activeTab === "upload"
              ? " font-semibold text-gray-900 border-gray-900"
              : " font-medium text-gray-400 hover:text-gray-700 border-transparent")
          }
        >
          <Upload className="w-4 h-4" strokeWidth={1.75} />
          Upload Resume
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "paste"}
          onClick={() => handleTabChange("paste")}
          className={
            base +
            (activeTab === "paste"
              ? " font-semibold text-gray-900 border-gray-900"
              : " font-medium text-gray-400 hover:text-gray-700 border-transparent")
          }
        >
          <FileText className="w-4 h-4" strokeWidth={1.75} />
          Paste Resume
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={false}
          disabled
          className={base + " font-medium text-gray-300 cursor-not-allowed border-transparent"}
        >
          <Linkedin className="w-4 h-4" strokeWidth={1.75} />
          LinkedIn
          <Badge
            variant="secondary"
            className="ml-0.5 px-1.5 py-0 text-[9px] font-bold uppercase tracking-widest"
          >
            Soon
          </Badge>
        </button>
      </div>

      {/* ── Content areas ─────────────────────────────────────────────────── */}
      {activeTab === "upload" && (
        <ResumeUploader onTextExtracted={handleUploadSuccess} />
      )}

      {activeTab === "paste" && (
        <ResumeTextarea value={pastedText} onChange={handlePasteChange} />
      )}

      {activeTab === "linkedin" && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/40 min-h-[240px] text-center p-12">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
            <Linkedin className="w-6 h-6 text-[#0A66C2]" strokeWidth={1.75} />
          </div>
          <p className="text-[15px] font-semibold text-gray-700 mb-1.5">LinkedIn Import</p>
          <p className="text-sm text-gray-400 max-w-xs">
            Import your resume directly from your LinkedIn profile with one click.
          </p>
          <Badge variant="secondary" className="mt-5 px-3 py-1 text-xs font-semibold">
            Coming Soon
          </Badge>
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
    </div>
  );
}
