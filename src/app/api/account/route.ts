import { NextRequest, NextResponse } from "next/server";
import {
  changeMyPassword,
  deleteMyAccount,
  getMyProfile,
  updateMyProfile,
} from "@/lib/account/api/services/account.server";
import { errorResponse, parseBody } from "@/lib/common/http";
import {
  changePasswordSchema,
  CurrentUserSchema,
  deleteFormSchema,
} from "@/lib/account/schemas/account";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = await getMyProfile();

  if (!response.ok) {
    return errorResponse(response.error);
  }
  return NextResponse.json(response.data, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  const body = await parseBody(req, CurrentUserSchema, "updateMyProfile");
  if (!body.ok) return errorResponse(body.error);
  const response = await updateMyProfile(body.data);

  if (!response.ok) {
    return errorResponse(response.error);
  }
  return NextResponse.json(response.data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await parseBody(req, changePasswordSchema, "changeMyPassword");
  if (!body.ok) return errorResponse(body.error);
  const response = await changeMyPassword(body.data);

  if (!response.ok) {
    return errorResponse(response.error);
  }
  return new NextResponse(null, { status: 204 });
}

export async function DELETE(req: NextRequest) {
  const body = await parseBody(req, deleteFormSchema, "deleteMyAccount");
  if (!body.ok) return errorResponse(body.error);
  const response = await deleteMyAccount(body.data);

  if (!response.ok) {
    return errorResponse(response.error);
  }
  return new NextResponse(null, { status: 204 });
}
