"use client";
import { useState, useMemo } from "react";
import { TypeAccordion } from "@/components/notes/TypeAccordion";
import { TopicDetailsPanel } from "@/components/notes/TopicDetailsPanel";
import { GroupedNotes, NoteItem } from "@/types/notes";
import { BookOpen } from "lucide-react";

export default function Notes({ data }: { data: GroupedNotes }) {
  const [selectedTopic, setSelectedTopic] = useState<NoteItem | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Filter to show only the selected topic's type and parent when a topic is selected
  const filteredGroupedNotes = useMemo(() => {
    if (!selectedTopic) return data;

    const selectedType = selectedTopic.type;
    const selectedParent = selectedTopic.parentTopic.name;

    return {
      [selectedType]: {
        [selectedParent]: data[selectedType]?.[selectedParent] || [],
      },
    };
  }, [data, selectedTopic]);

  const handleSelectTopic = (topic: NoteItem) => {
    // Toggle: if clicking the same topic, deselect it
    if (
      selectedTopic?.topic === topic.topic &&
      selectedTopic?.type === topic.type
    ) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(topic);
    }
  };

  const handleCloseDetails = () => {
    setSelectedTopic(null);
  };

  const handleAccordionChange = (isOpen: boolean) => {
    setIsAccordionOpen(isOpen);
    setSelectedTopic(null);
  };

  return (
    <div className="section-container">
      {/* Header */}
      <header className="mb-12 hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <span className="mono text-sm text-muted-foreground">
            Knowledge Base
          </span>
        </div>
        <h1 className="heading-xl mb-4 hidden">Technical Notes</h1>
      </header>

      {/* Topics Navigation - Full Width */}
      <section className="w-full mb-8">
        <h2 className="mono text-xs text-muted-foreground uppercase tracking-wider mb-4 mt-4 hidden">
          Topics
        </h2>
        <TypeAccordion
          groupedNotes={filteredGroupedNotes}
          selectedTopic={selectedTopic}
          onSelectTopic={handleSelectTopic}
          onAccordionChange={handleAccordionChange}
        />
      </section>

      {/* Topic Details */}
      {selectedTopic && (
        <section className="w-full mb-8 ">
          <TopicDetailsPanel
            note={selectedTopic}
            onClose={handleCloseDetails}
          />
        </section>
      )}

      {/* Description - Bottom (hidden when accordion is open or topic selected) */}
      {!isAccordionOpen && !selectedTopic && (
        <footer className="w-full pt-8 border-t border-border/50">
          <p className="body-md text-muted-foreground max-w-2xl">
            A personal collection of technical insights, patterns, and code
            snippets organized by domain and topic.
          </p>
        </footer>
      )}
    </div>
  );
}
