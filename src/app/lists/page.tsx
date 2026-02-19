"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { companies, Company } from "@/lib/data";
import { CompanyTable } from "@/components/features/companies/CompanyTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Trash2, FileJson, FileSpreadsheet } from "lucide-react";
import { useState, useMemo } from "react";

// Lists are stored as: Record<ListName, CompanyId[]>
type ListsStore = Record<string, string[]>;

export default function ListsPage() {
    const [lists, setLists] = useLocalStorage<ListsStore>("user-lists", {
        favorites: [],
        "watch-list": [],
    });

    const listNames = Object.keys(lists);
    const [activeTab, setActiveTab] = useState(listNames[0] || "favorites");

    // Sync active tab if lists change (e.g. deletion)
    if (!listNames.includes(activeTab) && listNames.length > 0) {
        setActiveTab(listNames[0]);
    }

    const activeCompanyIds = lists[activeTab] || [];

    const activeCompanies = useMemo(() => {
        return companies.filter(c => activeCompanyIds.includes(c.id));
    }, [activeCompanyIds]);

    const deleteList = (name: string) => {
        if (confirm(`Are you sure you want to delete the list "${name}"?`)) {
            const newLists = { ...lists };
            delete newLists[name];
            setLists(newLists);
        }
    };

    const removeCompanyFromList = (listName: string, companyId: string) => {
        // This logic would ideally be in CompanyTable actions, but for now we rely on the Profile page to remove.
        // To make this page fully functional, we'd need to pass an "onRemove" prop to CompanyTable or handle it there.
        // For this MVP, we will just allow viewing.
    };

    const exportData = (format: 'csv' | 'json') => {
        const dataToExport = activeCompanies.map(c => ({
            name: c.name,
            website: c.website,
            industry: c.industry,
            stage: c.stage,
            location: c.location,
            description: c.description
        }));

        let blob: Blob;
        let filename = `${activeTab}-export`;

        if (format === 'json') {
            blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
            filename += '.json';
        } else {
            // Simple CSV conversion
            const headers = Object.keys(dataToExport[0] || {}).join(',');
            const rows = dataToExport.map(c => Object.values(c).map(v => `"${v}"`).join(',')).join('\n');
            blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
            filename += '.csv';
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">My Lists</h1>
                <p className="text-muted-foreground">
                    Manage your saved companies and export data for your thesis.
                </p>
            </div>

            {listNames.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                    <h3 className="text-lg font-medium text-muted-foreground">No lists found</h3>
                    <p className="text-sm text-muted-foreground mt-2">Start by saving companies from the Discovery page.</p>
                </div>
            ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <div className="flex items-center justify-between overflow-x-auto pb-2">
                        <TabsList>
                            {listNames.map(name => (
                                <TabsTrigger key={name} value={name} className="capitalize">{name}</TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {listNames.map(name => (
                        <TabsContent key={name} value={name} className="space-y-4">
                            <div className="flex justify-between items-center bg-card p-4 rounded-lg border">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                                    <span className="text-muted-foreground text-sm">({lists[name].length} companies)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
                                        <FileSpreadsheet className="mr-2 h-4 w-4" /> CSV
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => exportData('json')}>
                                        <FileJson className="mr-2 h-4 w-4" /> JSON
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => deleteList(name)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete List
                                    </Button>
                                </div>
                            </div>

                            <CompanyTable companies={activeCompanies} />
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    )
}
