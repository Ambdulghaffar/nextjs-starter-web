import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import environment from "@/config/environment.config";
import { SessionExpiredModal } from "@/lib/auth/session-expired-modal";
import { ColorThemeScript } from "@/components/themes/ColorThemeScript";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Mon App",
    template: "%s | Mon App",
  },
  description: "Description courte de mon application.",
  applicationName: "Mon App",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mon App",
    description: "Description courte de mon application.",
    url: "/",
    siteName: "Mon App",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mon App",
    description: "Description courte de mon application.",
  },
};

const {
  auth: { sessionRefetchInterval },
} = environment;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${outfit.className} h-full antialiased`}
    >
      <head>
        <ColorThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <QueryProvider>
            <SessionProvider
              refetchInterval={sessionRefetchInterval}
              refetchOnWindowFocus={true}
            >
              <SidebarProvider>
                <Toaster />
                {children}
              </SidebarProvider>
              <SessionExpiredModal />
            </SessionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
