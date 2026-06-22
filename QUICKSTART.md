# Quick Start Guide

Get the AI Interview Agent running in 5 minutes.

## Prerequisites

- Node.js 18+ (Check: `node --version`)
- npm or yarn (Check: `npm --version`)
- A code editor (VS Code recommended)

## Installation (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

This installs:
- Next.js 15 with App Router
- TypeScript with strict mode
- TailwindCSS and shadcn/ui components
- React Hook Form and Zod validation
- pdfjs-dist for PDF processing
- OpenAI SDK for future integration
- Lucide icons

### 2. Start Development Server
```bash
npm run dev
```

You should see:
```
> next dev

  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
```

### 3. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## Test the Application

### Home Page
- ✅ Should see hero section with "Start Analysis Now" button
- ✅ Three feature cards visible
- ✅ "How It Works" section with 3 steps
- ✅ Footer with attribution

### Analyze Page
- Click "Start Analysis Now"
- ✅ PDF upload area visible
- ✅ Job description textarea appears
- ✅ "Analyze Resume" button visible

### Try an Analysis
1. Create a sample resume PDF (use any PDF or download test one)
2. Upload the PDF to the form
3. Paste a sample job description (any tech job description works)
4. Click "Analyze Resume"
5. ✅ Should see Results page with:
   - Match score (0-100%)
   - Your strengths
   - Skills to develop
   - Recommended learning topics
   - Interview questions

## Project Structure at a Glance

```
app/                 # All pages & API routes
├── page.tsx        # Home page
├── analyze/        # Analysis form page
├── results/        # Results display
└── api/            # Backend endpoints

components/         # Reusable UI components
├── AnalyzeForm.tsx
├── ResultsDisplay.tsx
├── ErrorAlert.tsx
└── ...

lib/                # Business logic & utilities
├── pdf-utils.ts    # PDF processing
├── llm-service.ts  # AI analysis (mock or OpenAI)
├── schemas.ts      # Data validation
└── ...

types/              # TypeScript definitions
```

## Key Features Working in MVP

✅ **PDF Upload**
- Drag & drop support
- File validation (PDF format, < 10MB)
- Text extraction from PDF

✅ **Form Validation**
- Resume file required
- Job description (50-5000 chars)
- Real-time error messages

✅ **Analysis**
- Mock AI response (no API key needed)
- Keyword-based matching
- Score calculation
- Realistic insights

✅ **Results Display**
- Match score with color coding
- Strengths and weaknesses
- Learning topics
- Interview questions
- Download results as text file

✅ **Error Handling**
- Invalid PDF rejection
- Network error messages
- Helpful user guidance

## Next Steps

### To Add OpenAI Integration
1. Get API key from [OpenAI Dashboard](https://platform.openai.com/api-keys)
2. Create `.env.local` file:
   ```
   OPENAI_API_KEY=sk_your_key_here
   ```
3. Uncomment `analyzeWithOpenAI` in `lib/llm-service.ts`
4. Update API endpoint to use real LLM

### To Deploy to Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your GitHub repo
4. Set environment variables
5. Click "Deploy"

### To Extend Features
See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed guidance on:
- Adding new components
- Extending LLM integration
- Adding authentication
- Implementing LangGraph agents
- Deployment strategies

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Run linter
npm run lint

# Check TypeScript
npx tsc --noEmit
```

## File a Bug / Feature Request

The MVP is production-ready and feature-complete for the initial scope. Future enhancements documented in README.md.

## Tips

1. **Hot Reload**: Changes save automatically
2. **Browser DevTools**: Use React DevTools extension
3. **PDF Testing**: Use simple PDFs first, try with complex ones later
4. **Mock Mode**: Works great without OpenAI key for testing UI/UX

## Still Need Help?

1. Check [README.md](README.md) for detailed documentation
2. See [DEVELOPMENT.md](DEVELOPMENT.md) for architecture guide
3. Review code comments in component files
4. Check TypeScript types in `types/index.ts`

---

**Ready to ace interviews?** 🚀 Start with the home page and upload your resume!
