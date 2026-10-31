import Chat from "@/lib/ai/chat/components/chat";
import QuerySectionBoundary from "@/lib/query-section-boundary";
import { searchParamsCache } from "@/lib/searchparams";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assistant IA",
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await searchParamsCache.parse(searchParams);
  return (
    <QuerySectionBoundary
      title="Assistant IA"
      message="L'assistant IA est momentanément indisponible."
    >
      <Chat />
    </QuerySectionBoundary>
  );
}
