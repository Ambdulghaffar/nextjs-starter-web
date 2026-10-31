export function UserFormSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="bg-muted h-4 w-24 rounded" />
            <div className="bg-muted h-11 w-full rounded-lg" />
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <div className="bg-muted h-10 w-full rounded-lg sm:w-32" />
        <div className="bg-muted h-10 w-full rounded-lg sm:w-32" />
      </div>
    </div>
  );
}
