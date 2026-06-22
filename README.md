# AI Interview Agent - MVP

A production-ready AI-powered resume analysis tool that helps job seekers understand how well their resume matches a job description and prepares them for interviews.

## 🎯 Features

- **Resume Upload**: Upload your resume as a PDF file (up to 10MB)
- **Job Description Analysis**: Paste any job description for analysis
- **Match Score**: Get a percentage score showing how well your resume aligns with the job
- **Skills Analysis**: Identify your strengths and discover missing skills
- **Interview Prep**: Receive personalized interview questions tailored to the role
- **Recommended Topics**: Get a curated list of topics to study before the interview
- **Download Results**: Export your analysis results as a text file

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Form Handling**: React Hook Form + Zod Validation
- **PDF Processing**: pdfjs-dist
- **API Integration**: OpenAI SDK (configured for future use)

### Project Structure

```
ai-interview-agent/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (Hero section)
│   ├── globals.css              # Global styles
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts         # POST /api/analyze endpoint
│   ├── analyze/
│   │   └── page.tsx             # Analyze page
│   └── results/
│       └── page.tsx             # Results page
├── components/                   # Reusable UI components
│   ├── AnalyzeForm.tsx          # Main form component
│   ├── PDFUpload.tsx            # File upload with drag-drop
│   ├── ErrorAlert.tsx           # Error notification
│   ├── LoadingSpinner.tsx       # Loading indicators
│   └── ResultsDisplay.tsx       # Results visualization
├── lib/                          # Utility functions
│   ├── pdf-utils.ts             # PDF text extraction
│   ├── api-client.ts            # API request handler
│   ├── llm-service.ts           # LLM integration (mock + OpenAI)
│   └── schemas.ts               # Zod validation schemas
├── types/                        # TypeScript type definitions
│   └── index.ts                 # Shared interfaces
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── next.config.ts              # Next.js configuration
└── .eslintrc.json              # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key (optional, for production)

### Installation

1. **Clone the repository**
   ```bash
   cd ai-interview-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional)
   ```bash
   cp .env.example .env.local
   # Add your OpenAI API key if using production LLM integration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📝 Usage

### As a User

1. Navigate to the home page
2. Click "Start Analysis Now"
3. Upload your resume (PDF)
4. Paste the job description
5. Click "Analyze Resume"
6. View detailed results with:
   - Match score
   - Your strengths
   - Skills to develop
   - Recommended learning topics
   - Personalized interview questions
7. Download results for reference

### As a Developer

#### Adding OpenAI Integration

1. Set `OPENAI_API_KEY` in `.env.local`
2. Uncomment the `analyzeWithOpenAI` function in `lib/llm-service.ts`
3. Update the API endpoint to use the real implementation:

```typescript
// In app/api/analyze/route.ts
const result = await analyzeWithOpenAI(
  validatedData.resumeText,
  validatedData.jobDescription
);
```

#### Extending the Analysis

The architecture is designed for extensibility. To add LangGraph agents:

1. Create a new agent service in `lib/agents/`
2. Implement the agent interface
3. Update `lib/llm-service.ts` to route to the appropriate agent
4. The API endpoint remains unchanged

## 🔄 API Endpoints

### POST /api/analyze

Analyzes a resume against a job description.

**Request:**
```json
{
  "resumeText": "string",
  "jobDescription": "string"
}
```

**Response:**
```json
{
  "matchScore": 75,
  "strengths": ["string"],
  "missingSkills": ["string"],
  "recommendedTopics": ["string"],
  "interviewQuestions": ["string"]
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## 🛠️ Development

### Running Tests

```bash
npm run lint
```

### Building for Production

```bash
npm run build
npm start
```

### Code Organization

- **Components**: Self-contained, reusable UI elements
- **Lib**: Pure utilities and business logic
- **Types**: TypeScript interfaces and types
- **Styles**: TailwindCSS with component-scoped styling

## 🎨 UI/UX Features

- Clean, modern design with gradient accents
- Responsive layout (mobile, tablet, desktop)
- Loading states with spinners and overlays
- Error handling with user-friendly messages
- File upload with drag-and-drop support
- Results visualization with color-coded scores
- Download functionality for results

## 🔒 Security & Validation

- **Client-side validation**: Zod schemas for form data
- **Server-side validation**: Request validation before processing
- **File validation**: PDF format and size checks (max 10MB)
- **Type safety**: Full TypeScript coverage
- **Input sanitization**: All user inputs validated

## 📊 Mock Analysis

The MVP uses a mock analysis service that:
- Extracts text from PDF resumes
- Analyzes job description keywords
- Generates realistic strengths and weaknesses
- Provides relevant interview questions
- Calculates a match score based on keyword matching

This allows full feature testing without OpenAI API calls.

## 🚀 Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy with one click

### Environment Variables for Production

```env
OPENAI_API_KEY=your_api_key_here
NODE_ENV=production
```

## 🤝 Contributing

When extending this project:

1. Maintain TypeScript strict mode
2. Add proper error handling
3. Follow the component structure
4. Document new functions and types
5. Keep API interfaces stable

## 📚 Future Enhancements

- [ ] Real OpenAI GPT-4 integration
- [ ] LangGraph agent workflow
- [ ] User authentication and profiles
- [ ] Resume history tracking
- [ ] Skill gap analysis with learning resources
- [ ] Interview question explanation/hints
- [ ] Video answer recording and AI feedback
- [ ] Industry-specific customization
- [ ] Salary negotiation preparation
- [ ] Multi-language support

## 📄 License

MIT License - feel free to use this project as a template for your own applications.

## 🆘 Support

For issues or questions:
1. Check the README
2. Review the code comments
3. Examine the component structure
4. Check type definitions in `types/index.ts`

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev)
- [OpenAI API](https://platform.openai.com/docs/api-reference)

---

Built with ❤️ for job seekers who want to ace their interviews.