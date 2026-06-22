"use client";

import {
  Zap,
  Target,
  BookOpen,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { AnalysisResponse } from "@/types";

interface ResultsDisplayProps {
  data: AnalysisResponse;
}

export function ResultsDisplay({ data }: ResultsDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-900";
    if (score >= 60) return "bg-yellow-100 text-yellow-900";
    return "bg-red-100 text-red-900";
  };

  const getScoreBgGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="space-y-8">
      {/* Match Score */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Resume Match</h2>
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>

        <div className="flex items-center gap-8">
          <div
            className={`bg-gradient-to-br ${getScoreBgGradient(data.matchScore)} rounded-full w-32 h-32 flex items-center justify-center`}
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-white">
                {data.matchScore}%
              </div>
              <div className="text-white text-sm mt-1">Match Score</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getScoreBgGradient(data.matchScore)} transition-all duration-500`}
                style={{ width: `${data.matchScore}%` }}
              ></div>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              {data.matchScore >= 80 &&
                "Excellent match! Your resume aligns well with this position."}
              {data.matchScore >= 60 &&
                data.matchScore < 80 &&
                "Good match. You have relevant skills but there's room for improvement."}
              {data.matchScore < 60 &&
                "Moderate match. Focus on developing the missing skills highlighted below."}
            </p>
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">Your Strengths</h3>
        </div>
        <ul className="space-y-3">
          {data.strengths.map((strength, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              </span>
              <span className="text-gray-700">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Missing Skills */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl font-bold text-gray-900">Skills to Develop</h3>
        </div>
        <ul className="space-y-3">
          {data.missingSkills.map((skill, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
              </span>
              <span className="text-gray-700">{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Topics */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">
            Recommended Learning Topics
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.recommendedTopics.map((topic, idx) => (
            <div
              key={idx}
              className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-900"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Interview Questions */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">
            Likely Interview Questions
          </h3>
        </div>
        <div className="space-y-4">
          {data.interviewQuestions.map((question, idx) => (
            <div key={idx} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-purple-900 text-sm">
                  Q{idx + 1}.
                </span>
                <p className="text-purple-900 text-sm">{question}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
