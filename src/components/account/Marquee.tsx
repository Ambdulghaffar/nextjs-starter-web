import {
  BlocksIcon,
  BotMessageSquareIcon,
  HomeIcon,
  InfoIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react";

type Word = { label: string; icon: LucideIcon };

const words: Word[] = [
  { label: "Ton espace", icon: HomeIcon },
  { label: "Ton profil", icon: UserRoundIcon },
  { label: "Tes informations", icon: InfoIcon },
  { label: "Ton Chat IA", icon: BotMessageSquareIcon },
  { label: "Ton kit", icon: BlocksIcon },
];

export function Marquee() {
  return (
    <div
      aria-hidden
      className="marquee bg-primary/10 ring-primary/20 overflow-hidden
        rounded-2xl
        mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        py-2 ring-1"
    >
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-left 35s linear infinite;
          will-change: transform;
        }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div className="marquee-track flex w-max">
        {/* Deux copies identiques : l'animation décale de -50 %, la boucle est sans à-coup. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-2 pr-2">
            {words.map(({ label, icon: Icon }) => (
              <span
                key={`${copy}-${label}`}
                className="bg-card text-card-foreground flex items-center
                  gap-1.5 rounded-full py-1 pr-3 pl-1 text-sm font-medium
                  shadow-xs"
              >
                <span
                  className="bg-primary text-primary-foreground grid size-5
                    place-items-center rounded-full"
                >
                  <Icon className="size-3" />
                </span>
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
