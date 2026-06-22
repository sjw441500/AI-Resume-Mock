"use client";

import { AlertCircle, X } from "lucide-react";
import { ErrorStateProps } from "@/types";

export function ErrorAlert({ error, onDismiss }: ErrorStateProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-red-800 text-sm font-medium">Error</p>
        <p className="text-red-700 text-sm mt-1">{error}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-600 hover:text-red-700 flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
