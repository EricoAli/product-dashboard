export async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    const contentType = response.headers.get("content-type") ?? "";

    if (!response.ok) {
      const responseBody = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : null;
      const errorMessage = responseBody?.message || `Request failed with status ${response.status}`;
      console.error(`[apiFetch] Error fetching ${input}:`, errorMessage);
      throw new Error(errorMessage);
    }

    if (contentType.includes("application/json")) {
      const json = await response.json();
      if (json && typeof json === 'object' && 'success' in json && 'data' in json) {
        return json.data as T;
      }
      return json as T;
    }

    throw new Error("API returned invalid JSON response");
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[apiFetch] Caught error:`, error.message);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
