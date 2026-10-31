import "server-only";

import apiClient from "@config/api.config";
import environment from "@config/environment.config";
import { getLogger } from "@config/logger.config";
import { Result } from "@/lib/common/types";
import { ApiError } from "@/lib/common/api-error";
import { ChatRequestFormValues } from "../../schemas/chat";
import { ChatResponse } from "../types";
import { Readable } from "stream";

const {
  api: {
    rest: {
      endpoints: { ai: aiUrl },
    },
  },
} = environment;

const chatUrl = aiUrl + "/chat";
const logger = getLogger("server");

export async function sendChatMessage(
  chat: ChatRequestFormValues,
): Promise<Result<ChatResponse, ApiError>> {
  try {
    const response = await (
      await apiClient(true)
    ).post<ChatResponse>(chatUrl, chat);

    logger.info(
      { messageCount: chat.messages.length },
      "AI chat response received",
    );

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "sendChatMessage"),
    };
  }
}

export async function sendChatMessageStream(
  chat: ChatRequestFormValues,
): Promise<Result<Readable, ApiError>> {
  try {
    const client = await apiClient(true);

    const response = await client.post(`${chatUrl}/stream`, chat, {
      responseType: "stream",
      headers: {
        Accept: "text/event-stream",
      },
    });

    logger.info(
      { messageCount: chat.messages.length },
      "AI chat stream started",
    );

    return {
      ok: true,
      data: response.data as Readable,
    };
  } catch (error) {
    return {
      ok: false,
      error: ApiError(error, "sendChatMessageStream"),
    };
  }
}
