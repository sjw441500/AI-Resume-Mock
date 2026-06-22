"use client";

import { useCallback, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  FileUp,
  Loader2,
  Pencil,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadState {
  status: UploadStatus;
  progress: number;
  fileName: string;
  charCount: number;
  error: string | null;
}

interface ResumeUploaderProps {
  onTextExtracted: (text: string, fileName: string) => void;
}

const ACCEPTED_TYPES = ".pdf,.docx,.doc";
const MAX_SIZE_MB = 10;

export function ResumeUploader({ onTextExtracted }: ResumeUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [state, setState] = useState<UploadState>({
    status: "idle",
    progress: 0,
    fileName: "",
    charCount: 0,
    error: null,
  });

  // Preview state — merged here, no separate ResumePreview component needed
  const [extractedText, setExtractedText] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  const uploadFile = useCallback(
    (file: File) => {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setState({ status: "error", progress: 0, fileName: file.name, charCount: 0, error: `File exceeds ${MAX_SIZE_MB} MB limit.` });
        return;
      }

      setState({ status: "uploading", progress: 0, fileName: file.name, charCount: 0, error: null });

      const formData = new FormData();
      formData.append("file", file);
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          setState((s) => ({ ...s, progress: Math.round((e.loaded / e.total) * 80) }));
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText) as { text?: string; error?: string };
            if (data.text) {
              setState({ status: "success", progress: 100, fileName: file.name, charCount: data.text.length, error: null });
              setExtractedText(data.text);
              setEditedText(data.text);
              setIsPreviewOpen(false);
              setIsEditing(false);
              onTextExtracted(data.text, file.name);
            } else {
              setState({ status: "error", progress: 0, fileName: file.name, charCount: 0, error: data.error ?? "Failed to extract text." });
            }
          } catch {
            setState({ status: "error", progress: 0, fileName: file.name, charCount: 0, error: "Unexpected server response." });
          }
        } else {
          let errMsg = "Upload failed.";
          try { const d = JSON.parse(xhr.responseText) as { error?: string }; if (d.error) errMsg = d.error; } catch { /* ignore */ }
          setState({ status: "error", progress: 0, fileName: file.name, charCount: 0, error: errMsg });
        }
      });

      xhr.addEventListener("error", () =>
        setState({ status: "error", progress: 0, fileName: file.name, charCount: 0, error: "Network error. Please try again." })
      );

      xhr.addEventListener("loadstart", () => {
        setTimeout(() => setState((s) => s.status === "uploading" ? { ...s, progress: Math.max(s.progress, 85) } : s), 600);
      });

      xhr.open("POST", "/api/parse-resume");
      xhr.send(formData);
    },
    [onTextExtracted]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) uploadFile(file);
    e.currentTarget.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleReset = () => {
    setState({ status: "idle", progress: 0, fileName: "", charCount: 0, error: null });
    setExtractedText("");
    setEditedText("");
    setIsPreviewOpen(false);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    setExtractedText(editedText);
    onTextExtracted(editedText, state.fileName);
    setIsEditing(false);
  };

  // ── Idle ─────────────────────────────────────────────────────────────────────
  if (state.status === "idle") {
    return (
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        aria-label="Upload resume file"
        className={cn(
          "group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed min-h-[240px] cursor-pointer transition-all duration-200 select-none",
          isDragOver
            ? "border-gray-800 bg-gray-50/80 scale-[1.005]"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/40"
        )}
      >
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-200",
          isDragOver
            ? "bg-gray-900 text-white scale-110"
            : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600"
        )}>
          <FileUp className="w-5 h-5" strokeWidth={1.75} />
        </div>

        <p className="text-[15px] font-semibold text-gray-800 mb-1.5">
          {isDragOver ? "Release to upload" : "Upload PDF or DOCX"}
        </p>
        <p className="text-sm text-gray-400">
          Drag and drop your resume, or{" "}
          <span className="text-gray-600 font-medium">click to browse</span>
        </p>

        <div className="flex items-center gap-2.5 mt-6">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">PDF</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">DOCX</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-[11px] text-gray-400">Max {MAX_SIZE_MB} MB</span>
        </div>

        <input ref={inputRef} type="file" accept={ACCEPTED_TYPES} className="hidden" onChange={handleFileChange} />
      </div>
    );
  }

  // ── Uploading ─────────────────────────────────────────────────────────────────
  if (state.status === "uploading") {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50/40 p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{state.fileName}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {state.progress < 80 ? "Uploading…" : "Extracting text…"}
            </p>
          </div>
          <span className="text-sm font-medium text-gray-400 tabular-nums flex-shrink-0">{state.progress}%</span>
        </div>
        <Progress value={state.progress} className="h-1" />
      </div>
    );
  }

  // ── Success ───────────────────────────────────────────────────────────────────
  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        {/* Info row */}
        <div className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">Resume Uploaded</p>
            <p className="text-sm text-gray-500 mt-0.5 truncate" title={state.fileName}>{state.fileName}</p>
            <p className="text-xs text-gray-400 mt-0.5">{state.charCount.toLocaleString()} characters extracted</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex items-center gap-2">
          <Button
            type="button" variant="outline" size="sm"
            onClick={() => { setIsPreviewOpen((v) => !v); setIsEditing(false); }}
            className="text-xs h-8 font-medium"
          >
            {isPreviewOpen
              ? <><EyeOff className="w-3.5 h-3.5 mr-1.5" />Hide Preview</>
              : <><Eye className="w-3.5 h-3.5 mr-1.5" />Preview Resume</>}
          </Button>
          <Button
            type="button" variant="ghost" size="sm"
            onClick={handleReset}
            className="text-xs h-8 font-medium text-gray-500 hover:text-gray-900"
          >
            <RefreshCcw className="w-3.5 h-3.5 mr-1.5" />
            Replace File
          </Button>
        </div>

        {/* Inline preview panel */}
        {isPreviewOpen && (
          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between px-5 py-3 bg-gray-50/60">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Preview</p>
              <Button
                type="button" variant="ghost" size="sm"
                onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}
                className="h-7 px-2.5 text-xs font-medium text-gray-500 hover:text-gray-900"
              >
                {isEditing
                  ? <><Check className="w-3 h-3 mr-1" />Done</>
                  : <><Pencil className="w-3 h-3 mr-1" />Edit</>}
              </Button>
            </div>
            <div className="p-5">
              {isEditing ? (
                <Textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="font-mono text-xs leading-relaxed min-h-[280px] bg-white resize-y"
                  autoFocus
                />
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-xs text-gray-600 leading-relaxed max-h-72 overflow-y-auto">
                  {extractedText}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-xl border border-red-100 bg-red-50/40 p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
        <XCircle className="w-5 h-5 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-red-900">Upload Failed</p>
        {state.fileName && <p className="text-sm text-red-700 mt-0.5 truncate">{state.fileName}</p>}
        <p className="text-xs text-red-500 mt-1">{state.error}</p>
        <Button
          type="button" variant="ghost" size="sm"
          onClick={handleReset}
          className="mt-3 h-7 px-2.5 text-xs font-medium text-red-700 hover:text-red-900 hover:bg-red-100"
        >
          <RefreshCcw className="w-3 h-3 mr-1.5" />
          Try again
        </Button>
      </div>
    </div>
  );
}
