"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bookmark, Plus, Check } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

// Lists are stored as: Record<ListName, CompanyId[]>
type ListsStore = Record<string, string[]>;

interface ListSelectorProps {
    companyId: string;
}

export function ListSelector({ companyId }: ListSelectorProps) {
    const [lists, setLists] = useLocalStorage<ListsStore>("user-lists", {
        favorites: [],
        "watch-list": [],
    });
    const [isCreating, setIsCreating] = useState(false);
    const [newListName, setNewListName] = useState("");

    const toggleInList = (listName: string) => {
        const currentList = lists[listName] || [];
        if (currentList.includes(companyId)) {
            setLists({
                ...lists,
                [listName]: currentList.filter((id) => id !== companyId),
            });
        } else {
            setLists({
                ...lists,
                [listName]: [...currentList, companyId],
            });
        }
    };

    const createList = () => {
        if (!newListName.trim()) return;
        setLists({
            ...lists,
            [newListName.trim()]: [companyId],
        });
        setNewListName("");
        setIsCreating(false);
    };

    const isInAnyList = Object.values(lists).some((ids) => ids.includes(companyId));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={isInAnyList ? "default" : "outline"}>
                    <Bookmark className={`mr-2 h-4 w-4 ${isInAnyList ? "fill-current" : ""}`} />
                    {isInAnyList ? "Saved" : "Save to List"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Lists</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.keys(lists).map((listName) => {
                    const isSelected = lists[listName].includes(companyId);
                    return (
                        <DropdownMenuItem
                            key={listName}
                            onClick={(e) => {
                                e.preventDefault();
                                toggleInList(listName);
                            }}
                            className="flex justify-between cursor-pointer"
                        >
                            <span className="capitalize">{listName}</span>
                            {isSelected && <Check className="h-4 w-4" />}
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuSeparator />
                <div className="p-2">
                    {isCreating ? (
                        <div className="flex flex-col gap-2">
                            <Input
                                size={1}
                                placeholder="List name..."
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                className="h-8 text-xs"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <Button size="sm" className="h-7 text-xs flex-1" onClick={createList}>Create</Button>
                                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setIsCreating(false)}>Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start h-8 px-2"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCreating(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create new list
                        </Button>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
