import "server-only";
import { safeFetchJSON } from "@/lib/fetcher";
import { ExperienceData, RichTextContent, SkillData } from "@/types";
import { fetchPublishedExperiences } from "@/lib/experience";
import { fetchPublishedSkills } from "@/lib/skills";

export type SummarySection = {
  label?: string;
  description?: RichTextContent;
};
export type SiteSettings = {
  pageTitle: string;
  summarySection: SummarySection;
  experienceSectionLabel: string;
  skillSectionLabel: string;
  howIWorkSection: {
    label: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  experience: ExperienceData[];
  skills: SkillData[];
};

export async function fetchAboutPage() {
  const defaultSettings: SiteSettings = {
    pageTitle: "",
    summarySection: {
      label: "",
      description: {
        root: {
          children: [],
          type: "",
        },
      },
    },
    experienceSectionLabel: "",
    skillSectionLabel: "",
    howIWorkSection: {
      label: "",
      items: [],
    },
    experience: [],
    skills: [],
  };

  const data = await safeFetchJSON<SiteSettings>(
    "/api/globals/aboutPage",
    { cache: "no-store" },
    defaultSettings
  );

  const experience = await fetchPublishedExperiences();
  data.experience = experience;

  const skills = await fetchPublishedSkills();
  data.skills = skills;

  return data ?? defaultSettings;
}
