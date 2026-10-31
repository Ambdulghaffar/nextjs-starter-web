import { Metadata } from "next";

import ProfileLayout from "@/layout/ProfileLayout";
import QuerySectionBoundary from "@/lib/query-section-boundary";
import { Suspense } from "react";
import { ProfileSkeleton } from "@/components/account/profile/ProfileSkeleton";
import UserMetaCard from "@/components/account/profile/UserMetaCard";
import UserInfoCard from "@/components/account/profile/UserInfoCard";

export const metadata: Metadata = {
  title: "Mon profil",
};

export default function ProfilePage() {
  //await new Promise((r) => setTimeout(r, 5000));
  return (
    <ProfileLayout>
      <h1
        className="font-display mb-10 text-[clamp(2.5rem,5vw,4rem)] leading-none
          font-extrabold tracking-tight"
      >
        Mon profil
      </h1>

      <QuerySectionBoundary
        title="Mon profil"
        message="Oups ! Nous rencontrons un problème lors du chargement de votre profil. Veuillez réessayer un instant."
      >
        <Suspense fallback={<ProfileSkeleton />}>
          <div className="space-y-10">
            <UserMetaCard />
            <UserInfoCard />
          </div>
        </Suspense>
      </QuerySectionBoundary>
    </ProfileLayout>
  );
}
