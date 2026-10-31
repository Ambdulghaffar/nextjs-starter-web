import { NextResponse } from "next/server";
import { hardDeleteUser } from "@/lib/users/api/services/user.server";
import { errorResponse, parseId } from "@/lib/common/http";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const userId = parseId(id, "user");
  if (!userId.ok) return errorResponse(userId.error);

  const response = await hardDeleteUser(userId.data);

  if (!response.ok) {
    return errorResponse(response.error);
  }
  return new NextResponse(null, { status: 204 });
}
