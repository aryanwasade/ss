# Walkthrough: VC Intelligence Interface

I have built a comprehensive VC discovery and enrichment platform. Here is an overview of the features:

## 1. Discovery Engine (`/companies`)
- **Faceted Search**: Filter companies by Industry and Stage using the sidebar filters.
- **Global Search**: Search by name, description, or location.
- **Save Search**: Save complex filter combinations to "Saved Searches" for quick access later.
- **Data Table**: Sortable and responsive table view of companies.

## 2. Company Profile (`/companies/[id]`)
- **Detailed View**: See company overview, location, and founded date.
- **Signals Timeline**: Visual timeline of funding, hiring, and product news.
- **Live Enrichment**: Click the **Enrich Data** button (in the panel) to fetch real-time data from the company's website (simulated via server-side scraping).
    - Extracts: Summary, Keywords, Tech Stack, Social Links.
- **Thesis Notes**: Add private notes to any company profile (persisted locally).
- **Save to List**: Add companies to "Favorites", "Watch List", or create custom lists.

## 3. Lists Management (`/lists`)
- **My Lists**: View all your saved lists in a tabbed interface.
- **Export**: Download any list as **CSV** or **JSON** for external analysis.
- **Management**: Delete lists or remove items.

## 4. Saved Searches (`/saved`)
- **Quick Access**: View all your saved search queries.
- **One-Click Run**: Re-run any saved search with a single click.

## Technical Highlights
- **Architecture**: Next.js 14 App Router with Server Actions.
- **Styling**: Tailwind CSS with a custom "Premium" Shadcn UI theme.
- **State**: `localStorage` persistence for Lists, Notes, and Saved Searches (Client-side privacy).
- **Enrichment**: Server-side API (`/api/enrich`) using `Cheerio` and `Axios` to scrape public metadata.

## How to Run
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`
