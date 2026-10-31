import type { User } from "@/lib/users/api/types";

export type ProfileUpdateRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  /** Ids de Media dans l'ordre ; la première image est l'avatar */
  imageIds?: number[];
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type DeleteAccountRequest = {
  message: string;
};

export type ProfileResponse = User;
