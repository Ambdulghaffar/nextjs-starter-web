import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

/**
 * Champs de validation partagés (auth, users, account).
 * Les limites doivent rester alignées avec les DTO Spring (UserDto.Request).
 */

export const MAX_IMAGES = 10;

export const firstNameSchema = z
  .string()
  .trim()
  .min(2, "Le prénom doit comporter au moins 2 caractères")
  .max(100, "Le prénom doit comporter au maximum 100 caractères");

export const lastNameSchema = z
  .string()
  .trim()
  .min(2, "Le nom doit comporter au moins 2 caractères")
  .max(100, "Le nom doit comporter au maximum 100 caractères");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "L'adresse e-mail est obligatoire")
  .email("Adresse e-mail invalide")
  .max(255, "L'adresse e-mail doit comporter au maximum 255 caractères");

/** Optionnel : une chaîne vide devient `undefined`. Format international requis. */
export const phoneSchema = z
  .string()
  .trim()
  .transform((value) => (value === "" ? undefined : value))
  .optional()
  .refine(
    (value) => value === undefined || isValidPhoneNumber(value),
    "Numéro de téléphone invalide",
  );

export const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit comporter au moins 8 caractères")
  .max(255, "Le mot de passe doit comporter au maximum 255 caractères");

/**
 * Ids de Media dans l'ordre d'affichage (la première image est l'avatar).
 * `undefined` = ne rien changer, `[]` = tout retirer.
 */
export const imageIdsSchema = z
  .array(z.number().int().positive())
  .max(MAX_IMAGES, `Maximum ${MAX_IMAGES} photos`)
  .optional();
