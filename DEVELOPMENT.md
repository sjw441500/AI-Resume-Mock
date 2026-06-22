# Development Guide

This document provides guidance for developers working on the AI Interview Agent project.

## Architecture Overview

### Data Flow

```
User Input (Resume + Job Description)
    ↓
Client-side Validation (Zod + React Hook Form)
    ↓
PDF Text Extraction (pdfjs-dist)
    ↓
API Request to /api/analyze
    ↓
Server-side Validation
    ↓
LLM Service (Mock or OpenAI)
    ↓
Response Formatting
    ↓
Results Display Component
```

### Key Components

#### 1. Form & Input Handling (`components/AnalyzeForm.tsx`)

- Uses React Hook Form for efficient state management
- Zod schema validation for client and server
- PDF file upload with drag-and-drop
- Error state management
- Loading states during processing

**Key Features:**
- Validates PDF format and size (max 10MB)
- Extracts text from PDF on client-side
- Sends resume text + job description to API
- Handles various error states

#### 2. PDF Processing (`lib/pdf-utils.ts`)

- Uses `pdfjs-dist` to extract text from PDFs
- Handles multi-page PDFs
- Validates file type and size
- Provides user-friendly error messages

**Key Functions:**
- `extractTextFromPDF()` - Extracts all text content
- `isValidPDFFile()` - Validates PDF format and size
- `formatFileSize()` - Human-readable file sizes

#### 3. LLM Service (`lib/llm-service.ts`)

Two implementations available:

**Mock Service** (Used by default):
- Keyword-based analysis
- Realistic mock responses
- No API calls
- Instant responses

**OpenAI Service** (For production):
- Real GPT-4 analysis
- JSON response format
- Structured prompt engineering
- Production-ready error handling

#### 4. API Endpoint (`app/api/analyze/route.ts`)

- POST endpoint for resume analysis
- Request validation with Zod
- Calls LLM service
- Error handling and logging
- Production-ready structure

#### 5. Results Display (`components/ResultsDisplay.tsx`)

- Color-coded match scores
- Interactive results layout
- Organized sections for strengths/skills/topics/questions
- Responsive design
- Export-friendly formatting

## Development Workflow

### Adding a New Feature

1. **Define Types** (`types/index.ts`)
   ```typescript
   export interface NewFeature {
     property: string;
   }
   ```

2. **Create Component** (`components/NewComponent.tsx`)
   ```typescript
   "use client"; // Mark as client component if needed
   
   export function NewComponent() {
     return <div>Component</div>;
   }
   ```

3. **Add Validation** (if needed in `lib/schemas.ts`)
   ```typescript
   export const newSchema = z.object({
     field: z.string().min(1),
   });
   ```

4. **Create Tests**
   - Component rendering
   - Input validation
   - Error handling

5. **Update API** (if needed)
   - Add new endpoint or modify existing
   - Update request/response types
   - Add validation

### Extending the LLM Integration

#### Step 1: Prepare to Use OpenAI

Update `lib/llm-service.ts`:

```typescript
import { OpenAI } from "openai";

export async function analyzeWithOpenAI(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResponse> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Analyze this resume against the job...`,
      },
    ],
    response_format: { type: "json_object" },
  });

  // Parse and return response
}
```

#### Step 2: Update the API Endpoint

```typescript
// app/api/analyze/route.ts
import { analyzeWithOpenAI } from "@/lib/llm-service";

const result = await analyzeWithOpenAI(
  validatedData.resumeText,
  validatedData.jobDescription
);
```

#### Step 3: Add OpenAI API Key

Set `OPENAI_API_KEY` in `.env.local`

### Adding LangGraph Agents

Future architecture for multi-step analysis:

```
lib/agents/
├── base.ts           # Agent interface
├── resume-analyzer/
│   └── agent.ts      # Resume analysis agent
├── skill-matcher/
│   └── agent.ts      # Skill matching agent
└── interview-prep/
    └── agent.ts      # Interview prep agent
```

Example agent structure:

```typescript
// lib/agents/base.ts
export interface Agent {
  name: string;
  execute(input: any): Promise<any>;
}

// lib/agents/resume-analyzer/agent.ts
export class ResumeAnalyzerAgent implements Agent {
  name = "resume-analyzer";
  
  async execute(input: { resume: string; job: string }) {
    // Agent logic
  }
}
```

## Code Style & Standards

### TypeScript

- Use strict mode (enabled in `tsconfig.json`)
- Define all types explicitly
- Use interfaces for props
- Avoid `any` type

### Components

- Use functional components
- Mark client components with `"use client"`
- Use React hooks for state
- Keep components focused and single-responsibility
- Document complex logic with comments

### Naming Conventions

- Components: PascalCase (e.g., `MyComponent`)
- Functions: camelCase (e.g., `myFunction`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_SIZE`)
- Types: PascalCase (e.g., `MyType`)
- Files: Follow component/file name (e.g., `MyComponent.tsx`)

### Error Handling

- Use try-catch for async operations
- Provide meaningful error messages
- Display user-friendly errors in UI
- Log detailed errors for debugging

## Testing

### Manual Testing Checklist

- [ ] PDF upload works with valid files
- [ ] Invalid PDFs show error messages
- [ ] Job description validation works
- [ ] API analysis returns results
- [ ] Results display correctly
- [ ] Download functionality works
- [ ] Responsive design on mobile
- [ ] Loading states show correctly
- [ ] Navigation between pages works
- [ ] Error states handled gracefully

### Example Test Scenarios

1. **Upload Invalid File**
   - Attempt to upload non-PDF
   - Attempt to upload file > 10MB
   - Verify error messages

2. **Submit Form**
   - Fill in all fields
   - Click Analyze
   - Wait for processing
   - Verify results load

3. **Download Results**
   - Complete analysis
   - Click Download
   - Verify file contents

## Debugging

### Client-side

```typescript
// Enable debugging in components
console.log("Debug info:", variable);

// Use React DevTools browser extension
// Check component hierarchy and props
```

### Server-side

```typescript
// Log in API routes
console.log("Processing request:", body);

// Check error details
console.error("Error:", error);
```

### Terminal Output

Monitor the dev server for:
- Build warnings
- TypeScript errors
- API request logs
- Performance metrics

## Performance Optimization

### Current Implementation

- Client-side PDF processing (no server upload)
- Memoized components (React.memo if needed)
- Optimized images and icons (Lucide)
- Minimal dependencies

### Future Optimizations

- [ ] Implement React.lazy for code splitting
- [ ] Add image optimization with Next.js Image
- [ ] Implement caching strategies
- [ ] Monitor API response times
- [ ] Optimize PDF extraction for large files

## Security Considerations

### Current Implementation

- Client-side PDF processing (file stays on device)
- Server-side input validation
- Type-safe API contracts
- No sensitive data in logs

### Best Practices

1. Never log sensitive data
2. Validate all inputs on server
3. Use environment variables for secrets
4. Keep dependencies updated
5. Review error messages for information leakage

## Deployment

### Pre-deployment Checklist

- [ ] All TypeScript compiles without errors
- [ ] All tests pass
- [ ] Environment variables set
- [ ] .env.example updated
- [ ] README updated
- [ ] No console.log statements for debug
- [ ] API rate limits configured
- [ ] Error handling tested

### Vercel Deployment

1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Configure build settings (defaults are fine)
4. Deploy main branch

### Environment Variables Required

```env
OPENAI_API_KEY=your_key_here  # Optional, for OpenAI integration
```

## Troubleshooting

### PDF Extraction Not Working

- Check PDF is not password protected
- Verify PDF is valid (open in browser)
- Check browser console for errors
- Try with smaller PDF first

### API Errors

- Check server logs in terminal
- Verify .env.local is set correctly
- Check request/response format
- Test with curl/Postman

### TypeScript Errors

- Run `npm run build` to see all errors
- Check type definitions
- Hover over variables in IDE
- Review error message carefully

## Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Third-party Libraries
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev)
- [pdfjs-dist](https://mozilla.github.io/pdf.js/)
- [Lucide Icons](https://lucide.dev)

### OpenAI Integration
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [LangGraph](https://github.com/langchain-ai/langgraph)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)

## Contributing Guidelines

1. Follow the code style guide above
2. Test your changes thoroughly
3. Update documentation as needed
4. Commit messages should be descriptive
5. Submit PR with clear description

## Questions?

Refer to:
- README.md for general info
- Code comments for implementation details
- Type definitions for data structures
- Component files for UI logic
