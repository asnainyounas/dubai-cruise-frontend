/**
 * src/lib/api.ts
 *
 * Lightweight server-side API client for the Express backend.
 *
 * The backend integration is SWITCHED OFF by default. Set both env vars
 * in .env.local to enable it:
 *
 *   USE_BACKEND=true
 *   API_URL=http://localhost:5000
 *
 * API_URL must NEVER be prefixed with NEXT_PUBLIC_ — it must remain
 * server-side only so it is never exposed to the browser bundle.
 *
 * Rules:
 * - If disabled, every apiGet() call returns null immediately (no network).
 * - If enabled, fetch with a 4-second AbortSignal timeout and 5-minute
 *   Next.js ISR revalidation.
 * - On ANY failure (network, timeout, non-2xx, invalid JSON) return null,
 *   never throw.
 * - In development only, log a console.warn with the path and reason.
 */

/** Returns true only when USE_BACKEND=true AND API_URL is a non-empty string. */
export function isBackendEnabled(): boolean {
  const flag = process.env.USE_BACKEND;
  const url = process.env.API_URL;
  return flag === "true" && typeof url === "string" && url.trim().length > 0;
}

/**
 * Fetches a JSON resource from the backend.
 *
 * @param path - Path relative to the API root, e.g. "/cruises/creek-cruise".
 *               Must start with "/".
 * @returns Parsed JSON as T, or null on any failure or when disabled.
 */
export async function apiGet<T>(path: string): Promise<T | null> {
  if (!isBackendEnabled()) {
    return null;
  }

  const baseUrl = (process.env.API_URL as string).replace(/\/+$/, "");
  const url = `${baseUrl}/api${path}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      // Next.js ISR: revalidate every 5 minutes
      next: { revalidate: 300 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[api] ${path} → HTTP ${res.status}`);
      }
      return null;
    }

    const json = await res.json() as T;
    return json;
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (process.env.NODE_ENV === "development") {
      const reason =
        err instanceof Error
          ? err.name === "AbortError"
            ? "timeout (4000 ms)"
            : err.message
          : String(err);
      console.warn(`[api] ${path} → ${reason}`);
    }

    return null;
  }
}
