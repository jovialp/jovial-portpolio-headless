import "server-only";
import { safeFetchJSON } from "@/lib/fetcher";

type NavItem = {
  label: string;
  href: string;
};

export type SiteSettings = {
  navigation?: NavItem[];
  footerText?: string;
};

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const defaultSettings: SiteSettings = {
    navigation: [],
    footerText: "",
  };

  const data = await safeFetchJSON<SiteSettings>(
    "/api/globals/site-settings",
    { cache: "no-store" },
    defaultSettings
  );

  return data ?? defaultSettings;
}
