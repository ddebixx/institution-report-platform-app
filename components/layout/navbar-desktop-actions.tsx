"use client";

import { LogInIcon, LogOutIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { LocaleSwitcher } from "@/components/locale/locale-switcher";
import { Button } from "@/components/ui/button";
import type { NavbarDesktopActionsProps } from "@/components/layout/navbar-types";

export const NavbarDesktopActions = ({
  user,
  userLabel,
  isAuthenticating,
  actions,
  t,
}: NavbarDesktopActionsProps) => {
  if (user) {
    return (
      <div className="hidden items-center gap-2 sm:flex sm:gap-3">
        <div className="flex items-center gap-2 rounded-full bg-secondary px-2 py-1 text-sm sm:px-3">
          <span className="size-2 rounded-full bg-green-500" />
          <span className="hidden text-muted-foreground md:inline">{userLabel}</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={actions.onDashboard}
          className={twMerge("font-semibold")}
        >
          {t("navbar.dashboard")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={actions.onLogout}
          disabled={isAuthenticating}
          className="font-semibold"
        >
          <LogOutIcon className="size-4" />
          <span className="hidden md:inline">{t("navbar.logout")}</span>
        </Button>
        <LocaleSwitcher />
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Button size="sm" variant="ghost" onClick={actions.onLogin} className="font-semibold">
        <LogInIcon className="size-4" />
        <span className="hidden md:inline">{t("navbar.login")}</span>
      </Button>
      <Button size="sm" variant="default" onClick={actions.onRegister} className="font-semibold">
        {t("navbar.register")}
      </Button>
      <LocaleSwitcher />
    </div>
  );
};
