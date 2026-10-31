export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type Result<T, E> =
  | {
      ok: true;
      data: T;
    }
  | { ok: false; error: E };
