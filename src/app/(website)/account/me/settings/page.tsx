import { Metadata } from "next";
import ProfileLayout from "@/layout/ProfileLayout";
import AccountSettingsCard from "@/components/account/profile/AccountSettingsCard";

export const metadata: Metadata = {
  title: "Paramètres",
};

export default function SettingsPage() {
  //await new Promise((r) => setTimeout(r, 5000));
  return (
    <ProfileLayout>
      <h1
        className="font-display mb-10 text-[clamp(2.5rem,5vw,4rem)] leading-none
          font-extrabold tracking-tight"
      >
        Paramètres
      </h1>

      <AccountSettingsCard />
    </ProfileLayout>
  );
}
