"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createOrUpdateModeratorProfile } from "@/mutations/moderators/create-or-update-moderator-profile";
import type { CreateOrUpdateModeratorProfilePayload } from "@/mutations/moderators";
import { moderatorKeys } from "@/lib/query-keys";
import { queryClient } from "@/lib/queryClient";

type UseCreateOrUpdateModeratorProfileMutationParams = {
  accessToken: string | null;
  onSuccess?: () => void;
  onClose?: () => void;
  successMessage?: string;
  errorMessage?: string;
};

export const useCreateOrUpdateModeratorProfileMutation = ({
  accessToken,
  onSuccess: onSuccessCallback,
  onClose,
  successMessage = "Profile saved successfully",
  errorMessage = "Failed to save profile",
}: UseCreateOrUpdateModeratorProfileMutationParams) => {
  return useMutation({
    mutationFn: (payload: CreateOrUpdateModeratorProfilePayload) =>
      createOrUpdateModeratorProfile(payload, accessToken!),
    onSuccess: () => {
      toast.success(successMessage);
      if (accessToken) {
        void queryClient.invalidateQueries({
          queryKey: moderatorKeys.profile(accessToken),
        });
      }
      onSuccessCallback?.();
      onClose?.();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : errorMessage);
    },
  });
};
