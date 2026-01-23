import { NoteItem, GroupedNotes } from "@/types/notes";
import { ParentTopicAccordion } from "./ParentTopicAccordion";
import { formatTypeLabel } from "@/lib/notesUtils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout, Server, Brain, Database, Wrench, Code } from "lucide-react";

interface TypeAccordionProps {
  groupedNotes: GroupedNotes;
  selectedTopic: NoteItem | null;
  onSelectTopic: (topic: NoteItem) => void;
  onAccordionChange?: (isOpen: boolean) => void;
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  frontend: Layout,
  backend: Server,
  ai: Brain,
  database: Database,
  tools: Wrench,
};

function getTypeIcon(type: string) {
  const Icon = typeIcons[type.toLowerCase()] || Code;
  return <Icon className="h-4 w-4" />;
}

function countTopics(parentTopics: { [key: string]: NoteItem[] }): number {
  return Object.values(parentTopics).reduce(
    (sum, topics) => sum + topics.length,
    0,
  );
}

export function TypeAccordion({
  groupedNotes,
  selectedTopic,
  onSelectTopic,
  onAccordionChange,
}: TypeAccordionProps) {
  const handleTypeValueChange = (value: string) => {
    onAccordionChange?.(!!value);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="space-y-2"
      onValueChange={handleTypeValueChange}
    >
      {Object.entries(groupedNotes).map(([type, parentTopics]) => (
        <AccordionItem
          key={type}
          value={type}
          className="border border-border/50 rounded-lg overflow-hidden bg-card/30"
        >
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 hover:no-underline transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                {getTypeIcon(type)}
              </div>
              <div className="text-left">
                <span className="font-medium text-foreground">
                  {formatTypeLabel(type)}
                </span>
                <span className="ml-2 mono text-xs text-muted-foreground">
                  {countTopics(parentTopics)} topics
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ParentTopicAccordion
              parentTopics={parentTopics}
              selectedTopic={selectedTopic}
              onSelectTopic={onSelectTopic}
              onAccordionChange={onAccordionChange}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
