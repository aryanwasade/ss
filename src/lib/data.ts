export type CompanyStage = "Seed" | "Series A" | "Series B" | "Growth";

export interface Signal {
    id: string;
    type: "funding" | "hiring" | "product" | "news";
    date: string;
    title: string;
    sourceUrl?: string;
}

export interface Company {
    id: string;
    name: string;
    website: string;
    logoUrl?: string;
    description: string;
    industry: string;
    stage: CompanyStage;
    location: string;
    foundedYear: number;
    signals: Signal[];
    lastEnriched?: string;
}

export const companies: Company[] = [
    {
        id: "1",
        name: "Nebula AI",
        website: "https://nebula-ai.example.com",
        description: "Generative AI platform for enterprise knowledge management.",
        industry: "Artificial Intelligence",
        stage: "Series A",
        location: "San Francisco, CA",
        foundedYear: 2023,
        signals: [
            { id: "s1", type: "funding", date: "2024-01-15", title: "Raised $15M Series A led by Sequoia" },
            { id: "s2", type: "product", date: "2024-02-01", title: "Launched Enterprise Connect 2.0" }
        ]
    },
    {
        id: "2",
        name: "GreenFlow",
        website: "https://greenflow.example.com",
        description: "Sustainable supply chain optimization software.",
        industry: "Climate Tech",
        stage: "Seed",
        location: "Berlin, Germany",
        foundedYear: 2024,
        signals: [
            { id: "s3", type: "hiring", date: "2024-02-10", title: "Hiring VP of Engineering" }
        ]
    },
    {
        id: "3",
        name: "Quantum Leap",
        website: "https://quantumleap.example.com",
        description: "Quantum computing algorithms for financial modeling.",
        industry: "Deep Tech",
        stage: "Series B",
        location: "New York, NY",
        foundedYear: 2021,
        signals: []
    },
    {
        id: "4",
        name: "HealthSync",
        website: "https://healthsync.example.com",
        description: "Interoperability layer for electronic health records.",
        industry: "Healthcare",
        stage: "growth",
        location: "Boston, MA",
        foundedYear: 2020,
        signals: [
            { id: "s4", type: "news", date: "2024-01-20", title: "Partnership with Mayo Clinic announced" }
        ]
    },
    {
        id: "5",
        name: "Orbital Space",
        website: "https://orbital.example.com",
        description: "Low-cost satellite launch systems for smallsats.",
        industry: "Aerospace",
        stage: "Series A",
        location: "Los Angeles, CA",
        foundedYear: 2022,
        signals: []
    },
    {
        id: "6",
        name: "CyberShield",
        website: "https://cybershield.example.com",
        description: "AI-driven threat detection for cloud infrastructure.",
        industry: "Cybersecurity",
        stage: "Series B",
        location: "Tel Aviv, Israel",
        foundedYear: 2021,
        signals: []
    },
    {
        id: "7",
        name: "DevToolz",
        website: "https://devtoolz.example.com",
        description: "Developer productivity platform for remote teams.",
        industry: "Developer Tools",
        stage: "Seed",
        location: "Remote",
        foundedYear: 2023,
        signals: []
    },
    {
        id: "8",
        name: "FinLoop",
        website: "https://finloop.example.com",
        description: "Embedded finance API for marketplaces.",
        industry: "Fintech",
        stage: "Series A",
        location: "London, UK",
        foundedYear: 2022,
        signals: []
    },
    {
        id: "9",
        name: "BioGen",
        website: "https://biogen.example.com",
        description: "CRISPR-based therapeutics for rare diseases.",
        industry: "Biotech",
        stage: "Series B",
        location: "Cambridge, MA",
        foundedYear: 2021,
        signals: []
    },
    {
        id: "10",
        name: "EduVerse",
        website: "https://eduverse.example.com",
        description: "Immersive VR learning environments for K-12.",
        industry: "EdTech",
        stage: "Seed",
        location: "Austin, TX",
        foundedYear: 2024,
        signals: []
    },
    {
        id: "11",
        name: "Solaris",
        website: "https://solaris.example.com",
        description: "Next-gen solar panels with higher efficiency.",
        industry: "Climate Tech",
        stage: "Series A",
        location: "Phoenix, AZ",
        foundedYear: 2023,
        signals: []
    },
    {
        id: "12",
        name: "LogiChain",
        website: "https://logichain.example.com",
        description: "Blockchain-based logistics tracking.",
        industry: "Supply Chain",
        stage: "Seed",
        location: "Singapore",
        foundedYear: 2024,
        signals: []
    },
    {
        id: "13",
        name: "Voxel Labs",
        website: "https://voxel.example.com",
        description: "3D visual search for e-commerce.",
        industry: "Artificial Intelligence",
        stage: "Seed",
        location: "Toronto, Canada",
        foundedYear: 2023,
        signals: []
    },
    {
        id: "14",
        name: "MediCare+",
        website: "https://medicareplus.example.com",
        description: "Telemedicine platform for seniors.",
        industry: "Healthcare",
        stage: "Series A",
        location: "Miami, FL",
        foundedYear: 2022,
        signals: []
    }
] as Company[];
