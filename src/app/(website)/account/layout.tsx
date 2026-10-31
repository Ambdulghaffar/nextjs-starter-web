import type { Metadata } from "next";
import HomeShell from "@/layout/HomeShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeShell>{children}</HomeShell>;
}
