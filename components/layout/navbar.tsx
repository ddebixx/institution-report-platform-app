"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheckIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/locale/locale-switcher";
import { useAuthModal } from "@/providers/auth-modal-provider";
import { Button } from "@/components/ui/button/button";
import { useAuthContext } from "@/providers/auth-provider";
import { getNavbarActions } from "@/handlers/navbar";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { NavbarDesktopActions } from "@/components/layout/navbar-desktop-actions";
import { NavbarMobileMenu } from "@/components/layout/navbar-mobile-menu";

export const Navbar = () => {
  const router = useRouter();
  const { user, signOut, isAuthenticating } = useAuthContext();
  const { openLogin, openRegister } = useAuthModal();
  const t = useTranslations();
  const mobileMenu = useMobileMenu();

  const userLabel = useMemo(() => user?.email ?? t("navbar.subtitle"), [t, user?.email]);

  const actions = getNavbarActions({
    router,
    signOut,
    openLogin,
    openRegister,
    closeMenu: mobileMenu.close,
  });

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm sm:size-10">
                <ShieldCheckIcon className="size-4 sm:size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary">IRP</span>
                <span className="hidden text-xs text-muted-foreground sm:block">
                  {t("navbar.title")}
                </span>
              </div>
            </div>
          </Link>

          <NavbarDesktopActions
            user={user}
            userLabel={userLabel}
            isAuthenticating={isAuthenticating}
            actions={actions}
            t={t}
          />

          <div className="flex items-center gap-2 sm:hidden">
            <LocaleSwitcher />
            <Button
              size="sm"
              variant="ghost"
              onClick={mobileMenu.toggle}
              className="size-9 p-0"
              aria-label="Toggle menu"
              aria-expanded={mobileMenu.isOpen}
            >
              {mobileMenu.isOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </Button>
          </div>
        </div>
      </header>

      <NavbarMobileMenu
        isOpen={mobileMenu.isOpen}
        onClose={mobileMenu.close}
        user={user}
        userLabel={userLabel}
        isAuthenticating={isAuthenticating}
        actions={actions}
        t={t}
      />
    </>
  );
};
