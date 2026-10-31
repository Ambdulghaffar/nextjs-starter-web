import { Readable } from "node:stream";
import { sendChatMessageStream } from "@/lib/ai/chat/api/services/chat.server";
import { chatRequestSchema } from "@/lib/ai/chat/schemas/chat";
import { errorResponse, parseBody } from "@/lib/common/http";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await parseBody(req, chatRequestSchema, "sendChatMessageStream");
  if (!body.ok) return errorResponse(body.error);

  const result = await sendChatMessageStream(body.data);
  if (!result.ok) return errorResponse(result.error);

  const webStream = Readable.toWeb(
    result.data,
  ) as unknown as ReadableStream<Uint8Array>;

  return new Response(webStream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
