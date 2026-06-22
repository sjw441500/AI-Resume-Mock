import Link from "next/link";
import { Sparkles, Zap, BarChart3, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">
              AI Interview Agent
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Ace Your Interview with
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}
              AI Insights
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your resume and get an instant analysis of how well it
            matches the job description. Discover your strengths, identify gaps,
            and prepare with personalized interview questions.
          </p>

          <Link
            href="/analyze"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-lg hover:shadow-xl transition-all text-lg"
          >
            Start Analysis Now
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <BarChart3 className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Match Score
            </h3>
            <p className="text-gray-600">
              Get a precise percentage match between your resume and the job
              requirements.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <Zap className="w-10 h-10 text-yellow-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Skill Analysis
            </h3>
            <p className="text-gray-600">
              Identify your strengths and discover which skills you need to
              develop.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <MessageCircle className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Interview Prep
            </h3>
            <p className="text-gray-600">
              Receive personalized interview questions tailored to the role you
              are targeting.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 bg-white rounded-xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Upload Resume
              </h3>
              <p className="text-gray-600 text-sm">
                Submit your resume as a PDF file (up to 10MB)
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Paste Job Description
              </h3>
              <p className="text-gray-600 text-sm">
                Provide the full job description you are applying for
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Get AI Analysis
              </h3>
              <p className="text-gray-600 text-sm">
                Receive personalized insights and interview questions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>
            AI Interview Agent • Powered by OpenAI • Built with Next.js &
            TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}
