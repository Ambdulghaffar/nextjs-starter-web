import { NextResponse } from "next/server";
import { getMyProfile } from "@/lib/account/api/services/account.server";
import { errorResponse } from "@/lib/common/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = await getMyProfile();
  if (!response.ok) return errorResponse(response.error);

  return NextResponse.json(response.data, { status: 200 });
}
