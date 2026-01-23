import "server-only";
import { safeFetchJSON } from "@/lib/fetcher";
import { RichTextContent } from "@/types";
import { GroupedNotes } from "@/types/notes";

type TopicDetailsApi = {
  id: string;
  topic: string;
  explanation: RichTextContent;
  sampleCode?: RichTextContent;
  sampleCodeExplanation?: RichTextContent;
  parentTopic: {
    name: string;
    category: string;
  };
};

type TopicDetailsApiResponse = {
  docs: TopicDetailsApi[];
};

export async function fetchNotesPage(): Promise<GroupedNotes> {
  const defaultData: GroupedNotes = {};

  const data = await safeFetchJSON<TopicDetailsApiResponse>(
    "/api/topic-details?limit=1000&depth=1",
    { cache: "no-store" },
    { docs: [] },
  );

  if (!data?.docs?.length) {
    return defaultData;
  }

  const grouped: GroupedNotes = {};

  data.docs.forEach((item) => {
    const type = item.parentTopic.category;
    const parentName = item.parentTopic.name;

    if (!grouped[type]) {
      grouped[type] = {};
    }

    if (!grouped[type][parentName]) {
      grouped[type][parentName] = [];
    }

    grouped[type][parentName].push({
      type,
      parentTopic: {
        name: parentName,
        type,
      },
      topic: item.topic,
      explanation: item.explanation,
      sampleCode: item.sampleCode ?? null,
      sampleCodeExplanation: item.sampleCodeExplanation ?? null,
    });
  });

  return grouped;
}
