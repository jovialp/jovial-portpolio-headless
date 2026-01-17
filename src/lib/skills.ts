import { PayloadResponse, SkillData } from "@/types";
import { safeFetchJSON } from "./fetcher";

export async function fetchPublishedSkills() {
  const defaultResp: PayloadResponse<SkillData> = { docs: [] };

  const data = await safeFetchJSON<PayloadResponse<SkillData>>(
    `/api/skills?where[visible][equals]=true&sort=order&limit=50`,
    { next: { revalidate: 30 } },
    defaultResp
  );

  return data?.docs ?? [];
}
