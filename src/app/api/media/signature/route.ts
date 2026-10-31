import { NextResponse } from "next/server";

import { getUploadSignature } from "@/lib/media/api/services/media.server";
import type { MediaContext } from "@/lib/media/api/types";
import { mediaContextSchema } from "@/lib/media/schemas/media";
import { fromZodError } from "@/lib/common/api-error";
import { errorResponse } from "@/lib/common/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawContext = searchParams.get("context");

  let context: MediaContext | undefined;
  if (rawContext !== null) {
    const parsed = mediaContextSchema.safeParse(rawContext);
    if (!parsed.success) {
      return errorResponse(fromZodError(parsed.error, "getUploadSignature"));
    }
    context = parsed.data;
  }

  const response = await getUploadSignature(context);
  if (!response.ok) return errorResponse(response.error);

  return NextResponse.json(response.data, { status: 200 });
}
