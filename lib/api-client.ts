import { AnalysisRequest, AnalysisResponse } from "@/types";

/**
 * Call the analysis API endpoint
 * @param request - Analysis request with resume text and job description
 * @returns Analysis response with scores and recommendations
 */
export async function analyzeResumeJobFit(
  request: AnalysisRequest
): Promise<AnalysisResponse> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
