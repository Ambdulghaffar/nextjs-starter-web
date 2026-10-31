import { z } from "zod";

export const MEDIA_TYPES = ["IMAGE", "VIDEO"] as const;

// PRIVATE : dossier personnel de l'utilisateur.
// CONTENT: Gérer par l'administrateur, c'est le dossier de contenu partagé (ex: photos de véhicules).
export const MEDIA_CONTEXTS = ["PRIVATE", "CONTENT"] as const;

export const mediaTypeSchema = z.enum(MEDIA_TYPES);

export const mediaContextSchema = z.enum(MEDIA_CONTEXTS);

export const mediaRegisterSchema = z.object({
  url: z.string().trim().url("URL du média invalide"),
  publicId: z.string().trim().min(1, "L'identifiant public est requis"),
  type: mediaTypeSchema,
});

export type MediaRegisterFormValues = z.input<typeof mediaRegisterSchema>;
