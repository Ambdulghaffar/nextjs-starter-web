import { NextResponse } from "next/server";
import { verifyEmail } from "@/lib/auth/api/services/auth.server";
import { errorResponse, parseBody } from "@/lib/common/http";
import { z } from "zod";

const verifyEmailSchema = z.object({
  token: z.string().min(1, "Lien invalide"),
});

export async function POST(req: Request) {
  const body = await parseBody(req, verifyEmailSchema, "verifyEmail");
  if (!body.ok) return errorResponse(body.error);
  const result = await verifyEmail(body.data);

  if (!result.ok) {
    return errorResponse(result.error);
  }
  return NextResponse.json({ ok: true });
}
