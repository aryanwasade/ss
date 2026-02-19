import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Company } from "@/lib/data";
import { ExternalLink, MapPin, Calendar, Building2, Globe } from "lucide-react";
import Link from "next/link";
import { ListSelector } from "@/components/features/lists/ListSelector";

interface ProfileHeaderProps {
    company: Company;
}

export function ProfileHeader({ company }: ProfileHeaderProps) {
    return (
        <div className="bg-card border rounded-lg p-6 space-y-6">
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                        {company.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">{company.name}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Link
                                href={company.website}
                                target="_blank"
                                className="flex items-center gap-1 hover:text-primary transition-colors"
                            >
                                <Globe className="h-3 w-3" />
                                {new URL(company.website).hostname}
                                <ExternalLink className="h-3 w-3" />
                            </Link>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {company.location}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Founded {company.foundedYear}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <ListSelector companyId={company.id} />
                    <Button>Enrich Data</Button>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-muted-foreground max-w-2xl">
                    {company.description}
                </p>

                <div className="flex gap-2">
                    <Badge variant="secondary" className="px-3 py-1">
                        <Building2 className="mr-1 h-3 w-3" />
                        {company.industry}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                        {company.stage}
                    </Badge>
                </div>
            </div>
        </div>
    );
}
