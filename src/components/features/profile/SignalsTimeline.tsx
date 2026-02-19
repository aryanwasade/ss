import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Signal } from "@/lib/data";
import { CircleDollarSign, Users, Rocket, Newspaper } from "lucide-react";

interface SignalsTimelineProps {
    signals: Signal[];
}

const iconMap = {
    funding: CircleDollarSign,
    hiring: Users,
    product: Rocket,
    news: Newspaper,
};

export function SignalsTimeline({ signals }: SignalsTimelineProps) {
    if (signals.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Signals</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">No recent signals found.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Recent Signals</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative border-l border-muted ml-3 space-y-6 pb-2">
                    {signals.map((signal, index) => {
                        const Icon = iconMap[signal.type];
                        return (
                            <div key={signal.id} className="ml-6 relative">
                                <span className="absolute -left-[37px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border ring-4 ring-background">
                                    <Icon className="h-3 w-3 text-muted-foreground" />
                                </span>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm">{signal.title}</span>
                                        <Badge variant="outline" className="text-[10px] uppercase">{signal.type}</Badge>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{signal.date}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
