import { frontendHttp } from "@config/axios/frontend-http.config";
import { proxyEnvironment } from "@config/proxy-api.config";
import { unwrapApiError } from "@/lib/common/handle-api-error";
import { ChatResponse } from "../types";
import { ChatRequestFormValues } from "../../schemas/chat";

const {
  api: {
    rest: {
      endpoints: { ai: chatUrl },
    },
  },
} = proxyEnvironment;

// --- Mutations (non-streaming) ---

export async function sendChatMessage(
  payload: ChatRequestFormValues,
): Promise<ChatResponse> {
  try {
    const { data } = await frontendHttp().post<ChatResponse>(
      `${chatUrl}/chat`,
      payload,
    );
    return data;
  } catch (error) {
    throw unwrapApiError(error);
  }
}

// --- Streaming ---

export async function sendChatMessageStream(
  payload: ChatRequestFormValues,
): Promise<ReadableStream<Uint8Array>> {
  const baseURL = frontendHttp().defaults.baseURL ?? "";

  const response = await fetch(`${baseURL}${chatUrl}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "same-origin",
  });

  if (!response.ok || !response.body) {
    const errorBody = await response.json().catch(() => null);
    throw unwrapApiError({
      response: { status: response.status, data: errorBody },
    });
  }

  return response.body;
}
