import Link from "next/link";
import { ChevronLeft, Sparkles, Lightbulb } from "lucide-react";
import { AnalyzeForm } from "@/components/AnalyzeForm";

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-sm">AI Interview Agent</span>
          </div>
          <div className="w-16" />
        </div>
      </nav>

      {/* Page header */}
      <div className="max-w-[900px] mx-auto px-6 pt-10 pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Analyze Your Resume
          </h1>
          <p className="mt-2 text-gray-500 text-base">
            Get instant AI-powered insights on how well your resume matches a job description.
          </p>
        </div>

        {/* Form — full card layout */}
        <AnalyzeForm />

        {/* Tips */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-gray-900">Tips for best results</h3>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <span className="text-gray-300 mt-0.5">•</span>
              Include complete work history, skills, and education
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-300 mt-0.5">•</span>
              Paste the full job description, not just the title
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-300 mt-0.5">•</span>
              Mention specific technologies, tools, and frameworks
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-300 mt-0.5">•</span>
              Works best with standard job postings from job boards
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
