"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ResumePreviewProps {
  value: string;
  onChange: (text: string) => void;
  fileName?: string;
}

export function ResumePreview({ value, onChange, fileName }: ResumePreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!value) return null;

  return (
    <div className="mt-4 rounded-lg border border-green-200 bg-green-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-green-700" />
          <span className="text-sm font-medium text-green-900">
            {fileName ? fileName : "Resume Text"}
          </span>
          <Badge variant="success">{value.length.toLocaleString()} chars</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-green-700 hover:text-green-900 hover:bg-green-100"
            onClick={() => {
              setIsEditing((e) => !e);
              if (!isEditing) setIsExpanded(true);
            }}
          >
            <Pencil className="w-3.5 h-3.5 mr-1" />
            {isEditing ? "Done" : "Edit"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-green-700 hover:text-green-900 hover:bg-green-100"
            onClick={() => setIsExpanded((e) => !e)}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Body */}
      {isExpanded && (
        <div className="border-t border-green-200 p-4">
          {isEditing ? (
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="font-mono text-xs leading-relaxed min-h-[300px] bg-white"
              autoFocus
            />
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-xs text-green-900 leading-relaxed max-h-80 overflow-y-auto">
              {value}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
