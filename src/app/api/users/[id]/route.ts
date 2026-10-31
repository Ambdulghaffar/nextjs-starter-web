import { NextRequest, NextResponse } from "next/server";
import {
  softDeleteUser,
  getUserById,
  updateUser,
} from "@/lib/users/api/services/user.server";
import { errorResponse, parseBody, parseId } from "@/lib/common/http";
import { userUpdateSchema } from "@/lib/users/schemas/user";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const userId = parseId(id, "user");
  if (!userId.ok) return errorResponse(userId.error);
  const response = await getUserById(userId.data);

  if (!response.ok) {
    return errorResponse(response.error);
  }

  return NextResponse.json(response.data, { status: 200 });
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const userId = parseId(id, "user");
  if (!userId.ok) return errorResponse(userId.error);
  const body = await parseBody(req, userUpdateSchema, "updateUser");
  if (!body.ok) return errorResponse(body.error);

  const response = await updateUser(userId.data, body.data);

  if (!response.ok) {
    return errorResponse(response.error);
  }
  return NextResponse.json(response.data, { status: 200 });
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const userId = parseId(id, "user");
  if (!userId.ok) return errorResponse(userId.error);

  const response = await softDeleteUser(userId.data);

  if (!response.ok) {
    return errorResponse(response.error);
  }
  return new NextResponse(null, { status: 204 });
}
