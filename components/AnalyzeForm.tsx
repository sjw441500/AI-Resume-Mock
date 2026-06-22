"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { analyzeResumeJobFit } from "@/lib/api-client";
import { ErrorAlert } from "./ErrorAlert";
import { LoadingOverlay } from "./LoadingSpinner";
import { Sparkles, Copy, Check } from "lucide-react";

const analyzeSchema = z.object({
  resumeText: z.string().min(50, "Resume must be at least 50 characters"),
  jobDescription: z.string().min(50, "Job description must be at least 50 characters"),
});

type AnalyzeFormInput = z.infer<typeof analyzeSchema>;

export function AnalyzeForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<AnalyzeFormInput>({
    resolver: zodResolver(analyzeSchema),
  });

  const resumeText = watch("resumeText");
  const jobDescription = watch("jobDescription");

  const handlePasteResume = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue("resumeText", text, { shouldValidate: true });
      setCopiedField("resume");
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      setError("Failed to paste from clipboard");
    }
  };

  const handlePasteJob = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue("jobDescription", text, { shouldValidate: true });
      setCopiedField("job");
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      setError("Failed to paste from clipboard");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setError(null);
      setIsAnalyzing(true);

      // Call analysis API
      const result = await analyzeResumeJobFit({
        resumeText: data.resumeText,
        jobDescription: data.jobDescription,
      });

      // Store result in session storage and navigate
      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      router.push("/results");
    } catch (err) {
      setIsAnalyzing(false);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  if (isAnalyzing) {
    return <LoadingOverlay message="Analyzing your resume..." />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ErrorAlert error={error} onDismiss={() => setError(null)} />

      {/* Resume Text */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="resumeText" className="block text-sm font-semibold text-gray-900">
            Your Resume
          </label>
          <button
            type="button"
            onClick={handlePasteResume}
            className="text-xs px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 flex items-center gap-2 transition-colors"
          >
            {copiedField === "resume" ? (
              <>
                <Check className="w-3 h-3" /> Pasted
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Paste from Clipboard
              </>
            )}
          </button>
        </div>
        <textarea
          id="resumeText"
          placeholder="Paste your resume here. Include your skills, experience, education, and achievements."
          className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
          {...register("resumeText")}
        />
        <div className="mt-2 flex justify-between items-center">
          {errors.resumeText && (
            <p className="text-sm text-red-600">
              {errors.resumeText.message}
            </p>
          )}
          <p className="text-xs text-gray-500 ml-auto">
            {resumeText?.length || 0} characters
          </p>
        </div>
      </div>

      {/* Job Description */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="jobDescription" className="block text-sm font-semibold text-gray-900">
            Job Description
          </label>
          <button
            type="button"
            onClick={handlePasteJob}
            className="text-xs px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 flex items-center gap-2 transition-colors"
          >
            {copiedField === "job" ? (
              <>
                <Check className="w-3 h-3" /> Pasted
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Paste from Clipboard
              </>
            )}
          </button>
        </div>
        <textarea
          id="jobDescription"
          placeholder="Paste the job description here. Include responsibilities, requirements, and nice-to-haves."
          className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
          {...register("jobDescription")}
        />
        <div className="mt-2 flex justify-between items-center">
          {errors.jobDescription && (
            <p className="text-sm text-red-600">
              {errors.jobDescription.message}
            </p>
          )}
          <p className="text-xs text-gray-500 ml-auto">
            {jobDescription?.length || 0} characters
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        {isSubmitting ? "Analyzing..." : "Analyze Resume"}
      </button>

      <p className="text-center text-xs text-gray-500">
        This analysis is powered by AI. Results are based on content analysis and pattern matching.
      </p>
    </form>
  );
}
