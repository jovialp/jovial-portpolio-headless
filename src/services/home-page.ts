import "server-only";
import { safeFetchJSON } from "@/lib/fetcher";
import { ProjectData } from "@/types";
import { fetchFeaturedProjects } from "../lib/project";

type TechStackItem = {
  name: string;
};

type CallToAction = {
  label: string;
  href: string;
};

export type HeroSection = {
  techstack?: TechStackItem[];
  headline1?: string;
  headline2?: string;
  description?: string;
  callToAction?: CallToAction;
};

export type FeaturedProjectsSection = {
  label?: string;
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
};
export type SiteSettings = {
  hero: HeroSection;
  featuredProjectsSection: FeaturedProjectsSection;
  projects: ProjectData[];
};

export async function fetchHomePage(): Promise<SiteSettings> {
  const defaultSettings: SiteSettings = {
    hero: {
      techstack: [],
      headline1: "",
      headline2: "",
      description: "",
      callToAction: { label: "", href: "" },
    },
    featuredProjectsSection: {
      label: "",
      heading: "",
      ctaLabel: "",
      ctaHref: "",
    },
    projects: [],
  };

  const data = await safeFetchJSON<SiteSettings>(
    "/api/globals/home-page",
    { cache: "no-store" },
    defaultSettings
  );

  const projects = await fetchFeaturedProjects();
  data.projects = projects;

  return data ?? defaultSettings;
}
