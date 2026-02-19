# VC Intelligence Interface

A premium "AI Scout" interface for Venture Capital discovery, featuring Harmonic-style workflows, live data enrichment, and thesis-driven filtering.

![VC Intelligence](/screenshot-placeholder.png)

## Features

- **Discovery Engine**: Fast search and faceted filters (Industry, Stage, Location).
- **Company Profiles**: Detailed views with signal timelines and thesis notes.
- **Live Enrichment**: Server-side "Lite" extraction of public metadata (socials, tech stack, summaries) using AI scraping techniques.
- **Workflow Tools**: 
  - Save companies to custom lists.
  - Export data to CSV/JSON.
  - Save complex search queries.
- **Privacy First**: All lists and notes are persisted locally on your device (`localStorage`).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Scraping**: Cheerio + Axios (Server Actions)
- **Language**: TypeScript

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vc-intelligence.git
   cd vc-intelligence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Navigate to `http://localhost:3000`.

## Environment Variables

No external API keys are strictly required for the "Lite" enrichment to work (it parses public meta tags). 

## Deployment

This project is optimized for deployment on Vercel.

```bash
npx vercel
```
