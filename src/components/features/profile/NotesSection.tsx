"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // I need to create this first, or just use input for now? Better create textarea.
import { useState, useEffect } from "react";
import { Save } from "lucide-react";

interface NotesSectionProps {
    companyId: string;
}

export function NotesSection({ companyId }: NotesSectionProps) {
    // Store all notes as a Record<companyId, noteContent>
    const [allNotes, setAllNotes] = useLocalStorage<Record<string, string>>("company-notes", {});
    const [currentNote, setCurrentNote] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (allNotes[companyId]) {
            setCurrentNote(allNotes[companyId]);
        }
    }, [companyId, allNotes]);

    const handleSave = () => {
        setAllNotes({
            ...allNotes,
            [companyId]: currentNote,
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">My Notes</h3>
                <Button size="sm" onClick={handleSave} disabled={isSaved}>
                    {isSaved ? "Saved" : "Save Note"}
                    {!isSaved && <Save className="ml-2 h-3 w-3" />}
                </Button>
            </div>
            <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add your thesis notes, thoughts, or questions about this company..."
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
            />
        </div>
    );
}
