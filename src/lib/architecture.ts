import "server-only";
import { safeFetchJSON } from "@/lib/fetcher";

type ArchitectureSection = {
  id: string;
  title: string;
  order: number;
  content: string;
};

export async function fetchArchitectureSections() {
  const defaultResp = { docs: [] as ArchitectureSection[] };

  const data = await safeFetchJSON<{ docs: ArchitectureSection[] }>(
    "/api/architecture-sections?sort=order",
    { next: { revalidate: 30 } },
    defaultResp
  );

  return data?.docs ?? [];
}
