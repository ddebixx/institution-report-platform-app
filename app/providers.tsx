"use client";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ThemeProvider } from "next-themes";

import { queryClient, asyncStoragePersister } from "@/lib/queryClient";
import { AuthProvider } from "@/providers/auth-provider";
import { AuthModalProvider } from "@/providers/auth-modal-provider";
import { LocaleProvider } from "@/providers/locale-provider";
import { Toaster } from "@/components/ui/sonner/sonner";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <LocaleProvider>
          <AuthProvider>
            <AuthModalProvider>
              {children}
              <Toaster position="top-right" richColors closeButton />
            </AuthModalProvider>
          </AuthProvider>
        </LocaleProvider>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
};
