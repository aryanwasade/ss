"use client";

import { useState, useMemo, useEffect } from "react";
import { companies, CompanyStage } from "@/lib/data";
import { CompanyTable } from "@/components/features/companies/CompanyTable";
import { CompanyFilters } from "@/components/features/companies/CompanyFilters";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SavedSearch {
    id: string;
    name: string;
    query: string;
    industry: string | null;
    stage: CompanyStage | null;
    date: string;
}

export default function CompaniesPage() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(searchParams.get("industry") || null);
    const [selectedStage, setSelectedStage] = useState<CompanyStage | null>(searchParams.get("stage") as CompanyStage || null);

    const [savedSearches, setSavedSearches] = useLocalStorage<SavedSearch[]>("saved-searches", []);
    const [newSearchName, setNewSearchName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Extract unique industries and stages for filters
    const industries = useMemo(() => Array.from(new Set(companies.map((c) => c.industry))).sort(), []);
    const stages = useMemo(() => Array.from(new Set(companies.map((c) => c.stage))), []);

    const filteredCompanies = useMemo(() => {
        return companies.filter((company) => {
            const matchesSearch =
                company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                company.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesIndustry = selectedIndustry ? company.industry === selectedIndustry : true;
            const matchesStage = selectedStage ? company.stage === selectedStage : true;

            return matchesSearch && matchesIndustry && matchesStage;
        });
    }, [searchQuery, selectedIndustry, selectedStage]);

    const handleSaveSearch = () => {
        if (!newSearchName.trim()) return;
        const newSearch: SavedSearch = {
            id: crypto.randomUUID(),
            name: newSearchName,
            query: searchQuery,
            industry: selectedIndustry,
            stage: selectedStage,
            date: new Date().toISOString()
        };
        setSavedSearches([...savedSearches, newSearch]);
        setNewSearchName("");
        setIsDialogOpen(false);
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
                        <p className="text-muted-foreground">
                            Find and track high-signal companies matching your thesis.
                        </p>
                    </div>
                    {(searchQuery || selectedIndustry || selectedStage) && (
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Save className="mr-2 h-4 w-4" /> Save Search
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Save this search</DialogTitle>
                                    <DialogDescription>
                                        Save your current filters to quickly access them later.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                    <Input
                                        placeholder="Search name (e.g. 'SaaS Seed Stage')"
                                        value={newSearchName}
                                        onChange={(e) => setNewSearchName(e.target.value)}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                    <Button onClick={handleSaveSearch}>Save</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <CompanyFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedIndustry={selectedIndustry}
                        setSelectedIndustry={setSelectedIndustry}
                        selectedStage={selectedStage}
                        setSelectedStage={setSelectedStage}
                        industries={industries}
                        stages={stages}
                    />
                </div>
                <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredCompanies.length} results
                        </div>
                    </div>
                    <CompanyTable companies={filteredCompanies} />
                </div>
            </div>
        </div>
    );
}
