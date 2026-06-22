import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";
import { AnalyzeForm } from "@/components/AnalyzeForm";

export default function AnalyzePage() {
  return (
    <div>
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-semibold text-gray-900">
              AI Interview Agent
            </span>
          </div>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Analyze Your Resume
          </h1>
          <p className="text-gray-600 text-lg">
            Paste your resume and job description to get AI-powered insights
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <AnalyzeForm />
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h3 className="font-semibold text-blue-900 mb-4">💡 Tips for Best Results:</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>
              • Include complete and accurate information about your skills, experience, and education
            </li>
            <li>
              • Paste the full job description with all requirements and responsibilities
            </li>
            <li>
              • Use clear formatting and complete sentences in your resume
            </li>
            <li>
              • Include specific technologies, frameworks, and tools you know
            </li>
            <li>
              • The analysis works best with standard job descriptions from job boards
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
