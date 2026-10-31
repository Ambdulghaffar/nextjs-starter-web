import { ROUTES } from "@/utils/routes";
import Link from "next/link";

export function CtaBlock() {
  return (
    <section
      className="bg-primary text-primary-foreground relative isolate
        overflow-hidden rounded-3xl p-10 sm:p-14"
    >
      {/* Cercles décoratifs (7) */}
      <div
        aria-hidden
        className="bg-primary-foreground/10 absolute -top-24 -right-16 -z-10
          size-80 rounded-full"
      />
      <div
        aria-hidden
        className="border-primary-foreground/20 absolute top-12 right-32 -z-10
          size-44 rounded-full border-2"
      />
      <div
        aria-hidden
        className="bg-primary-foreground/10 absolute top-8 right-1/2 -z-10
          size-10 rounded-full"
      />
      <div
        aria-hidden
        className="border-primary-foreground/15 absolute -bottom-28 -left-20
          -z-10 size-72 rounded-full border-2"
      />
      <div
        aria-hidden
        className="bg-primary-foreground/10 absolute -bottom-10 left-1/3 -z-10
          size-28 rounded-full"
      />
      <div
        aria-hidden
        className="bg-primary-foreground/15 absolute right-14 bottom-14 -z-10
          size-16 rounded-full"
      />
      <div
        aria-hidden
        className="border-primary-foreground/20 absolute right-1/3 bottom-6
          -z-10 size-6 rounded-full border-2"
      />

      <div className="relative max-w-2xl">
        <h2
          className="font-display text-3xl leading-tight font-bold
            tracking-tight sm:text-4xl"
        >
          Une question ?
        </h2>
        <p className="text-primary-foreground/80 mt-4 text-lg leading-relaxed">
          Le Chat IA est là pour t&apos;aider à avancer, à toute heure. Pose ta
          question, il fait le reste.
        </p>
        <Link
          href={ROUTES.ACCOUNT_CHAT}
          className="bg-primary-foreground text-primary
            hover:bg-primary-foreground/90
            focus-visible:ring-primary-foreground/50 mt-8 inline-flex h-12
            items-center rounded-full px-7 text-base font-semibold shadow-lg
            transition-colors focus-visible:ring-[3px]
            focus-visible:outline-none"
        >
          Ouvrir le Chat IA
        </Link>
      </div>
    </section>
  );
}
