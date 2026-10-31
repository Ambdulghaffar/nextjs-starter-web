import { z } from "zod";
import {
  emailSchema,
  firstNameSchema,
  imageIdsSchema,
  lastNameSchema,
  passwordSchema,
  phoneSchema,
} from "@/lib/common/schemas";

const CurrentUserFields = {
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phoneNumber: phoneSchema,
  email: emailSchema,
  imageIds: imageIdsSchema,
};

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Le mot de passe actuel est requis")
    .max(
      255,
      "Le mot de passe actuel doit comporter au maximum 255 caractères",
    ),

  newPassword: passwordSchema,
});

export const MESSAGE_DELETE_ACCOUNT = "SUPPRIMER MON COMPTE DÉFINITIVEMENT";

export const deleteFormSchema = z.object({
  message: z
    .string()
    .trim()
    .refine(
      (val) => val.toUpperCase() === MESSAGE_DELETE_ACCOUNT.toUpperCase(),
      {
        message: `Vous devez saisir "${MESSAGE_DELETE_ACCOUNT}" pour confirmer`,
      },
    ),
});

export const CurrentUserSchema = z.object(CurrentUserFields).partial();

export type CurrentUserFormValues = z.infer<typeof CurrentUserSchema>;
export type ChangePwdFormValues = z.infer<typeof changePasswordSchema>;
export type DeleteFormValues = z.infer<typeof deleteFormSchema>;
