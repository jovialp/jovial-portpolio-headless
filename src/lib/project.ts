import "server-only";
import { safeFetchJSON } from "@/lib/fetcher";
import { PayloadResponse, ProjectData } from "@/types";

export async function fetchProjects() {
  const defaultResp: PayloadResponse<ProjectData> = { docs: [] };

  const data = await safeFetchJSON<PayloadResponse<ProjectData>>(
    "/api/projects",
    { next: { revalidate: 30 } },
    defaultResp
  );

  return data?.docs ?? [];
}

export async function fetchFeaturedProjects() {
  const defaultResp: PayloadResponse<ProjectData> = { docs: [] };

  const data = await safeFetchJSON<PayloadResponse<ProjectData>>(
    `/api/projects?where[featured][equals]=true&sort=-timeline.startDate&limit=3`,
    { next: { revalidate: 30 } },
    defaultResp
  );

  return data?.docs ?? [];
}

export async function fetchProjectBySlug(slug: string) {
  const endpoint = `/api/projects?where[slug][equals]=${slug}`;

  const defaultResp: PayloadResponse<ProjectData> = { docs: [] };

  const data = await safeFetchJSON<PayloadResponse<ProjectData>>(
    endpoint,
    { cache: "no-store" },
    defaultResp
  );

  return data?.docs?.[0] ?? null;
}
