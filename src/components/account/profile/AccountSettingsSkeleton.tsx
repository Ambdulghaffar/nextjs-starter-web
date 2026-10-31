function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-brand-100/70 animate-pulse rounded-md dark:bg-white/10
        ${className}`}
    />
  );
}

export default function AccountSettingsSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-6">
      <span className="sr-only">Chargement des paramètres…</span>

      <section className="border-border bg-card rounded-3xl border p-7 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex min-w-0 items-start gap-5">
            <Bone className="size-12 shrink-0 rounded-xl" />
            <div className="space-y-2">
              <Bone className="h-6 w-40" />
              <Bone className="h-4 w-96 max-w-full" />
              <Bone className="h-4 w-72 max-w-full" />
            </div>
          </div>
          <Bone className="h-10 w-28 rounded-full" />
        </div>
      </section>

      <section
        className="border-destructive/30 bg-destructive/5 rounded-3xl border p-7
          sm:p-8"
      >
        <div className="flex items-start gap-5">
          <Bone className="size-12 shrink-0 rounded-xl" />
          <div className="space-y-2">
            <Bone className="h-6 w-36" />
            <Bone className="h-4 w-96 max-w-full" />
            <Bone className="h-4 w-80 max-w-full" />
          </div>
        </div>
        <div className="mt-6 flex justify-end border-t pt-6">
          <Bone className="h-10 w-44 rounded-full" />
        </div>
      </section>
    </div>
  );
}
