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
      throw new Error(errorMessage);
    }

    if (contentType.includes("application/json")) {
      return await response.json();
    }

    throw new Error("API returned invalid JSON response");
  } finally {
    clearTimeout(timeout);
  }
}
