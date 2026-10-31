// user-details-skeleton.tsx
export function UserDetailsSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden>
      {/* Bannière */}
      <div className="bg-muted h-24" />

      {/* Identité */}
      <div
        className="-mt-10 flex flex-col gap-4 px-6 sm:flex-row sm:items-end
          sm:gap-5 lg:px-10"
      >
        <div
          className="bg-muted ring-background size-24 shrink-0 rounded-full
            ring-4"
        />
        <div className="flex-1 space-y-2 pb-1">
          <div className="bg-muted h-7 w-1/2 rounded" />
          <div className="bg-muted h-4 w-2/3 rounded" />
          <div className="bg-muted h-6 w-40 rounded-full" />
        </div>
      </div>

      {/* Onglets */}
      <div className="border-border mt-6 flex gap-6 border-b px-6 py-3 lg:px-10">
        <div className="bg-muted h-4 w-28 rounded" />
        <div className="bg-muted h-4 w-28 rounded" />
      </div>

      {/* Informations */}
      <div className="px-6 py-6 lg:px-10">
        <div
          className="bg-border border-border mx-auto grid max-w-3xl gap-px
            overflow-hidden rounded-xl border sm:grid-cols-2"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card flex items-center gap-3 px-5 py-4">
              <div className="bg-muted size-9 shrink-0 rounded-lg" />
              <div className="space-y-2">
                <div className="bg-muted h-3 w-24 rounded" />
                <div className="bg-muted h-4 w-36 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
