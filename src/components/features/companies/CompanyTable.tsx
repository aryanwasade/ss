"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Company } from "@/lib/data";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

interface CompanyTableProps {
    companies: Company[];
}

export function CompanyTable({ companies }: CompanyTableProps) {
    const router = useRouter();

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">Company</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Founded</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companies.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No companies found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        companies.map((company) => (
                            <TableRow
                                key={company.id}
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => router.push(`/companies/${company.id}`)}
                            >
                                <TableCell className="font-medium">
                                    <div className="flex flex-col">
                                        <span className="text-base font-semibold">{company.name}</span>
                                        <span className="text-xs text-muted-foreground line-clamp-1">{company.description}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="rounded-sm font-normal">
                                        {company.industry}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="rounded-sm font-normal">
                                        {company.stage}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">{company.location}</TableCell>
                                <TableCell className="text-right text-muted-foreground text-sm">{company.foundedYear}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
