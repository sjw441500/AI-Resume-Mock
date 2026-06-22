import { z } from "zod";

export const analyzeFormSchema = z.object({
  resume: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "Resume must be a PDF file",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Resume file must be less than 10MB",
    }),
  jobDescription: z
    .string()
    .min(50, "Job description must be at least 50 characters")
    .max(5000, "Job description must be less than 5000 characters"),
});

export const analysisRequestSchema = z.object({
  resumeText: z.string().min(10, "Resume text is required"),
  jobDescription: z.string().min(50, "Job description is required"),
});

export type AnalyzeFormInput = z.infer<typeof analyzeFormSchema>;
export type AnalysisRequestInput = z.infer<typeof analysisRequestSchema>;
