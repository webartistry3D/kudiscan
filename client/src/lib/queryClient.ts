// queryClient.ts

import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// --- UPDATED apiRequest to include BASE_URL and normalize URL ---
const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, ""); 
// Example: "https://kudiscan-backend.onrender.com/api" (ensure your .env includes /api)

export async function apiRequest(
  url: string,
  method: string,
  data?: unknown
): Promise<Response> {
  // Ensure single slash between BASE_URL and endpoint
  const endpoint = url.startsWith("/") ? url : `/${url}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

// --- END UPDATE ---

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: { on401: UnauthorizedBehavior }) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const endpoint = queryKey.join("/");
    const res = await fetch(endpoint, { credentials: "include" });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
