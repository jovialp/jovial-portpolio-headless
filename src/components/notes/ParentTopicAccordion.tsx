import { NoteItem } from "@/types/notes";
import { TopicBadgeList } from "./TopicBadgeList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Folder } from "lucide-react";

interface ParentTopicAccordionProps {
  parentTopics: { [parentTopicName: string]: NoteItem[] };
  selectedTopic: NoteItem | null;
  onSelectTopic: (topic: NoteItem) => void;
  onAccordionChange?: (isOpen: boolean) => void;
}

export function ParentTopicAccordion({
  parentTopics,
  selectedTopic,
  onSelectTopic,
  onAccordionChange,
}: ParentTopicAccordionProps) {
  const handleTypeValueChange = (value: string) => {
    onAccordionChange?.(!!value);
  };
  return (
    <Accordion
      type="single"
      collapsible
      className="space-y-1"
      onValueChange={handleTypeValueChange}
    >
      {Object.entries(parentTopics).map(([parentName, topics]) => (
        <AccordionItem key={parentName} value={parentName} className="border-0">
          <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-muted/50 hover:no-underline transition-colors data-[state=open]:bg-muted/30">
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {parentName}
              </span>
              <span className="mono text-xs text-muted-foreground">
                ({topics.length})
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-3">
            <TopicBadgeList
              topics={topics}
              selectedTopic={selectedTopic}
              onSelectTopic={onSelectTopic}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
