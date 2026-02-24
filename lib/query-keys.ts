export const institutionKeys = {
  all: ["institutions"] as const,
  search: (query: string) => [...institutionKeys.all, "search", query] as const,
};

export const moderatorKeys = {
  all: ["moderators"] as const,
  profile: (accessToken: string) =>
    [...moderatorKeys.all, "profile", accessToken] as const,
};

export const reportKeys = {
  all: ["reports"] as const,
  available: (accessToken: string) =>
    [...reportKeys.all, "available", accessToken] as const,
  assigned: (accessToken: string) =>
    [...reportKeys.all, "assigned", accessToken] as const,
  completed: (accessToken: string) =>
    [...reportKeys.all, "completed", accessToken] as const,
};
