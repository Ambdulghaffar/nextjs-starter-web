function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-brand-100/70 animate-pulse rounded-md dark:bg-white/10
        ${className}`}
    />
  );
}

const cardClass = "border-border bg-card overflow-hidden rounded-3xl border";

function FieldSkeleton({ valueWidth }: { valueWidth: string }) {
  return (
    <div className="border-border flex items-start gap-4 rounded-2xl border p-4">
      <Bone className="size-10 shrink-0 rounded-xl" />
      <div>
        <Bone className="mb-2 h-3 w-16" />
        <Bone className={`h-4 ${valueWidth}`} />
      </div>
    </div>
  );
}

/** Carte du haut : bannière, avatar, nom, e-mail, Modifier */
export function UserMetaCardSkeleton() {
  return (
    <div className={cardClass}>
      <Bone className="h-28 rounded-none" />
      <div className="flex flex-wrap items-end gap-6 px-8 pb-8">
        <Bone className="ring-card -mt-14 size-28 shrink-0 rounded-full ring-4" />
        <div className="flex-1 space-y-2 pt-4">
          <Bone className="h-3 w-24" />
          <Bone className="h-8 w-56" />
          <Bone className="h-4 w-44" />
        </div>
        <Bone className="h-10 w-28 rounded-full" />
      </div>
    </div>
  );
}

/** Carte « Informations personnelles » */
export function UserInfoCardSkeleton() {
  return (
    <div className={`${cardClass} p-7 sm:p-8`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Bone className="h-7 w-56" />
        <Bone className="h-10 w-28 rounded-full" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FieldSkeleton valueWidth="w-24" />
        <FieldSkeleton valueWidth="w-20" />
        <FieldSkeleton valueWidth="w-44" />
        <FieldSkeleton valueWidth="w-36" />
        <FieldSkeleton valueWidth="w-12" />
      </div>
    </div>
  );
}

/** Page profil complète : les deux cartes */
export function ProfileSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-6">
      <span className="sr-only">Chargement du profil…</span>

      <UserMetaCardSkeleton />
      <UserInfoCardSkeleton />
    </div>
  );
}
