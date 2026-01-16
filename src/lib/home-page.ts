import "server-only";
import { safeFetchJSON } from "@/lib/fetcher";

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
export type SiteSettings = {
  hero: HeroSection;
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
  };

  const data = await safeFetchJSON<SiteSettings>(
    "/api/globals/home-page",
    { cache: "no-store" },
    defaultSettings
  );

  return data ?? defaultSettings;
}
