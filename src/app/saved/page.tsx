"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CompanyStage } from "@/lib/data";

interface SavedSearch {
    id: string;
    name: string;
    query: string;
    industry: string | null;
    stage: CompanyStage | null;
    date: string;
}

export default function SavedSearchesPage() {
    const [savedSearches, setSavedSearches] = useLocalStorage<SavedSearch[]>("saved-searches", []);

    const deleteSearch = (id: string) => {
        setSavedSearches(savedSearches.filter((s) => s.id !== id));
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Saved Searches</h1>
                <p className="text-muted-foreground">
                    Quickly access your frequently used discovery filters.
                </p>
            </div>

            {savedSearches.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                    <h3 className="text-lg font-medium text-muted-foreground">No saved searches</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Save your filter combinations from the <Link href="/companies" className="text-primary hover:underline">Discovery page</Link>.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedSearches.map((search) => (
                        <Card key={search.id} className="hover:border-primary/50 transition-colors">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{search.name}</CardTitle>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-50 hover:opacity-100" onClick={() => deleteSearch(search.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardDescription className="text-xs">
                                    Saved on {new Date(search.date).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {search.query && (
                                        <Badge variant="secondary" className="font-normal text-xs">
                                            "{search.query}"
                                        </Badge>
                                    )}
                                    {search.industry && (
                                        <Badge variant="outline" className="font-normal text-xs">
                                            Industry: {search.industry}
                                        </Badge>
                                    )}
                                    {search.stage && (
                                        <Badge variant="outline" className="font-normal text-xs">
                                            Stage: {search.stage}
                                        </Badge>
                                    )}
                                    {!search.query && !search.industry && !search.stage && (
                                        <span className="text-xs text-muted-foreground italic">No filters applied</span>
                                    )}
                                </div>

                                <Button className="w-full" variant="secondary" asChild>
                                    <Link href={`/companies?q=${search.query}&industry=${search.industry || ''}&stage=${search.stage || ''}`}>
                                        Run Search <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
