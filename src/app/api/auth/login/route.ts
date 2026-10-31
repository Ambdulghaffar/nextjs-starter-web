import { NextRequest, NextResponse } from "next/server";
import { login as signIn } from "@/lib/auth/api/services/auth.server";
import { loginFormSchema } from "@/lib/auth/schemas/auth";
import { errorResponse, parseBody } from "@/lib/common/http";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await parseBody(req, loginFormSchema, "signIn");
  if (!body.ok) return errorResponse(body.error);
  const response = await signIn(body.data);

  if (!response.ok) {
    return errorResponse(response.error);
  }
  return new NextResponse(null, { status: 204 });
}
