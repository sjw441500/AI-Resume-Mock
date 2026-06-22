"use client";

import { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ResumeTextareaProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

export function ResumeTextarea({
  value,
  onChange,
  placeholder = "Paste your full resume here — work experience, skills, education, certifications, and achievements...",
}: ResumeTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(300, el.scrollHeight)}px`;
  }, [value]);

  return (
    <div>
      <Textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-mono text-sm leading-relaxed min-h-[300px] py-4 px-4 resize-none"
        style={{ overflow: "hidden" }}
      />
      <p className="text-xs text-gray-400 text-right mt-2">
        {value.length.toLocaleString()} characters
      </p>
    </div>
  );
}
