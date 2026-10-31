import { forgotPassword } from "@/lib/auth/api/services/auth.server";
import { NextResponse } from "next/server";
import { errorResponse, parseBody } from "@/lib/common/http";
import { forgotPasswordSchema } from "@/lib/auth/schemas/auth";
export async function POST(request: Request) {
  const body = await parseBody(request, forgotPasswordSchema, "forgotPassword");
  if (!body.ok) return errorResponse(body.error);
  const result = await forgotPassword(body.data.email);

  if (!result.ok) {
    return errorResponse(result.error);
  }

  return NextResponse.json({
    message:
      "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
  });
}
