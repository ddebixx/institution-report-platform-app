import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

const asyncLocalStorage = {
  getItem: (key: string): Promise<string | null> =>
    Promise.resolve(typeof window !== "undefined" ? window.localStorage.getItem(key) : null),
  setItem: (key: string, value: string): Promise<void> =>
    Promise.resolve(
      void (typeof window !== "undefined" && window.localStorage.setItem(key, value))
    ),
  removeItem: (key: string): Promise<void> =>
    Promise.resolve(void (typeof window !== "undefined" && window.localStorage.removeItem(key))),
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("Query error:", error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  }),
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

const PERSISTER_KEY = "institution-report-query-cache";

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: asyncLocalStorage,
  key: PERSISTER_KEY,
});
