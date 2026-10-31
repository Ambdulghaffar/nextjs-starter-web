import { Bone } from "@/lib/common/TableSkeleton";

/** Squelette générique d'une page de détail (en-tête, onglets, contenu). */
export function DetailSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Chargement en cours">
      <div className="flex items-center gap-4">
        <Bone className="size-14 rounded-full" strong />
        <div className="flex-1 space-y-2">
          <Bone className="h-5 w-48" strong />
          <Bone className="h-4 w-32" />
        </div>
      </div>

      <div className="border-border flex gap-2 border-t pt-4">
        <Bone className="h-9 w-32" />
        <Bone className="h-9 w-32" />
      </div>

      <div className="space-y-3">
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-11/12" />
        <Bone className="h-4 w-4/5" />
        <Bone className="h-40 w-full" />
      </div>
    </div>
  );
}
