import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { analysisRequestSchema } from "@/lib/schemas";
import { analyzeResumeAndJD } from "@/src/services/openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const { resumeText, jobDescription } = analysisRequestSchema.parse(body);

    // Call real OpenAI service
    const result = await analyzeResumeAndJD(resumeText, jobDescription);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      // Surface config/key errors clearly in development
      if (error.message.includes("OPENAI_API_KEY")) {
        return NextResponse.json(
          { error: error.message },
          { status: 503 }
        );
      }

      // OpenAI rate limit
      if (error.message.includes("429")) {
        return NextResponse.json(
          { error: "Service is currently busy. Please try again in a moment." },
          { status: 429 }
        );
      }

      console.error("[api/analyze] Error:", error.message);
    }

    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    );
  }
}
