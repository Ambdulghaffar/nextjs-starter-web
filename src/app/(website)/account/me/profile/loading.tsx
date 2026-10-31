import { ProfileSkeleton } from "@/components/account/profile/ProfileSkeleton";
import ProfileLayout from "@/layout/ProfileLayout";

export default function Loading() {
  return (
    <ProfileLayout>
      <h1
        className="font-display bg-brand-100/70 mb-10 h-16 w-64 animate-pulse
          rounded-md text-[clamp(2.5rem,5vw,4rem)] dark:bg-white/10"
      >
        <span className="sr-only">Chargement du profil…</span>
      </h1>
      <ProfileSkeleton />
    </ProfileLayout>
  );
}
