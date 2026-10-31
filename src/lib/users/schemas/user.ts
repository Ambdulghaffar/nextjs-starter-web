import { z } from "zod";
import { editableUserStatuses, UserRole, UserStatus } from "../api/types";
import {
  emailSchema,
  firstNameSchema,
  imageIdsSchema,
  lastNameSchema,
  passwordSchema,
  phoneSchema,
} from "@/lib/common/schemas";

const coreFields = {
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phoneNumber: phoneSchema,
  email: emailSchema,
  role: z.nativeEnum(UserRole),
  imageIds: imageIdsSchema,
};

export const userBaseSchema = z.object(coreFields);

const optionalPasswordSchema = z
  .string()
  .optional()
  .transform((val) =>
    val === undefined || val.trim() === "" ? undefined : val,
  )
  .pipe(passwordSchema.optional());

function checkPasswordsMatch(
  data: { password?: string; confirmPassword?: string },
  ctx: z.RefinementCtx,
  requireBoth = true,
) {
  const hasPassword = !!data.password;
  const hasConfirm = !!data.confirmPassword;

  if (!hasPassword && !hasConfirm) return;

  if (requireBoth && hasPassword !== hasConfirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "Les deux champs de mot de passe sont requis",
    });
    return;
  }

  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "Les mots de passe ne correspondent pas",
    });
  }
}

export const userCreateSchema = userBaseSchema
  .extend({
    // Le défaut ne vaut qu'à la création
    status: z
      .enum(editableUserStatuses)
      .default(UserStatus.PENDING_VERIFICATION),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine((data, ctx) => checkPasswordsMatch(data, ctx, false));

export const userUpdateSchema = userBaseSchema
  .partial()
  .extend({
    // Pas de défaut ici : une modification sans statut ne doit pas le changer
    status: z.enum(editableUserStatuses).optional(),
    password: optionalPasswordSchema,
    confirmPassword: optionalPasswordSchema,
  })
  .superRefine((data, ctx) => checkPasswordsMatch(data, ctx, true));

// Valeurs du formulaire (avant validation)
export type UserCreateFormValues = z.input<typeof userCreateSchema>;
export type UserUpdateFormValues = z.input<typeof userUpdateSchema>;

// Payload envoyé à l'API : confirmPassword n'est jamais transmis
export type UserCreateRequest = Omit<
  z.output<typeof userCreateSchema>,
  "confirmPassword"
>;
export type UserUpdateRequest = Omit<
  z.output<typeof userUpdateSchema>,
  "confirmPassword"
>;
