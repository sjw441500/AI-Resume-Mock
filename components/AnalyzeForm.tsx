"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Copy, Check, Sparkles, ArrowRight } from "lucide-react";
import { analyzeResumeJobFit } from "@/lib/api-client";
import { ErrorAlert } from "./ErrorAlert";
import { LoadingOverlay } from "./LoadingSpinner";
import { ResumeTabs } from "@/src/components/resume/ResumeTabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Schema
const analyzeSchema = z.object({
  resumeText: z.string().min(50, "Resume must be at least 50 characters"),
  jobDescription: z.string().min(50, "Job description must be at least 50 characters"),
});
type AnalyzeFormInput = z.infer<typeof analyzeSchema>;

// Section header sub-component
function SectionHeader({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
          {step}
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 leading-tight">{title}</h2>
          <p className="mt-0.5 text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <span className="flex-shrink-0 text-xs text-gray-400 font-medium mt-1">
        {step} of 2
      </span>
    </div>
  );
}

// Main form
export function AnalyzeForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedJob, setCopiedJob] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AnalyzeFormInput>({
    resolver: zodResolver(analyzeSchema),
  });

  const jobDescription = watch("jobDescription");

  const handleResumeChange = useCallback(
    (text: string) => {
      setValue("resumeText", text, { shouldValidate: !!text });
    },
    [setValue]
  );

  const handlePasteJob = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue("jobDescription", text, { shouldValidate: true });
      setCopiedJob(true);
      setTimeout(() => setCopiedJob(false), 2000);
    } catch {
      setError("Failed to read clipboard. Please paste manually.");
    }
  };

  const onSubmit = async (data: AnalyzeFormInput) => {
    try {
      setError(null);
      setIsAnalyzing(true);
      const result = await analyzeResumeJobFit({
        resumeText: data.resumeText,
        jobDescription: data.jobDescription,
      });
      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      router.push("/results");
    } catch (err) {
      setIsAnalyzing(false);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  if (isAnalyzing) {
    return <LoadingOverlay message="Analyzing your resume with AI..." />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ErrorAlert error={error} onDismiss={() => setError(null)} />

      <Card className="overflow-hidden shadow-sm border-gray-200">
        {/* Section 1 — Resume */}
        <CardContent className="p-8">
          <SectionHeader
            step={1}
            title="Your Resume"
            description="Upload a PDF or DOCX file, or paste your resume text directly."
          />
          <ResumeTabs onChange={handleResumeChange} error={errors.resumeText?.message} />
        </CardContent>

        <Separator />

        {/* Section 2 — Job Description */}
        <CardContent className="p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 leading-tight">
                  Job Description
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  Paste the full job posting, including requirements and responsibilities.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
              <span className="text-xs text-gray-400 font-medium">2 of 2</span>
              <button
                type="button"
                onClick={handlePasteJob}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 font-medium transition-colors"
              >
                {copiedJob ? (
                  <><Check className="w-3 h-3 text-green-600" /> Pasted</>
                ) : (
                  <><Copy className="w-3 h-3" /> Paste from Clipboard</>
                )}
              </button>
            </div>
          </div>

          <textarea
            id="jobDescription"
            placeholder="Paste the full job description here — responsibilities, required qualifications, nice-to-haves, and company info."
            className="w-full min-h-[300px] px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-y font-mono text-sm leading-relaxed placeholder:text-gray-400 transition-shadow"
            {...register("jobDescription")}
          />
          <div className="mt-2 flex justify-between items-center">
            {errors.jobDescription ? (
              <p className="text-sm text-red-600">{errors.jobDescription.message}</p>
            ) : (
              <span />
            )}
            <p className="text-xs text-gray-400">
              {(jobDescription?.length ?? 0).toLocaleString()} characters
            </p>
          </div>
        </CardContent>

        <Separator />

        {/* Submit */}
        <CardContent className="p-8 bg-gray-50/60">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2.5 bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-base"
          >
            <Sparkles className="w-5 h-5" />
            {isSubmitting ? "Analyzing..." : "Analyze Resume"}
            {!isSubmitting && <ArrowRight className="w-4 h-4 ml-auto" />}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            Powered by GPT-4.1-mini &middot; Your resume is never stored
          </p>
        </CardContent>
      </Card>
    </form>
  );
}
