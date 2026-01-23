import { NoteItem } from "@/types/notes";
import { cn } from "@/lib/utils";

interface TopicBadgeListProps {
  topics: NoteItem[];
  selectedTopic: NoteItem | null;
  onSelectTopic: (topic: NoteItem) => void;
}

export function TopicBadgeList({
  topics,
  selectedTopic,
  onSelectTopic,
}: TopicBadgeListProps) {
  return (
    <div className="flex flex-wrap gap-2 pl-4">
      {topics.map((topic, index) => {
        const isSelected =
          selectedTopic?.topic === topic.topic &&
          selectedTopic?.parentTopic.name === topic.parentTopic.name;

        return (
          <button
            key={`${topic.topic}-${index}`}
            onClick={() => onSelectTopic(topic)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-full border transition-all duration-200",
              "hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
              isSelected
                ? "bg-primary/20 border-primary text-primary font-medium"
                : "bg-muted/30 border-border/50 text-muted-foreground",
            )}
          >
            {topic.topic}
          </button>
        );
      })}
    </div>
  );
}
