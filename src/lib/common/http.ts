import "server-only";

import { NextResponse } from "next/server";
import type { z } from "zod";
import { ApiError, fromZodError } from "./api-error";
import type { Result } from "./types";

export function parseId(raw: string, label: string): Result<number, ApiError> {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0
    ? { ok: true, data: id }
    : {
        ok: false,
        error: {
          status: 400,
          error: "Bad Request",
          message: `Identifiant de ${label} invalide`,
        },
      };
}

export async function parseBody<S extends z.ZodTypeAny>(
  req: Request,
  schema: S,
  context: string,
): Promise<Result<z.output<S>, ApiError>> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return {
      ok: false,
      error: {
        status: 400,
        error: "Bad Request",
        message: "Corps JSON invalide",
      },
    };
  }
  const parsed = schema.safeParse(json);
  return parsed.success
    ? { ok: true, data: parsed.data }
    : { ok: false, error: fromZodError(parsed.error, context) };
}

export function errorResponse(error: ApiError) {
  return NextResponse.json(error, { status: error.status ?? 500 });
}
