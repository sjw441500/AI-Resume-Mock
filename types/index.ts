// API Response Types
export interface AnalysisResponse {
  matchScore: number;
  strengths: string[];
  missingSkills: string[];
  recommendedTopics: string[];
  interviewQuestions: string[];
}

/**
 * Normalised request that the backend always receives.
 * The source (PDF / DOCX / paste) is abstracted away on the client.
 */
export interface AnalysisRequest {
  resumeText: string;
  jobDescription: string;
}

// ── Resume input types ────────────────────────────────────────────────────────

/** Supported resume input sources. Extend here for Google Drive, Dropbox, etc. */
export type ResumeSource = "upload" | "paste" | "linkedin";

/** Tracks the state of a file-based resume upload */
export interface ResumeUploadState {
  fileName: string;
  charCount: number;
}

// ── Component Props Types ─────────────────────────────────────────────────────

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


// Analysis State
export interface AnalysisState {
  data: AnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
}
