# Implementation Plan - VC Intelligence Interface

## Goal
Build a premium-quality VC discovery interface with a "real product" feel, featuring company search/filtering and a live "AI enrichment" feature that pulls data from public URLs.

## User Review Required
> [!IMPORTANT]
> **Live Enrichment Strategy**: Since I do not have a dedicated external AI scraping API key (like Firecrawl or similar), I will implement a **server-side "Lite" Enrichment** using `cheerio` to fetch and parse public meta tags (Open Graph, Twitter cards, standard metadata) from the target URL. This satisfies the "real live data pull" requirement without needing external paid subscriptions. 
>
> **Mock Data**: I will seed the app with ~20-50 high-quality mock companies to demonstrate the filters and search visually.

## Proposed Changes

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom components inspired by Shadcn UI (Buttons, Inputs, Cards, Tables, Badges)
- **State Management**: React Context / Hooks for Lists & Saved Searches (persisted to localStorage)
- **Data Fetching**: Server Actions or API Routes

### Component Architecture

#### Core (`src/components/ui`)
- `Button`, `Input`, `Badge`, `Card`, `Skeleton`, `Table` (with sorting/pagination headers)
- `Sidebar` (Navigation)
- `Layout` (Main wrapper)

#### Features (`src/components/features`)
- **Companies**:
    - `CompanyTable`: Data grid with sortable columns.
    - `CompanyFilters`: Faceted filters for Industry, Stage, Location.
    - `CompanyCard`: For grid view (optional) or profile header.
- **Profile**:
    - `EnrichmentPanel`: The "Live Enrichment" trigger and display area.
    - `SignalsTimeline`: Visual timeline of company events.
    - `ActionToolbar`: Save, Note, Export buttons.
- **Lists**:
    - `ListManager`: Create/Delete/Edit lists.

### Data Model (`src/lib/types.ts`)
```typescript
interface Company {
  id: string;
  name: string;
  website: string;
  logoUrl?: string;
  description: string;
  industry: string;
  stage: 'Seed' | 'Series A' | 'Series B' | 'Growth';
  location: string;
  foundedYear: number;
  signals: Signal[];
  enrichedData?: EnrichedData;
}

interface Signal {
  id: string;
  type: 'funding' | 'hiring' | 'product' | 'news';
  date: string;
  title: string;
  sourceUrl?: string;
}

interface EnrichedData {
  summary: string;
  keywords: string[];
  technologies?: string[];
  socialLinks: Record<string, string>;
  lastScrapedAt: string;
}
```

### API Routes

#### `POST /api/enrich`
- **Input**: `{ url: string }`
- **Logic**:
    1. Validate URL.
    2. Server-side `fetch(url)` (with user-agent spoofing to avoid basic bots blocks).
    3. Load HTML into `cheerio`.
    4. Extract:
        - `title`, `meta[name="description"]`
        - `og:image`, `og:title`, `og:description`
        - Identify social links (twitter, linkedin, github) from `a` tags.
        - Heuristic extraction of "technologies" (e.g. looking for "Next.js", "React", "AWS" in scripts or text).
    5. Return JSON payload.

### Pages
- `src/app/page.tsx` -> Redirect to `/companies`
- `src/app/companies/page.tsx` -> Search & Discovery interface
- `src/app/companies/[id]/page.tsx` -> Detailed Profile & Enrichment
- `src/app/lists/page.tsx` -> Saved Lists management

## Verification Plan

### Automated Tests
- None planned for this short sprint (focus on UI/Feature speed).

### Manual Verification
1. **Search & Filter**:
   - Go to `/companies`.
   - Type "AI" in search -> Verify table filters.
   - Click "Series A" filter -> Verify results update.
2. **Profile & Enrichment**:
   - Click a company.
   - Verify layout looks "premium" (spacing, fonts).
   - Click **"Enrich"** button.
   - Verify loading state (spinner/skeleton).
   - Verify "real" data appears (try with a real URL like `vercel.com` or `openai.com` if I can patch the mock data to use real URLs, or just manually enter one).
3. **Persistence**:
   - Save a company to a "New List".
   - Refresh page.
   - Go to `/lists`.
   - Verify list exists and contains the company.
