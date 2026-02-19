"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Globe, Share2, Code2, RefreshCw, AlertCircle } from "lucide-react";
import axios from "axios";

interface EnrichedData {
    summary: string;
    keywords: string[];
    socialLinks: Record<string, string>;
    technologies: string[];
    lastScrapedAt: string;
    sources: string[];
    ogImage?: string;
}

interface EnrichmentPanelProps {
    websiteUrl: string;
}

export function EnrichmentPanel({ websiteUrl }: EnrichmentPanelProps) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<EnrichedData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleEnrich = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("/api/enrich", { url: websiteUrl });
            setData(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data. The site might be blocking bots.");
        } finally {
            setLoading(false);
        }
    };

    if (!data && !loading && !error) {
        return (
            <div className="bg-muted/30 border border-dashed rounded-lg p-8 text-center space-y-4">
                <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium">Live Enrichment</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                        Use our AI scraper to fetch real-time data from the company's public website, including summary, keywords, and tech stack.
                    </p>
                </div>
                <Button onClick={handleEnrich} disabled={loading}>
                    {loading ? "Enriching..." : "Enrich Data"}
                </Button>
            </div>
        );
    }

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Enriched Intelligence
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleEnrich} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    </div>
                ) : data ? (
                    <>
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Summary</h4>
                            <p className="text-sm leading-relaxed">{data.summary}</p>
                        </div>

                        {data.keywords.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {data.keywords.map((keyword, i) => (
                                        <Badge key={i} variant="secondary" className="bg-background">
                                            {keyword}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(data.socialLinks).length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                        <Share2 className="h-3 w-3" /> Socials
                                    </h4>
                                    <div className="flex flex-col gap-1 text-sm">
                                        {Object.entries(data.socialLinks).map(([platform, url]) => (
                                            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline capitalize flex items-center gap-2">
                                                {platform}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {data.technologies.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                        <Code2 className="h-3 w-3" /> Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {data.technologies.map((tech) => (
                                            <span key={tech} className="text-xs font-mono border rounded px-1.5 py-0.5 bg-background">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                            <span>Source: {data.sources[0]}</span>
                            <span>Last updated: {new Date(data.lastScrapedAt).toLocaleDateString()}</span>
                        </div>
                    </>
                ) : null}
            </CardContent>
        </Card>
    );
}
