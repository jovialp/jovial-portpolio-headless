import { RichTextContent } from "@/types";

export interface NoteItem {
  type: string;
  parentTopic: {
    name: string;
    type: string;
  };
  topic: string;
  explanation: RichTextContent | null;
  sampleCode: RichTextContent | null;
  sampleCodeExplanation: RichTextContent | null;
}

export interface GroupedNotes {
  [type: string]: {
    [parentTopicName: string]: NoteItem[];
  };
}

export type TopicType =
  | "frontend"
  | "backend"
  | "ai"
  | "database"
  | "infra"
  | "tools";

export type TopicDetails = {
  id: string;
  topic: string;
  explanation: RichTextContent;
  sampleCode?: RichTextContent;
  sampleCodeExplanation?: RichTextContent;
};

export type ParentTopicGroup = {
  parentTopicName: string;
  topics: TopicDetails[];
};

export type NotesByType = {
  type: TopicType;
  parentTopics: ParentTopicGroup[];
};
