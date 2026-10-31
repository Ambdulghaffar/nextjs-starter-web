import { NextResponse } from "next/server";
import { resendVerification } from "@/lib/auth/api/services/auth.server";
import { errorResponse, parseBody } from "@/lib/common/http";
import { forgotPasswordSchema } from "@/lib/auth/schemas/auth";

export async function POST(req: Request) {
  const body = await parseBody(req, forgotPasswordSchema, "resendVerification");
  if (!body.ok) return errorResponse(body.error);
  const result = await resendVerification(body.data.email);

  if (!result.ok) {
    return errorResponse(result.error);
  }
  return NextResponse.json({ ok: true });
}
