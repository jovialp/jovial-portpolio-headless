import { NoteItem } from "@/types/notes";
import { Badge } from "@/components/ui/badge";
import { X, Code, FileText, Lightbulb } from "lucide-react";
import { RichTextRenderer } from "../RichTextRenderer";

interface TopicDetailsPanelProps {
  note: NoteItem | null;
  onClose: () => void;
}

export function TopicDetailsPanel({ note, onClose }: TopicDetailsPanelProps) {
  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center border border-border/50 rounded-lg bg-muted/20">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="mono text-sm">Select a topic to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 border border-border/50 rounded-lg bg-card/50 backdrop-blur-sm ">
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-border/50 bg-muted/30">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="mono text-xs">
              {note.parentTopic.name}
            </Badge>
            <Badge variant="secondary" className="mono text-xs">
              {note.type}
            </Badge>
          </div>
          <h2 className="text-xl font-medium text-foreground">{note.topic}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Close details"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-20rem)]">
        {/* Explanation */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-primary" />
            <h3 className="mono text-sm font-medium text-foreground">
              Explanation
            </h3>
          </div>
          <div className="text-muted-foreground leading-relaxed pl-6">
            <RichTextRenderer content={note.explanation} className="body-sm" />
          </div>
        </section>

        {/* Sample Code */}
        {note.sampleCode && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Code className="h-4 w-4 text-primary" />
              <h3 className="mono text-sm font-medium text-foreground">
                Sample Code
              </h3>
            </div>
            <div className="pl-6">
              <pre className="bg-background/80 border border-border/50 rounded-lg p-4 overflow-x-auto">
                <code className="mono text-sm text-foreground whitespace-pre-wrap">
                  <RichTextRenderer
                    content={note.sampleCode}
                    className="body-sm"
                  />
                </code>
              </pre>
            </div>
          </section>
        )}

        {/* Code Explanation */}
        {note.sampleCodeExplanation && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="mono text-sm font-medium text-foreground">
                Code Explanation
              </h3>
            </div>
            <div className="text-muted-foreground leading-relaxed pl-6">
              <RichTextRenderer
                content={note.sampleCodeExplanation}
                className="body-sm"
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
