import ProfileLayout from "@/layout/ProfileLayout";
import AccountSettingsSkeleton from "@/components/account/profile/AccountSettingsSkeleton";

export default function Loading() {
  return (
    <ProfileLayout>
      <h1
        className="font-display bg-brand-100/70 mb-10 h-16 w-64 animate-pulse
          rounded-md text-[clamp(2.5rem,5vw,4rem)] dark:bg-white/10"
      >
        <span className="sr-only">Chargement des paramètres…</span>
      </h1>
      <AccountSettingsSkeleton />
    </ProfileLayout>
  );
}
