import { AnalysisResponse } from "@/types";

/**
 * Mock analysis service for development
 * In production, this would call OpenAI API
 */
export async function analyzeWithLLM(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResponse> {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response based on keyword matching
  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobDescription.toLowerCase();

  // Calculate basic match score
  const jobKeywords = jobLower
    .split(/[\s,;.]+/)
    .filter((word) => word.length > 3);
  const matchedKeywords = jobKeywords.filter((keyword) =>
    resumeLower.includes(keyword)
  );
  const matchScore = Math.round(
    (matchedKeywords.length / jobKeywords.length) * 100
  );

  return {
    matchScore: Math.min(Math.max(matchScore, 0), 100),
    strengths: [
      "Strong foundation in relevant technologies",
      "Demonstrated experience with problem-solving",
      "Clear communication of technical concepts",
      "Track record of completing projects on time",
    ],
    missingSkills: [
      "Advanced system design patterns",
      "Leadership and team management experience",
      "Specific framework/library: [specific tech from job]",
      "Enterprise-scale application deployment",
    ],
    recommendedTopics: [
      "System Design Fundamentals",
      "Microservices Architecture",
      "Cloud Deployment Strategies",
      "Performance Optimization",
      "Security Best Practices",
    ],
    interviewQuestions: [
      "Walk us through your most complex technical project. What were the challenges and how did you overcome them?",
      "Describe your experience with [relevant technology]. How have you applied it in production?",
      "Tell us about a time you had to learn a new technology quickly. How did you approach it?",
      "How do you approach debugging complex issues in production systems?",
      "Describe your experience with code reviews and receiving feedback from peers.",
      "What are your strengths and weaknesses as a developer, and how do you work on improving them?",
      "Tell us about your experience with agile/scrum methodologies.",
      "How do you stay updated with the latest developments in your field?",
    ],
  };
}

/**
 * Real OpenAI implementation (commented out for MVP)
 * Uncomment and configure when ready for production
 */
export async function analyzeWithOpenAI(
  _resumeText: string,
  _jobDescription: string
): Promise<AnalysisResponse> {
  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });

  // const prompt = `Analyze the resume and job description provided. Return a JSON object with:
  // - matchScore: number (0-100)
  // - strengths: array of strings
  // - missingSkills: array of strings
  // - recommendedTopics: array of strings for interview prep
  // - interviewQuestions: array of strings

  // Resume:
  // ${resumeText}

  // Job Description:
  // ${jobDescription}

  // Return ONLY valid JSON, no markdown formatting.`;

  // const response = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   messages: [
  //     {
  //       role: "user",
  //       content: prompt,
  //     },
  //   ],
  //   temperature: 0.7,
  //   response_format: { type: "json_object" },
  // });

  // const content = response.choices[0].message.content;
  // if (!content) throw new Error("No response from OpenAI");

  // return JSON.parse(content);

  throw new Error("OpenAI implementation not available in MVP");
}
