export type AuthModalMode = "login" | "register";

export type AuthModalProps = {
  open: boolean;
  mode: AuthModalMode;
  onClose: () => void;
  onModeChange: (mode: AuthModalMode) => void;
};
