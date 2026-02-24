"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabase-client";
import type { AuthController, AuthMode } from "@/types/auth";

const getAccessTokenFromSession = (session: Session | null) => session?.access_token ?? null;

export const useAuthController = (): AuthController => {
  const [session, setSession] = useState<Session | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleSessionUpdate = useCallback((nextSession: Session | null) => {
    setSession(nextSession);
  }, []);

  const refreshSession = useCallback(async () => {
    setIsInitializing(true);
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      setSession(null);
      setIsInitializing(false);
      throw error;
    }

    setSession(data.session);
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    function initializeAuthState() {
      refreshSession().catch(() => {
        setSession(null);
        setIsInitializing(false);
      });

      const { data: authSubscription } = supabaseClient.auth.onAuthStateChange(
        (_event, nextSession) => {
          handleSessionUpdate(nextSession);
        }
      );

      return () => {
        authSubscription.subscription.unsubscribe();
      };
    }

    const cleanup = initializeAuthState();
    return cleanup;
  }, [handleSessionUpdate, refreshSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsAuthenticating(true);
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    setIsAuthenticating(false);

    if (error || !data.session) {
      throw new Error(error?.message ?? "Unable to sign in");
    }

    setSession(data.session);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setIsAuthenticating(true);
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    setIsAuthenticating(false);

    if (error) {
      throw new Error(error.message);
    }

    if (!data.session) {
      throw new Error(
        "Registration succeeded, but email confirmation is required before signing in."
      );
    }

    setSession(data.session);
  }, []);

  const signOut = useCallback(async () => {
    setIsAuthenticating(true);
    const { error } = await supabaseClient.auth.signOut();
    setIsAuthenticating(false);

    if (error) {
      throw new Error(error.message);
    }

    setSession(null);
  }, []);

  const accessToken = useMemo(() => getAccessTokenFromSession(session), [session]);

  const user = useMemo(() => session?.user ?? null, [session]);

  return {
    user,
    accessToken,
    isInitializing,
    isAuthenticating,
    authMode,
    setAuthMode,
    signIn,
    signUp,
    signOut,
    refreshSession,
  };
};
