import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Base URL (must include /api in your .env)
const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

// Unified request helper
export async function apiRequest(
  url: string,
  method: string,
  data?: unknown
): Promise<Response> {
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

type UnauthorizedBehavior = "returnNull" | "throw";

// 🔧 Ensure queries also hit the backend (not the frontend origin)
export const getQueryFn: <T>(options: { on401: UnauthorizedBehavior }) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const endpoint = queryKey.join("/");
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const res = await fetch(`${BASE_URL}${path}`, { credentials: "include" });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null as any;
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
