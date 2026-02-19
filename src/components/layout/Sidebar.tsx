"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Building2, ListTodo, Bookmark, Settings, Search } from "lucide-react";

const navigation = [
    { name: "Discover", href: "/companies", icon: Search },
    { name: "Lists", href: "/lists", icon: ListTodo },
    { name: "Saved", href: "/saved", icon: Bookmark },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex w-64 flex-col border-r bg-card px-4 py-6">
            <div className="flex items-center gap-2 px-2 pb-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Building2 className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tight">VC Scout</span>
            </div>

            <div className="flex flex-1 flex-col gap-1">
                {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto border-t pt-4">
                <Link
                    href="/settings"
                    className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <Settings className="h-4 w-4" />
                    Settings
                </Link>
            </div>
        </div>
    );
}
