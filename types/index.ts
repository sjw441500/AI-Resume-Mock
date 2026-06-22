// API Response Types
export interface AnalysisResponse {
  matchScore: number;
  strengths: string[];
  missingSkills: string[];
  recommendedTopics: string[];
  interviewQuestions: string[];
}

export interface AnalysisRequest {
  resumeText: string;
  jobDescription: string;
}

// Form Types
export interface ResumeAnalysisFormData {
  resume: File;
  jobDescription: string;
}

// Component Props Types
export interface LoadingStateProps {
  isLoading: boolean;
  message?: string;
}

export interface ErrorStateProps {
  error: string | null;
  onDismiss: () => void;
}

// Analysis State
export interface AnalysisState {
  data: AnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
}
