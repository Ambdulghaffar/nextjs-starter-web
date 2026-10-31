function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-brand-100/70 animate-pulse rounded-md dark:bg-white/10
        ${className}`}
    />
  );
}

export default function AccountSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto max-w-5xl space-y-8 pb-16"
    >
      <span className="sr-only">Chargement de l&apos;accueil…</span>

      <section className="bg-primary/10 rounded-3xl p-6 sm:p-10">
        <div
          className="bg-primary/20 flex items-center gap-6 rounded-3xl p-6
            sm:gap-10"
        >
          <Bone className="size-24 shrink-0 rounded-full" />
          <Bone className="h-12 w-72 max-w-full" />
        </div>
        <Bone className="mt-5 h-5 w-full max-w-xl" />
      </section>

      <Bone className="h-7 w-full rounded-full" />

      <section className="bg-primary/10 rounded-3xl p-6 sm:p-10">
        <Bone className="h-8 w-56" />
        <Bone className="mt-3 h-4 w-80 max-w-full" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Bone className="h-72 rounded-2xl" />
          <Bone className="h-72 rounded-2xl" />
        </div>
      </section>

      <section className="bg-muted rounded-3xl p-6 sm:p-10">
        <Bone className="h-8 w-48" />
        <Bone className="mt-3 h-4 w-96 max-w-full" />
        <Bone className="mt-8 h-28 rounded-2xl" />
      </section>

      <section className="px-2 py-6 sm:px-4">
        <Bone className="h-8 w-56" />
        <Bone className="mt-3 h-4 w-80 max-w-full" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Bone className="h-24 rounded-2xl" />
          <Bone className="h-24 rounded-2xl" />
          <Bone className="h-24 rounded-2xl" />
          <Bone className="h-24 rounded-2xl" />
        </div>
      </section>
    </div>
  );
}
