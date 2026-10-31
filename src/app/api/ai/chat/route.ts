import { NextResponse } from "next/server";
import { sendChatMessage } from "@/lib/ai/chat/api/services/chat.server";
import { chatRequestSchema } from "@/lib/ai/chat/schemas/chat";
import { errorResponse, parseBody } from "@/lib/common/http";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await parseBody(req, chatRequestSchema, "sendChatMessage");
  if (!body.ok) return errorResponse(body.error);

  const response = await sendChatMessage(body.data);
  if (!response.ok) return errorResponse(response.error);

  // Réponse d'un calcul, pas d'une création de ressource : 200 et non 201.
  return NextResponse.json(response.data, { status: 200 });
}
