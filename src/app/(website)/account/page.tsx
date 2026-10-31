import type { Metadata } from "next";
import HomeContent from "@/components/account/HomeContent";

export const metadata: Metadata = {
  title: "Accueil",
};

export default function HomePage() {
  //await new Promise((r) => setTimeout(r, 5000));
  return (
    <>
      <HomeContent />
    </>
  );
}
