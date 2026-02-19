import { companies } from "@/lib/data";
import { ProfileHeader } from "@/components/features/profile/ProfileHeader";
import { SignalsTimeline } from "@/components/features/profile/SignalsTimeline";
import { NotesSection } from "@/components/features/profile/NotesSection";
import { EnrichmentPanel } from "@/components/features/enrichment/EnrichmentPanel";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export function generateStaticParams() {
    return companies.map((company) => ({
        id: company.id,
    }));
}

export default async function CompanyProfilePage({ params }: PageProps) {
    const { id } = await params;
    const company = companies.find((c) => c.id === id);

    if (!company) {
        notFound();
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <Link
                href="/companies"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Results
            </Link>

            <ProfileHeader company={company} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <EnrichmentPanel websiteUrl={company.website} />
                </div>

                <div className="md:col-span-1 space-y-6">
                    <SignalsTimeline signals={company.signals} />
                    <NotesSection companyId={company.id} />
                </div>
            </div>
        </div>
    );
}
