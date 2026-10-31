function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800
        ${className}`}
    />
  );
}

/** Largeurs des suggestions : varient pour ressembler à de vraies pastilles */
const CHIP_WIDTHS = ["w-48", "w-40", "w-40", "w-36"];

export function ChatWelcomeSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="flex h-screen flex-col items-center justify-center px-4 py-10"
    >
      <span className="sr-only">Chargement de l’assistant…</span>

      <div className="w-full max-w-4xl">
        {/* Salutation : « Bonjour, Visitor. » + « Que veux-tu explorer… ? » */}
        <div className="flex flex-col items-center gap-3">
          <Bone className="h-10 w-64 sm:h-12 sm:w-80" />
          <Bone className="h-10 w-full max-w-md sm:h-12 sm:max-w-xl" />
        </div>

        {/* Zone de saisie */}
        <div
          className="mt-10 flex items-center justify-between gap-4 rounded-full
            border border-gray-200 bg-white px-6 py-3.5 shadow-sm
            dark:border-gray-800 dark:bg-gray-900"
        >
          <Bone className="h-4 w-40 sm:w-60" />

          <div className="flex items-center gap-2">
            {/* Pièce jointe + envoyer */}
            <Bone className="h-9 w-9 rounded-full" />
            <Bone className="h-9 w-9 rounded-full" />
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {CHIP_WIDTHS.map((width, i) => (
            <Bone key={i} className={`h-9 rounded-full ${width}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
