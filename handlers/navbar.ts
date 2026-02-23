import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type NavbarActionsDeps = {
  router: AppRouterInstance;
  signOut: () => Promise<void>;
  openLogin: () => void;
  openRegister: () => void;
  closeMenu: () => void;
};

export const getNavbarActions = (deps: NavbarActionsDeps) => ({
  onDashboard: () => {
    deps.router.push("/admin");
    deps.closeMenu();
  },
  onLogout: async () => {
    await deps.signOut();
    deps.closeMenu();
  },
  onLogin: () => {
    deps.openLogin();
    deps.closeMenu();
  },
  onRegister: () => {
    deps.openRegister();
    deps.closeMenu();
  },
});
