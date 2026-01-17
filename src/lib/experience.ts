import { ExperienceData, PayloadResponse } from "@/types";
import { safeFetchJSON } from "./fetcher";

export async function fetchPublishedExperiences() {
  const defaultResp: PayloadResponse<ExperienceData> = { docs: [] };

  const data = await safeFetchJSON<PayloadResponse<ExperienceData>>(
    `/api/experiences?where[visible][equals]=true&sort=order`,
    { next: { revalidate: 30 } },
    defaultResp
  );

  return data?.docs ?? [];
}
