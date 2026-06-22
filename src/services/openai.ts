import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { AnalysisResponse } from "@/types";

// ─── Structured output schema ────────────────────────────────────────────────

const AnalysisSchema = z.object({
  matchScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe("Overall resume-to-JD fit as a percentage (0–100)"),
  strengths: z
    .array(z.string())
    .min(1)
    .describe("Concrete strengths the candidate has relative to this role"),
  missingSkills: z
    .array(z.string())
    .describe("Skills or experience gaps the candidate should address"),
  recommendedTopics: z
    .array(z.string())
    .describe("Topics the candidate should study before the interview"),
  interviewQuestions: z
    .array(z.string())
    .min(5)
    .describe("Likely interview questions tailored to this candidate and role"),
});

// ─── Config ──────────────────────────────────────────────────────────────────

const MODEL = "gpt-4.1-mini";
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 500;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to your .env.local file."
    );
  }
  return new OpenAI({ apiKey });
}

// ─── Prompt ──────────────────────────────────────────────────────────────────

function buildPrompt(resumeText: string, jobDescription: string): string {
  return `You are an expert technical recruiter and career coach with deep knowledge of the tech industry.

Analyze the provided resume against the job description and return a thorough evaluation.

Guidelines:
- matchScore: An honest integer 0–100 reflecting true alignment. Consider skills, experience level, domain, and tooling overlap.
- strengths: 3–6 specific strengths from the resume that directly align with the job requirements.
- missingSkills: 3–6 concrete gaps between the resume and the job requirements.
- recommendedTopics: 4–6 topics the candidate should study to improve their chances.
- interviewQuestions: 6–10 tailored questions the interviewer is likely to ask this specific candidate for this specific role.

---

RESUME:
${resumeText}

---

JOB DESCRIPTION:
${jobDescription}`;
}

// ─── Retry helper ────────────────────────────────────────────────────────────

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES,
  delayMs = INITIAL_RETRY_DELAY_MS
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      const apiErr = err instanceof OpenAI.APIError ? err : null;
      const isRetryable =
        apiErr !== null &&
        (apiErr.status === 429 || apiErr.status === 500 || apiErr.status === 503);

      if (!isRetryable || attempt === retries) break;

      const jitter = Math.random() * 200;
      const wait = delayMs * Math.pow(2, attempt - 1) + jitter;
      console.warn(
        `[openai] Attempt ${attempt} failed (${apiErr!.status}). Retrying in ${Math.round(wait)}ms…`
      );
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
  }

  throw lastError;
}

// ─── Main service function ───────────────────────────────────────────────────

export async function analyzeResumeAndJD(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResponse> {
  const client = getClient();

  const response = await withRetry(() =>
    client.beta.chat.completions.parse({
      model: MODEL,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are an expert recruiter. Respond only with valid structured JSON matching the provided schema.",
        },
        {
          role: "user",
          content: buildPrompt(resumeText, jobDescription),
        },
      ],
      response_format: zodResponseFormat(AnalysisSchema, "analysis"),
    })
  );

  const parsed = response.choices[0]?.message?.parsed;

  if (!parsed) {
    const refusal = response.choices[0]?.message?.refusal;
    throw new Error(
      refusal
        ? `OpenAI refused the request: ${refusal}`
        : "OpenAI returned an empty or unparseable response."
    );
  }

  return {
    matchScore: parsed.matchScore,
    strengths: parsed.strengths,
    missingSkills: parsed.missingSkills,
    recommendedTopics: parsed.recommendedTopics,
    interviewQuestions: parsed.interviewQuestions,
  };
}
