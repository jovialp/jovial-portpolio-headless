import "server-only";
import { safeFetchJSON } from "@/lib/fetcher";
import { RichTextContent } from "@/types";

type Notes = {
  title: string;
  content: RichTextContent;
};

type Contact = {
  contactType: "email" | "github" | "linkedin" | "phone";
  name: string;
};

export type Headerection = {
  title?: string;
  heading?: string;
  description?: string;
};
export type SiteSettings = {
  header: Headerection;
  contacts: Contact[];
  notes: Notes;
};

export async function fetchContactPage() {
  const defaultSettings: SiteSettings = {
    header: {
      title: "",
      heading: "",
      description: "",
    },
    contacts: [],
    notes: {
      title: "",
      content: {
        root: {
          children: [],
          type: "",
        },
      },
    },
  };

  const data = await safeFetchJSON<SiteSettings>(
    "/api/globals/contact-page",
    { cache: "no-store" },
    defaultSettings
  );

  return data ?? defaultSettings;
}
