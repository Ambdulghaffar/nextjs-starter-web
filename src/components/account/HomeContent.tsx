"use client";

import { useSession } from "next-auth/react";
import { Marquee } from "./Marquee";
import { Tips } from "./Tips";
import { CtaBlock } from "./CtaBlock";
import { ROUTES } from "@/utils/routes";
import { SectionHeading } from "../home/section-heading";
import { GettingStarted } from "./GettingsStarted";
import { HomeGreeting } from "./HomeGreetings";
import { ProfileCard } from "./ProfileCard";
import { ProfileCompletion } from "./ProfileCompletion";
import { QuickActions } from "./QuickActions";
import { getUserAvatarUrl } from "@/lib/users/api/types";

const panel = "rounded-3xl p-6 sm:p-10";

export default function HomeContent() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading" || !user) {
    return (
      <div aria-busy="true" className="space-y-6">
        <div className="bg-muted h-64 animate-pulse rounded-3xl" />
        <div className="bg-muted h-96 animate-pulse rounded-3xl" />
      </div>
    );
  }

  const items = [
    {
      label: "Photo de profil",
      done: !!getUserAvatarUrl(user),
      href: ROUTES.ACCOUNT_PROFILE,
    },
    {
      label: "Prénom et nom",
      done: !!(user.firstName && user.lastName),
      href: ROUTES.ACCOUNT_PROFILE,
    },
    {
      label: "Adresse e-mail",
      done: !!user.email,
      href: ROUTES.ACCOUNT_PROFILE,
    },
    {
      label: "Numéro de téléphone",
      done: !!user.phoneNumber,
      href: ROUTES.ACCOUNT_PROFILE,
    },
  ];
  const avatarUrl = getUserAvatarUrl(user);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      <div className="space-y-6">
        <HomeGreeting user={user} />
        <Marquee />
      </div>

      <section className={`${panel} bg-primary/10`}>
        <SectionHeading
          align="left"
          title="Mes informations"
          description="Ce que nous savons de toi, et ce qu'il reste à compléter."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <ProfileCard user={user} />
          </div>
          <div className="min-w-0">
            <ProfileCompletion items={items} />
          </div>
        </div>
      </section>

      <section className={`${panel} bg-muted`}>
        <SectionHeading
          align="left"
          title="Premiers pas"
          description="Quatre étapes pour tirer le meilleur de ton espace."
        />
        <div className="mt-8">
          <GettingStarted
            profileDone={
              !!(user.firstName && user.lastName && user.phoneNumber)
            }
            photoDone={!!avatarUrl}
          />
        </div>
      </section>

      <section className="px-2 py-6 sm:px-4">
        <SectionHeading
          align="left"
          title="Et maintenant ?"
          description="Les raccourcis les plus utiles de ton espace."
        />
        <div className="mt-8">
          <QuickActions />
        </div>
      </section>

      <section className={`${panel} bg-brand-1/10`}>
        <SectionHeading
          align="left"
          title="Bon à savoir"
          description="Trois petites choses qui rendent ton compte plus agréable."
        />
        <div className="mt-8">
          <Tips />
        </div>
      </section>

      <CtaBlock />
    </div>
  );
}
