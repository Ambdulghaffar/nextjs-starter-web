import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/lib/auth/api/services/auth.server";
import { registerFormSchema } from "@/lib/auth/schemas/auth";
import { errorResponse, parseBody } from "@/lib/common/http";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await parseBody(req, registerFormSchema, "signUp");
  if (!body.ok) return errorResponse(body.error);
  const response = await signUp(body.data);

  if (!response.ok) {
    return errorResponse(response.error);
  }
  return new NextResponse(null, { status: 204 });
}
