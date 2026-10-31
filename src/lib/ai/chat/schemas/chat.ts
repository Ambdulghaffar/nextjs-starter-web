import { z } from "zod";

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1, "Le message ne peut pas être vide"),
});

export const chatRequestSchema = z.object({
  provider: z.string().trim().min(1).optional(),
  messages: z
    .array(chatMessageSchema)
    .min(1, "La conversation doit contenir au moins un message"),
});

export type ChatMessageFormValues = z.input<typeof chatMessageSchema>;
export type ChatRequestFormValues = z.input<typeof chatRequestSchema>;
