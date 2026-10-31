import { mutationOptions } from "@tanstack/react-query";
import { ApiError } from "@/lib/common/api-error";
import { ChatResponse } from "./types";
import { sendChatMessage } from "./services/chat.client";
import { ChatRequestFormValues } from "../schemas/chat";

export const sendChatMessageMutation = mutationOptions<
  ChatResponse,
  ApiError,
  ChatRequestFormValues,
  unknown
>({
  mutationFn: (payload) => sendChatMessage(payload),
});
