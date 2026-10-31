import { z } from "zod";
import {
  emailSchema,
  firstNameSchema,
  lastNameSchema,
  passwordSchema,
  phoneSchema,
} from "@/lib/common/schemas";

const coreFields = {
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phoneNumber: phoneSchema,
  email: emailSchema,
};

export const CurrentUserSchema = z.object({
  ...coreFields,
});

export const changePasswordSchema = z
  .object({
    email: coreFields.email,
    currentPassword: z
      .string()
      .min(1, "Le mot de passe actuel est requis")
      .max(50),
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmNewPassword"],
        message: "Les mots de passe ne correspondent pas",
      });
    }
  });

export const loginFormSchema = z.object({
  email: emailSchema,

  password: z
    .string()
    .min(1, "Le mot de passe est obligatoire")
    .max(255, "Le mot de passe doit comporter au maximum 255 caractères"),
});

export const registerFormSchema = z
  .object({
    ...coreFields,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Les mots de passe ne correspondent pas",
      });
    }
  });

const MESSAGE_DELETE_ACCOUNT = "Je veux supprimer mon compte";

export const deleteFormSchema = z.object({
  emailInput: z
    .string()
    .min(1, "L’adresse e-mail est requise")
    .email("Adresse e-mail invalide"),

  messageInput: z
    .string()
    .trim()
    .refine(
      (val) => val.toUpperCase() === MESSAGE_DELETE_ACCOUNT.toUpperCase(),
      {
        message: `Vous devez saisir "${MESSAGE_DELETE_ACCOUNT}" pour confirmer`,
      },
    ),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "L'email est requis").email("Email invalide"),
});

// Payload envoyé à l'API (utilisé par le serveur et les mutations)
export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Lien invalide"),
  newPassword: z
    .string()
    .min(8, "8 caractères minimum")
    .max(100, "100 caractères maximum"),
});

// Formulaire (le token vient de l'URL, il n'est pas saisi)
export const resetPasswordFormSchema = z
  .object({
    password: resetPasswordSchema.shape.newPassword,
    confirmPassword: z.string().min(1, "Confirmez le mot de passe"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type UserCreateFormValues = z.infer<typeof CurrentUserSchema>;
export type ChangePwdFormValues = z.infer<typeof changePasswordSchema>;
export type DeleteFormValues = z.infer<typeof deleteFormSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;
