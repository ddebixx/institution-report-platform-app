import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type NavbarUser = { email?: string } | null;

export type NavbarTranslations = (key: string) => string;

export type NavbarActionsDeps = {
  router: AppRouterInstance;
  signOut: () => Promise<void>;
  openLogin: () => void;
  openRegister: () => void;
  closeMenu: () => void;
};

export type NavbarActions = {
  onDashboard: () => void;
  onLogout: () => void;
  onLogin: () => void;
  onRegister: () => void;
};

export type NavbarDesktopActionsProps = {
  user: NavbarUser;
  userLabel: string;
  isAuthenticating: boolean;
  actions: NavbarActions;
  t: NavbarTranslations;
};

export type NavbarMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  user: NavbarUser;
  userLabel: string;
  isAuthenticating: boolean;
  actions: NavbarActions;
  t: NavbarTranslations;
};
