import "server-only";

const API_URL = process.env.PAYLOAD_API_URL;

export type FetchDefault<T> = T | (() => T);

export async function safeFetchJSON<T>(
  endpoint: string,
  init?: RequestInit,
  defaultValue?: FetchDefault<T>
): Promise<T> {
  if (!API_URL) {
    // If there's no API URL configured (e.g. during image build), return default
    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : (defaultValue as T);
  }

  try {
    const res = await fetch(`${API_URL}${endpoint}`, init);
    if (!res.ok) {
      console.warn(
        `safeFetchJSON non-ok response for ${endpoint}:`,
        res.status
      );
      return typeof defaultValue === "function"
        ? (defaultValue as () => T)()
        : (defaultValue as T);
    }

    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    // Fail gracefully during build or when API is unreachable
    // eslint-disable-next-line no-console
    console.warn(`safeFetchJSON error for ${endpoint}:`, err);
    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : (defaultValue as T);
  }
}
