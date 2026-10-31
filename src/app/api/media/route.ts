import { NextRequest, NextResponse } from "next/server";
import { registerMedia } from "@/lib/media/api/services/media.server";
import { mediaRegisterSchema } from "@/lib/media/schemas/media";
import { errorResponse, parseBody } from "@/lib/common/http";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await parseBody(req, mediaRegisterSchema, "registerMedia");
  if (!body.ok) return errorResponse(body.error);

  const response = await registerMedia(body.data);
  if (!response.ok) return errorResponse(response.error);

  return NextResponse.json(response.data, { status: 201 });
}
