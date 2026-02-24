"use client";

import { LogInIcon, LogOutIcon, XIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button/button";
import type { NavbarMobileMenuProps } from "@/components/layout/navbar-types";

export const NavbarMobileMenu = ({
  isOpen,
  onClose,
  user,
  userLabel,
  isAuthenticating,
  actions,
  t,
}: NavbarMobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={twMerge(
          "fixed right-0 top-0 z-50 h-full w-[280px] bg-background shadow-xs sm:hidden",
          "animate-in slide-in-from-right duration-200"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-green-500" />
              <span className="truncate text-sm font-medium text-foreground">{userLabel}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="size-8 p-0"
              aria-label="Close menu"
            >
              <XIcon className="size-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {user ? (
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={actions.onDashboard}
                >
                  {t("navbar.dashboard")}
                </Button>
                <div className="my-2 border-t border-border" />
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={actions.onLogout}
                  disabled={isAuthenticating}
                >
                  <LogOutIcon className="size-4" />
                  {t("navbar.logout")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={actions.onLogin}
                >
                  <LogInIcon className="size-4" />
                  {t("navbar.login")}
                </Button>
                <Button
                  variant="default"
                  className="w-full justify-start font-semibold"
                  onClick={actions.onRegister}
                >
                  {t("navbar.register")}
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};
