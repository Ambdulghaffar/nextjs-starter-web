import { resetPassword } from "@/lib/auth/api/services/auth.server";
import { NextResponse } from "next/server";
import { errorResponse, parseBody } from "@/lib/common/http";
import { resetPasswordSchema } from "@/lib/auth/schemas/auth";
export async function POST(request: Request) {
  const body = await parseBody(request, resetPasswordSchema, "resetPassword");
  if (!body.ok) return errorResponse(body.error);
  const result = await resetPassword(body.data);

  if (!result.ok) {
    return errorResponse(result.error);
  }

  return NextResponse.json({ message: "Mot de passe modifié avec succès." });
}
