import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  /** Petite pastille au-dessus du titre */
  eyebrow?: string;
  /** Texte clair, pour les sections à fond plein (bg-primary) */
  invert?: boolean;
  align?: "center" | "left";
  className?: string;
};

type Circle = { pos: string; size: string; ring?: boolean };

/* Positions par rapport à toute la largeur de la section.
   Offsets négatifs limités à -6 (24 px) = padding mobile, pas de scroll horizontal. */
const circlesLeft: Circle[] = [
  { pos: "-top-6 -right-6", size: "size-36" },
  { pos: "top-10 right-24", size: "size-20", ring: true },
  { pos: "bottom-0 right-8", size: "size-8" },
  { pos: "-bottom-6 right-1/4", size: "size-28", ring: true },
  { pos: "top-0 right-1/3", size: "size-4" },
];

const circlesCenter: Circle[] = [
  { pos: "-top-6 -left-6", size: "size-36" },
  { pos: "top-8 -right-6", size: "size-24", ring: true },
  { pos: "bottom-0 left-6", size: "size-10" },
  { pos: "-bottom-6 -right-6", size: "size-32", ring: true },
  { pos: "top-2 right-1/4", size: "size-5" },
];
export function SectionHeading({
  title,
  description,
  eyebrow,
  invert = false,
  align = "center",
  className,
}: Props) {
  const centered = align === "center";
  const circles = centered ? circlesCenter : circlesLeft;

  return (
    <div
      className={cn(
        "relative isolate flex flex-col gap-4",
        centered ? "mx-auto max-w-2xl items-center text-center" : "max-w-2xl",
        className,
      )}
    >
      {/* Cercles en arrière-plan (suivent le thème, aucune couleur en dur) */}
      {circles.map(({ pos, size, ring }) => (
        <div
          key={`${pos}-${size}`}
          aria-hidden
          className={cn(
            "absolute -z-10 rounded-full",
            pos,
            size,
            ring
              ? cn(
                  "border-2",
                  invert ? "border-primary-foreground/20" : "border-primary/20",
                )
              : invert
                ? "bg-primary-foreground/10"
                : "bg-primary/10",
          )}
        />
      ))}

      {eyebrow && (
        <span
          className={cn(
            `inline-flex w-fit items-center gap-2 rounded-full py-1 pr-3.5 pl-3
            text-sm font-semibold shadow-xs ring-1 ring-inset`,
            invert
              ? `bg-primary-foreground/10 text-primary-foreground
                ring-primary-foreground/20`
              : "bg-primary/10 text-primary ring-primary/20",
          )}
        >
          {/* Point qui pulse (désactivé si l'utilisateur réduit les animations) */}
          <span className="relative flex size-2">
            <span
              className={cn(
                `absolute inline-flex size-full animate-ping rounded-full
                opacity-60 motion-reduce:animate-none`,
                invert ? "bg-primary-foreground" : "bg-primary",
              )}
            />
            <span
              className={cn(
                "relative inline-flex size-2 rounded-full",
                invert ? "bg-primary-foreground" : "bg-primary",
              )}
            />
          </span>
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          `font-display text-3xl leading-tight font-bold tracking-tight
          text-balance sm:text-4xl lg:text-5xl`,
          invert ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>

      {/* Trait d'accent : une barre pleine suivie de deux points qui s'estompent */}
      <div aria-hidden className="flex items-center gap-1.5">
        <span
          className={cn(
            "h-1 w-12 rounded-full",
            invert ? "bg-primary-foreground" : "bg-primary",
          )}
        />
        <span
          className={cn(
            "h-1 w-3 rounded-full",
            invert ? "bg-primary-foreground/50" : "bg-primary/50",
          )}
        />
        <span
          className={cn(
            "h-1 w-1.5 rounded-full",
            invert ? "bg-primary-foreground/25" : "bg-primary/25",
          )}
        />
      </div>

      {description && (
        <p
          className={cn(
            "text-lg leading-relaxed text-pretty",
            invert ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
