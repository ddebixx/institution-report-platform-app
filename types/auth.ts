import type { User } from "@supabase/supabase-js";

export type AuthMode = "login" | "register";

export type AuthController = {
  user: User | null;
  accessToken: string | null;
  isInitializing: boolean;
  isAuthenticating: boolean;
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};
