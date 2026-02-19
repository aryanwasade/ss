"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { CompanyStage } from "@/lib/data";

interface CompanyFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedIndustry: string | null;
    setSelectedIndustry: (industry: string | null) => void;
    selectedStage: CompanyStage | null;
    setSelectedStage: (stage: CompanyStage | null) => void;
    industries: string[];
    stages: CompanyStage[];
}

export function CompanyFilters({
    searchQuery,
    setSearchQuery,
    selectedIndustry,
    setSelectedIndustry,
    selectedStage,
    setSelectedStage,
    industries,
    stages,
}: CompanyFiltersProps) {
    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search companies by name, description, or location..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                    <Badge
                        key={industry}
                        variant={selectedIndustry === industry ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedIndustry(selectedIndustry === industry ? null : industry)}
                    >
                        {industry}
                    </Badge>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                {stages.map((stage) => (
                    <Badge
                        key={stage}
                        variant={selectedStage === stage ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}
                    >
                        {stage}
                    </Badge>
                ))}
            </div>

            {(selectedIndustry || selectedStage || searchQuery) && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        setSearchQuery("");
                        setSelectedIndustry(null);
                        setSelectedStage(null);
                    }}
                    className="h-auto px-2 text-muted-foreground"
                >
                    Clear filters <X className="ml-1 h-3 w-3" />
                </Button>
            )}
        </div>
    );
}
