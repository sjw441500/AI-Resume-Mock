import { NextRequest, NextResponse } from "next/server";
import { analysisRequestSchema } from "@/lib/schemas";
import { analyzeWithLLM } from "@/lib/llm-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request
    const validatedData = analysisRequestSchema.parse(body);

    // Call LLM service
    const result = await analyzeWithLLM(
      validatedData.resumeText,
      validatedData.jobDescription
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
